module.exports = {
    config: {
        name: "snipe",
        noaliases: [],
        nousage: "(@member || ID)",
        category: "Genel",
        nodescription: "",
        accessableby: "Herkes"
    },
    run: async(bot, message, args) => { 
	const { MessageEmbed } = require('discord.js');
	   const msg = bot.snipes.get(message.channel.id)
    if (!msg) return message.react(":x:");
	    const embed = new MessageEmbed()
        .setAuthor(msg.author, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Silen Kişi:** <@${msg.ID}>(\`${msg.author}\`)\n**Silinen mesaj:** [\` ${msg.content} \`]`)
        .setColor(0xFFEFD5)
        .setTimestamp()
    if (msg.image) embed.setImage(msg.image)
    message.channel.send(embed).then(wid => wid.delete({ timeout: 10000, reason: "mesaj silme" }))
    }
};