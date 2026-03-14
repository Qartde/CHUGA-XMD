"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const conf = require("../set");
const moment = require("moment-timezone");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

moment.tz.setDefault("Africa/Nairobi");

zokou(
  { 
    nomCom: "menu", 
    reaction: "🔥",
    categorie: "General",
    nomFichier: __filename
  },
  async (dest, zk, commandeOptions) => {
    
    let { ms: quotedMessage, repondre, prefixe, mybotpic } = commandeOptions;
    let { cm } = require("../framework/zokou");
    
    // Organize commands by category
    var categories = {};
    
    cm.map(async (command) => {
        if (!categories[command.categorie]) {
            categories[command.categorie] = [];
        }
        categories[command.categorie].push(command.nomCom);
    });
    
    // Get current time and date
    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");
    const day = moment().format("dddd");
    
    // Random decoration elements
    const decorations = ["▰▰▰▰▰", "◉◉◉◉◉", "━━━━━", "▒▒▒▒▒", "▓▓▓▓▓"];
    const randomDeco = decorations[Math.floor(Math.random() * decorations.length)];
    
    // Header message - different style
    let headerMessage = `
┏━━━━━━━━━━━━━━━━━━┓
┃    🔥 CHUGA XMD 🔥
┃    ━━━━━━━━━━━━━━
┃  📅 ${date} (${day})
┃  ⏰ ${time}
┃  🎯 PREFIX: 「 ${prefixe} 」
┃  📊 COMMANDS: ${cm.length}
┗━━━━━━━━━━━━━━━━━━┛
    ` + readmore;
    
    // Build menu text with categories - unique design
    let menuText = "\n┏━━『 *MENU* 』━━┓\n";
    
    for (const category in categories) {
        menuText += `┃ ┏━━ *${category.toUpperCase()}* ━━┓\n`;
        for (const command of categories[category]) {
            menuText += `┃ ┃ ✦ ${command}\n`;
        }
        menuText += `┃ ┗━━━━━━━━━━━━┛\n`;
    }
    
    menuText += `┃\n┃ ${randomDeco}\n┃\n`;
    menuText += `┗━━━━━━━━━━━━━━━━━━┛\n\n`;
    menuText += `⚡ *CHUGA XMD* - WhatsApp Bot\n`;
    menuText += `📢 Channel: @CHUGA_XMD\n`;
    
    // Get bot profile picture
    var botpic = mybotpic();
    
    // Send menu with context info
    await zk.sendMessage(dest, {
        text: headerMessage + menuText,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363353854480831@newsletter",
                newsletterName: "🔥 CHUGA XMD",
                serverMessageId: 143
            },
            externalAdReply: {
                title: "🔥 CHUGA XMD BOT",
                body: `✨ ${date} ✨ ${time}`,
                thumbnailUrl: "https://files.catbox.moe/pkp993.jpg",
                sourceUrl: "https://github.com/chugastanchugaman-lgtm/CHUGA-XMD",
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: true
            }
        }
    }, { quoted: quotedMessage });
    
    // Optional: Send a random sticker or reaction
    await zk.sendMessage(dest, {
        text: "🔥 _Enjoy using CHUGA XMD!_"
    });
    
  }
);
