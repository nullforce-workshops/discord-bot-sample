module.exports = {
    name: "server",
    description: "Returns server information",
    execute(message, args) {
        message.channel.send(
            `This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
        );
    }
}
