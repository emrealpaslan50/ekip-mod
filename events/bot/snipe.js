module.exports = async(bot, message) => {
    if (message.author.bot) return;
	bot.snipes = new Map();
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        ID: message.author.id,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
}
module.exports.configs = {
    name: "messageDelete"
}