module.exports = {
    config: {
        name: "say",
        aliases: ["say2"],
        nousage: "",
        category: "Register",
        nodescription: "",
        accessableby: "Yönetici"
    },
    run: async(bot, message, args) => {
        let embişx = bot.config.Embeds;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar.Register;

        if (!ayar.teyitcirol || !ayar.tag) return message.channel.send({
            embed: {
                color: embişx.noEmbed.color,
                title: embişx.noEmbed.title,
                description: `${bot.emojis.cache.get(em.no) || "❌"} **Kayıt sistemi ayarlı değil!**`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: embişx.noEmbed.footer
                }
            }
        }).then(msg => msg.delete({ timeout: 9000 })).catch();

        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        let voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
        let count = 0;
        for (let [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
        let taglı = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.username.includes(tag2) || member.user.username.includes(tag3) || member.user.username.includes(tag4) || member.user.discriminator == ayar.tageto).size || "0";
        let boost = message.guild.premiumSubscriptionCount;
        let boosts = message.guild.premiumTier;
        let total = message.guild.memberCount;
        let aktif = message.guild.members.cache.filter(u => u.presence.status != "offline").size || "0";

        let boostinfo = `${boost} (\`${boosts}.seviye\`)`

        message.channel.send({
            embed: {
                color: 0x2f3136,
				title: message.guild.name,
				thumbnail:{
					url: message.guild.iconURL({dynamic:true})
				},description: `Sunucumuzda toplam **${total}** kişi bulunuyor.
Sunucumuzda toplam **${taglı}** taglı bulunuyor.
Sunucumuzda seste toplam **${count}** kişi bulunuyor.
Sunucumuzda aktif **${aktif}** kişi bulunuyor.
Sunucumuzda toplam **${boostinfo}** takviye bulunuyor.`,
            }
        })

    }

};