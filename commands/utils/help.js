module.exports = {
    name: 'help',
    description: 'help command',
    execute(message, args) {
        message.channel.send(this.getHelpMessage());
    },
    getHelpMessage: function() {
        return `List games we have set up and configured for TTS
        Commands: 
        !Boardgames -> lists all games
        !Boardgames type -> lists all game of 'type'. Types are: co-op, co-op against, teams, time wasters, and versus
        !rando -> random game from all games
        !rando type -> get a random game of type. Types are 'co-op, co-op against, teams, time wasters, and versus`;
    }
};