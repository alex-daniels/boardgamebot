const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const client = new Discord.Client();
//storing all the shit we need
const config = require('./config.json');
const dotenv = require('dotenv');
const boardgames = require('./commands/boardgames/boardgames');
dotenv.config();
const db_name = process.env.DATABASE_NAME;
const db_user = process.env.DATABASE_USER;
const db_pass = process.env.DATABASE_PASS;
const myId = process.env.MYID;
const Op = Sequelize.Op

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const sequelize = new Sequelize(db_name, db_user, db_pass, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Games = sequelize.define('games', {
    //game name
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    //co-op, co-op against, teams, timewasters, verses, etc.
    type: Sequelize.STRING,
    //ex: 3
    players_min: Sequelize.STRING,
    players_max: Sequelize.STRING,
    //ex: 60
    time_to_play: Sequelize.INTEGER,
    //ex: emoji
    icon: Sequelize.STRING
});

client.once('ready', () => {
    console.log('ready');
    Games.sync();
    boardgames.init(Games, myId, Op);

});

client.login(process.env.DISCORDTOKEN);

client.on('message', async message => {
    if (!message.content.startsWith('!') || (message.author.bot)) return; 
    let values = message.content.replace(/[']+/g, `"`);
    const args = values.slice(1).trim().split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    
    if (!command) return;

    try {
        command.execute(message, args, client) 
    } catch (error) {
        console.error(error);
        message.reply('Error executing command');
    }
});
