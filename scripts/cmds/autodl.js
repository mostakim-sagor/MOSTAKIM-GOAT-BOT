module.exports = {
  config: {
    name: "autodl",
    version: "0.0.3",
    hasPermssion: 0,
    credits: "MOSTAKIM",
    description: "auto video download",
    commandCategory: "user",
    usages: "",
    cooldowns: 2,
  },

  run: async function ({ api, event, args }) {},

  handleEvent: async function ({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const { alldown } = require("mostakim-videos-downloader");

    const content = event.body ? event.body.trim() : "";
    const body = content.toLowerCase();

    if (!body.startsWith("https://")) return;

    try {
      api.setMessageReaction("☢️", event.messageID, (err) => {}, true);

      const data = await alldown(content);
      console.log("Download Data:", JSON.stringify(data, null, 2));

      let videoUrl =
        data?.url ||
        data?.data?.url ||
        data?.data?.hd ||
        data?.data?.sd ||
        data?.hd ||
        data?.sd ||
        null;

      if (!videoUrl) {
        api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        return api.sendMessage(
          "❌ ভিডিও URL খুঁজে পাওয়া যায়নি।",
          event.threadID,
          event.messageID
        );
      }

      const quality =
        data?.data?.hd || data?.hd ? "HD" :
        data?.data?.sd || data?.sd ? "SD" : "Normal";

      api.setMessageReaction("🔥", event.messageID, (err) => {}, true);

      const videoBuffer = (
        await axios.get(videoUrl, {
          responseType: "arraybuffer",
          timeout: 60000,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        })
      ).data;

      const cachePath = __dirname + "/cache/auto.mp4";
      fs.writeFileSync(cachePath, Buffer.from(videoBuffer));

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);

      return api.sendMessage(
        {
          body: `🚀 𝐌𝐎𝐒𝐓𝐀𝐊𝐈𝐌 𝐕𝟐 𝐁𝐎𝐓 🚀
📥⚡𝗔𝘂𝘁𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿⚡📂
🎬 𝐄𝐧𝐣𝐨𝐲 𝐭𝐡𝐞 𝐕𝐢𝐝𝐞𝐨 
🔗 Link: ${content}
🎬 Quality: ${quality}
⚡ Status: Download Complete ✅`,
          attachment: fs.createReadStream(cachePath),
        },
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error("AutoDL Error:", error);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
      return api.sendMessage(
        `❌ ডাউনলোড ব্যর্থ হয়েছে!\n📛 Error: ${error.message}`,
        event.threadID,
        event.messageID
      );
    }
  },
};