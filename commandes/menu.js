"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const conf = require("../set");

zokou(
  { 
    nomCom: "menu", 
    categorie: "General", 
    reaction: "📋", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    const prefix = conf.PREFIXE || ".";
    const botName = conf.BOT || "CHUGA-XMD";
    const owner = conf.OWNER_NAME || "chugastan";
    const repoUrl = "https://github.com/chugastan/CHUGA-XMD";
    const channelUrl = "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X";
    const imageUrl = conf.URL || "https://files.catbox.moe/ety154.jpg";

    const menuMessage = `
╭══════════════════════╮
┃  🔥 *${botName} MENU* 🔥
╰══════════════════════╯

┌─── *INFO* ───┐
│ 🤖 *Bot:* ${botName}
│ 👤 *Owner:* ${owner}
│ 📝 *Prefix:* ${prefix}
└──────────────┘

┌─── *COMMANDS* ───┐
│ ${prefix}menu  - Menu
│ ${prefix}ping  - Speed
│ ${prefix}repo  - Repo
│ ${prefix}alive - Status
│ ${prefix}owner - Owner
└──────────────────┘

┌─── *LINKS* ───┐
│ 📎 *Repo:* ${repoUrl}
│ 📢 *Channel:* ${channelUrl}
└────────────────┘

> *${botName}* ⚡
    `;

    await zk.sendMessage(dest, {
      image: { url: imageUrl },
      caption: menuMessage,
      contextInfo: {
        externalAdReply: {
          title: `📋 ${botName} MENU`,
          body: `Prefix: ${prefix} | Owner: ${owner}`,
          thumbnailUrl: imageUrl,
          mediaType: 1,
          sourceUrl: channelUrl,
          showAdAttribution: true
        }
      }
    });
  }
);
