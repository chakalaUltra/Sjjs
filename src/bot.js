import { Bot, Events } from "viber-bot";
import express from "express";
import dotenv from "dotenv";
import { askGroq } from "./groqClient.js";

dotenv.config();

const VIBER_AUTH_TOKEN = process.env.VIBER_AUTH_TOKEN;
if (!VIBER_AUTH_TOKEN) {
  console.error("❌ VIBER_AUTH_TOKEN is not set in .env");
  process.exit(1);
}

// Initialize Viber bot
const bot = new Bot({
  authToken: VIBER_AUTH_TOKEN,
  name: "Kaiser",
  avatar: "https://i.imgur.com/6XK5YcV.png" // optional avatar URL
});

// Express app to receive webhook callbacks
const app = express();
app.use(express.json());

// Register Viber webhook endpoint
app.post("/webhook", bot.middleware());

// Event: Bot is ready (registered)
bot.on(Events.CONVERSATION_STARTED, (response) => {
  response.send([
    {
      type: "text",
      text: "👋 Hello! I’m Kaiser, your AI companion. Send me any message and I’ll reply using Groq’s LLM."
    }
  ]);
});

// Event: Incoming text message
bot.on(Events.MESSAGE_RECEIVED, async (message, response) => {
  const userText = message.text;
  console.log(`📩 Received from ${message.sender.name}: ${userText}`);

  try {
    const aiReply = await askGroq(userText);
    response.send([
      {
        type: "text",
        text: aiReply
      }
    ]);
  } catch (err) {
    response.send([
      {
        type: "text",
        text: "⚠️ Sorry, I couldn’t process your request right now. Please try again later."
      }
    ]);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Viber bot listening on port ${PORT}`);

  // Set webhook URL – replace with your public URL
  const webhookUrl = process.env.WEBHOOK_URL || `https://your-domain.com/webhook`;
  try {
    await bot.setWebhook(webhookUrl);
    console.log(`✅ Webhook set to ${webhookUrl}`);
  } catch (e) {
    console.error("❌ Failed to set webhook:", e.message);
  }
});