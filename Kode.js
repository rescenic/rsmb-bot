import "google-apps-script";

// 00. -- permulaan aplikasi
// inisasi pertama kali
var tg = new telegram.daftar();

// variable user untuk interaksi dengan store user properties
var user = new telegram.user();

// variable penampung username bot
// misal: var usernamebot = 'gedebugbot';
var usernamebot = "rsmb_id_bot";

// 02. -- Pengambilan dan pemasangan token
var token = user.getValue("token_" + usernamebot);
tg.setToken(token);

// 03. -- setWebhook
function setWebhook() {
    var url = "URL_WEBHOOK";
    var r = tg.setWebhook(url);
    Logger.log(r);
}

// -- fungsi pengayaan aja, boleh ada boleh tidak

// cek Token berhasil disimpan atau tidak
function cekToken() {
    var r = user.getValue("token_" + usernamebot);
    if (r) {
        var pesan = "Token sudah disimpan: " + r;
    } else {
        var pesan = "Token gagal di simpan.";
    }
    Logger.log(pesan);
    return r;
}

// cek informasi bot
function getMe() {
    var me = tg.getMe();
    Logger.log(me);
    return me;
}

// cek info hook bot
function getWebhookInfo() {
    var r = tg.getWebhookInfo();
    Logger.log(r);
    return r;
}

// hapus hook
function deleteWebhook() {
    var r = tg.deleteWebhook();
    Logger.log(r);
    return r;
}

// list Global adminBot
var adminBot = [
    162953862, // @rescenic
];

// -- kalau mau bikin fungsi sendiri, taruh di bawah sini ---
