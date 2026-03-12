"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou(
  { 
    nomCom: "repo", 
    catégorie: "Général", 
    reaction: "📁", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    const githubRepo = "https://api.github.com/repos/chugastan/CHUGA-XMD";
    const img = "https://files.catbox.moe/ety154.jpg";

    try {
      const response = await axios.get(githubRepo);
      const data = response.data;

      if (data) {
        const stars = data.stargazers_count || 0;
        const forks = data.forks_count || 0;
        const owner = data.owner?.login || "chugastan";
        const createdDate = new Date(data.created_at).toLocaleDateString("en-US");
        const updatedDate = new Date(data.updated_at).toLocaleDateString("en-US");

        const repoMessage = `
╭━━━━━━━━━━━━━━━━━━━━━━╮
    🔥 *CHUGA-XMD REPOSITORY* 🔥
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  📂 *INFORMATION*
┃  ════════════════════
┃  📌 *Owner:* ${owner}
┃  📅 *Created:* ${createdDate}
┃  🔄 *Last Update:* ${updatedDate}
┃  ⭐ *Stars:* ${stars}
┃  🍴 *Forks:* ${forks}
┃  📁 *Repository:* CHUGA-XMD
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🔗 *IMPORTANT LINKS*
┃  ════════════════════
┃  📎 *GitHub:* 
┃  ${data.html_url}
┃
┃  📢 *WhatsApp Channel:* 
┃  https://whatsapp.com/channel/0029VatokI45EjxufALmY32X
┃
┃  📢 *Channel 2:* 
┃  https://whatsapp.com/channel/0029Vb3eLRU3QxS5CZHI131x
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  ✨ *DESCRIPTION*
┃  ════════════════════
┃  ${data.description || "Multi-functional WhatsApp Bot with many features"}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  ⚡ *Powered by CHUGA-XMD*
┃  💫 *Version:* 1.0.0
┃  📱 *Type:* WhatsApp Bot
╰━━━━━━━━━━━━━━━━━━━━━━╯

> *Thank you for using CHUGA-XMD!* 🚀
        `;

        await zk.sendMessage(dest, { 
          image: { url: img }, 
          caption: repoMessage 
        });
      }
    } catch (error) {
      console.log("Repo error:", error.message);
      
      // Fallback message if API fails
      const fallbackMessage = `
╭━━━━━━━━━━━━━━━━━━━━━━╮
    🔥 *CHUGA-XMD REPOSITORY* 🔥
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  📂 *INFORMATION*
┃  ════════════════════
┃  📌 *Owner:* chugastan
┃  📅 *Created:* 01/01/2024
┃  🔄 *Last Update:* 12/03/2025
┃  ⭐ *Stars:* ★★★★★
┃  🍴 *Forks:* ∞
┃  📁 *Repository:* CHUGA-XMD
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🔗 *IMPORTANT LINKS*
┃  ════════════════════
┃  📎 *GitHub:* 
┃  https://github.com/chugastanchugaman-lgtm/CHUGA-XMD
┃
┃  📢 *WhatsApp Channel:* 
┃  https://whatsapp.com/channel/0029VatokI45EjxufALmY32X
┃
┃  📢 *Channel 2:* 
┃  https://whatsapp.com/channel/0029Vb3eLRU3QxS5CZHI131x
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  ✨ *DESCRIPTION*
┃  ════════════════════
┃  Multi-functional WhatsApp Bot with 
┃  many features and commands
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  ⚡ *Powered by CHUGA-XMD*
┃  💫 *Version:* 1.0.0
┃  📱 *Type:* WhatsApp Bot
╰━━━━━━━━━━━━━━━━━━━━━━╯

> *Thank you for using CHUGA-XMD!* 🚀
      `;

      await zk.sendMessage(dest, { 
        image: { url: img }, 
        caption: fallbackMessage 
      });
    }
  }
);
