const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const config = require('../../database/ticketConfig.json');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('painel-ticket')
        .setDescription('Enviar painel de tickets'),

    async execute(interaction) {

        const guildConfig = config[interaction.guild.id];

        if (!guildConfig) {
            return interaction.reply({
                content: '❌ Configure primeiro.',
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(guildConfig.titulo)
            .setDescription(guildConfig.descricao)
            .setColor(guildConfig.cor)
            .setFooter({
                text: guildConfig.rodape
            });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('abrir_ticket')
                .setLabel(guildConfig.nomeBotao)
                .setEmoji(guildConfig.emoji)
                .setStyle(ButtonStyle.Primary)
        );

        interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        interaction.reply({
            content: '✅ Painel enviado.',
            ephemeral: true
        });
    }
};