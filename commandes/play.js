"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");

// API configuration
const API_KEY = "gifted";
const BASE_URL = "https://api.giftedtech.co.ke/api/download";

zokou(
    { 
        nomCom: "play", 
        reaction: "🎵", 
        nomFichier: __filename,
        categorie: "Download"
    },
    async (dest, zk, commandeOptions) => {
        
        const { arg, ms, repondre, superUser } = commandeOptions;
        const from = dest;
        
        // Check if URL provided
        if (!arg || arg.length === 0) {
            return repondre(`🎵 *CHUGA XMD MUSIC DOWNLOADER* 🎵

*Usage:*
• *.play <youtube_url>* - Download audio (MP3)
• *.video <youtube_url>* - Download video (MP4)

*Examples:*
• *.play https://youtu.be/xxxxx*
• *.video https://youtu.be/xxxxx*

*Note:* Send the link directly after the command.`);
        }

        const url = arg[0];
        
        // Validate YouTube URL
        const youtubeRegex = /(youtube\.com|youtu\.be)/;
        if (!youtubeRegex.test(url)) {
            return repondre("❌ *Invalid URL!*\n\nPlease send a valid YouTube link.\n\nExample: https://youtu.be/xxxxx");
        }

        // Send processing message
        const processingMsg = await zk.sendMessage(from, { 
            text: "⏳ *CHUGA XMD is processing your request...*\n\n📥 Fetching media from YouTube..." 
        }, { quoted: ms });

        try {
            // Determine type based on command
            const commandType = ms.message?.extendedTextMessage?.text?.split(" ")[0] || "play";
            const isVideo = commandType === ".video";
            const type = isVideo ? "ytmp4" : "ytmp3";
            
            // API URL
            const apiUrl = `${BASE_URL}/${type}?apikey=${API_KEY}&url=${encodeURIComponent(url)}`;
            
            console.log(`[CHUGA XMD] Fetching ${type} from: ${url}`);
            
            // Make API request
            const response = await axios.get(apiUrl, { timeout: 30000 });
            
            // Delete processing message
            await zk.sendMessage(from, { delete: processingMsg.key });
            
            // Check API response
            if (response.data && response.data.status === 200) {
                const result = response.data.result;
                const title = result.title || "Unknown Title";
                const duration = result.duration || "Unknown";
                const size = result.size || "Unknown";
                const downloadUrl = result.download_url || result.url;
                
                if (!downloadUrl) {
                    throw new Error("No download URL received");
                }
                
                // Send info message
                const infoMsg = `🎵 *CHUGA XMD MUSIC* 🎵

📌 *Title:* ${title}
⏱️ *Duration:* ${duration}
📦 *Size:* ${size}
🎯 *Type:* ${type.toUpperCase()}

⏳ *Uploading media...*`;
                
                await zk.sendMessage(from, { text: infoMsg }, { quoted: ms });
                
                // Download media
                const mediaResponse = await axios.get(downloadUrl, { 
                    responseType: "arraybuffer",
                    timeout: 60000
                });
                
                const mediaBuffer = Buffer.from(mediaResponse.data);
                
                // Send media
                if (type === "ytmp3") {
                    await zk.sendMessage(from, {
                        audio: mediaBuffer,
                        mimetype: "audio/mpeg",
                        ptt: false,
                        fileName: `${title}.mp3`,
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: "120363353854480831@newsletter",
                                newsletterName: "CHUGA XMD",
                                serverMessageId: 143
                            },
                            externalAdReply: {
                                title: "🎵 CHUGA XMD MUSIC",
                                body: title.substring(0, 50),
                                thumbnailUrl: "https://files.catbox.moe/pkp993.jpg",
                                mediaType: 2,
                                renderLargerThumbnail: true
                            }
                        }
                    }, { quoted: ms });
                    
                } else {
                    await zk.sendMessage(from, {
                        video: mediaBuffer,
                        mimetype: "video/mp4",
                        fileName: `${title}.mp4`,
                        caption: `🎬 *CHUGA XMD VIDEO*\n\n📌 *Title:* ${title}\n⏱️ *Duration:* ${duration}`,
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: "120363353854480831@newsletter",
                                newsletterName: "CHUGA XMD",
                                serverMessageId: 143
                            }
                        }
                    }, { quoted: ms });
                }
                
                // Success message
                await zk.sendMessage(from, { 
                    text: `✅ *Download complete!*\n\n📌 ${title}\n🎯 Type: ${type.toUpperCase()}\n\nPowered by CHUGA XMD 🚀` 
                });
                
            } else {
                throw new Error(response.data?.message || "Invalid API response");
            }
            
        } catch (error) {
            console.error("[CHUGA XMD] Music Error:", error.message);
            
            // Delete processing message if exists
            try {
                await zk.sendMessage(from, { delete: processingMsg.key });
            } catch (e) {}
            
            // Error message
            let errorMsg = "❌ *Download Failed!*\n\n";
            
            if (error.message.includes("timeout")) {
                errorMsg += "Server timeout. Please try again later.";
            } else if (error.message.includes("403")) {
                errorMsg += "Access denied. The API key may be invalid or expired.\n\nTry alternative links or contact support.";
            } else if (error.message.includes("500")) {
                errorMsg += "Server error. The API is currently down.\n\nPlease try again later.";
            } else {
                errorMsg += "Unable to process your request.\n\nPossible reasons:\n• Invalid YouTube URL\n• Video is age-restricted\n• API is temporarily unavailable\n\nTry again with a different link.";
            }
            
            errorMsg += "\n\n_Channel:_ https://whatsapp.com/channel/0029VatokI45EjxufALmY32X";
            
            await zk.sendMessage(from, { text: errorMsg }, { quoted: ms });
        }
    }
);

// Alias for video command
zokou(
    { 
        nomCom: "video", 
        reaction: "🎬", 
        nomFichier: __filename,
        categorie: "Download"
    },
    async (dest, zk, commandeOptions) => {
        // This will use the same handler as play
        commandeOptions.ms.message.extendedTextMessage = commandeOptions.ms.message.extendedTextMessage || {};
        commandeOptions.ms.message.extendedTextMessage.text = ".video " + commandeOptions.arg?.join(" ");
        const { zokou: handler } = require("../framework/zokou");
        // Recursive call to play command
        const playCommand = global.commands?.find(c => c.nomCom === "play");
        if (playCommand && playCommand.func) {
            await playCommand.func(dest, zk, commandeOptions);
        }
    }
);
