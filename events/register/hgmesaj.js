module.exports = async(client, member) => {
    if (member.user.bot) return;
    let ayar = client.ayar;
    let kanal = member.guild.channels.cache.get(ayar.Register.hgkanal);

    let zaman = new Date().getTime() - member.user.createdAt.getTime();

    if (zaman < 1000 * 60 * 60 * 24 * 7) {
        kanal.send(`${client.emojis.cache.get(ayar.Genel.infoemoji.no)} **${member} hesabi yeni olduğu için karantinaya gönderildi!**`).catch();
    } else {
        let Gun = client.moment(member.user.createdAt).format("DD");
        let Tarih = client.moment(member.user.createdAt).format("YYYY HH:mm:ss");
        let Ay = client.moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
        kanal.send(`${member} adlı üye sunucumuza giriş yaptı, seninle toplam \`${member.guild.memberCount}\` kişiyiz!
\nSunucumuza kayıt olmak için sese girip teyit vermen gerekmektedir.yetkililer seninle ilgilenecektir.
\nHesabın Oluşturulma Tarihi: ${Gun} ${Ay} ${Tarih}
`).catch();
    }
}
module.exports.configs = {
    name: "guildMemberAdd"
}