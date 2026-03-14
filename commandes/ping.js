"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const conf = require("../set");
const moment = require("moment-timezone");
const os = require("os");

// Set timezone
moment.tz.setDefault(conf.TZ || "Africa/Dar_es_Salaam");

zokou(
  { 
    nomCom: "ping", 
    reaction: "⚡", 
    nomFichier: __filename,
    categorie: "General"
  },
  async (dest, zk, commandeOptions) => {
    
    const { ms: quotedMessage, repondre } = commandeOptions;
    const start = Date.now();
    
    // Send composing presence
    await zk.sendPresenceUpdate("composing", dest);
    
    // Send initial message to measure ping
    const sentMessage = await zk.sendMessage(dest, { 
      text: "⏳ *CHUGA XMD* measuring ping..." 
    });
    
    const end = Date.now();
    const ping = end - start; // Actual ping

    // Get time and date
    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");
    const day = moment().format("dddd"); // Day name
    
    // System stats
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
    
    const memory = process.memoryUsage();
    const memoryUsed = (memory.heapUsed / 1024 / 1024).toFixed(2);
    const memoryTotal = (memory.heapTotal / 1024 / 1024).toFixed(2);
    const memoryPercent = ((memory.heapUsed / memory.heapTotal) * 100).toFixed(1);
    
    const cpuCores = os.cpus().length;
    const platform = os.platform();
    const hostname = os.hostname();
    const arch = os.arch();
    
    // Random number (luck)
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    
    // Speed emoji based on ping
    const speedEmoji = ping < 200 ? "⚡🚀" : ping < 400 ? "⚡👍" : ping < 600 ? "🐢" : "🐌💤";
    
    // System status emoji
    const statusEmoji = memoryPercent < 70 ? "✅" : memoryPercent < 90 ? "⚠️" : "🔴";
    
    // Enhanced ping message in English
    const pingMessage = `
╔══════════════════════════════════╗
║     ⚡ *C H U G A  X M D* ⚡     
║     ✦ *BOT PERFORMANCE* ✦
╠══════════════════════════════════╣
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
║  ┃  ⏱️ *PING* : *${ping}ms* ${speedEmoji}
║  ┃  🎲 *LUCK* : ${randomNumber}
║  ┃  📊 *STATUS* : ${ping < 400 ? "FAST" : "SLOW"}
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
╠══════════════════════════════════╣
║  ⏰ *TIME*   : ${time}
║  📅 *DATE*   : ${date} (${day})
║  🌍 *TIMEZONE* : ${conf.TZ || "Africa/Dar_es_Salaam"}
╠══════════════════════════════════╣
║  💻 *SYSTEM INFO* :
║  ⚙️ *CPU* : ${cpuCores} Core(s) (${arch})
║  💾 *RAM* : ${memoryUsed}MB / ${memoryTotal}MB ${statusEmoji} (${memoryPercent}%)
║  🔋 *UPTIME* : ${uptimeString}
║  🖥️ *PLATFORM* : ${platform} (${hostname})
╠══════════════════════════════════╣
║  📱 *BOT INFO* :
║  📦 *VERSION* : 2.0.0
║  👤 *OWNER* : Chuga Stan
╠══════════════════════════════════╣
║  🔗 *CHANNEL* :
║  https://whatsapp.com/channel/0029VatokI45EjxufALmY32X
║
║  📦 *GITHUB* :
║  https://github.com/chugastanchugaman-lgtm/CHUGA-XMD
╠══════════════════════════════════╣
║  ✦ *POWERED BY CHUGA-XMD* ✦
║  ⚡ ${ping}ms • 🎲 ${randomNumber} • 💾 ${memoryUsed}MB
╚══════════════════════════════════╝

> *CHUGA-XMD* is measuring your internet speed ⚡
    `;

    const imageUrl = conf.URL || "https://files.catbox.moe/ety154.jpg";
    
    // Send welcome audio (if available)
    try {
        await zk.sendMessage(dest, {
            audio: { url: "https://files.catbox.moe/uv6fb5.mp3" },
            mimetype: "audio/mp4",
            ptt: true
        });
    } catch (e) {
        // Continue even if audio fails
    }

    // Delete the measuring message
    await zk.sendMessage(dest, { delete: sentMessage.key });

    // Send final message with image and full details
    await zk.sendMessage(dest, { 
      image: { url: imageUrl },
      caption: pingMessage,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363353854480831@newsletter",
          newsletterName: "CHUGA XMD CHANNEL",
          serverMessageId: 143
        },
        externalAdReply: {
          title: "⚡ CHUGA-XMD PING",
          body: `⚡ ${ping}ms • 🎲 ${randomNumber} • 📊 ${memoryUsed}MB`,
          sourceUrl: "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X",
          mediaType: 1,
          thumbnailUrl: imageUrl,
          renderSmallThumbnail: true,
          showAdAttribution: true
        }
      }
    });
    
    // Send confirmation message
    await zk.sendMessage(dest, { 
      text: `✅ *Ping completed!* ⚡ *${ping}ms* | 🎲 *${randomNumber}*`
    });
    
    // Optional: Send performance reaction
    if (ping < 200) {
        await zk.sendMessage(dest, { 
          text: "🚀 *Excellent speed!* Your connection is lightning fast!"
        });
    } else if (ping < 400) {
        await zk.sendMessage(dest, { 
          text: "👍 *Good speed!* Connection is stable."
        });
    } else {
        await zk.sendMessage(dest, { 
          text: "🐢 *Slow speed detected!* Check your internet connection."
        });
    }
    
  }
);
