import "google-apps-script";

//GROUP COMMAND
bot.command("reload", async (ctx) => {
    var botStatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.botInfo.id
    );
    var memberstatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.from.id
    );
    console.log(memberstatus);
    if (ctx.chat.type == "group" || ctx.chat.type == "supergroup") {
        if (
            !memberstatus ||
            memberstatus.status == "creator" ||
            memberstatus.status == "administrator" ||
            memberstatus.status == "left"
        ) {
            ctx.reply("BOT dimulai ulang");
        }
    }
});

bot.command("kick", async (ctx) => {
    var botStatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.botInfo.id
    );
    var memberstatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.from.id
    );
    console.log(memberstatus);
    if (ctx.chat.type == "group" || ctx.chat.type == "supergroup") {
        if (
            !memberstatus ||
            memberstatus.status == "creator" ||
            memberstatus.status == "administrator" ||
            memberstatus.status == "left"
        ) {
            if (ctx.message.reply_to_message == undefined) {
                let args = ctx.message.text.split(" ").slice(1);
                await bot.telegram
                    .kickChatMember(ctx.chat.id, args[0])
                    .then((result) => {
                        console.log(result);
                    });
            }
            await bot.telegram
                .kickChatMember(
                    ctx.chat.id,
                    ctx.message.reply_to_message.from.id
                )
                .then((result) => {
                    console.log(result);
                });
        }
    }
});

bot.command("ban", async (ctx) => {
    var botStatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.botInfo.id
    );
    var memberstatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.from.id
    );
    console.log(memberstatus);

    if (ctx.chat.type == "group" || ctx.chat.type == "supergroup") {
        if (
            !memberstatus ||
            memberstatus.status == "creator" ||
            memberstatus.status == "administrator" ||
            memberstatus.status == "left"
        ) {
            if (ctx.message.reply_to_message == undefined) {
                let args = ctx.message.text.split(" ").slice(1);
                await bot.telegram
                    .callApi("banChatMember", {
                        chat_id: ctx.message.chat.id,
                        user_id: args[0],
                    })
                    .then((result) => {
                        console.log(result);
                        ctx.reply(`Melanggar peraturan grup!`);
                        bot.telegram.sendMessage(
                            args[0],
                            `Pengguna telah melanggar peraturan grup!`
                        );
                    });
            }
            await bot.telegram
                .callApi("banChatMember", {
                    chat_id: ctx.message.chat.id,
                    user_id: ctx.message.reply_to_message.from.id,
                })
                .then((result) => {
                    console.log(result);
                    ctx.reply(`Melanggar peraturan grup!`);
                    bot.telegram.sendMessage(
                        ctx.message.reply_to_message.from.id,
                        `Pengguna telah melanggar peraturan grup!`
                    );
                });
        }
    }
});

bot.command("unban", async (ctx) => {
    var botStatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.botInfo.id
    );
    var memberstatus = await bot.telegram.getChatMember(
        ctx.chat.id,
        ctx.from.id
    );
    console.log(memberstatus);
    if (ctx.chat.type == "group" || ctx.chat.type == "supergroup") {
        if (
            !memberstatus ||
            memberstatus.status == "creator" ||
            memberstatus.status == "administrator" ||
            memberstatus.status == "left"
        ) {
            if (ctx.message.reply_to_message == undefined) {
                let args = ctx.message.text.split(" ").slice(1);
                await bot.telegram
                    .unbanChatMember(ctx.chat.id, args[0])
                    .then((result) => {
                        console.log(result);
                        ctx.reply(
                            `Pengguna tidak diblokir, boleh masuk kembali!`
                        );
                        bot.telegram.sendMessage(
                            args[0],
                            `Pengguna tidak diblokir, boleh masuk kembali!`
                        );
                    });
            }
            await bot.telegram
                .unbanChatMember(
                    ctx.chat.id,
                    ctx.message.reply_to_message.from.id
                )
                .then((result) => {
                    console.log(result);
                    ctx.reply(`Pengguna tidak diblokir, boleh masuk kembali!`);
                    bot.telegram.sendMessage(
                        ctx.message.reply_to_message.from.id,
                        `Pengguna tidak diblokir, boleh masuk kembali!`
                    );
                });
        }
    }
});
//END
