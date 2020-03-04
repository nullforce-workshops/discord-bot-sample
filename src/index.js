const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");
const { prefix } = require("./config.json");

const discordBotToken = process.env.DISCORD_BOT_TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => {
    // Ignore messages that don't start with the defined prefix
    // OR are bot messages
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Remove the prefix and create an arguments array (space delimited)
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        logCommandReceived(command);
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});

client.login(discordBotToken);

function logCommandReceived(commandName) {
    console.log(`command received: ${prefix}${commandName}`);
}
