const TelegramBot = require('node-telegram-bot-api');

const main = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.log('Error: TELEGRAM_BOT_TOKEN is not set.');
    return;
  }

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/^\/start$/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      'Hello! I am your simple bot.\nUse /help to see commands.',
    );
  });

  bot.onText(/^\/help$/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      '/start - Start bot\n/help - Show help\nI will echo your messages.',
    );
  });

  bot.on('message', (msg) => {
    if (!msg.text) {
      return;
    }

    if (msg.text.startsWith('/')) {
      return;
    }

    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  });

  console.log('Bot is running...');
};

main();
