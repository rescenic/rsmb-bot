import "google-apps-script";

// masukkan TOKEN BOT dari BOT Father
const token = "TOKEN_BOT";

const tg = new telegram.daftar(token);

// masukkan ID kamu, jika belum tau cek di @strukturbot
const adminBot = 123456789;

// jika debug true, akan mengirimkan struktur JSON ke admin bot
const debug = false;

// -- fungsi telegram

// cek informasi bot
function getMe() {
    let me = tg.getMe();
    return Logger.log(me);
}

function setWebhook() {
    var url = "URL_WEBHOOK";
    var r = tg.setWebhook(url);
    return Logger.log(r);
}

// cek info hook bot
function getWebhookInfo() {
    let hasil = tg.getWebhookInfo();
    return Logger.log(hasil);
}

// hapus hook
function deleteWebhook() {
    let hasil = tg.deleteWebhook();
    return Logger.log(hasil);
}

// -- kalau mau bikin fungsi sendiri, taruh di bawah sini ---
