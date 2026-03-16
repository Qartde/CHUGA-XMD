const { zokou } = require("../framework/zokou");
const axios = require("axios");
const { delay } = require("@whiskeysockets/baileys");

// ===== API CONFIGURATION =====
// Use your own API key here
const API_KEY = "gifted"; // Change to your API key if needed
const AUDIO_API_URL = "https://api.giftedtech.co.ke/api/download/ytmp3";
const VIDEO_API_URL = "https://api.giftedtech.co.ke/api/download/ytmp4";

// ===== HELPER FUNCTION TO EXTRACT YOUTUBE LINK =====
function extractYouTubeLink(text) {
  // Look for YouTube link in the text
  const urlRegex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/g;
  const match = text.match(urlRegex);
  return match ? match[0] : null;
}

// ===== AUDIO DOWNLOAD COMMAND (MP3) =====
zokou({
  nomCom: "audio",
  aliases: ["song", "mp3", "ytaudio", "play"],
  reaction: "🎵",
  categorie: "Download"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    // Check if there are arguments
    if (arg.length === 0) {
      return repondre(
        "🎵 *DOWNLOAD AUDIO*\n\n" +
        "*Usage:* .audio <YouTube link>\n\n" +
        "*Example:* .audio https://youtu.be/xxxxx\n\n" +
        "> *CHUGA XMD*"
      );
    }

    const searchText = arg.join(" ");
    const youtubeLink = extractYouTubeLink(searchText);

    if (!youtubeLink) {
      return repondre(
        "❌ *Please provide a valid YouTube link!*\n\n" +
        "*Example:* .audio https://youtu.be/xxxxx\n\n" +
        "> *CHUGA XMD*"
      );
    }

    await repondre("⏳ *Fetching audio...*");

    // Build API URL
    const apiUrl = `${AUDIO_API_URL}?apikey=${API_KEY}&url=${encodeURIComponent(youtubeLink)}`;

    // Call the API
    const response = await axios.get(apiUrl, { timeout: 30000 });

    // Check if API succeeded
    if (response.data && response.data.status === 200) {
      const data = response.data;
      const audioUrl = data.result?.download_url || data.download_url;
      const title = data.result?.title || data.title || "Audio";
      const duration = data.result?.duration || data.duration || "?";

      if (!audioUrl) {
        throw new Error("No download link found");
      }

      // Send audio
      await zk.sendMessage(
        origineMessage,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
          caption: `🎵 *${title}*\n⏱️ Duration: ${duration}\n\n> *CHUGA XMD*`,
        },
        { quoted: ms }
      );
    } else {
      // API returned error
      throw new Error(response.data?.message || "API Error");
    }
  } catch (error) {
    console.error("Audio command error:", error);
    
    let errorMessage = "❌ *Failed to download audio!*\n\n";

    if (error.code === 'ECONNABORTED') {
      errorMessage += "⏱️ *Timeout* - Please try again later.";
    } else if (error.response?.status === 403) {
      errorMessage += "🔒 *API is blocked* - Contact service provider.";
    } else if (error.response?.status === 500) {
      errorMessage += "⚙️ *Server error* - Please try again later.";
    } else {
      errorMessage += `💥 ${error.message}`;
    }

    errorMessage += "\n\n> *CHUGA XMD*";
    repondre(errorMessage);
  }
});

// ===== VIDEO DOWNLOAD COMMAND (MP4) =====
zokou({
  nomCom: "video",
  aliases: ["mp4", "ytvideo", "videomp4"],
  reaction: "🎬",
  categorie: "Download"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    // Check if there are arguments
    if (arg.length === 0) {
      return repondre(
        "🎬 *DOWNLOAD VIDEO*\n\n" +
        "*Usage:* .video <YouTube link>\n\n" +
        "*Example:* .video https://youtu.be/xxxxx\n\n" +
        "> *CHUGA XMD*"
      );
    }

    const searchText = arg.join(" ");
    const youtubeLink = extractYouTubeLink(searchText);

    if (!youtubeLink) {
      return repondre(
        "❌ *Please provide a valid YouTube link!*\n\n" +
        "*Example:* .video https://youtu.be/xxxxx\n\n" +
        "> *CHUGA XMD*"
      );
    }

    await repondre("⏳ *Fetching video...*");

    // Build API URL
    const apiUrl = `${VIDEO_API_URL}?apikey=${API_KEY}&url=${encodeURIComponent(youtubeLink)}`;

    // Call the API
    const response = await axios.get(apiUrl, { timeout: 45000 }); // Longer timeout for video

    // Check if API succeeded
    if (response.data && response.data.status === 200) {
      const data = response.data;
      const videoUrl = data.result?.download_url || data.download_url;
      const title = data.result?.title || data.title || "Video";
      const duration = data.result?.duration || data.duration || "?";
      const quality = data.result?.quality || data.quality || "HD";

      if (!videoUrl) {
        throw new Error("No download link found");
      }

      // Send video
      await zk.sendMessage(
        origineMessage,
        {
          video: { url: videoUrl },
          caption: `🎬 *${title}*\n⏱️ Duration: ${duration}\n🎚️ Quality: ${quality}\n\n> *CHUGA XMD*`,
        },
        { quoted: ms }
      );
    } else {
      // API returned error
      throw new Error(response.data?.message || "API Error");
    }
  } catch (error) {
    console.error("Video command error:", error);
    
    let errorMessage = "❌ *Failed to download video!*\n\n";

    if (error.code === 'ECONNABORTED') {
      errorMessage += "⏱️ *Timeout* - Please try again later.";
    } else if (error.response?.status === 403) {
      errorMessage += "🔒 *API is blocked* - Contact service provider.";
    } else if (error.response?.status === 500) {
      errorMessage += "⚙️ *Server error* - Please try again later.";
    } else {
      errorMessage += `💥 ${error.message}`;
    }

    errorMessage += "\n\n> *CHUGA XMD*";
    repondre(errorMessage);
  }
});

// ===== SEARCH AND PLAY COMMAND =====
zokou({
  nomCom: "play",
  aliases: ["ytplay", "songsearch", "music"],
  reaction: "🔍",
  categorie: "Download"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (arg.length === 0) {
      return repondre(
        "🔍 *PLAY MUSIC*\n\n" +
        "*Usage:* .play <song name>\n\n" +
        "*Example:* .play Diamond Platnumz\n\n" +
        "> *CHUGA XMD*"
      );
    }

    const query = arg.join(" ");
    await repondre(`🔍 *Searching for "${query}"...*`);

    // For now, this is under development
    repondre(
      "🛠️ *Feature under development...*\n\n" +
      "Use directly:\n" +
      "• *.audio <link>* - for audio\n" +
      "• *.video <link>* - for video\n\n" +
      "> *CHUGA XMD*"
    );

  } catch (error) {
    console.error("Play command error:", error);
    repondre("❌ *Error!*\n\n> *CHUGA XMD*");
  }
});

// ===== ALTERNATIVE API COMMAND (if you have another working API) =====
zokou({
  nomCom: "yta",
  aliases: ["ytaudio", "ytmp3"],
  reaction: "🎧",
  categorie: "Download"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (arg.length === 0) {
      return repondre(
        "🎧 *YOUTUBE AUDIO*\n\n" +
        "*Usage:* .yta <YouTube link>\n\n" +
        "*Example:* .yta https://youtu.be/xxxxx\n\n" +
        "> *CHUGA XMD*"
      );
    }

    const youtubeLink = extractYouTubeLink(arg.join(" "));
    
    if (!youtubeLink) {
      return repondre("❌ *Invalid YouTube link!*");
    }

    await repondre("⏳ *Processing...*");

    // Try alternative API if main one fails
    // You can add alternative API here
    
    repondre("⚙️ *Using main API...*\n\nPlease use .audio command for now.");

  } catch (error) {
    console.error("YTA error:", error);
    repondre("❌ *Error!*\n\n> *CHUGA XMD*");
  }
});
