"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou(
  { 
    nomCom: "repo", 
    catégorie: "Général", 
    reaction: "✅", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    const githubRepo = "https://api.github.com/repos/chugastan/CHUGA-XMD";
    const img = "https://files.catbox.moe/ety154.jpg";

    try {
      const response = await axios.get(githubRepo);
      const data = response.data;

      if (data) {
        const repoInfo = {
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          lastUpdate: data.updated_at,
          owner: data.owner?.login || "chugastan",
        };

        const releaseDate = new Date(data.created_at).toLocaleDateString("en-GB");
        const lastUpdateDate = new Date(data.updated_at).toLocaleDateString("en-GB");

        const gitdata = `
╔══════════════════════════════❀
         *✅ Welcome to 𝐂𝐇𝐔𝐆𝐀 𝐗𝐌𝐃 ✅*
     📣 *Support our channel:* [WhatsApp Channel](https://whatsapp.com/channel/0029VatokI45EjxufALmY32X)
     
     *Channel 2:* 
     https://whatsapp.com/channel/0029Vb3eLRU3QxS5CZHI131x
╚══════════════════════════════❀

╔══*📊 Repository Information*══╗
🔗 *Repository Link:* ${data.html_url}
📅 *Last Updated:* ${lastUpdateDate}
⭐️ *Stars:* ${repoInfo.stars}
🍴 *Forks:* ${repoInfo.forks}
📆 *Release Date:* ${releaseDate}
👤 *Owner:* ${repoInfo.owner}
╚══════════════════════════════

         *🔥 𝑃𝑜𝑤𝑒𝑟𝑒𝑑 𝑏𝑦 𝐶𝐻𝑈𝐺𝐴 𝑋𝑀𝐷 🔥*
        `;

        await zk.sendMessage(dest, { 
          image: { url: img }, 
          caption: gitdata 
        });
      } else {
        await zk.sendMessage(dest, { 
          text: "❌ Could not fetch repository data. Please try again later." 
        });
      }
    } catch (error) {
      console.log("Error fetching repo data:", error.message);
      
      // Send fallback message if API fails
      await zk.sendMessage(dest, { 
        text: `╔══════════════════════════════❀
         *✅ Welcome to 𝐂𝐇𝐔𝐆𝐀 𝐗𝐌𝐃 ✅*
     📣 Support our channel: [WhatsApp Channel](https://whatsapp.com/channel/0029VatokI45EjxufALmY32X)
     
     *Channel 2*
     https://whatsapp.com/channel/0029Vb3eLRU3QxS5CZHI131x
╚══════════════════════════════❀

╔══*📊 Repository Information*══╗
🔗 *Repository Link:* https://github.com/chugastanchugaman-lgtm/CHUGA-XMD
📅 *Last Updated:* 2024
⭐️ *Stars:* ★ ★ ★ ★ ★
🍴 *Forks:* ∞
👤 *Owner:* chugastan
╚══════════════════════════════

         *🔥 𝑃𝑜𝑤𝑒𝑟𝑒𝑑 𝑏𝑦 𝐶𝐻𝑈𝐺𝐴 𝑋𝑀𝐷 🔥*`
      });
    }
  }
);
