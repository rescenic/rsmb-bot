import "google-apps-script";

// membuat fungsi panggil hashtag saat reply pesan
function sendMsgReplyTag(msg, pesan) {
    //inisiasi awal message id yang akan direply
    let msg_id = msg.message_id;

    //jika pesannya direply, message id nya diupdate
    if (msg.reply_to_message) {
        msg_id = msg.reply_to_message.message_id;
    }

    let data = {
        chat_id: msg.chat.id,
        text: pesan,
        reply_to_message_id: msg_id,
    };
    let r = tg.request("sendMessage", data);
    return r;
}

// membuat fungsi kirim keyboard
function sendMsgKeyboard(chatid, pesan, keyboard) {
    let data = {
        chat_id: chatid,
        text: pesan,
        parse_mode: "HTML",
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboard,
        },
    };
    let r = tg.request("sendMessage", data);
    return r;
}

// fungsi untuk mengirim pesan dengan keyboard inline
function sendMsgKeyboardInline(chatid, pesan, keyboard) {
    let data = {
        chat_id: chatid,
        text: pesan,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: keyboard,
        },
    };
    let r = tg.request("sendMessage", data);
    return r;
}
