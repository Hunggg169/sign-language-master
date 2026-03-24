import os
import cv2
import mediapipe as mp
import numpy as np
from tqdm import tqdm
from concurrent.futures import ProcessPoolExecutor, as_completed

#  CONFIG
SOURCE_DIR = r"D:/21013345/21013345/DCCS/dataset/Unified_Sign_Language"
PROCESSED_DIR = r"D:/21013345/21013345/DCCS/dataset/processed_mp"
IMG_SIZE = (128, 128)
EXPAND_FACTOR = 0.3
NUM_WORKERS = os.cpu_count() - 2  # ~14 threads cho CPU 14600K


mp_hands = mp.solutions.hands


def crop_hand(image_bgr, expand_factor=EXPAND_FACTOR):
    """Cắt vùng tay bằng Mediapipe."""
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    h, w, _ = image_rgb.shape
    with mp_hands.Hands(
        static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5
    ) as hands:
        res = hands.process(image_rgb)
        if not res.multi_hand_landmarks:
            return None
        lm = res.multi_hand_landmarks[0].landmark
        xs = [int(p.x * w) for p in lm]
        ys = [int(p.y * h) for p in lm]
        x_min, x_max = max(0, min(xs)), min(w, max(xs))
        y_min, y_max = max(0, min(ys)), min(h, max(ys))
        box_w, box_h = x_max - x_min, y_max - y_min
        pad_x, pad_y = int(box_w * expand_factor), int(box_h * expand_factor)
        x1, y1 = max(0, x_min - pad_x), max(0, y_min - pad_y)
        x2, y2 = min(w, x_max + pad_x), min(h, y_max + pad_y)
        return image_rgb[y1:y2, x1:x2]


def fallback_crop(image_bgr):
    """Fallback khi Mediapipe không detect được tay."""
    h, w, _ = image_bgr.shape
    side = min(h, w)
    cx, cy = w // 2, h // 2
    half = side // 2
    cropped = image_bgr[cy - half : cy + half, cx - half : cx + half]
    return cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB)


def enhance_image(img_rgb):
    """Cân sáng + làm mịn."""
    img_yuv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2YUV)
    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    img_yuv[:, :, 0] = clahe.apply(img_yuv[:, :, 0])
    img_rgb = cv2.cvtColor(img_yuv, cv2.COLOR_YUV2RGB)
    return cv2.GaussianBlur(img_rgb, (3, 3), 0)


def process_one_image(args):
    """Xử lý 1 ảnh đơn lẻ (được gọi song song)."""
    src_path, dst_dir = args
    try:
        img = cv2.imread(src_path)
        if img is None:
            return False
        hand = crop_hand(img)
        if hand is None:
            hand = fallback_crop(img)
        hand = enhance_image(hand)
        hand = cv2.resize(hand, IMG_SIZE)
        base = os.path.splitext(os.path.basename(src_path))[0] + ".png"
        out_path = os.path.join(dst_dir, base)
        cv2.imwrite(
            out_path,
            cv2.cvtColor(hand, cv2.COLOR_RGB2BGR),
            [cv2.IMWRITE_PNG_COMPRESSION, 3],
        )
        return True
    except Exception:
        return False


def preprocess_all():
    """Tiền xử lý toàn bộ dataset song song bằng Mediapipe."""
    if os.path.exists(PROCESSED_DIR):
        print("Xóa thư mục cũ...")
        import shutil

        shutil.rmtree(PROCESSED_DIR)
    os.makedirs(PROCESSED_DIR, exist_ok=True)

    all_tasks = []
    for label in sorted(os.listdir(SOURCE_DIR)):
        src_dir = os.path.join(SOURCE_DIR, label)
        if not os.path.isdir(src_dir):
            continue
        dst_dir = os.path.join(PROCESSED_DIR, label)
        os.makedirs(dst_dir, exist_ok=True)
        for fname in os.listdir(src_dir):
            src_path = os.path.join(src_dir, fname)
            all_tasks.append((src_path, dst_dir))

    print(
        f"Bắt đầu xử lý {len(all_tasks):,} ảnh bằng {NUM_WORKERS} luồng CPU..."
    )

    done = 0
    with ProcessPoolExecutor(max_workers=NUM_WORKERS) as executor:
        futures = [
            executor.submit(process_one_image, task) for task in all_tasks
        ]
        for f in tqdm(as_completed(futures), total=len(futures)):
            done += 1

    print(f"Đã xử lý xong {done:,} ảnh. Dataset lưu tại: {PROCESSED_DIR}")


if __name__ == "__main__":
    preprocess_all()
