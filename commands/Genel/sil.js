const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "sil",
        aliases: [],
        usage: "",
        category: "Genel",
        description: "",
        accessableby: "Kimsenin erişimi yok"
    },
    run: async(bot, message, args) => {
        if (bot.config.OWNER.includes(message.author.id) && message.guild.owner) {
            if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return;
            await message.delete();
            message.channel.bulkDelete(Number(args[0])).then(ree => message.channel.send(`**${ree.size}** adet mesaj silindi`)).then(wid => wid.delete({ timeout: 3000 })).catch();
        } else {
            return;
        }
    }

};