const {
  zokou
} = require("../framework/zokou");

// Simple runtime function
function getUptime() {
  const uptime = process.uptime();
  
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor(uptime % 86400 / 3600);
  const minutes = Math.floor(uptime % 3600 / 60);
  const seconds = Math.floor(uptime % 60);
  
  return {
    days, hours, minutes, seconds,
    total: uptime
  };
}

zokou({
  'nomCom': "uptime",
  'desc': "Check bot runtime",
  'categorie': "General",
  'reaction': '⏱️'
}, async (dest, zk, commandOptions) => {
  
  const { ms, repondre } = commandOptions;
  
  try {
    const uptime = getUptime();
    
    const uptimeText = `╭━━━━━━━━━━━━━━━━━━━━╮
┃   ⏱️ *BOT UPTIME* ⏱️
╰━━━━━━━━━━━━━━━━━━━━╯

┌─── *RUNTIME* ───┐
│ 📅 *Days:* ${uptime.days}
│ ⏰ *Hours:* ${uptime.hours}
│ ⏱️ *Minutes:* ${uptime.minutes}
│ ⏲️ *Seconds:* ${uptime.seconds}
└──────────────────┘

> *CHUGA XMD* ⚡`;

    await zk.sendMessage(dest, {
      text: uptimeText
    }, { quoted: ms });
    
  } catch (error) {
    console.log("Uptime error:", error);
    repondre("❌ Error getting uptime");
  }
});
