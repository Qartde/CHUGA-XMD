const { zokou } = require("../framework/zokou");

// Simple runtime function
function getUptime() {
  const uptime = process.uptime();
  
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  return { days, hours, minutes, seconds };
}

function formatUptime(days, hours, minutes, seconds) {
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  return parts.join(' ') || '0s';
}

zokou({
  nomCom: "uptime",
  aliases: ["runtime", "up"],
  desc: "Check bot runtime",
  categorie: "General",
  reaction: '⏱️'
}, async (dest, zk, commandOptions) => {
  
  const { ms, repondre } = commandOptions;
  
  try {
    const uptime = getUptime();
    const formatted = formatUptime(uptime.days, uptime.hours, uptime.minutes, uptime.seconds);
    
    const uptimeText = `╭━━━〔 *CHUGA XMD* 〕━━━╮
┃
┃ ⏱️ *BOT UPTIME*
┃
┃ ┌─── *RUNTIME* ───┐
┃ │ 📅 *Days:* ${uptime.days}
┃ │ ⏰ *Hours:* ${uptime.hours}
┃ │ ⏱️ *Minutes:* ${uptime.minutes}
┃ │ ⏲️ *Seconds:* ${uptime.seconds}
┃ └─────────────────┘
┃
┃ 🕒 *Total:* ${formatted}
┃
┃ 🤖 *Bot is running smoothly!*
┃
╰━━━〔 *POWERED BY CHUGA* 〕━━━╯

⚡ *CHUGA XMD*`;

    await zk.sendMessage(dest, {
      image: { url: "https://files.catbox.moe/pkp993.jpg" },
      caption: uptimeText,
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
          body: `⏱️ Uptime: ${formatted}`,
          thumbnailUrl: "https://files.catbox.moe/pkp993.jpg",
          mediaType: 1,
          renderSmallThumbnail: true
        }
      }
    }, { quoted: ms });
    
  } catch (error) {
    console.log("Uptime error:", error);
    repondre("❌ Error getting uptime");
  }
});
