"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

zokou(
  { 
    nomCom: "repo", 
    reaction: "📎", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    const { ms: quotedMessage } = commandeOptions;
    
    const repoCaption = `
📎 *CHUGA XMD REPO*

🔗 *GitHub:*
https://github.com/chugastanchugaman-lgtm/CHUGA-XMD

🔑 *Session:*
https://session-id-site-fycn.onrender.com

📢 *Channel:*
https://whatsapp.com/channel/0029VatokI45EjxufALmY32X

⚡ Deploy now and enjoy!
    `;

    await zk.sendMessage(dest, { 
      image: { url: "https://files.catbox.moe/pkp993.jpg" },
      caption: repoCaption,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363353854480831@newsletter",
          newsletterName: "CHUGA XMD",
          serverMessageId: 143
        },
        externalAdReply: {
          title: "⚡ CHUGA XMD REPO",
          body: "Click to deploy your bot",
          sourceUrl: "https://github.com/chugastanchugaman-lgtm/CHUGA-XMD",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/pkp993.jpg"
        }
      }
    }, { quoted: quotedMessage });
    
  }
);
