const TelegramBot = require("node-telegram-bot-api");

const token = "5662715762:AAGO98e7vMYeHH6TR_vXn8BjItt2YQuCGyA";
const webAppUrl = "https://9069-178-121-35-149.eu.ngrok.io/";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text !== "/start") {
    await bot.sendMessage(chatId, "Write the /start", {});
  }

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "A button will appear below, fill out the form",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Fill in the form",
                web_app: { url: webAppUrl + "form" },
              },
            ],
          ],
        },
      }
    );

    await bot.sendMessage(chatId, "Press the button", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Test store", web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);

      await bot.sendMessage(chatId, "Thanks for the feedback");
      await bot.sendMessage(chatId, "Your country: " + data?.country);
      await bot.sendMessage(chatId, "Your street: " + data?.street);

      setTimeout(async () => {
        await bot.sendMessage(
          chatId,
          "You will receive all information in this chat"
        );
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
});
