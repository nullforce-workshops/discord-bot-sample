require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require("./config.json");

const discordBotToken = process.env.DISCORD_BOT_TOKEN;

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

    if (command === "ping") {
        logCommandReceived("ping");
        message.channel.send("pong!");
    } else if (command === "boop") {
        logCommandReceived("boop");
        message.channel.send("boop!");
    } else if (command === "server") {
        logCommandReceived("server");
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    } else if (command === "user-info") {
        logCommandReceived("user-info");
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    } else if (command === "args-info") {
        logCommandReceived("args-info");
        if (!args.length) {
            return message.channel.send(`You didn't provide any aguments, ${message.author}!`);
        } else if (args[0] === "foo") {
            return message.channel.send("bar");
        }
        message.channel.send(`Command name: ${prefix}${command}\nArguments: ${args}`);
    } else if (command === "kick") {
        logCommandReceived("kick");
        if (!message.mentions.users.size) {
            return message.reply("you need to tag a user in order to kick them!");
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else if (command === "avatar") {
        logCommandReceived("avatar");
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
        });

        message.channel.send(avatarList);
    } else if (command === "prune") {
        // NOTE: bot must be granted the manage messages permission!
        // WARN: since it doesn't check the permissions of the author, anyone can use it to prune messages!
        logCommandReceived("prune");
        // We add one to account for the !prune command message itself
        const amount = parseInt(args[0]) + 1;
        if (isNaN(amount)) {
            return message.reply("that doesn't seem to be a valid number.");
        } else if (amount <= 1 || amount > 100) {
            return message.reply("you need to input a number between 2 and 100.");
        }

        // Don't try to delete messages that are older than 2 weeks
        const filterOld = true;
        message.channel.bulkDelete(amount, filterOld).catch(err => {
            console.error(err);
            message.channel.send("there was an error trying to prune messages in this channel!");
        });
    }
});

client.login(discordBotToken);

function logCommandReceived(commandName) {
    console.log(`command received: ${prefix}${commandName}`);
}
