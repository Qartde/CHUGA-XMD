"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const set = require("../set");

moment.tz.setDefault(set.TZ || "Africa/Nairobi");

zokou(
  { 
    nomCom: "ping", 
    reaction: "⚡", 
    nomFichier: __filename,
    categorie: "General"
  },
  async (dest, zk, commandeOptions) => {
    
    let { ms: quotedMessage } = commandeOptions;
    const start = Date.now();
    
    await zk.sendPresenceUpdate("composing", dest);
    const sentMessage = await zk.sendMessage(dest, { text: "⚡ _CHUGA XMD inapima ping..._" });
    
    const end = Date.now();
    const ping = end - start;
    
    // Colors and status based on ping speed
    let speedColor, speedText, speedEmoji;
    if (ping < 200) {
        speedColor = "🟢";
        speedText = "EXCELLENT";
        speedEmoji = "🚀";
    } else if (ping < 400) {
        speedColor = "🟢";
        speedText = "VERY GOOD";
        speedEmoji = "⚡";
    } else if (ping < 600) {
        speedColor = "🟡";
        speedText = "GOOD";
        speedEmoji = "👍";
    } else if (ping < 800) {
        speedColor = "🟠";
        speedText = "AVERAGE";
        speedEmoji = "🐢";
    } else {
        speedColor = "🔴";
        speedText = "POOR";
        speedEmoji = "🐌";
    }
    
    // Progress bar
    const barLength = 15;
    const filledBars = Math.min(Math.floor((ping / 1000) * barLength), barLength);
    const emptyBars = barLength - filledBars;
    const progressBar = "▰".repeat(filledBars) + "▱".repeat(emptyBars);
    
    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");
    const day = moment().format("dddd");
    
    // Random number
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    
    // Bot stats
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const uptimeString = `${hours}h ${minutes}m`;
    
    const pingMessage = `
╔══════════════════════════════════╗
║        ⚡ *CHUGA XMD* ⚡         ║
║     *Ping Results & Status*      ║
╠══════════════════════════════════╣
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
║  ┃  📊 *PING* : ${ping}ms ${speedEmoji}
║  ┃  ${speedColor} *STATUS* : ${speedText}
║  ┃  🎲 *LUCK* : ${randomNumber}
║  ┃  📶 *NETWORK* : ${progressBar}
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
╠══════════════════════════════════╣
║  ⏰ *TIME*  : ${time}
║  📅 *DATE*  : ${date} (${day})
║  ⚙️ *UPTIME* : ${uptimeString}
╠══════════════════════════════════╣
║  🔗 *CHANNEL*                     ║
║  https://whatsapp.com/channel/    ║
║ 0029VatokI45EjxufALmY32X         ║
║                                   ║
║  📦 *GITHUB*                      ║
║  https://github.com/              ║
║ chugastanchugaman-lgtm/CHUGA-XMD ║
╠══════════════════════════════════╣
║  ✦ *POWERED BY CHUGA XMD* ✦      ║
║     ⚡ ${ping}ms • 🎲 ${randomNumber}      ║
╚══════════════════════════════════╝

> _CHUGA XMD - Your Trusted WhatsApp Bot_
    `;

    try {
        // Send audio
        await zk.sendMessage(dest, {
            audio: { url: "https://files.catbox.moe/uv6fb5.mp3" },
            mimetype: "audio/mp4",
            ptt: true
        });
    } catch (e) {
        // Skip if audio fails
    }

    // Delete measuring message
    await zk.sendMessage(dest, { delete: sentMessage.key });

    // Send final message with context info
    await zk.sendMessage(
        dest, 
        {
            text: pingMessage,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363353854480831@newsletter",
                    newsletterName: "CHUGA XMD CHANNEL",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "⚡ CHUGA XMD PING",
                    body: `${ping}ms • ${speedText} • 🎲 ${randomNumber}`,
                    thumbnailUrl: "https://files.catbox.moe/ety154.jpg",
                    mediaType: 1,
                    renderSmallThumbnail: true,
                    showAdAttribution: true
                }
            }
        },
        { quoted: quotedMessage }
    );
    
    // Send performance tip based on ping
    if (ping < 200) {
        await zk.sendMessage(dest, { 
            text: "🚀 *Excellent connection!* Your internet is very fast." 
        });
    } else if (ping > 800) {
        await zk.sendMessage(dest, { 
            text: "🐌 *Slow connection detected.* Consider checking your network." 
        });
    }
  }
);
