import os
import io
import json
import base64
import traceback
import numpy as np
import cv2
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

# CẤU HÌNH APP
app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = (
    r"C:/xampp/htdocs/Sign_Language_Master/Progress/Code/sign_language_model.h5"
)
LABEL_PATH = (
    r"C:/xampp/htdocs/Sign_Language_Master/Progress/Code/class_labels.json"
)
IMG_SIZE = (128, 128)  # phải trùng với model input

# LOAD MODEL + LABELS
print("Đang tải model...")
try:
    model = load_model(MODEL_PATH, compile=False)
    print("Model đã load thành công.")
except Exception as e:
    raise RuntimeError(f"Lỗi khi load model: {e}")

with open(LABEL_PATH, "r", encoding="utf-8") as f:
    class_labels = json.load(f)
index_to_label = {v: k for k, v in class_labels.items()}
print(f"Đã load {len(class_labels)} lớp nhãn.")

# MEDIAPIPE HAND DETECTOR
try:
    import mediapipe as mp

    mp_hands = mp.solutions.hands
    HAS_MEDIAPIPE = True
    print(" MediaPipe sẵn sàng (có thể crop tay).")
except Exception:
    HAS_MEDIAPIPE = False
    print("Không có MediaPipe, sẽ không crop tay.")


# HÀM PREPROCESS ẢNH NHẸ NHÀNG
def preprocess_image_bytes(image_bytes, do_hand_crop=True):
    """Chỉ crop tay và chuẩn hoá ảnh giống dữ liệu training."""
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img_np = np.array(img)  # RGB

    # Crop tay nếu có Mediapipe
    if do_hand_crop and HAS_MEDIAPIPE:
        with mp_hands.Hands(
            static_image_mode=True,
            max_num_hands=1,
            min_detection_confidence=0.5,
        ) as hands:
            results = hands.process(cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR))
            if results.multi_hand_landmarks:
                h, w, _ = img_np.shape
                xs = [
                    int(lm.x * w)
                    for lm in results.multi_hand_landmarks[0].landmark
                ]
                ys = [
                    int(lm.y * h)
                    for lm in results.multi_hand_landmarks[0].landmark
                ]
                x_min, x_max = max(0, min(xs)), min(w, max(xs))
                y_min, y_max = max(0, min(ys)), min(h, max(ys))

                pad_x = int((x_max - x_min) * 0.3) or 10
                pad_y = int((y_max - y_min) * 0.3) or 10
                x1, y1 = max(0, x_min - pad_x), max(0, y_min - pad_y)
                x2, y2 = min(w, x_max + pad_x), min(h, y_max + pad_y)
                crop = img_np[y1:y2, x1:x2]
                if crop.size > 0:
                    img_np = crop

    # Resize về kích thước model
    img_np = cv2.resize(img_np, IMG_SIZE, interpolation=cv2.INTER_AREA)

    # Chuẩn hoá về [0, 1]
    img_norm = img_np.astype("float32") / 255.0

    return img_norm, img_np


def to_base64_rgb(img_rgb):
    """Convert ảnh RGB numpy -> base64 string."""
    pil = Image.fromarray(img_rgb.astype("uint8"), "RGB")
    buff = io.BytesIO()
    pil.save(buff, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buff.getvalue()).decode(
        "utf-8"
    )


# ROUTES
@app.route("/")
def index():
    return jsonify({"message": "Sign Language Recognition API is running!"})


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        img_b64 = data.get("image")
        top_k = int(data.get("top_k", 3))
        use_hand_crop = bool(data.get("hand_crop", True))

        if not img_b64:
            return jsonify({"error": "No image provided"}), 400
        if "," in img_b64:
            img_b64 = img_b64.split(",")[1]
        image_bytes = base64.b64decode(img_b64)

        # Tiền xử lý
        img_norm, debug_img = preprocess_image_bytes(
            image_bytes, do_hand_crop=use_hand_crop
        )
        input_arr = np.expand_dims(img_norm, axis=0)

        # Dự đoán
        preds = model.predict(input_arr)
        probs = preds[0]
        top_inds = probs.argsort()[-top_k:][::-1]

        results = [
            {
                "label": index_to_label.get(int(i), "Unknown"),
                "prob": float(probs[int(i)]),
            }
            for i in top_inds
        ]

        pred_index = int(np.argmax(probs))
        pred_label = index_to_label.get(pred_index, "Unknown")
        confidence = float(probs[pred_index])

        debug_b64 = to_base64_rgb(debug_img)
        print(f"🧾 Dự đoán: {pred_label} ({confidence*100:.2f}%)")

        return jsonify(
            {
                "prediction": pred_label,
                "confidence": round(confidence, 4),
                "top_k": results,
                "debug_image": debug_b64,
            }
        )

    except Exception as e:
        print("Predict error:", e)
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


# CHẠY APP
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
