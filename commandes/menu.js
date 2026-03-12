"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const conf = require("../set");

zokou(
  { 
    nomCom: "menu", 
    catégorie: "General", 
    reaction: "🥰", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    const prefix = conf.PREFIXE || ".";
    const botName = conf.BOT || "CHUGA-XMD";
    const ownerName = conf.OWNER_NAME || "chugastan";
    const img = conf.URL || "https://files.catbox.moe/ety154.jpg";

    const menuMessage = `
╭━━━━━━━━━━━━━━━━━━━━━━╮
    🔥 *${botName} MENU* 🔥
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🤖 *BOT INFORMATION*
┃  ════════════════════
┃  📌 *Name:* ${botName}
┃  👤 *Owner:* ${ownerName}
┃  📝 *Prefix:* ${prefix}
┃  💬 *Commands:* 50+
┃  📊 *Version:* 1.0.0
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  📂 *MAIN MENU*
┃  ════════════════════
┃
┃  ${prefix}menu - Show this menu
┃  ${prefix}repo - Repository info
┃  ${prefix}alive - Check if bot is alive
┃  ${prefix}ping - Bot response time
┃  ${prefix}owner - Contact owner
┃  ${prefix}support - Support group link
┃  ${prefix}info - Bot information
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🛠️ *ADMIN MENU*
┃  ════════════════════
┃
┃  ${prefix}group - Group settings
┃  ${prefix}kick @user - Remove user
┃  ${prefix}add @user - Add user
┃  ${prefix}promote @user - Make admin
┃  ${prefix}demote @user - Remove admin
┃  ${prefix}mute - Close group
┃  ${prefix}unmute - Open group
┃  ${prefix}tagall - Mention all
┃  ${prefix}hidetag - Hidden tag all
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🎮 *FUN MENU*
┃  ════════════════════
┃
┃  ${prefix}sticker - Create sticker
┃  ${prefix}toimg - Sticker to image
┃  ${prefix}quote - Random quote
┃  ${prefix}fact - Random fact
┃  ${prefix}joke - Random joke
┃  ${prefix}meme - Random meme
┃  ${prefix}tts - Text to speech
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  📥 *DOWNLOAD MENU*
┃  ════════════════════
┃
┃  ${prefix}play - Audio from YouTube
┃  ${prefix}video - Video from YouTube
┃  ${prefix}ytsearch - Search YouTube
┃  ${prefix}instagram - IG video/reel
┃  ${prefix}facebook - FB video
┃  ${prefix}tiktok - TikTok video/audio
┃  ${prefix}twitter - Twitter/X video
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🔧 *UTILITY MENU*
┃  ════════════════════
┃
┃  ${prefix}weather <city> - Weather info
┃  ${prefix}news - Latest news
┃  ${prefix}translate - Translate text
┃  ${prefix}define - Dictionary
┃  ${prefix}calc - Calculator
┃  ${prefix}qr - QR code maker
┃  ${prefix}readqr - Read QR code
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🔗 *IMPORTANT LINKS*
┃  ════════════════════
┃
┃  📢 *Channel:* 
┃  https://whatsapp.com/channel/0029VatokI45EjxufALmY32X
┃
┃  👥 *Support Group:*
┃  https://chat.whatsapp.com/DTnrZzULVtP5r0E9rhoFOj
┃
┃  📦 *Repository:*
┃  https://github.com/chugastanchugaman-lgtm/CHUGA-XMD
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  ⚡ *Powered by ${botName}*
┃  💫 *Total Commands:* 50+
┃  📱 *Type:* WhatsApp Bot
┃  ✨ *Status:* Active
╰━━━━━━━━━━━━━━━━━━━━━━╯

> *Thank you for using ${botName}!* 🚀
    `;

    await zk.sendMessage(dest, { 
      image: { url: img }, 
      caption: menuMessage 
    });
  }
);
