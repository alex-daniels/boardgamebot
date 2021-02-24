module.exports = {
    name: 'help',
    description: 'help command',
    execute(message, args) {
        message.channel.send(this.getHelpMessage());
    },
    getHelpMessage: function() {
        return `List games we have set up and configured for TTS
        !Boardgames all -> lists all games
        !Boardgames type -> lists all game of 'type'. Types are: co-op, co-op against, teams, time wasters, and versus
        !Boardgames random -> get random game\n
        !Boardgames random  type -> get a random game of a specific type. 
        !Boardgames add [game] -> adds a game. Format [game] as 'game name|players_min-players_max|type|time_to_play|emoji'
        NOTE: please do not include any preceeding or trailing spaces between | otherwise it will not work properly!!
        NOTE: when adding an emoji, do NOT include the : (colon). This is for database integrity reasons
        **Example: !Boardgames add 'Eldritch Horror|1-8|versus|240 |menorah'**\n
        !Boardgames delete [game] -> removes a game. replace [game] with the game title in ""
        **Example: !Boardgames delete "Eldritch Horror"**\n
        !Boardgames poll game1 game2 -> creates a reaction based poll of two games.
        **Example: !Boardgames poll "Eldritch Horror" "The Captain is Dead"
        `;
    }
};