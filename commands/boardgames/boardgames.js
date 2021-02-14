module.exports = {
    name: 'boardgames',
    description: 'List current configured board games',
    execute(message, args) {
        if (args.length > 0){
            if (args.length == 1) {
                switch (args[0]) {
                    case 'co-op':
                        message.channel.send(this.getCoopGames());
                        break;
                    case 'teams':
                        message.channel.send(this.getTeamGames());
                        break;
                    case 'versus':
                        message.channel.send(this.getVersusGames());
                        break;
                    default:
                        message.channel.send(this.invalidArgMessage());
                        break;
                }
            } else if (args.length == 2) {
                switch (args[1]) {
                    case 'against':
                        message.channel.send(this.getCoopAgainstGames());
                        break;
                    case 'wasters':
                        message.channel.send(this.getTimeWasterGames());
                        break;
                    default:
                        message.channel.send(this.invalidArgMessage());
                }
            }
        } else {
            message.channel.send(this.getBoardGameList());
        }
    },
    test: function() {
        console.log('hello world');
    },
    invalidArgMessage: function() {
        return `Error invalid argument, please try "co-op", "co-op against", "teams", "time wasters", or "versus"`;
    },
    getCoopGames: function() {
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
    },
    
     getCoopAgainstGames: function() {
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
    },
    
     getTeamGames: function() {
        return `
        **__Teams__**
        Codenames | 2-8 | 15 :accept: 
        
        `;
    },
    
     getTimeWasterGames: function() {
        return `**__Timewasters__**
        Trivial Pursuit (Star Wars/LOTR/Regular/Genus) :radioactive:
        
        `;
    },
    
     getVersusGames: function() {
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
    },
    
     getBoardGameList: function() {
        let fullMessage = '**A Current List of TTS Games**'
        fullMessage += this.getCoopGames();
        fullMessage += this.getCoopAgainstGames()
        fullMessage += this.getTeamGames()
        fullMessage += this.getTimeWasterGames()
        fullMessage += this.getVersusGames()
        return fullMessage;
    },
};