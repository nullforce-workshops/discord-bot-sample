module.exports = {
    name: "prune",
    description: "Prunes recent messages in the channel",
    guildOnly: true,
    execute(message, args) {
        // NOTE: bot must be granted the manage messages permission!
        // WARN: since it doesn't check the permissions of the author, anyone can use it to prune messages!
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
}
