const fs = require('fs');
const config = require('../../config.cjs');

const handleGreeting = async (m, gss) => {
  try {
    // Check if m.body exists
    if (!m.body) return;
    
    const textLower = m.body.toLowerCase();

    const triggerWords = [
      'save', 'statusdown', 'take', 'sent', 'giv', 'gib', 'upload',
      'send me', 'znt', 'snt', 'ayak', 'do', 'mee'
    ];

    // Check if any trigger word is in the message
    const hasTrigger = triggerWords.some(word => textLower.includes(word));

    if (hasTrigger) {
      // Check if it's a quoted message
      if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo) {
        const quotedMessage = m.message.extendedTextMessage.contextInfo.quotedMessage;

        if (quotedMessage) {
          // Check if it's an image
          if (quotedMessage.imageMessage) {
            const imageCaption = quotedMessage.imageMessage.caption || '';
            const imageUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.imageMessage, 'image_' + Date.now());
            
            await gss.sendMessage(m.from, {
              image: { url: imageUrl },
              caption: imageCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              },
            });
            
            // Clean up temp file
            fs.unlink(imageUrl, (err) => {
              if (err) console.error('Error deleting temp file:', err);
            });
          }

          // Check if it's a video
          if (quotedMessage.videoMessage) {
            const videoCaption = quotedMessage.videoMessage.caption || '';
            const videoUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.videoMessage, 'video_' + Date.now());
            
            await gss.sendMessage(m.from, {
              video: { url: videoUrl },
              caption: videoCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              },
            });
            
            // Clean up temp file
            fs.unlink(videoUrl, (err) => {
              if (err) console.error('Error deleting temp file:', err);
            });
          }

          // Check if it's audio
          if (quotedMessage.audioMessage) {
            const audioUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.audioMessage, 'audio_' + Date.now());
            
            await gss.sendMessage(m.from, {
              audio: { url: audioUrl },
              mimetype: 'audio/mp4',
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              },
            });
            
            // Clean up temp file
            fs.unlink(audioUrl, (err) => {
              if (err) console.error('Error deleting temp file:', err);
            });
          }

          // Check if it's document
          if (quotedMessage.documentMessage) {
            const documentUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.documentMessage, 'doc_' + Date.now());
            const fileName = quotedMessage.documentMessage.fileName || 'document';
            
            await gss.sendMessage(m.from, {
              document: { url: documentUrl },
              fileName: fileName,
              mimetype: quotedMessage.documentMessage.mimetype,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              },
            });
            
            // Clean up temp file
            fs.unlink(documentUrl, (err) => {
              if (err) console.error('Error deleting temp file:', err);
            });
          }
        }
      } else {
        // If no quoted message, send info
        await gss.sendMessage(m.from, {
          text: `Reply/quote to a message with one of these words:\n${triggerWords.join(', ')}`
        });
      }
    }
  } catch (error) {
    console.error('Error in handleGreeting:', error);
    
    // Send error message to user
    await gss.sendMessage(m.from, {
      text: '❌ Error processing your request. Please try again.'
    }).catch(e => console.log('Error sending error message:', e));
  }
};

module.exports = handleGreeting;
