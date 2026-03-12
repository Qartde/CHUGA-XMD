"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

zokou(
  { 
    nomCom: "ping", 
    reaction: "🌀", 
    nomFichier: __filename 
  },
  async (dest, zk, commandeOptions) => {
    
    const start = Date.now();
    await zk.sendMessage(dest, { text: "🌀 *System Analysis...*" });
    const end = Date.now();
    const ping = end - start;

    const pingMessage = `
┏━━━━━━━━━━━━━━━━━━━┓
┃   🔥 *NEON PING* 🔥
┗━━━━━━━━━━━━━━━━━━━┛

╔══════════════════════╗
║  ⏱️ *TIME*: ${ping}ms
║  ⚡ *WAVE*: ▰▰▰▰▰▰▰▰▰▰
║  📡 *SIGNAL*: ▰▰▰▰▰▰▰▰▰▰
║  🌐 *NETWORK*: ▰▰▰▰▰▰▰▰▰▰
╚══════════════════════╝

▰▰▰▰▰▰▰▰▰▰ 100% CONNECTED

✦ ──────────────────── ✦
   *CHUGA-XMD* ⚡ ${ping}ms
✦ ──────────────────── ✦
    `;

    await zk.sendMessage(dest, { text: pingMessage });
  }
);
