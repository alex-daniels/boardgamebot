const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

//storing all the shit we need
const config = require('./config.json');
const dotenv = require('dotenv');
let tests = false;
dotenv.config();

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log('ready');
});

client.login(process.env.DISCORDTOKEN);

client.on('message', message => {
    if (!message.content.startsWith('!') || (message.author.bot)) return; 
    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    
    if (!command) return;

    try {
        command.execute(message, args) 
    } catch (error) {
        console.error(error);
        message.reply('Error executing command');
    }

});
