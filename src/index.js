const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");
const { prefix } = require("./config.json");

const discordBotToken = process.env.DISCORD_BOT_TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

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
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        logCommandReceived(commandName);

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        // Default command cooldown to 3 seconds if not provided
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        } else {
            // Add the command user to the cooldown tracking
            timestamps.set(message.author.id, now);
            // Remove the command user when the cooldown period passes
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

        if (command.guildOnly && message.channel.type !== "text") {
            return message.reply("I can't execute that command inside DMs!");
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});

client.login(discordBotToken);

function logCommandReceived(commandName) {
    console.log(`command received: ${prefix}${commandName}`);
}
