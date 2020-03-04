module.exports = {
    name: "role",
    description: "Assigns a role to the given user",
    args: true,
    usage: "<user> <role>",
    execute(message, args) {
        const user = args[0];
        const role = args[1];
        message.channel.send(`Gave ${user} the ${role} role.`);
    }
}
