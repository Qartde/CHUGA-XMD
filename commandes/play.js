const { zokou } = require('../framework/zokou');
const axios = require('axios');
const yts = require('yt-search');

zokou({ 
  nomCom: "play", 
  reaction: "🎵", 
  categorie: "Download" 
}, async (dest, zk, commandeOptions) => {
  
  const { arg, ms, repondre } = commandeOptions;
  const from = dest;

  // CHUGA XMD Channel Info
  const channelJid = "120363353854480831@newsletter";
  const channelName = "𝐂𝐇𝐔𝐆𝐀 𝐗𝐌𝐃 𝐌𝐔𝐒𝐈𝐂";
  const imageUrl = "https://files.catbox.moe/ety154.jpg"; // Replace with your CHUGA XMD image

  if (!arg || arg.length === 0) {
    return await repondre(`╭══════════════════════╮
┃   🎵 *CHUGA PLAY* 🎵
╰══════════════════════╯

┌─── *USAGE* ───┐
│ Please provide a song name
│ 
│ 📝 *Example:*
│ .play Calm Down
│ .play Love Nwantiti
│ .play Someone Like You
└────────────────┘

> *CHUGA XMD* 🚀`);
  }

  try {
    const query = arg.join(" ");
    
    // Send searching message
    await zk.sendMessage(from, { 
      text: `╭══════════════════════╮
┃   🔍 *SEARCHING* 🔍
╰══════════════════════╯

┌─── *QUERY* ───┐
│ 🎵 *Song:* ${query}
│ ⏳ *Status:* Searching...
└────────────────┘

> *Please wait...* ⏱️`
    }, { quoted: ms });

    // Search YouTube for the video
    const search = await yts(query);
    const video = search.videos[0];

    if (!video) {
      return await repondre(`╭══════════════════════╮
┃   ❌ *NOT FOUND* ❌
╰══════════════════════╯

┌─── *ERROR* ───┐
│ Song *"${query}"*
│ was not found
│ 
│ 💡 *Try:*
│ • Check spelling
│ • Use different keywords
│ • Use artist name
└────────────────┘

> *CHUGA XMD* 🚀`);
    }

    // Get download URL
    const apiUrl = `https://api.davidcyriltech.my.id/ytplay?query=${encodeURIComponent(query)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.result?.downloadUrl) {
      return await repondre(`╭══════════════════════╮
┃   ❌ *DOWNLOAD FAILED* ❌
╰══════════════════════╯

┌─── *ERROR* ───┐
│ Could not fetch audio
│ Please try again later
└────────────────┘

> *CHUGA XMD* 🚀`);
    }

    const downloadUrl = data.result.downloadUrl;
    const title = data.result.title || video.title;
    const duration = video.timestamp || 'N/A';
    const views = video.views ? video.views.toLocaleString() : 'N/A';

    // Send audio with beautiful message
    await zk.sendMessage(from, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelJid,
          serverMessageId: Date.now(),
          newsletterName: channelName,
        },
        externalAdReply: {
          title: title.substring(0, 30),
          body: `${duration} • ${views} views`,
          thumbnailUrl: imageUrl,
          mediaType: 1,
          sourceUrl: `https://whatsapp.com/channel/${channelJid.split('@')[0]}`,
          renderLargerThumbnail: false,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });

    // Send success message
    await repondre(`╭══════════════════════╮
┃   ✅ *DOWNLOADED* ✅
╰══════════════════════╯

┌─── *SONG INFO* ───┐
│ 🎵 *Title:* ${title.substring(0, 30)}
│ ⏱️ *Duration:* ${duration}
│ 👁️ *Views:* ${views}
│ 📺 *Channel:* ${video.author?.name || 'Unknown'}
└────────────────────┘

┌─── *LINKS* ───┐
│ 📢 *Channel:* @${channelJid.split('@')[0]}
│ 🔗 *YouTube:* ${video.url}
└────────────────┘

> *Thanks for using CHUGA XMD!* 🎵`);

  } catch (err) {
    console.error("❌ Play Error:", err);
    await repondre(`╭══════════════════════╮
┃   ❌ *ERROR* ❌
╰══════════════════════╯

┌─── *DETAILS* ───┐
│ ${err.message.substring(0, 50)}
│ 
│ 💡 *Try again later*
└────────────────┘

> *CHUGA XMD* 🚀`);
  }
});
