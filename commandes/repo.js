"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

zokou(
  { 
    nomCom: "repo", 
    reaction: "📦", 
    nomFichier: __filename,
    categorie: "General"
  },
  async (dest, zk, commandeOptions) => {
    
    const { ms: quotedMessage, repondre } = commandeOptions;
    
    const repoMessage = `
╔══════════════════════════════════╗
║     📦 *CHUGA XMD REPO* 📦       ║
╠══════════════════════════════════╣
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
║  ┃  ⚡ *THE ULTIMATE BOT*   ║
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
╠══════════════════════════════════╣
║  🔗 *GITHUB REPOSITORY*          ║
║  https://github.com/             ║
║  chugastanchugaman-lgtm/        ║
║  CHUGA-XMD                      ║
╠══════════════════════════════════╣
║  🔑 *PAIR CODE / SESSION*        ║
║  https://session-id-site-       ║
║  fycn.onrender.com              ║
╠══════════════════════════════════╣
║  📢 *CHANNEL SUPPORTER*          ║
║  https://whatsapp.com/channel/  ║
║  0029VatokI45EjxufALmY32X       ║
╠══════════════════════════════════╣
║  ✨ *FEATURES*                    ║
║  • Anti-Link  • Anti-Delete     ║
║  • Anti-Bug   • Anti-Call       ║
║  • Downloader • Sticker Maker   ║
║  • Group Mgmt • Welcome/Goodbye ║
╠══════════════════════════════════╣
║  > *CHUGA XMD* - Trusted Bot    ║
║  ⚡ Deploy now and enjoy!        ║
╚══════════════════════════════════╝
    `;

    await zk.sendMessage(dest, { 
      text: repoMessage,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363353854480831@newsletter",
          newsletterName: "CHUGA XMD CHANNEL",
          serverMessageId: 143
        },
        externalAdReply: {
          title: "⚡ CHUGA XMD REPO",
          body: "Deploy your own bot today!",
          thumbnailUrl: "https://files.catbox.moe/ety154.jpg",
          sourceUrl: "https://github.com/chugastanchugaman-lgtm/CHUGA-XMD",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: quotedMessage });
    
  }
);
