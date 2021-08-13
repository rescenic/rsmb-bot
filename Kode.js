import "google-apps-script";

// masukkan TOKEN BOT dari BOT Father
const token = "1872915277:AAFZ8kIMFnzm_UZzvS5seo4oRW1anjeEO3A";

const tg = new telegram.daftar(token);

// masukkan ID kamu, jika belum tau cek di @strukturbot
const adminBot = 162953862;

// jika debug true, akan mengirimkan struktur JSON ke admin bot
const debug = false;

// -- fungsi telegram

// cek informasi bot
function getMe() {
    let me = tg.getMe();
    return Logger.log(me);
}

function setWebhook() {
    var url =
        "https://script.google.com/macros/s/AKfycbyaq0jI2ngtH2ayVwSpgad7ZvAz-djAWxNX6bvabJwRMkR9b2g/exec";
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
