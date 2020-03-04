module.exports = {
    name: "args-info",
    description: "A test command for arguments",
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any aguments, ${message.author}!`);
        } else if (args[0] === "foo") {
            return message.channel.send("bar");
        }
        message.channel.send(`Command name: ${prefix}${command}\nArguments: ${args}`);
    }
}
