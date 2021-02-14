module.exports = {
    name: 'rando',
    description: 'get a random game',
    execute(message, args) {
        if (args.length > 0) {
            if (args.length == 1) {               
                 switch (args[0]) {
                     case 'co-op':
                         message.channel.send(this.getRandomCoopGame());
                         break;
                     case 'teams':
                         message.channel.send(this.getRandomTeamGame());
                         break;
                     case 'versus':
                         message.channel.send(this.getRandomVersusGame());
                         break;
                     default:
                         message.channel.send(this.invalidArgMessage());
                         break;
                 }
             } else if (args.length == 2) {
                 switch (args[1]) {
                     case 'against':
                         message.channel.send(this.getRandomCoopAgainst());
                         break;
                     case 'wasters':
                         message.channel.send(this.getRandomTimeWasterGame());
                         break;
                     default:
                         message.channel.send(this.invalidArgMessage());
                 }
             }
         } else {
             message.channel.send('A random game to play: ' + this.getRandomGame());
         }
    },
    invalidArgMessage: function() {
        return `Error invalid argument, please try "co-op", "co-op against", "teams", "time wasters", or "versus"`;
    },
    getRandomGame: function() {
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
    
        return games[this.getRandomNumber(games.length)];
    },
    
     getRandomCoopGame: function() {
        let coop = [`Forbidden Island | 2-4 | 30 | :peace:`,
        `Gloomhaven | 1-4 | 120 | :cross:`, 
        `Gloomhaven: Jaws of the Lion | 1-4 | 120 | :star_and_crescent:`, 
        `Horrified | 1-5 | 60 | :om_symbol:`, 
        `Spirit Island | 1-4 | 90 | :six_pointed_star:`, 
        `Sub Terra | 1-6 | 60 | :wheel_of_dharma:`, 
        `The Captain is Dead | 2-7 | 90 | :star_of_david:`];
    
        return coop[this.getRandomNumber(coop.length)];
    },
    
     getRandomCoopAgainst: function() {
        let coopAgainst = [`Battlestar Galactica | 3-6 | 180 | :arrow_heading_up:`, 
        `Betrayal at Baldur's Gate | 3-6 | 60 | :arrows_clockwise:`, 
        `Betrayal at House on the Hill | 3-6 | 60 | :arrows_counterclockwise:`, 
        `Betrayal Legacy | 3-5 | 90 | :repeat_one:`, 
        `Betrayal at Mystery Mansion | 3-5 | 50 | :repeat:`, 
        `The Menace Among Us | 4-8 | 60 | :arrow_heading_down:`, 
        `Scotland Yard | 3-6 | 45 | :scotland:`, 
        `The Thing | 4-8 | 120 :twisted_rightwards_arrows:`];
       
        return coopAgainst[this.getRandomNumber(coopAgainst.length)];
    },
    
     getRandomTeamGame: function() {
        let teams = [`Codenames | 2-8 | 15 :accept:`];
    
        return teams[this.getRandomNumber(teams.length)];
    },
    
     getRandomTimeWasterGame : function() {
        let timeWasters = [`Trivial Pursuit (Star Wars/LOTR/Regular/Genus) :radioactive:`];
    
        return timeWasters[this.getRandomNumber(timeWasters.length)];
    },
    
     getRandomVersusGame: function() {
        let versus = [`Carcassonne | 2-5 | 45 :secret:`,
        `Cosmic Encounter | 3-5 | 120 | :congratulations:`, 
        `Monopoly Deal | 2-5 | 15 | :u5408:`, 
        `Root | 1-4 | 90 | :ab:`, 
        `Splendor | 2-4 | 30 | :u6e80:`, 
        `Ticket to Ride | 2-5 | 60 | :a:`, 
        `Tokaido | 2-5 | 45 | :u5272:`,
        `Tsuro | 2-8 | 15 | :u7981:`,
        `A War of Whispers | 2-4 | 60 | :b:`]
    
        return versus[this.getRandomNumber(versus.length)];
    },
    
     getRandomNumber: function(arraySize) {
        return Math.floor((Math.random() * arraySize));
    }
};