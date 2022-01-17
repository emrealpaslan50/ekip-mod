module.exports = {
    config: {
        name: "unchatmute",
        aliases: ["untmute", "uncmute", "untextmute"],
        usage: "<@Member || ID> <reason>",
        category: "Moderasyon",
        description: "ID girdiğiniz üyenin sunucuda ses mutesini kaldırırsınız.",
        accessableby: "Voice mute hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let penaltime = bot.moment(message.createdAt).format("lll");
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.textmute) || message.guild.channels.cache.find(x => x.name === "cmute-log");
        let rol = message.guild.roles.cache.get(ayar.Moderasyon.cezarol.textmute);

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.sesmute.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Voice muted sadece "Voice mute hammer" & "Yönetici" yetkisi olan kaldırabilir!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ") || "NO REASON";

        if (!member || !member.roles.cache.has(rol.id)) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Üyeyi belirtmedin, üye sunucuda yok veya muteli değil!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        member.roles.remove(rol.id).catch();
        db.delete(`tmute.${message.guild.id}.${member.id}`);
        message.channel.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member.user.tag}(\`${member.id}\`) **sunucuda yazı kanallarındaki mutesi kaldırıldı!**`,
                footer: {
                    icon_url: member.user.displayAvatarURL({ dynamic: true }),
                    text: okem.footer
                }
            }
        }).catch();

        log.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member.user.tag}(\`${member.id}\`) **sunucuda yazı kanallarındaki mutesi kaldırıldı!**
                
                ● **Yetkili:** ${message.author}(\`${message.author.id}\`)
                ● **Sebep:** (\`${reason}\`)
                ● **Tarih:** (\`${penaltime}\`)`,
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: okem.footer
                }
            }
        }).catch();
    }
};