require('dotenv').config();
require('moment-duration-format');

const { Client, Collection } = require('discord.js'),
    bot = new Client({
        fetchAllMembers: false,
    });
const { Database } = require('ark.db'),
    data = new Database("./database/data.json"),
    registerdata = new Database("./database/register.json"),
	statsdata = new Database("./database/stats.json"),
    moderasyondata = new Database("./database/moderasyon.json");
	require("discord-buttons")(bot);
const { MessageActionRow, MessageButton , MessageMenu, MessageMenuOption } = require('discord-buttons');
const logs = require('discord-logs');
logs(bot);


bot.config = require('./Settings/bot');
bot.ayar = require('./Settings/ayar');
bot.db = data;
bot.regdb = registerdata;
bot.moddb = moderasyondata;
bot.statsdb = statsdata;
bot.fs = require('fs');
bot.chalk = require('chalk');
bot.moment = require('moment');
bot.moment.locale('tr');
bot.ms = require('ms');
bot.guildInvites = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event", "invite"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = bot.fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});
bot.on('message', message => {
    if (!message.content.startsWith(".etkinlik") || message.author.id !== "797369628610265108") return;
    let etk = new MessageButton().setStyle('red').setLabel('Etkinlik Kat?l?mc?s?').setID('ek').setEmoji("?¤©");
    let ctk = new MessageButton().setStyle('red').setLabel('Cekili? Kat?l?mc?s?').setID('ck').setEmoji("??");
    let row = new MessageActionRow()
  .addComponents(etk, ctk);

    message.channel.send("**Rolleri a?a??daki butonlara basarak alabilirsiniz!**", row);

});
bot.on('clickButton', async (button) => {
    let etk = "867801592639389696";
    let ctk = "867801591759634432";
    if (button.id === 'ck') {
        if (button.clicker.member.roles.cache.get(ctk)) {
            await button.clicker.member.roles.remove(ctk).catch();
            await button.reply.send("cekili? kat?l?mc?s? rol al?nd?!", true)
        } else {
            await button.clicker.member.roles.add(ctk).catch();
            await button.reply.send("cekili? kat?l?mc?s? rol verildi!", true);
        }
    }
    if (button.id === 'ek') {
        if (button.clicker.member.roles.cache.get(etk)) {
            await button.clicker.member.roles.remove(etk).catch();
            await button.reply.send("Etkinlik kat?l?mc?s? rol al?nd?!", true);
        } else {
            await button.clicker.member.roles.add(etk).catch();
            await button.reply.send("Etkinlik kat?l?mc?s? rol verildi!", true);
        }

    }
});



const sew = new MessageMenuOption()
    .setLabel("Sevgilim Var")
    .setDescription("Sevgilim var rolu icin")
    .setEmoji('867818533941280788')//emoji id
    .setValue('Sevgilim Var');

const sew1 = new MessageMenuOption()
    .setLabel("Sevgilim Yok")
    .setDescription("Sevgilim yok rolu icin")
    .setEmoji('867818570356752424')//emoji id
    .setValue('Sevgilim Yok');

const sew2 = new MessageMenuOption()
    .setLabel("Sevgili Yapm?yorum")
    .setDescription("Sevgili Yapm?yorum rolu icin")
    .setEmoji('867818596922032138')//emoji id
    .setValue('Sevgili Yapm?yorum');

const sew3 = new MessageMenuOption()
    .setLabel("LGBT")
    .setDescription("LGBT rolu icin")
    .setEmoji('867818235252310017')//emoji id
    .setValue('LGBT');

const sew4 = new MessageMenuOption()
    .setLabel("Yenile")
    .setDescription("Menuyu yenilemek icin")
    .setEmoji('867818707031162931')
    .setValue('Yenile');

const sewrol = new MessageMenu()
    .setID('iliski')
    .setPlaceholder("ili?ki durumu seciniz")
    .addOption(sew4)
    .addOption(sew)
    .addOption(sew1)
    .addOption(sew2)
    .addOption(sew3)
    .setMaxValues(1)
    .setMinValues(1)

const sewsc = new MessageActionRow()
    .addComponent(sewrol)


// On Message
bot.on('message', message => {
    if (!message.content.startsWith(".menu") || message.author.id !== "797369628610265108") return;

    message.channel.send("**ili?ki durumunuzu a?a??daki menuden seciniz**", { components: [sewsc] });

});


bot.on('clickMenu', async(menu) => {
    if (menu.values[0] === 'yenile') {
        await menu.reply.defer();
        menu.clicker.member.roles.remove(["868573921513975839", "868573933048332318", "868573924982653028", "868573911833522236"]).catch();//rol id
        menu.message.delete();
        menu.message.channel.send("**ili?ki durumunuzu a?a??daki menuden seciniz**", { components: [sewsc] });
        return;
    }
    if (menu.values[0] === 'sevgilim var') {
        await menu.reply.defer();
        menu.clicker.member.roles.add('868573921513975839').catch();//rol id
		menu.clicker.member.roles.remove(["868573911833522236", "868573924982653028", "868573933048332318"]).catch();//rol id
        return;
    }
    if (menu.values[0] === 'sevgilim yok') {
        await menu.reply.defer();
        menu.clicker.member.roles.add('').catch();//rol id
		menu.clicker.member.roles.remove(["868573911833522236", "868573921513975839", "868573933048332318"]).catch();//rol id
        return;
    }
    if (menu.values[0] === 'alone') {
        await menu.reply.defer();
        menu.clicker.member.roles.add('').catch();//rol id
	    menu.clicker.member.roles.remove(["868573911833522236", "868573921513975839", "868573924982653028"]).catch();//rol id
        return;
    }
    if (menu.values[0] === 'lgbt') {
        await menu.reply.defer();
        menu.clicker.member.roles.add('868573911833522236').catch();//rol id
		menu.clicker.member.roles.remove(["868573921513975839", "868573924982653028", "868573933048332318"]).catch();//rol id
        return;
    }
});
Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
}; //Random prototype

bot.login(process.env.TOKEN).catch(saiyanix => console.log(bot.chalk.bgRedBright("Discorda giri? yaparken hata oldu;" + saiyanix)));
///--Discord apiye ba?lantÄ±--//

/*process.on("unhandledRejection", error => {
    console.error(bot.chalk.bgRedBright('Hata:', error));
});*/

bot.on('voiceStateUpdate', async(___, newState) => {
    if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == bot.user.id &&
        !newState.selfDeaf
    ) {
        newState.setSelfDeaf(true);
    }
});
bot.on('voiceStateUpdate', async(___, newState) => {
    if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == bot.user.id &&
        !newState.selfMute
    ) {
        newState.setSelfMute(true);
    }
});

////////Stats
bot.on("voiceChannelLeave", async(member, channel) => {
    let db = bot.statsdb;
    if (member.user.bot) return;
    let data;
    if (!db.has("ses." + member.id)) {
        data = Date.now();
        db.set("ses." + member.id, data);
    } else data = db.get("ses." + member.id);
    let duration = Date.now() - data;
    db.delete("ses." + member.id);
    db.add(`voiceData.${member.id}.channel.${channel.id}`, duration);
    db.push(`voiceData.${member.id}.times`, { time: Date.now(), puan: duration });
});
bot.on("voiceChannelSwitch", async(member, oldChannel, newChannel) => {
    let db = bot.statsdb;
    if (member.user.bot) return;
    let data;
    if (!db.has("ses." + member.id)) {
        data = Date.now();
        db.set("ses." + member.id, data);
    } else data = db.get("ses." + member.id);
    let duration = Date.now() - data;
    db.set("ses." + member.id, Date.now());
    db.add(`voiceData.${member.id}.channel.${oldChannel.id}`, duration);
    db.push(`voiceData.${member.id}.times`, { time: Date.now(), puan: duration })
});
bot.on("voiceChannelJoin", async(member, channel) => {
    let db = bot.statsdb;
    if (member.user.bot) return;
    db.set("ses." + member.id, Date.now());
});