const { zokou } = require("../framework/zokou");
const fs = require('fs-extra');
const path = require('path');

const configPath = path.join(__dirname, '../set.json');

zokou({
  nomCom: "antidelete",
  categorie: "Owner",
  reaction: "🛡️"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, superUser } = commandeOptions;
  
  if (!superUser) {
    return repondre("❌ This command is only for the bot owner!");
  }
  
  const action = arg[0]?.toLowerCase();
  
  if (!action || (action !== 'on' && action !== 'off')) {
    return repondre(`╭━━━ *『 ANTI-DELETE 』* ━━━╮
┃
┃ Usage: .antidelete [on/off]
┃
┃ Example:
┃ • .antidelete on  - Enable
┃ • .antidelete off - Disable
┃
┃ Current Status: ${global.antideleteStatus ? '✅ ON' : '❌ OFF'}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`);
  }
  
  try {
    // Update global variable
    global.antideleteStatus = action === 'on';
    
    // Try to update config file if it exists
    try {
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config.ANTI_DELETE_MESSAGE = action === 'on' ? 'yes' : 'no';
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      }
    } catch (e) {
      console.log("Config update error:", e);
    }
    
    const status = action === 'on' ? '✅ ENABLED' : '❌ DISABLED';
    const message = `╭━━━ *『 ANTI-DELETE 』* ━━━╮
┃
┃ 🛡️ Status: ${status}
┃
┃ ${action === 'on' ? 
   '✓ Deleted messages will be captured\n✓ Sent to owner automatically' : 
   '✗ Deleted messages will be ignored'}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;
    
    await repondre(message);
    
  } catch (error) {
    console.error("Antidelete error:", error);
    repondre("❌ Error updating anti-delete status.");
  }
});
