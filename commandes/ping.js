"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const conf = require("../set");

zokou(
  { 
    nomCom: "ping", 
    reaction: "⚡", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    const start = Date.now();
    await zk.sendPresenceUpdate("composing", dest);
    const end = Date.now();
    const ping = end - start;

    // Speed emoji
    const speedEmoji = ping < 300 ? "⚡" : ping < 500 ? "👍" : "🐢";

    const pingMessage = `
╔══════════════════════════╗
║     ⚡ *CHUGA XMD BOT* ⚡
╠══════════════════════════╣
║  ┏━━━━━━━━━━━━━━━━━━┓
║  ┃  ██████████ 100%
║  ┃  ⏱️ *${ping}ms* ${speedEmoji}
║  ┗━━━━━━━━━━━━━━━━━━┛
╠══════════════════════════╣
║  🔗 *Join Our Channel*
║  https://whatsapp.com/channel/0029VatokI45EjxufALmY32X
║
║  📦 *GitHub Repo*
║  https://github.com/chugastanchugaman-lgtm/CHUGA-XMD
╚══════════════════════════╝

> *CHUGA-XMD* ⚡ ${ping}ms
    `;

    const imageUrl = conf.URL || "https://files.catbox.moe/ety154.jpg";

    await zk.sendMessage(dest, { 
      image: { url: imageUrl },
      caption: pingMessage,
      contextInfo: {
        externalAdReply: {
          title: "⚡ CHUGA-XMD PING",
          body: `${ping}ms - Click for channel`,
          sourceUrl: "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X",
          mediaType: 1,
          thumbnailUrl: imageUrl
        }
      }
    });
  }
);
