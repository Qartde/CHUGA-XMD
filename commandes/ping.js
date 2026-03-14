const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const os = require("os");

zokou({
  nomCom: "ping",
  aliases: ["speed", "pong"],
  reaction: "⚡",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;
  
  const start = Date.now();
  
  // Send initial message
  await zk.sendMessage(dest, { text: "⚡ *Pinging...*" }, { quoted: ms });
  
  const end = Date.now();
  const responseTime = end - start;
  
  // System info
  const usedMemory = (os.totalmem() - os.freemem()) / (1024 * 1024);
  const totalMemory = os.totalmem() / (1024 * 1024);
  const uptime = os.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  
  // Time info
  const now = moment().tz("Africa/Dar_es_Salaam").format("HH:mm:ss");
  const date = moment().tz("Africa/Dar_es_Salaam").format("DD/MM/YYYY");
  
  // Response message
  const pingMessage = `╭━━━〔 *CHUGA XMD* 〕━━━╮
┃
┃ ⚡ *Ping:* ${responseTime}ms
┃ 🕐 *Time:* ${now}
┃ 📅 *Date:* ${date}
┃
┃ 📊 *System Info*
┃ ┌──────────────
┃ │ 💾 *RAM:* ${usedMemory.toFixed(2)}MB / ${totalMemory.toFixed(2)}MB
┃ │ ⏱️ *Uptime:* ${hours}h ${minutes}m
┃ └──────────────
┃
┃ 🤖 *Bot is online!*
┃
╰━━━〔 *POWERED BY CHUGA* 〕━━━╯

⚡ *CHUGA XMD*`;

  // Send response with your image
  await zk.sendMessage(dest, {
    image: { url: "https://files.catbox.moe/pkp993.jpg" },
    caption: pingMessage,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363353854480831@newsletter",
        newsletterName: "CHUGA XMD",
        serverMessageId: 143
      },
      forwardingScore: 999,
      externalAdReply: {
        title: "CHUGA XMD",
        body: `⚡ Ping: ${responseTime}ms`,
        thumbnailUrl: "https://files.catbox.moe/pkp993.jpg",
        mediaType: 1,
        renderSmallThumbnail: true
      }
    }
  }, { quoted: ms });
});
