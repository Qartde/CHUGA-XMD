"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

zokou(
  { 
    nomCom: "repo", 
    reaction: "📦", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    const { ms: quotedMessage } = commandeOptions;
    
    const repoMessage = `
📦 *CHUGA XMD REPO*

🔗 GitHub:
https://github.com/chugastanchugaman-lgtm/CHUGA-XMD

🔑 Session:
https://session-id-site-fycn.onrender.com

📢 Channel:
https://whatsapp.com/channel/0029VatokI45EjxufALmY32X

⚡ Deploy now!
    `;

    await zk.sendMessage(dest, { 
      text: repoMessage,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363353854480831@newsletter",
          newsletterName: "CHUGA XMD",
          serverMessageId: 143
        }
      }
    }, { quoted: quotedMessage });
    
  }
);
