module.exports = {
    config: {
        name: "isim",
        aliases: ["name", "nick"],
        usage: "<@member || ID> <isim ve yaş>",
        category: "Register",
        description: "Üyeyi sunucuda ismini güncellersiniz.",
        accessableby: "Kayıt yetkilisi"
    },
    run: async(bot, message, args) => {
        let embişx = bot.config.Embeds;
        let ayar = bot.ayar.Register;
        let em = bot.ayar.Genel.infoemoji;
        let db = bot.regdb;

        if (!ayar.teyitcirol || !ayar.tag || !ayar.tagsız) return message.channel.send({
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

        if (!message.member.roles.cache.has(ayar.teyitcirol) && !message.member.permissions.has("ADMINISTRATOR")) return;

        if (!args[0]) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **İsmi güncelenecek üyeyi etiketle veya ID gir!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Belirtiğin üyeyi sunucuda bulamadım!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        if (!member.manageable || (message.member.roles.highest.position <= member.roles.highest.position) || (message.member.id === member.id)) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Belirtiğin üyeyinin ismini güncelleyemem!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        args = args.filter(a => a !== "" && a !== " ").splice(1);
        let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
        let yaş = args.filter(arg => !isNaN(arg))[0] || "00";
		    let tamisim;
	if (member.user.username.includes(ayar.tag) || member.user.discriminator.includes(ayar.tageto)) tamisim = `${ayar.tag} ${isim} | ${yaş}`;
	if (!member.user.username.includes(ayar.tag) || !member.user.discriminator.includes(ayar.tageto)) tamisim = `${ayar.tagsız} ${isim} | ${yaş}`;

        if (!isim || !yaş) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **İsim ve yaşı belirmedin!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        member.setNickname(tamisim).catch();

        message.channel.send({
            embed: {
                color: embişx.okEmbed.color,
                title: embişx.okEmbed.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member} **sunucuda ismi \`${tamisim}\` olarak güncellendi!**`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: embişx.okEmbed.footer
                }
            }
        }).catch();

        let tarih = bot.moment(message.createdAt).format("`DD/MM/YYYY | HH:mm:ss`");
        db.push(`nicks.${message.guild.id}`, {
            uye: member.id,
            isim: tamisim,
            yetkili: message.author.id,
            Tarih: tarih,
        })

    }

};