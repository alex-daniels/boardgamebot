const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'boardgames',
    description: 'List current configured board games',
    database: false,
    initRan: false,
    alexId: null,
    op: false,
    init(db, id, op) {
        this.database = db;
        this.alexId = id;
        this.op = op;
    },

    execute(message, args, client) {
        if (args.length > 0){
            if (args.length == 1) {
                switch (args[0]) {
                    case 'co-op':
                    case 'coop': 
                        this.getGamesByType('co-op', message);
                        break;
                    case 'teams':
                        this.getGamesByType('teams', message);
                        break;
                    case 'timewasters': 
                        this.getGamesByType('timewasters', message);
                        break;
                    case 'versus':
                        this.getGamesByType('versus', message);
                        break;
                    case 'all': 
                        this.getAllGames(message);
                        break;
                    case 'deleteall':
                        this.deleteAll(message);
                        break;
                    case 'init':
                        this.initAddGames(message);
                        break;
                    case 'random':
                    case 'pickforme':
                    case 'rando':
                        this.getRandomGame(message);
                        break;
                    case 'dev':
                        break;
                    default:
                        break;
                }
            } else if (args.length == 2) {
                if (args[0] != 'add' && args[0] != 'game' && args[0] != 'delete' && args[0] != 'min' && args[0] != 'max' && args[0] != 'random' && args[0] != 'rando' && args[0] != 'pickforme') {
                    switch (args[1]) {
                        case 'against': 
                            this.getGamesByType('co-op-against', message);
                            break;
                        case 'wasters':
                            this.getGamesByType('timewasters', message);
                            break;
                    }
                } else if (args[0] == 'game') {
                    this.getGame(args[1], message);
                } else if (args[0] == 'delete') {
                    this.deleteGame(args[1], message);
                } else if (args[0] == 'add') {
                    let gameString = args[1].split('|');
                    let players = gameString[1].split('-');
                    if (players.length > 1) {
                        const game = {
                            name: gameString[0].slice(1),
                            players_min: players[0],
                            players_max: players[1],
                            type: gameString[2],
                            time_to_play: gameString[3],
                            icon: `:${gameString[4].slice(0, gameString[4].length - 1)}:`
                        };
                        console.log(game.name);
                        this.addGame(game, message)
                    } else {
                        message.reply ('Invalid game syntax, please use gamename|players min-players max|type|time|emoji');
                    }
                } else if (args[0] == 'min') {
                    this.getMinPlayersGame(args[1], message);
                } else if (args[0] == 'max') {
                    this.getMaxPlayersGame(args[1], message);
                } else if (args[0] == 'random' || args[0] == 'rando' || args[0] == 'pickforme') {
                    this.getRandomGame(message, args[1]);
                }
            } else if (args.length == 3) {
                if (args[0] == 'poll') {
                    const gameOne = args[1];
                    const gameTwo = args[2];
                    this.getTwoGamesWithPoll(gameOne, gameTwo, message, client);
                }
            }
        } else {
            message.channel.send(this.getAllGames(message));
        }
    },

    async getGamesByType(gameType, message) {
        const games = await this.database.findAll({ where: { type: gameType }});
        this.prettifyMessage(message, games);
    },

    async addGame(game, message) {
        let isFound = false;
        try {
            const gameToAdd = await this.database.create({
                name: game.name,
                type: game.type,
                players_min: game.players_min,
                players_max: game.players_max,
                time_to_play: game.time_to_play,
                icon: game.icon
            });
            return message.reply(`Added ${game.name}`);
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                //game already exists
                message.reply(`${game.name} already exists entry as it exists is below:`);
                message.channel.send(`${game.name} | ${game.players_min}-${game.players_max} | ${game.time_to_play} | ${game.icon}\n`);
                return false;
            }
            return message.channel.send ('weird shit has happend sorry');
        }
    },

    async getGame(gameName, message) {
        gameName = gameName.replace(/['"]+/g,'');
        const game = await this.database.findAll({ where: { name: gameName }});
        if (game.length) {
            this.prettifyMessage(message, game);
        } else {
            return message.reply(`${gameName} does not exist`)
        }
    },

    async deleteGame(gameName, message) {
        gameName = gameName.replace(/['"]+/g,'');
        const rowCount = await this.database.destroy({ where: {name: gameName} });
        if (!rowCount) return message.reply(`${gameName} does not exist`);
        return message.reply(`${gameName} was deleted`);
    },

    async getAllGames(message) {
        const games = await this.database.findAll({ order: [['type', 'asc']]});
        this.prettifyMessage(message, games);
    },

    async getRandomGame(message, type = false) {
        let randomGame = {};
        if (!type) {
            const games = await this.database.findAll();
            randomGame = games[this.getRandomNumber(games.length)];
        } else {
            const games = await this.database.findAll({ where: {type:type}});
            randomGame = games[this.getRandomNumber(games.length)];
        }
        this.prettifyMessage(message, randomGame, true);
    },

    async getMinPlayersGame(numberOfPlayers, message) {
        const Op = this.op;
        const game = await this.database.findAll({ where: { players_min: { [Op.gte]: numberOfPlayers }}});
        let single = false;
        if (game.length == 1) {
            single = true;
        }
        this.prettifyMessage(message, game, single);
    },

    async getMaxPlayersGame(numberOfPlayers, message) {
        const Op = this.op;
        const game = await this.database.findAll({ where: { players_max: { [Op.lte]: numberOfPlayers }}});
        let single = false;
        if (game.length == 1) {
            single = true;
        }
        this.prettifyMessage(message, game, single);
    },

    async getTwoGamesWithPoll(gameOne, gameTwo, message, client) {
        gameOne = gameOne.replace(/['"]+/g,'');
        gameTwo = gameTwo.replace(/['"]+/g,'');
        
        const optionOne = await this.database.findAll({ where: { name: gameOne }});
        const optionTwo = await this.database.findAll({ where: { name: gameTwo }});

        if (optionOne.length && optionTwo.length) {
            let results = '';
            results += `:one: -> ${optionOne[0].get('name')} | ${optionOne[0].get('players_min')}-${optionOne[0].get('players_max')} | ${optionOne[0].get('type')} | ${optionOne[0].get('time_to_play')} | ${optionOne[0].get('icon')}\n`;
            results += `:two: -> ${optionTwo[0].get('name')} | ${optionTwo[0].get('players_min')}-${optionTwo[0].get('players_max')} | ${optionTwo[0].get('type')} | ${optionTwo[0].get('time_to_play')} | ${optionTwo[0].get('icon')}\n`;
        
            message.channel.send(`**Starting a poll please react with your choice**:\n${results}`).then(function (message) {
                message.react('1️⃣').then(() => message.react('2️⃣'));
            });
        } else if (!optionOne.length) {
            return message.reply(`${gameOne} doesn't exist`);
        } else if (!optionTwo.length) {
            return message.reply(`${gameTwo} doesn't exist`);
        }

    },

    async initAddGames(message) {
        if (message.author.id != this.alexId) {
            message.reply('You do are not allowed to do this');
            return;
        }
        if (this.initRan) {
            message.reply('The database has already been populated');
            return;
        }
       
        const db = this.database;
        const games = {
            coop: {
                gameArray: [
                    ['Forbidden Island', '2', '4', '30', ':peace:'],
                    ['Gloomhaven', '1','4', '120', ':cross'],
                    ['Gloomhaven: Jaws of the Lion', '1','4', '120', ':star_and_crescent:'],
                    ['Horrified', '1','5', '60', ':om_symbol:'],
                    ['Spirit Island', '1','4', '90', ':six_pointed_star:'],
                    ['Sub Terra', '1','6', '60', ':wheel_of_dharma:'],
                    ['The Captain is Dead', '2','7', '90', ':star_of_david:']
                ]
            },
            coopAgainst: {
                gameArray: [
                    ['Battlestar Galactica', '3','6', '180', ':arrow_heading_up:'],
                    [`Betrayal at Baldur's Game`, '3','6', '60', ':arrows_clockwise:'],
                    ['Betrayl at House on the Hill', '3','6', '60', ':arrows_counterclockwise:'],
                    ['Betrayal Legacy', '3','5', '90', ':repeat_one:'],
                    ['Betrayl at Mystery Mansion', '3','5', '50', ':repeat:'],
                    ['The Menace Among Us', '4','8', '60', ':arrow_heading_down:'],
                    ['Scotland Yard', '3','6', '45', ':scotland:'],
                    ['The Thing', '4', '8', '120', ':twisted_rightwards_arrows:']
                ]
            },
            teams: {
                gameArray: [
                    ['Codenames', '2','8', '15', ':accept:']
                ]
            },
            timeWasters: {
                gameArray: [
                    ['Trivial Pursuit (Star Wars/LOTR/Regular/Genius', '', '', '', ':radioactive:'],
                ]
            },
            versus: {
                gameArray: [
                    ['Carcassonne', '2','5', '45', ':secret:'],
                    ['Cosmic Encounter', '3','5', '120', ':congratulations:'],
                    ['Monopoly Deal', '2','5', '15', ':u5408:'],
                    ['Root', '1','4', '90', ':ab:'],
                    ['Splendor', '2','4', '30', ':u6e80:'],
                    ['Ticket to Ride', '2','5', '60', ':a:'],
                    ['Tokaido', '2','5', '45', ':u5272:'],
                    ['Tsuro', '2','8', '15', ':u7981:'],
                    ['A War of Whispers', '2','4', '60', ':b:']
                ]
            }
        }
        games.coop.gameArray.forEach(async function(game) {
            const gameToAdd = await db.create({
                name: game[0],
                type: 'co-op',
                players_min: game[1],
                players_max: game[2],
                time_to_play: game[3],
                icon: game[4]
            })
            console.log(`added ${gameToAdd.name}`);
        });
        games.coopAgainst.gameArray.forEach(async function(game) {
            const gameToAdd = await db.create({
                name: game[0],
                type: 'co-op-against',
                players_min: game[1],
                players_max: game[2],
                time_to_play: game[3],
                icon: game[4]
            })
            console.log(`added ${gameToAdd.name}`);
        });
        games.teams.gameArray.forEach(async function(game) {
            const gameToAdd = await db.create({
                name: game[0],
                type: 'teams',
                players_min: game[1],
                players_max: game[2],
                time_to_play: game[3],
                icon: game[4]
            })
            console.log(`added ${gameToAdd.name}`);
        });
        games.timeWasters.gameArray.forEach(async function(game) {
            const gameToAdd = await db.create({
                name: game[0],
                type: 'timewasters',
                players_min: game[1],
                players_max: game[2],
                time_to_play: game[3],
                icon: game[4]
            })
            console.log(`added ${gameToAdd.name}`);
        });
        games.versus.gameArray.forEach(async function(game) {
            const gameToAdd = await db.create({
                name: game[0],
                type: 'versus',
                players_min: game[1],
                players_max: game[2],
                time_to_play: game[3],
                icon: game[4]
            })
            console.log(`added ${gameToAdd.name}`);
        });
        this.initRan = true;
        message.reply('Populated the database')
    },
    
    async deleteAll(message) {
        if (message.author.id != this.alexId) {
            message.reply('You do are not allowed to do this');
            return;
        }
        const rowCount = await this.database.destroy({truncate:true});
        if (!rowCount) {
            return message.reply('nothing to empty');
        }
        return message.reply('all items deleted');
    },
    
    prettifyMessage(message, gameArray, isSingle = false) {
        let gameList = '';
        if (!isSingle) {
            gameArray.forEach(function(game) {
                gameList += `${game.get('name')} | ${game.get('players_min')}-${game.get('players_max')} | ${game.get('type')} | ${game.get('time_to_play')} | ${game.get('icon')}\n`;
            });
        } else {
            gameList += `${gameArray.get('name')} | ${gameArray.get('players_min')}-${gameArray.get('players_max')} | ${gameArray.get('type')} | ${gameArray.get('time_to_play')} | ${gameArray.get('icon')}\n`;
        }
        message.channel.send(gameList);
    },

    invalidArgMessage: function() {
        return `Error invalid argument, please try "co-op", "co-op against", "teams", "time wasters", or "versus"`;
    },

    getRandomNumber(arraySize) {
        return Math.floor((Math.random() * arraySize));
    }
};