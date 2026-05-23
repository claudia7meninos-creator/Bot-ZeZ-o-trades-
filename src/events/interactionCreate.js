const {
        }

        if (interaction.isButton()) {

            if (interaction.customId === 'abrir_ticket') {

                const guildConfig = config[interaction.guild.id];

                const canal = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    parent: guildConfig.categoria,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: interaction.user.id,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages
                            ]
                        },
                        {
                            id: guildConfig.cargoStaff,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages
                            ]
                        }
                    ]
                });

                const embed = new EmbedBuilder()
                    .setTitle('🎫 Ticket Criado')
                    .setDescription(`Olá ${interaction.user}, aguarde um membro da equipe.`)
                    .setColor(guildConfig.cor)
                    .setFooter({ text: guildConfig.rodape });

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('fechar_ticket')
                        .setLabel('Fechar Ticket')
                        .setStyle(ButtonStyle.Danger)
                );

                canal.send({
                    content: `<@&${guildConfig.cargoStaff}>`,
                    embeds: [embed],
                    components: [row]
                });

                interaction.reply({
                    content: `✅ Ticket criado em ${canal}`,
                    ephemeral: true
                });
            }

            if (interaction.customId === 'fechar_ticket') {

                const attachment = await transcripts.createTranscript(interaction.channel);

                const guildConfig = config[interaction.guild.id];

                const logs = interaction.guild.channels.cache.get(guildConfig.canalLogs);

                if (logs) {
                    logs.send({
                        content: `📁 Transcript de ${interaction.channel.name}`,
                        files: [attachment]
                    });
                }

                await interaction.reply({
                    content: '❌ Ticket fechado em 5 segundos.'
                });

                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000);
            }
        }
    }
};