"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

zokou(
  { 
    nomCom: "menu", 
    reaction: "📋", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    await zk.sendPresenceUpdate("composing", dest);
    
    const menuMessage = `
╔════════════════════╗
║    ⚡ CHUGA XMD ⚡   
╠════════════════════╣
║ 📋 *MAIN MENU*     
╠════════════════════╣
║ ▸ !ping  - Check bot speed
║ ▸ !menu  - Show this menu
║ ▸ !help  - Get help
║ ▸ !info  - Bot information
║ ▸ !owner - Contact owner
╠════════════════════╣
║ 📢 *CHANNEL*        
║ CHUGA XMD
╠════════════════════╣
║ > Thank you for using CHUGA XMD
╚════════════════════╝
    `;

    await zk.sendMessage(dest, { 
      text: menuMessage,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363353854480831@newsletter",
          newsletterName: "CHUGA XMD",
          serverMessageId: 143
        }
      }
    });
    
  }
);
