import { Command } from "@/discord/base";
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "ping",
    description: "Ping command",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        interaction.reply({ ephemeral, content: "pong" });
    }
});