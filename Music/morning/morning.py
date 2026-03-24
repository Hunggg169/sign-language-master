import os
import json

# Thư mục chứa nhạc (gốc)
music_folder = (
    r"C:/xampp/htdocs/Sign_Language_Master/Music/dataset_healing/morning"
)

# Nơi lưu file JSON (trong cùng dự án)
output_file = (
    r"C:/xampp/htdocs/Sign_Language_Master/Music/morning/morning_data.json"
)

# Thư mục gốc của server (htdocs)
web_root = r"C:/xampp/htdocs/Sign_Language_Master"

# Danh sách bài hát
songs = []

for filename in os.listdir(music_folder):
    if filename.lower().endswith(".mp3"):
        abs_path = os.path.join(music_folder, filename)
        # Lấy đường dẫn tương đối tính từ web_root để JS có thể truy cập qua localhost
        rel_path = os.path.relpath(abs_path, web_root).replace("\\", "/")
        songs.append(
            {
                "name": os.path.splitext(filename)[0],
                "path": "/" + rel_path,  # Thêm / để gọi được qua localhost
            }
        )

# Ghi ra file JSON
playlist = {"songs": songs}

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(playlist, f, indent=2, ensure_ascii=False)

print(f"Đã tạo file JSON thành công tại:\n{output_file}")
print(f"Tổng số bài hát: {len(songs)}")
