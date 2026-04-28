const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "shahadat-sahu",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস মোস্তাকিম রে হাঙ্গা করো!😶👻😘",
    "miss u too": "হুম আমি ও তোমাকে Miss করি..! কিন্তু মোস্তাকিম বস বেশি করে! 😏💖",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "bc": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "good night": "Sweet Dream babu.! তবে আগে মোস্তাকিম বস কে Good Night  বলে নিও! 😏💤",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "mostakim": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
   "Mostakim": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
   "MOSTAKIM ": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ MOSTAKIM ISLAM SAGOR ☜\nFacebook: https://www.facebook.com/100058112936375",
"Owner": "‎┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 - 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│ 👤 𝐍𝐚𝐦𝐞 : MOSTAKIM ISLAM SAGOR
│ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫 : Male
│ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 : Single
│ 🎂 𝐀𝐠𝐞 : 20+
│ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : Islam
│ 🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : HSC 
│ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : Dhaka, Bangladesh
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│https://www.facebook.com/100058112936375
│ ️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :
│ t.me/M0STAKIM10X
└───────────────⭓ ",
    "admin": "He is 🔹 MOSTAKIM ISLAM SAGOR 🔹 তাকে সবাই Admin 🔹 MOSTAKIM 🔹 হিসেবে চিনে!😘☺️",
   "Admin": "┌───────────────⭓
│    𝗔𝗗𝗠𝗜𝗡 - 𝗜𝗡𝗙𝗢
├───────────────⭓
│ 👤 𝐍𝐚𝐦𝐞 : MOSTAKIM ISLAM SAGOR
│ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫 : Male
│ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 : Single
│ 🎂 𝐀𝐠𝐞 : 20+
│ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : Islam
│ 🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : HSC 
│ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : Dhaka, Bangladesh
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────⭓
│ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│https://www.facebook.com/100058112936375
│ 💬  𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :
│ t.me/M0STAKIM10X
└───────────────⭓",
    "baby": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ' চুপ কর পাগল ছাগল!😒",
    "Assalamualaikum": "Walaikumassalam❤️‍🩹",
    "fork": "https://github.com/mostakim-sagor/MOSTAKIM-GOAT-BOT.git",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস মোস্তাকিম রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": "মেয়ে হলে আমার বস মোস্তাকিম এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss মোস্তাকিম এর ইনবক্সে গুতা দিন 😘",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami mostakim": "হ্যা বস কেমন আছেন..?☺️",
    "Ami Mostakim": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS - 𝐌𝐎𝐒𝐓𝐀𝐊𝐈𝐌 𝐆𝐎𝐀𝐓 𝐁𝐎𝐓 𝐕𝟐 🤖",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "heda": "তোর নানির!🥰",
    "Lol": "ভাই তুই এত হাসিস না..!🌚🤣",
    "kire ki koros": "তোমার কথা ভাবতে ছি জানু 😚",
    "ki koros": "বস মোস্তাকিম এর সাথে প্রেমে ব্যস্ত আছি 😏💘",
    "kire bot": "হ্যাঁ সবাই কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈",
    "valo aso": "হ্যাঁ রে,  বস মোস্তাকিম এর দোয়ায় ভালো আছি 😌💞",
    "pagol": "হুম পাগল, কিন্তু তোমারই প্রেমে পাগল 😏😂",
    "breakup": "চিন্তা করিস না.! মোস্তাকিম বস তো আছেই তোকে নতুন জান দিয়া দিবে 😎🔥",
    "tui ke": "আমি তোর বস মোস্তাকিম এর ChatBot 😏",
    "Hum": "এতো Hum কেনো জানু? কিছু বলবা? 😉",
    "hmm": "Hmmm কিসের হুমম জানু 🥵",
    "love": "Love করলে সরাসরি মোস্তাকিম বস কে বল জানু 😻🔥"
  };

  if (!responses[msg]) return;

  if (!global.client.handleReply) global.client.handleReply = [];

  return api.sendMessage(
    responses[msg],
    threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "mostakim"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!global.client.handleReply) global.client.handleReply = [];

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "mostakim"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};