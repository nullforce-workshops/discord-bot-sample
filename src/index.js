require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const discordBotToken = process.env.DISCORD_BOT_TOKEN;

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => {
    console.log(message.content);

    if (message.content === "!ping") {
        message.channel.send("pong!");
    }
})

client.login(discordBotToken);
