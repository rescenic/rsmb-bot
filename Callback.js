import "google-apps-script";

function prosesCallback(cb) {
    if (/me_click/i.exec(cb.data)) {
        var pesan = "<b>Author: Muhammad Ridwan Hakim, S.T.</b>";
        pesan += "\n<b>Website: https://rescenic.xyz</b>";
        pesan += "\n<b>Version: 5.3</b>";
        pesan += "\n<b>Credits:</b>";
        pesan += "\n<b>GAS Libraries v23</b>";
        pesan += "\n<b>Feedback Sahabat RSMB</b>";
        return tg.kirimPesan(cb.message.chat.id, pesan, "HTML");
        //return tg.answerCallbackQuery(cb.id, pesan, true)
    }

    if (/me_say/i.exec(cb.data)) {
        var pesan =
            "<b>Anda dapat bershodaqoh untuk meningkatkan kualitas bot ini</b>";
        pesan +=
            "<b> dengan cara menghubungi penulis di: https://j.mp/donasi-bot</b>";
        return tg.kirimPesan(cb.message.chat.id, pesan, "HTML");
    }
}
