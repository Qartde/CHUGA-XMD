"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");
const conf = require("../set");

zokou(
  { 
    nomCom: "repo", 
    categorie: "General", 
    reaction: "📁", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    try {
      const response = await axios.get("https://api.github.com/repos/chugastan/CHUGA-XMD");
      const data = response.data;
      const repoUrl = "https://github.com/chugastanchugaman-lgtm/CHUGA-XMD";
      const channelUrl = "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X";

      const repoMessage = `
╭══════════════════════╮
┃  🔥 *CHUGA-XMD REPO* 🔥
╰══════════════════════╯

┌─── *INFORMATION* ───┐
│ 👤 *Owner:* ${data.owner?.login || 'chugastan'}
│ ⭐ *Stars:* ${data.stargazers_count || 0}
│ 🍴 *Forks:* ${data.forks_count || 0}
│ 📅 *Updated:* ${new Date(data.updated_at).toLocaleDateString()}
└────────────────────┘

┌─── *LINKS* ───┐
│ 📎 *GitHub:* ${repoUrl}
│ 📢 *Channel:* ${channelUrl}
└────────────────────┘

> *⭐ Star the repo!*
> *${conf.BOT || 'CHUGA-XMD'}* 🚀
      `;

      await zk.sendMessage(dest, { 
        image: { url: conf.URL || "https://files.catbox.moe/ety154.jpg" }, 
        caption: repoMessage,
        contextInfo: {
          externalAdReply: {
            title: "⭐ CHUGA-XMD REPO",
            body: `Stars: ${data.stargazers_count || 0} | Forks: ${data.forks_count || 0}`,
            thumbnailUrl: conf.URL || "https://files.catbox.moe/ety154.jpg",
            mediaType: 1,
            sourceUrl: repoUrl,
            showAdAttribution: true
          }
        }
      });

    } catch (error) {
      const repoUrl = "https://github.com/chugastanchugaman-lgtm/CHUGA-XMD";
      
      await zk.sendMessage(dest, { 
        image: { url: conf.URL || "https://files.catbox.moe/ety154.jpg" },
        caption: `╭══════════════════════╮
┃  🔥 *CHUGA-XMD REPO* 🔥
╰══════════════════════╯

┌─── *ERROR* ───┐
│ ❌ GitHub API error
│ 🔗 *Direct Link:* 
│ ${repoUrl}
└────────────────────┘

> *${conf.BOT || 'CHUGA-XMD'}* 🚀`,
        contextInfo: {
          externalAdReply: {
            title: "📁 CHUGA-XMD REPO",
            body: "Click to visit GitHub",
            thumbnailUrl: conf.URL || "https://files.catbox.moe/ety154.jpg",
            mediaType: 1,
            sourceUrl: repoUrl,
            showAdAttribution: true
          }
        }
      });
    }
  }
);
