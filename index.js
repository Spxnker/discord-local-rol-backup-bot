const config = require("./confident.json");




const { Client, Intents, MessageEmbed } = require('discord.js');
    
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const spanker = require("./src/spankdb");

const spankdb = new spanker.SpankDatabase()

const moment = require("moment");

let danger = false






spankdb.backup("Rol Ayrıntı")
spankdb.backup("Yedek Rol")


client.on("rateLimit", function (RateLimitData) {
  
    console.log("Rate Limit Tespit Edildi. AMA BU ENGEL DEĞİL AMK`", RateLimitData)

})

client.on("ready", () => {
    client.user.setPresence({ activity: { name: "Spanker Sikti HAHAUYTTT", type: "PLAYING" }, status: "dnd" });
 
    if (danger) console.log(danger)

    if (danger !== true) {
        RoleBackup()
        setInterval(() => {
            RoleBackup()
        }, 1000 * 60 * 60);
        setInterval(() => {
            deleteBackup()
        }, 100000* 60 * 60);
    }
});

client.on("message", message => {
    let prefix = config.bot.prefix.find((x) => message.content.toLowerCase().startsWith(x));
    if (!config.bot.owners.includes(message.author.id) || !prefix || !message.guild) return;
    let args = message.content.split(' ').slice(1);
    let x = message.content.split(' ')[0].slice(prefix.length);
   
   
    if (x === "eval") {
        if (!args[0]) return message.channel.send(`Kod belirt!`);
        let code = args.join(' ');
        function clean(text) {
            if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
            text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
            return text;
        };
        try {
            var evaled = clean(eval(code));
            if (evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
            message.channel.send(`${evaled.replace(client.token, "Njk2MTY4Nz8SDIFDU4OTA1MDk4.b4nug3rc3k.bir.t0k3ns4n4cak.kadarsalagim")}`, { code: "js", split: true });
        } catch (err) { message.channel.send(err, { code: "js", split: true }) };
    };

    if (x === "sp2-setup" || x === "sp2-kur") {
        const ıd = args[0]
      
        const RoleDatabase = spankdb.get(`rolebackup_${message.guild.id}_${ıd}`);
    
      let sec = args[1];
      if (!sec) return message.reply(`**Doğru Kullanım**: **.sp2-setup ${ıd} ${["all", "1&15", "tek", "çift"].map(x => `\`${x}\``).join(" - ")}**`);

      if (sec === "all") {
          if (!args[2]) {
      if (!sec) return (eheeeeee)
          }
        }
        
        const RoleMembers = spankdb.get(`rolemembers_${message.guild.id}_${ıd}`)
        message.guild.roles.create({
            data: {
                name: RoleDatabase.name,
                color: RoleDatabase.color,
                hoist: RoleDatabase.hoist,
                position: RoleDatabase.position,
                permissions: RoleDatabase.permler,
            }
        
        }).then(newRole => {
          
                
              
              
            message.channel.send((`${newRole} ${newRole.id} Rolü Kuruldu. Daha Fazla Bilgi İçin Bir Kanal Oluşturuyorum...`)).then(msg => {
               
                setTimeout(function() {
                    msg.edit(`#rol-ayrıntı`)
                   
                }, 4000);
            
            })
            
    
           
    
            client.channels.cache.get(config.channels.logchannel).send((`${newRole} (${newRole.id}) Rol Backup Kuruldu.`))
            if (!RoleMembers) return message.channel.send(`${newRole.name} olayında veri tabanına kayıtlı üye olmadığı için rol dağıtımı iptal edildi!`)
            RoleMembers.forEach((member, index) => {
                if (!member) return message.channel.send(`${client.users.cache.get(member).username} adlı üyeyi sunucuda bulamadığım için ${newRole.name} rolünü veremedim!`)
               
          setTimeout(() => {
              
 message.guild.members.cache.get(member).roles.add(newRole.id).then(x => console.log(`${client.users.cache.get(member).username} Adlı üye ${newRole.name} rolünü aldı!`)).catch(err => console.log(`${err} sebebiyle ${client.users.cache.get(member).username} adlı üye ${newRole.name} rolünü alamadı!`))
          }, index*1500)
         
            })
        })


    }
})

  async function deleteBackup() {
    client.guilds.cache.get(config.Guild.GuildID).roles.cache.filter(e => !e.managed).forEach(async role => {
        spankdb.deleteAll()


    console.log(`Başarılı Bir Şekilde ${moment(Date.now()).format("LLL")} Tarihinde spankdb Temizlendi!`)
    })
}
async function RoleBackup() {
    client.guilds.cache.get(config.Guild.GuildID).roles.cache.filter(e => !e.managed).forEach(async role => {
        spankdb.set(`rolebackup_${role.guild.id}_${role.id}`, {
            name: role.name,
            color: role.hexColor,
            hoist: role.hoist,
            position: role.rawPosition,
            permler: role.permissions,
            mentionable: role.mentionable,
        })
        spankdb.set(`rolemembers_${role.guild.id}_${role.id}`, role.members.map(e => e.id))
    })
    let rolsize = client.guilds.cache.get(config.Guild.GuildID).roles.cache.filter(rls => rls.name !== "@everyone").size
    console.log(`Başarılı Bir Şekilde ${moment(Date.now()).format("LLL")} Tarihinde ${rolsize} Sayısı kadar rolün backup alma işlemi tamamlandı!`)
}

client.on("roleDelete", role => {
    client.channels.cache.get(config.channels.logchannel).send(`\`${role.name}\` - \`${role.id}\` rolü silindi`)
})



client.login(config.bot.token).then(x => console.log(`${client.user.tag} Olarak Giriş Gerçekleşti.`)).catch(err => console.log(err));
module.exports = spankdb;