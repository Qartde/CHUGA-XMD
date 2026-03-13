// CHUGA XMD BOT
// GOOD BYE 👋👋 
// REMOTE CONTROL 

const {
  zokou
} = require(__dirname + "/../framework/zokou");
const conf = require(__dirname + "/../set");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({
  'nomCom': "menu",
  'categorie': "General",
  'reaction': "📋"
}, async (_0x4a15e2, _0x1dcce7, _0x41b90d) => {
  
  let {
    ms: _0x455c6b,
    repondre: _0x275543,
    prefixe: _0x140f2f,
    nomAuteurMessage: _0x80a3f9,
    mybotpic: _0x1f21eb
  } = _0x41b90d;
  
  let {
    cm: _0x3a6838
  } = require(__dirname + "/../framework/zokou");
  
  var _0x24f019 = {};
  var _0x5c789f = "public";
  
  if (s.MODE.toLocaleLowerCase() != "yes") {
    _0x5c789f = "private";
  }
  
  // Group commands by category
  _0x3a6838.map(async (_0x358431, _0x3817aa) => {
    if (!_0x24f019[_0x358431.categorie]) {
      _0x24f019[_0x358431.categorie] = [];
    }
    _0x24f019[_0x358431.categorie].push(_0x358431.nomCom);
  });
  
  // Set timezone
  moment.tz.setDefault("Africa/Nairobi");
  const _0x41991f = moment().format("HH:mm:ss");
  const _0x59347f = moment().format("DD/MM/YYYY");
  
  // Header information
  let _0x27d95e = `
╭━━━━━━━━━━━━━━━━━━━━╮
┃   🔥 *CHUGA XMD* 🔥
╰━━━━━━━━━━━━━━━━━━━━╯

┌─── *BOT INFO* ───┐
│ 📅 *Date:* ${_0x59347f}
│ ⏰ *Time:* ${_0x41991f}
│ 📝 *Prefix:* [ ${_0x140f2f} ]
│ 📊 *Commands:* ${_0x3a6838.length}
│ 🔒 *Mode:* ${_0x5c789f}
└──────────────────┘

> *Powered by CHUGA XMD*
${readmore}`;

  // Build commands list by category
  let _0x43bd3c = "";
  
  for (const _0x2b1cb3 in _0x24f019) {
    _0x43bd3c += `\n┌─── *${_0x2b1cb3.toUpperCase()}* ───┐\n`;
    
    for (const _0x4963dc of _0x24f019[_0x2b1cb3]) {
      _0x43bd3c += `│ ${_0x140f2f}${_0x4963dc}\n`;
    }
    
    _0x43bd3c += `└────────────────────┘\n`;
  }
  
  _0x43bd3c += `\n> *CHUGA XMD* 🚀`;
  
  // Get bot image
  var _0x5c0ca0 = _0x1f21eb();
  const channelUrl = "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X";
  const channelJid = "120363353854480831@newsletter";
  const channelName = "𝐂𝐇𝐔𝐆𝐀 𝐗𝐌𝐃";
  const thumbnailUrl = "https://files.catbox.moe/ety154.jpg";
  
  // Send menu based on media type
  if (_0x5c0ca0.match(/\.(mp4|gif)$/i)) {
    try {
      await _0x1dcce7.sendMessage(_0x4a15e2, {
        'video': { 'url': _0x5c0ca0 },
        'caption': _0x27d95e + _0x43bd3c,
        'contextInfo': {
          'forwardingScore': 999,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': channelJid,
            'newsletterName': channelName,
            'serverMessageId': 143
          },
          'externalAdReply': {
            'title': "🌟 CHUGA XMD MENU",
            'body': `Total: ${_0x3a6838.length} commands`,
            'thumbnailUrl': thumbnailUrl,
            'sourceUrl': channelUrl,
            'mediaType': 1,
            'renderLargerThumbnail': true,
            'showAdAttribution': true
          }
        }
      }, {
        'quoted': _0x455c6b
      });
    } catch (_0x288f7f) {
      console.log("Menu error: " + _0x288f7f);
      _0x275543("Menu error: " + _0x288f7f);
    }
  } else if (_0x5c0ca0.match(/\.(jpeg|png|jpg)$/i)) {
    try {
      await _0x1dcce7.sendMessage(_0x4a15e2, {
        'image': { 'url': _0x5c0ca0 },
        'caption': _0x27d95e + _0x43bd3c,
        'contextInfo': {
          'forwardingScore': 999,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': channelJid,
            'newsletterName': channelName,
            'serverMessageId': 143
          },
          'externalAdReply': {
            'title': "🌟 CHUGA XMD MENU",
            'body': `Total: ${_0x3a6838.length} commands`,
            'thumbnailUrl': thumbnailUrl,
            'sourceUrl': channelUrl,
            'mediaType': 1,
            'renderLargerThumbnail': true,
            'showAdAttribution': true
          }
        }
      }, {
        'quoted': _0x455c6b
      });
    } catch (_0x2cfea0) {
      console.log("Menu error: " + _0x2cfea0);
      _0x275543("Menu error: " + _0x2cfea0);
    }
  } else {
    // Text only
    await _0x1dcce7.sendMessage(_0x4a15e2, {
      'text': _0x27d95e + _0x43bd3c,
      'contextInfo': {
        'forwardingScore': 999,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': channelJid,
          'newsletterName': channelName,
          'serverMessageId': 143
        },
        'externalAdReply': {
          'title': "🌟 CHUGA XMD MENU",
          'body': `Total: ${_0x3a6838.length} commands`,
          'thumbnailUrl': thumbnailUrl,
          'sourceUrl': channelUrl,
          'mediaType': 1,
          'renderLargerThumbnail': true,
          'showAdAttribution': true
        }
      }
    }, {
      'quoted': _0x455c6b
    });
  }
  
  // Send audio background (optional)
  const audioFiles = [
    "https://files.catbox.moe/2wonzj.mp3",
    "https://files.catbox.moe/aktbgo.mp3"
  ];
  
  const _0x3d8e96 = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  
  try {
    await _0x1dcce7.sendMessage(_0x4a15e2, {
      'audio': {
        'url': _0x3d8e96
      },
      'mimetype': "audio/mpeg",
      'ptt': true,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': channelJid,
          'newsletterName': channelName,
          'serverMessageId': 143
        },
        'forwardingScore': 999,
        'externalAdReply': {
          'title': "🎵 CHUGA XMD",
          'body': "Background Music",
          'mediaType': 1,
          'thumbnailUrl': thumbnailUrl,
          'sourceUrl': channelUrl,
          'showAdAttribution': true
        }
      }
    }, {
      'quoted': _0x455c6b
    });
  } catch (_0x81d5e8) {
    console.log("Audio error: " + _0x81d5e8);
  }
});
