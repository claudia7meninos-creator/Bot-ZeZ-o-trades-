module.exports = {
    name: 'ready',
    once: true,

    execute(client) {

        console.log(`${client.user.tag} online!`);

        client.user.setPresence({
            activities: [
                {
                    name: '🎫 ZeZão Trades'
                }
            ],
            status: 'online'
        });
    }
};