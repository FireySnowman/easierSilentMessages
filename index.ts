/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { insertTextIntoChatInputBox } from "@utils/discord";
import definePlugin from "@utils/types";
import { Message } from "@vencord/discord-types";
import { MessageFlags } from "@vencord/discord-types/enums";
import { UserStore } from "@webpack/common";

export default definePlugin({
    name: "EasierSilentMessages",
    description: "Automatically adds \"@silent\" to the start of your next message after you send an @silent message.",
    authors: [{ name: "afriendlygam8r", id: 318120180385447939n }],
    enabledByDefault: true,

    flux: {
        MESSAGE_CREATE({ message }: { message: Message; }) {
            const shouldAutoSilence =
                message.flags & MessageFlags.SUPPRESS_NOTIFICATIONS &&
                message.author.id === UserStore.getCurrentUser().id &&
                message.state === "SENDING";
            if (!shouldAutoSilence) return;
            // setTimeout allows insertTextIntoChatInputBox to run after Discord's code that clears the chat input box upon sending a message
            setTimeout(() => insertTextIntoChatInputBox("@silent "));
        }
    }
});
