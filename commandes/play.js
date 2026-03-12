const { zokou } = require('../framework/zokou');
const axios = require('axios');
const yts = require('yt-search');

zokou({ 
    nomCom: "play", 
    reaction: "🎵", 
    categorie: "Music",
    desc: "Download music with style"
}, async (dest, zk, commandeOptions) => {
    const { arg, ms, repondre } = commandeOptions;
    const from = dest;

    // Your Channel Info
    const channelJid = "120363353854480831@newsletter";
    const channelLink = "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X";
    const imageUrl = "https://files.catbox.moe/ety154.jpg";

    if (!arg || arg.length === 0) {
        const usageMsg = `╭━━━ *『 CHUGA MUSIC 』* ━━━╮
┃
┃ 🎵 *How to use the play command*
┃
┃ 📝 *Example:* 
┃ └─ .play Diamond Inama
┃
┃ ✨ *Features:*
┃ • High quality audio
┃ • Fast download
┃ • Channel preview
┃
┃ 📢 *Join our channel*
┃ 🔗 ${channelLink}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
_Powered by 𝐂𝐇𝐔𝐆𝐀 𝐗𝐌𝐃_`;
        
        return await zk.sendMessage(from, { 
            text: usageMsg,
            contextInfo: {
                externalAdReply: {
                    title: "CHUGA XMD MUSIC",
                    body: "Click to join channel",
                    thumbnailUrl: imageUrl,
                    mediaType: 1,
                    sourceUrl: channelLink,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: ms });
    }

    try {
        const query = arg.join(" ");
        
        // Stylish searching message
        const searchingMsg = `╭━━━ *『 SEARCHING 』* ━━━╮
┃
┃ 🔍 *Searching for:* 
┃ ${query}
┃
┃ ⏳ *Please wait...*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

        await zk.sendMessage(from, { text: searchingMsg }, { quoted: ms });

        // Search YouTube
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            const notFoundMsg = `╭━━━ *『 ERROR 』* ━━━╮
┃
┃ ❌ *Song not found!*
┃
┃ 📝 *Try:*
┃ • Different spelling
┃ • Artist name + song
┃ • More specific keywords
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

            return await zk.sendMessage(from, { text: notFoundMsg }, { quoted: ms });
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const videoDuration = video.timestamp;
        const videoChannel = video.author.name;
        const videoThumb = video.thumbnail;
        const videoViews = video.views?.toLocaleString() || 'N/A';

        // Send song info with beautiful design
        const infoMsg = `╭━━━ *『 CHUGA XMD MUSIC 』* ━━━╮
┃
┃ 🎵 *Title:* ${videoTitle}
┃ ⏱️ *Duration:* ${videoDuration}
┃ 👤 *Channel:* ${videoChannel}
┃ 👁️ *Views:* ${videoViews}
┃
┃ ⏳ *Downloading audio...*
┃
┃ 📢 *Join our channel*
┃ 🔗 ${channelLink}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
_Powered by CHUGA-XMD_`;

        await zk.sendMessage(from, {
            image: { url: videoThumb },
            caption: infoMsg,
            contextInfo: {
                externalAdReply: {
                    title: videoTitle.substring(0, 30),
                    body: "🎵 Downloading...",
                    thumbnailUrl: videoThumb,
                    mediaType: 1,
                    sourceUrl: videoUrl,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: ms });

        // Try multiple APIs for reliability
        let downloadUrl = null;
        let apiErrors = [];

        // API 1: Your David Cyril API
        try {
            const api1Url = `https://apiziaul.vercel.app/api/downloader/ytplaymp3?query=${encodeURIComponent(videoUrl)}`;
            const { data } = await axios.get(api1Url, { timeout: 10000 });
            if (data?.success && data?.result?.download_url) {
                downloadUrl = data.result.download_url;
            }
        } catch (e) {
            apiErrors.push(`API 1 failed`);
        }

        // API 2: Diioffc (backup)
        if (!downloadUrl) {
            try {
                const api2Url = `https://api.diioffc.web.id/api/download/yt?url=${encodeURIComponent(videoUrl)}&type=audio`;
                const { data } = await axios.get(api2Url, { timeout: 10000 });
                if (data?.result?.download) {
                    downloadUrl = data.result.download;
                }
            } catch (e) {
                apiErrors.push(`API 2 failed`);
            }
        }

        // API 3: Akurath (backup)
        if (!downloadUrl) {
            try {
                const api3Url = `https://api.akurath.com/download/yt?url=${encodeURIComponent(videoUrl)}&type=audio`;
                const { data } = await axios.get(api3Url, { timeout: 10000 });
                if (data?.url) {
                    downloadUrl = data.url;
                }
            } catch (e) {
                apiErrors.push(`API 3 failed`);
            }
        }

        if (!downloadUrl) {
            const errorMsg = `╭━━━ *『 DOWNLOAD FAILED 』* ━━━╮
┃
┃ ❌ *Could not download audio*
┃
┃ 🔗 *YouTube Link:*
┃ ${videoUrl}
┃
┃ 📝 *Try downloading manually*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

            return await zk.sendMessage(from, { text: errorMsg }, { quoted: ms });
        }

        // Send audio with beautiful context
        const sendingMsg = `╭━━━ *『 SENDING AUDIO 』* ━━━╮
┃
┃ 📤 *Uploading to WhatsApp...*
┃
┃ 🎵 *${videoTitle.substring(0, 25)}...*
┃ ⏱️ *Duration:* ${videoDuration}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

        await zk.sendMessage(from, { text: sendingMsg }, { quoted: ms });

        // Send Audio with Channel Preview
        await zk.sendMessage(from, {
            audio: { url: downloadUrl },
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: channelJid,
                    serverMessageId: Date.now(),
                    newsletterName: "ʀᴀʜᴍᴀɴ-ᴀɪ ᴍᴜsɪᴄ",
                },
                externalAdReply: {
                    title: videoTitle.substring(0, 30),
                    body: `🎵 ${videoDuration} • ${videoChannel.substring(0, 15)}`,
                    thumbnailUrl: imageUrl,
                    mediaType: 1,
                    sourceUrl: channelLink,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: ms });

        // Success message
        const successMsg = `╭━━━ *『 SUCCESS 』* ━━━╮
┃
┃ ✅ *Audio sent successfully!*
┃
┃ 🎵 *Title:* ${videoTitle.substring(0, 30)}
┃ ⏱️ *Duration:* ${videoDuration}
┃
┃ 📢 *Join our channel*
┃ 🔗 ${channelLink}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
_Powered by CHUGA-XMD_`;

        await zk.sendMessage(from, { text: successMsg }, { quoted: ms });
        console.log(`✅ Play command completed: ${videoTitle}`);

    } catch (err) {
        console.error("❌ Play Error:", err);
        
        const errorMsg = `╭━━━ *『 ERROR 』* ━━━╮
┃
┃ ❌ *An error occurred*
┃
┃ 📝 *Details:* ${err.message.substring(0, 50)}
┃
┃ 🔄 *Please try again later*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
_Powered by CHUGA-XMD_`;

        await zk.sendMessage(from, { text: errorMsg }, { quoted: ms });
    }
});
