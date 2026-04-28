const os = require("os");
const moment = require("moment-timezone");
const axios = require("axios");

global.startTime = global.startTime || new Date();

// 🧠 Memory bar
function createBar(percent, size = 20) {
  const filled = Math.round(size * percent);
  const empty = size - filled;
  return "█".repeat(filled) + "▓".repeat(Math.max(0, Math.floor(size * 0.2))) + "░".repeat(empty);
}

// 🖼️ Stream helper (safe for all bots)
async function getStream(url) {
  const res = await axios.get(url, { responseType: "stream" });
  return res.data;
}

module.exports = {
  config: {
    name: "uptime",
    version: "2.3.0",
    hasPermssion: 0,
    credits: "MOSTAKIM", //please don't change credit
    description: "Advanced uptime with RAM bar",
    commandCategory: "system",
    usages: "uptime",
    prefix: false,
    cooldowns: 2
  },

  run: async function ({ api, event }) {
    const { threadID } = event;

    try {
      // ⏱ uptime
      const uptimeSec = (Date.now() - global.startTime) / 1000;

      const days = Math.floor(uptimeSec / 86400);
      const hours = Math.floor((uptimeSec % 86400) / 3600);
      const minutes = Math.floor((uptimeSec % 3600) / 60);
      const seconds = Math.floor(uptimeSec % 60);

      const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // 💾 RAM
      const totalMem = os.totalmem() / 1024 / 1024 / 1024;
      const freeMem = os.freemem() / 1024 / 1024 / 1024;
      const usedMem = totalMem - freeMem;
      const usedPercent = usedMem / totalMem;

      const ramBar = createBar(usedPercent);

      // 🧠 CPU
      const cpus = os.cpus();

      // 📅 time
      const now = moment.tz("Asia/Dhaka");

      // 📡 ping (fake demo)
      const ping = Math.floor(Math.random() * 300);

      let pingStatus =
        ping < 100 ? "⚡ Ultra Fast" :
        ping < 200 ? "🚀 Stable" :
        ping < 400 ? "⚠️ Normal" :
        "🐢 Slow";

      // 🧭 status
      const status =
        usedPercent < 0.7 ? "✅ SYSTEM STABLE" :
        usedPercent < 0.9 ? "⚠️ HIGH LOAD" :
        "⛔ CRITICAL";

      // 📄 message UI (your design preserved)
      const msg = `
╭───〔⚙️ SYSTEM STATUS ⚙️〕───╮
│ 👑 𝗢𝗪𝗡𝗘𝗥 : 𝐌𝐎𝐒𝐓𝐀𝐊𝐈𝐌
│ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : 𝐌𝐎𝐒𝐓𝐀𝐊𝐈𝐌 𝐆𝐎𝐀𝐓 𝐁𝐎𝐓
│  ⏱ 𝗨𝗣𝗧𝗜𝗠𝗘 : ${uptimeFormatted}
├───────────────────────
│ 💾 RAM: ${ramBar}
│     ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB (${(usedPercent * 100).toFixed(1)}%)
│ 🧠 CPU: ${cpus[0].model}
│ 🔢 CORES: ${cpus.length}
│ 🧩 NODE: ${process.version}
├───────────────────────
│ 📅 ${now.format("DD MMMM YYYY")}
│ ⏰ ${now.format("hh:mm:ss A")}
│ 📡 PING: ${ping}ms (${pingStatus})
│ 🧭 STATUS: ${status}
╰───────────────────────
`;

      // 🖼️ IMAGE (CHANGE THIS LINK)
      const imageURL = "https://i.imgur.com/W8DS6ye.png";

      await api.sendMessage(
        {
          body: msg,
          attachment: await getStream(imageURL)
        },
        threadID
      );

    } catch (err) {
      console.log(err);
      await api.sendMessage("❌ Uptime command error", event.threadID);
    }
  }
};