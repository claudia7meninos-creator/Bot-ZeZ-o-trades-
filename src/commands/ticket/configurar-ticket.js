const {
    SlashCommandBuilder
} = require('discord.js');

const fs = require('fs');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('configurar-ticket')
        .setDescription('Configurar sistema de tickets')
        .addStringOption(option =>
            option
                .setName('titulo')
                .setDescription('Título da embed')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('descricao')
                .setDescription('Descrição da embed')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('cor')
                .setDescription('Cor da embed')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName('categoria')
                .setDescription('Categoria dos tickets')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName('logs')
                .setDescription('Canal de logs')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName('staff')
                .setDescription('Cargo staff')
                .setRequired(true)
        ),

    async execute(interaction) {

        const titulo = interaction.options.getString('titulo');
        const descricao = interaction.options.getString('descricao');
        const cor = interaction.options.getString('cor');
        const categoria = interaction.options.getChannel('categoria');
        const logs = interaction.options.getChannel('logs');
        const staff = interaction.options.getRole('staff');

        const config = require('../../database/ticketConfig.json');

        config[interaction.guild.id] = {
            titulo,
            descricao,
            cor,
            categoria: categoria.id,
            canalLogs: logs.id,
            cargoStaff: staff.id,
            rodape: 'ZeZão Trades',
            emoji: '🎫',
            nomeBotao: 'Abrir Ticket'
        };

        fs.writeFileSync(
            './src/database/ticketConfig.json',
            JSON.stringify(config, null, 2)
        );

        interaction.reply({
            content: '✅ Sistema configurado!',
            ephemeral: true
        });
    }
};