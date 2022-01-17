module.exports = async(client, message) => {
    let tagmsgg = ["tag", "+tag", ".tag", "!tag", "*tag", "-tag", "^tag", "#tag", "&tag", "tag?", "?tag"]
    if (tagmsgg.some(lannaber => message.content.toLowerCase() == lannaber)) {
        message.channel.send(`${client.ayar.Register.tag}`)

    }
}
module.exports.configs = {
    name: "message"
}