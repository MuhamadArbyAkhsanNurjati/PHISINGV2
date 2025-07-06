# 🛰️ Pencatat Target X9x
Aplikasi web sederhana berbasis Flask yang dirancang untuk mengumpulkan metadata perangkat dan koneksi serta mengirimkannya ke bot Telegram yang dikonfigurasi.     Termasuk unggahan foto opsional (misalnya, swafoto) dari sisi klien.

# ⚠️ Hanya untuk keperluan edukasi dan pengujian laboratorium yang terkontrol. Penggunaan tanpa izin dilarang.

# 📂 Struktur Proyek
├── app.py               # Flask server logic
├── config.txt           # Token & chat ID konfigurasi Telegram
├── requirements.txt     # Dependencies Python
└── templates/
    └── index.html       # (opsional) Frontend form, jika tersedia
# ⚙️ Instalasi
Repositori klon :
Sunting
git clone https://github.com/username/x9x-logger.git
cd x9x-logger

# Sunting
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\\Scripts\\activate   # Windows
# Instal dependensi :
pip install -r requirements.txt
Konfigurasiconfig.txt :

Sunting
123456789:ABCdefGHIjklMNOpqrSTUvwxYZ        <-- baris 1: Token bot Telegram
-1001234567890                              <-- baris 2: ID chat atau grup

# 🚀 Menjalankan Aplikasi
python app.py
Akses browser:http://localhost:5000

# 📤 Format Data yang Dikirim ke Telegram
Saat data POST diterima, bot Telegram akan menerima foto dan caption berisi:
Alamat IP
Platform dan Peramban
Baterai & Jaringan
Lokasi dan waktu akses
Informasi agen pengguna
CONTOH :
Menyalin
┏◪ INFORMATION TARGET
┃ ⌬ IP       : 192.168.1.1
┃ ⌬ Browser  : Firefox
┃ ⌬ Lokasi   : Jakarta, ID
┃ ⌬ Waktu    : 2025-07-06 13:45:00
┗◪
