const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "getdeleted",
  categorie: "Owner",
  reaction: "🗑️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, superUser } = commandeOptions;
  
  if (!superUser) {
    return repondre("❌ This command is only for the bot owner!");
  }
  
  try {
    if (!global.deletedMessages || Object.keys(global.deletedMessages).length === 0) {
      return repondre("📭 No deleted messages found in memory.");
    }
    
    let total = 0;
    let message = "╭━━━ *『 DELETED MESSAGES 』* ━━━╮\n┃\n";
    
    for (const chat in global.deletedMessages) {
      const count = global.deletedMessages[chat].length;
      total += count;
      const chatName = chat.includes('@g.us') ? 'Group' : 'Private';
      message += `┃ 💬 ${chatName}: ${count} messages\n`;
    }
    
    message += `┃\n┃ 📊 Total: ${total} messages\n`;
    message += `┃\n╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    message += `> *These messages will be used for anti-delete*`;
    
    await repondre(message);
    
  } catch (error) {
    console.error("Getdeleted error:", error);
    repondre("❌ Error fetching deleted messages.");
  }
});
