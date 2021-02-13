const Discord = require('discord.js');
const client = new Discord.Client();
//storing all the shit we need
const config = require('./config.json');
const dotenv = require('dotenv');
let tests = false;
dotenv.config();

let channelFoudn = false;
let serverID = false;

client.once('ready', () => {
    console.log('ready');
});

client.login(process.env.DISCORDTOKEN);

client.on('message', message => {

    if (message.content === '!tests') {
        tests = true;
        runTests(message);
        tests = false;
    }

    if (!message.content.startsWith('!')) {
        if (!tests) {
            if (message.author.bot) return;
        }
    }
    const args = message.content.slice(1).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'boardgames') {
        if (args.length > 0){
            if (args.length == 1) {
                switch (args[0]) {
                    case 'co-op':
                        message.channel.send(getCoopGames());
                        break;
                    case 'teams':
                        message.channel.send(getTeamGames());
                        break;
                    case 'versus':
                        message.channel.send(getVersusGames());
                        break;
                    default:
                        message.channel.send(invalidArgMessage());
                        break;
                }
            } else if (args.length == 2) {
                switch (args[1]) {
                    case 'against':
                        message.channel.send(getCoopAgainstGames());
                        break;
                    case 'wasters':
                        message.channel.send(getTimeWasterGames());
                        break;
                    default:
                        message.channel.send(invalidArgMessage());
                }
            }
        } else {
            message.channel.send(getBoardGameList());
        }
    } else if (command === 'rando') {
        if (args.length > 0) {
           if (args.length == 1) {               
                switch (args[0]) {
                    case 'co-op':
                        message.channel.send(getRandomCoopGame());
                        break;
                    case 'teams':
                        message.channel.send(getRandomTeamGame());
                        break;
                    case 'versus':
                        message.channel.send(getRandomVersusGame());
                        break;
                    default:
                        message.channel.send(invalidArgMessage());
                        break;
                }
            } else if (args.length == 2) {
                switch (args[1]) {
                    case 'against':
                        message.channel.send(getRandomCoopAgainst());
                        break;
                    case 'wasters':
                        message.channel.send(getRandomTimeWasterGame());
                        break;
                    default:
                        message.channel.send(invalidArgMessage());
                }
            }
        } else {
            message.channel.send('A random game to play: ' + getRandomGame());
        }
    } else if (command === 'help') {
        message.channel.send(getHelpMessage());
    } else if (command === 'droid') {
        message.channel.send('roger roger');
    }
});

function runTests(message) {
    message.channel.send('running test suite');
    message.channel.send('random game finder');
    message.channel.send('!rando');
    message.channel.send('!rando co-op');
    message.channel.send('!rando co-op against');
    message.channel.send('!rando teams');
    message.channel.send('!rando time wasters')
    message.channel.send('!rando versus');
    message.channel.send('!rando asdf');
    message.channel.send('!rando co-op asdf')
    message.channel.send('game list');
    message.channel.send('!Boardgames');
    message.channel.send('!Boardgames co-op')
    message.channel.send('!Boardgames co-op against');
    message.channel.send('!Boardgames teams');
    message.channel.send('!Boardgames time wasters');
    message.channel.send('!Boardgames versus');
    message.channel.send('!Boardgames asdf');
    message.channel.send('!Boardgames co-op asdf');
    message.channel.send('!help');
    message.channel.send('!droid');
}

function invalidArgMessage() {
    return `Error invalid argument, please try "co-op", "co-op against", "teams", "time wasters", or "versus"`;
}

function getHelpMessage() {
    return `List games we have set up and configured for TTS
    Commands: 
    !Boardgames -> lists all games
    !Boardgames type -> lists all game of 'type'. Types are: co-op, co-op against, teams, time wasters, and versus
    !rando -> random game from all games
    !rando type -> get a random game of type. Types are 'co-op, co-op against, teams, time wasters, and versus`;
}

function getCoopGames() {
    return `
    **__Co-op__**
    Forbidden Island | 2-4 | 30 | :peace: 
    Gloomhaven | 1-4 | 120 | :cross: 
    Gloomhaven: Jaws of the Lion | 1-4 | 120 | :star_and_crescent: 
    Horrified | 1-5 | 60 | :om_symbol: 
    Spirit Island | 1-4 | 90 | :six_pointed_star: 
    Sub Terra | 1-6 | 60 | :wheel_of_dharma: 
    The Captain is Dead | 2-7 | 90 | :star_of_david: 
    
    `;
}

function getCoopAgainstGames() {
    return `**__Co-op Against__**
    Battlestar Galactica | 3-6 | 180 | :arrow_heading_up: 
    Betrayal at Baldur's Gate | 3-6 | 60 | :arrows_clockwise: 
    Betrayal at House on the Hill | 3-6 | 60 | :arrows_counterclockwise: 
    Betrayal Legacy | 3-5 | 90 | :repeat_one: 
    Betrayal at Mystery Mansion | 3-5 | 50 | :repeat: 
    The Menace Among Us | 4-8 | 60 | :arrow_heading_down: 
    Scotland Yard | 3-6 | 45 | :scotland: 
    The Thing | 4-8 | 120 :twisted_rightwards_arrows: 
    `;
}

function getTeamGames() {
    return `
    **__Teams__**
    Codenames | 2-8 | 15 :accept: 
    
    `;
}

function getTimeWasterGames() {
    return `**__Timewasters__**
    Trivial Pursuit (Star Wars/LOTR/Regular/Genus) :radioactive:
    
    `;
}

function getVersusGames() {
    return ` **__Versus__**
    Carcassonne | 2-5 | 45 :secret: 
    Cosmic Encounter | 3-5 | 120 | :congratulations: 
    Monopoly Deal | 2-5 | 15 | :u5408: 
    Root | 1-4 | 90 | :ab: 
    Splendor | 2-4 | 30 | :u6e80: 
    Ticket to Ride | 2-5 | 60 | :a: 
    Tokaido | 2-5 | 45 | :u5272:
    Tsuro | 2-8 | 15 | :u7981:
    A War of Whispers | 2-4 | 60 | :b:
    
    `;
}

function getBoardGameList() {
    let fullMessage = '**A Current List of TTS Games**'
    fullMessage += getCoopGames();
    fullMessage += getCoopAgainstGames();
    fullMessage += getTeamGames();
    fullMessage += getTimeWasterGames();
    fullMessage += getVersusGames();
    return fullMessage;
}

function getRandomGame() {
    let games = [`Forbidden Island | 2-4 | 30 | :peace`,
    `Gloomhaven | 1-4 | 120 | :cross:`,
    `Gloomhaven: Jaws of the Lion | 1-4 | 120 | :star_and_crescent:`, 
    `Horrified | 1-5 | 60 | :om_symbol:`, 
    `Spirit Island | 1-4 | 90 | :six_pointed_star:`, 
    `Sub Terra | 1-6 | 60 | :wheel_of_dharma:`, 
    `The Captain is Dead | 2-7 | 90 | :star_of_david:`,
    `Battlestar Galactica | 3-6 | 180 | :arrow_heading_up:`, 
    `Betrayal at Baldur's Gate | 3-6 | 60 | :arrows_clockwise:`, 
    `Betrayal at House on the Hill | 3-6 | 60 | :arrows_counterclockwise:`, 
    `Betrayal Legacy | 3-5 | 90 | :repeat_one:`, 
    `Betrayal at Mystery Mansion | 3-5 | 50 | :repeat:`, 
    `The Menace Among Us | 4-8 | 60 | :arrow_heading_down:`, 
    `Scotland Yard | 3-6 | 45 | :scotland:`, 
    `The Thing | 4-8 | 120 :twisted_rightwards_arrows:`,
    `Codenames | 2-8 | 15 :accept:`,
    `Trivial Pursuit (Star Wars/LOTR/Regular/Genus) :radioactive:`,
    `Carcassonne | 2-5 | 45 :secret:`, 
    `Cosmic Encounter | 3-5 | 120 | :congratulations:`,
    `Monopoly Deal | 2-5 | 15 | :u5408:`,
    `Root | 1-4 | 90 | :ab:`,
    `Splendor | 2-4 | 30 | :u6e80:`,
    `Ticket to Ride | 2-5 | 60 | :a:`, 
    `Tokaido | 2-5 | 45 | :u5272:`,
    `Tsuro | 2-8 | 15 | :u7981:`,
    `A War of Whispers | 2-4 | 60 | :b:`];

    return games[getRandomNumber(games.length)];
}

function getRandomCoopGame() {
    let coop = [`Forbidden Island | 2-4 | 30 | :peace:`,
    `Gloomhaven | 1-4 | 120 | :cross:`, 
    `Gloomhaven: Jaws of the Lion | 1-4 | 120 | :star_and_crescent:`, 
    `Horrified | 1-5 | 60 | :om_symbol:`, 
    `Spirit Island | 1-4 | 90 | :six_pointed_star:`, 
    `Sub Terra | 1-6 | 60 | :wheel_of_dharma:`, 
    `The Captain is Dead | 2-7 | 90 | :star_of_david:`];

    return coop[getRandomNumber(coop.length)];
}

function getRandomCoopAgainst() {
    let coopAgainst = [`Battlestar Galactica | 3-6 | 180 | :arrow_heading_up:`, 
    `Betrayal at Baldur's Gate | 3-6 | 60 | :arrows_clockwise:`, 
    `Betrayal at House on the Hill | 3-6 | 60 | :arrows_counterclockwise:`, 
    `Betrayal Legacy | 3-5 | 90 | :repeat_one:`, 
    `Betrayal at Mystery Mansion | 3-5 | 50 | :repeat:`, 
    `The Menace Among Us | 4-8 | 60 | :arrow_heading_down:`, 
    `Scotland Yard | 3-6 | 45 | :scotland:`, 
    `The Thing | 4-8 | 120 :twisted_rightwards_arrows:`];
   
    return coopAgainst[getRandomNumber(coopAgainst.length)];
}

function getRandomTeamGame() {
    let teams = [`Codenames | 2-8 | 15 :accept:`];

    return teams[getRandomNumber(teams.length)];
}

function getRandomTimeWasterGame () {
    let timeWasters = [`Trivial Pursuit (Star Wars/LOTR/Regular/Genus) :radioactive:`];

    return timeWasters[getRandomNumber(timeWasters.length)];
}

function getRandomVersusGame() {
    let versus = [`Carcassonne | 2-5 | 45 :secret:`,
    `Cosmic Encounter | 3-5 | 120 | :congratulations:`, 
    `Monopoly Deal | 2-5 | 15 | :u5408:`, 
    `Root | 1-4 | 90 | :ab:`, 
    `Splendor | 2-4 | 30 | :u6e80:`, 
    `Ticket to Ride | 2-5 | 60 | :a:`, 
    `Tokaido | 2-5 | 45 | :u5272:`,
    `Tsuro | 2-8 | 15 | :u7981:`,
    `A War of Whispers | 2-4 | 60 | :b:`]

    return versus[getRandomNumber(versus.length)];
}

function getRandomNumber(arraySize) {
    return Math.floor((Math.random() * arraySize));
}