"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");
const conf = require("../set");

zokou(
  { 
    nomCom: "repo", 
    categorie: "General", 
    reaction: "⚡", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    const repoUrl = "https://github.com/chugastanchugaman-lgtm/CHUGA-XMD";
    const channelUrl = "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X";
    const imageUrl = conf.URL || "https://files.catbox.moe/ety154.jpg";
    const botName = conf.BOT || "CHUGA XMD";
    const prefix = conf.PREFIXE || ".";
    
    try {
      const response = await axios.get("https://api.github.com/repos/chugastanchugaman-lgtm/CHUGA-XMD");
      const data = response.data;

      const repoMessage = `
╔══════════════════════════╗
║     ⚡ *${botName}* ⚡
║     _GitHub Repository_
╚══════════════════════════╝

✦ ───────────────────── ✦

📋 *DETAILS*
▸ Name: CHUGA-XMD
▸ Owner: chugastan
▸ Language: JavaScript
▸ License: MIT
▸ Created: ${new Date(data.created_at).toLocaleDateString()}

✦ ───────────────────── ✦

📊 *STATISTICS*
▸ ⭐ Stars: ${data.stargazers_count || 0}
▸ 🍴 Forks: ${data.forks_count || 0}
▸ 👁️ Watchers: ${data.watchers_count || 0}
▸ 🔧 Issues: ${data.open_issues_count || 0}

✦ ───────────────────── ✦

📝 *DESCRIPTION*
${data.description || "Advanced WhatsApp Bot with many features"}

✦ ───────────────────── ✦

🔗 *CONNECT WITH US*
▸ 📎 GitHub: tap below
▸ 📢 Channel: tap below
▸ 👥 Support: @chugaxmd

✦ ───────────────────── ✦

⚡ *COMMANDS*
▸ ${prefix}menu  - Bot Menu
▸ ${prefix}ping  - Check Speed
▸ ${prefix}alive - Bot Status

✦ ───────────────────── ✦

⭐ *Show your support*
   Star this repository on GitHub!

🚀 *${botName}*
      `;

      await zk.sendMessage(dest, {
        image: { url: imageUrl },
        caption: repoMessage,
        contextInfo: {
          externalAdReply: {
            title: `⚡ ${botName}`,
            body: `⭐ ${data.stargazers_count || 0} Stars`,
            sourceUrl: repoUrl,
            thumbnailUrl: imageUrl,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });

    } catch (error) {
      await zk.sendMessage(dest, {
        image: { url: imageUrl },
        caption: `
╔══════════════════════════╗
║     ⚡ *${botName}* ⚡
║     _GitHub Repository_
╚══════════════════════════╝

✦ ───────────────────── ✦

🔗 *LINKS*
▸ 📎 GitHub: ${repoUrl}
▸ 📢 Channel: ${channelUrl}

✦ ───────────────────── ✦

🚀 *${botName}*
        `,
        contextInfo: {
          externalAdReply: {
            title: `⚡ ${botName}`,
            body: "Click to visit GitHub",
            sourceUrl: repoUrl,
            thumbnailUrl: imageUrl
          }
        }
      });
    }
  }
);
