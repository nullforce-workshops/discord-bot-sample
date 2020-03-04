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
      logCommandReceived("ping");
      message.channel.send("pong!");
    } else if (message.content === getPrefixedCommand("boop")) {
      logCommandReceived("boop");
      message.channel.send("boop!");
    } else if (message.content === getPrefixedCommand("server")) {
      logCommandReceived("server");
      message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    } else if (message.content === getPrefixedCommand("user-info")) {
      logCommandReceived("user-info");
      message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
});

client.login(discordBotToken);

function getPrefixedCommand(command) {
  return `${prefix}${command}`;
}

function logCommandReceived(commandName) {
  console.log(`command received: ${prefix}${commandName}`);
}
