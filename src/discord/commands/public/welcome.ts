import { Command } from "@/discord/base";
import { settings } from "@/settings";
import { brBuilder, createEmbedAuthor, createRow, hexToRgb, spaceBuilder, replaceText } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder, Locale, hyperlink } from "discord.js";
import lang from "./welcome.lang.json";

new Command({
    name: "welcome",
    dmPermission: false,
    description: "Welcome command",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const { user, locale } = interaction;

        const avaliableLocales = locale == Locale.EnglishUS || locale == Locale.PortugueseBR
        ? locale : Locale.EnglishUS;

        const libMention = hyperlink(
            "servidor",
            "https://discord.gg/qQjJSGVEsH"
        );

        const githubProfileUrl = "https://github.com/migueelzz";

        const embed = new EmbedBuilder({
            author: createEmbedAuthor({ user }),
            color: hexToRgb(settings.colors.theme.success),
            description: brBuilder(
                ...lang.description[avaliableLocales].map(
                    text => replaceText(text, { 
                        "var(user)": user,
                        "var(server)": libMention,
                    })
                )
            ),
            footer: {
                text: replaceText(lang.footer[avaliableLocales], {
                    "var(github)": spaceBuilder("migueelzz", githubProfileUrl)
                }),
                iconURL: githubProfileUrl+".png",
            }
        });

        const row = createRow(
            // Button function on src/discord/components/example.ts
            new ButtonBuilder({
                customId: "example-component-button", 
                label: "Example button", 
                style: ButtonStyle.Primary
            })
        );

        interaction.reply({ ephemeral, embeds: [embed], components: [row] });
    },
});