require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require("./config.json");

const discordBotToken = process.env.DISCORD_BOT_TOKEN;

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => {
    console.log(message.content);

    if (message.content === getPrefixedCommand("ping")) {
      message.channel.send("pong!");
    } else if (message.content === getPrefixedCommand("boop")) {
      message.channel.send("boop!");
    }
});

client.login(discordBotToken);

function getPrefixedCommand(command) {
  return `${prefix}${command}`;
}
