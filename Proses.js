import "google-apps-script";

// fungsi buat handle hanya menerima pesan berupa POST, kalau GET keluarkan pesan error
function doGet(e) {
    return tg.util.outputText("Hanya data POST yang kita proses yak!");
}

// fungsi buat handle pesan POST
function doPost(e) {
    // data e kita verifikasi
    var update = tg.doPost(e);

    // jika data valid proses pesan
    if (update) {
        prosesPesan(update);
    }
}

// fungsi utama untuk memproses segala pesan yang masuk
function prosesPesan(update) {
    //return tg.util.outputText("Data diterima di proses Pesan!");

    // detek klo ada pesan dari user
    if (update.message) {
        // penyederhanaan variable
        var msg = update.message;

        // deteksi event letakkan di sini

        // SET-EVENT-WELCOME-AWAL
        // EVENT NEW USER dan SAY WELCOME BOT

        if (msg.new_chat_members) {
            // return tg.sendMsg(msg, tg.util.outToJSON(msg));

            // variable baru untuk new chat member, ambil yang pertama saja
            var newUser = msg.new_chat_members[0];

            // mendefinisikan {nama}
            var namaUser = newUser.first_name;
            // jika punya last name, kita tambahkan juga
            if (newUser.last_name) namaUser += " " + newUser.last_name;

            // bersihkan nama dari tag HTML
            namaUser = tg.util.clearHTML(namaUser);

            // mendifiniksan username
            var username = newUser.username ? "@" + newUser.username : "";

            // mendifinisikan iduser
            var idUser = newUser.id;

            // mendefinisikan grup title
            var namaGrup = msg.chat.title;

            // bersihkan nama grup dari tag HTML
            namaGrup = tg.util.clearHTML(namaGrup);

            // mendefinisikan id grup
            var idGrup = msg.chat.id;

            // Merangkai ucapan selamatnya digabung variable ke pesanWelcome
            // ambil dulu pesan di database User
            var pesanWelcome = user.getValue("welcomeMessage" + msg.chat.id);

            // jika tidak ada pesan welcome, ya udah balik aja
            if (!pesanWelcome) return false;

            // ambil button di database User
            var keyboard = user.getValue("welcomeMessageButton" + msg.chat.id);

            // masukkan variable-variablenya
            var teks = pesanWelcome
                .replace(/{nam[ae]}/gi, namaUser) // mengubah template nama, name
                .replace(/{username}/gi, username) // mengubah template username
                .replace(/{iduser}/gi, idUser) // mengubah template id user
                .replace(/{gro?up}/gi, namaGrup) // mengubah template title group
                .replace(/{idgro?up}/gi, idGrup); // mengubah template id group

            // kirim pesan welcome

            // jika terdapat keyboard
            if (keyboard) {
                // parsing ke format yang semestinya
                keyboard = JSON.parse(keyboard);

                // kirim dalam inline button
                return tg.sendMsgKeyboardInline(
                    msg,
                    teks,
                    keyboard,
                    "HTML",
                    false,
                    msg.message_id
                );
            }

            // jika jenisnya biasa
            return tg.sendMsg(msg, teks, "HTML");
        }
        // SET-EVENT-WELCOME-AKHIR

        // jika ada pesan berupa text
        if (msg.text) {
            // jika user klik start, bot akan menjawab
            var pola = /(^[\/!]start(@rsmb_id_bot)?$)/i;
            if (pola.exec(msg.text)) {
                var nama = msg.from.first_name;
                if (msg.from.last_name) nama += " " + msg.from.last_name;
                // perhatikan, ini menggunakan sendMsg bukan sendMessage
                var pesan =
                    "🧕 Assalamu'alaikum, <b>" +
                    tg.util.clearHTML(nama) +
                    "</b>, perkenalkan saya, Ayana,";
                pesan += " ヾ(≧▽≦*)o Bot Customer Self-Service Anda. ";
                pesan +=
                    "RS Muhammadiyah Bandung melayani pasien umum, asuransi dan BPJS. ";
                pesan +=
                    "RS Muhammadiyah juga menyediakan pelayanan konsultasi jarak jauh dan perawatan di rumah.";
                pesan +=
                    " Untuk pasien lama yang memiliki No. Medrek, dapat mendaftar ";
                pesan +=
                    "poliklinik rawat jalan untuk keesokan harinya melalui tombol";
                pesan +=
                    " Registrasi Online di bawah ini atau aplikasi RSMB Online.";

                var keyboard = [];

                // keyboard baris pertama
                // index dimulai dari 0
                keyboard[0] = [
                    tg.button.url(
                        "👨‍💻 Registrasi Online",
                        "https://j.mp/regonline-rsmb"
                    ),
                    tg.button.url("📱 RSMB Online", "https://j.mp/rsmb-online"),
                ];

                // keyboard baris kedua
                keyboard[1] = [
                    tg.button.url(
                        "🧑‍⚕️ Telekonsultasi",
                        "https://j.mp/telekonsultasi-rsmb"
                    ),
                    tg.button.url("🤱 HomeCare", "https://j.mp/homecare-rsmb"),
                ];

                // keyboard baris ketiga
                keyboard[2] = [
                    tg.button.url(
                        "📜 Jadwal Realtime",
                        "https://j.mp/jadwal-dokter-rsmb"
                    ),
                    tg.button.url(
                        "📰 Berita Terbaru",
                        "http://j.mp/berita-rsmb"
                    ),
                ];

                // keyboard baris keempat
                keyboard[3] = [
                    tg.button.url(
                        "🎉 Kuesioner Pelayanan",
                        "https://j.mp/kuesioner-rsmb"
                    ),
                    tg.button.url(
                        "🧧 Saran & Kritik",
                        "https://j.mp/saran-rsmb"
                    ),
                ];

                // keyboard baris kelima
                keyboard[4] = [
                    tg.button.url("🌏 Website", "https://j.mp/rsmb-2021"),
                    tg.button.text("😎 Author", "me_click"),
                ];

                return tg.sendMsgKeyboard(msg, pesan, keyboard, "HTML");
                //return tg.sendMsgKeyboardInline(msg, pesan, keyboard, 'HTML')
            }

            // jika user ketik /pong, bot akan jawab Piiing!
            // pola dan jawaban paling sederhana
            //var pola = /^[\/!]pong$/i
            //var pola = /(^[\/!]pong$|^[\/!]pong@rsmb_id_bot$)/i
            var pola = /(^[\/!]pong(@rsmb_id_bot)?$)/i;
            if (pola.exec(msg.text)) {
                // balas pong dengan mereply pesan
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "🏓 *Piiing! Desss....*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            // jika user ketik /ping, sekalian dihitung selisihnya
            // dan diberikan berbagai contoh kasus

            // balas pong dengan mereply pesan
            // menggunakan parse_mode Markdown
            //var pola = /^[\/!]ping$/i
            //var pola = /(^[\/!]ping$|^[\/!]ping@rsmb_id_bot$)/i
            var pola = /(^[\/!]ping(@rsmb_id_bot)?$)/i;
            if (pola.exec(msg.text)) {
                // awal waktu pakai timestampnya message saja
                // jika bot macet timestamp pengirim tetap diperhitungkan
                // pilihan lain bisa bikin time sendiri
                var waktuAwal = msg.date;
                var hasil = tg.sendMessage(
                    msg.chat.id,
                    "<b>Pooong</b>",
                    "HTML",
                    false,
                    false,
                    msg.message_id
                );

                var newMsg = hasil.result;
                var waktuAkhir = new Date();

                //let fotoAyana = [
                // 'https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Ayana%20Flowers.jpg',
                // 'https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Ayana%20Lovely.jpg',
                // 'https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Ayana%20Shines.jpg',
                //]

                // hitung selisih waktunya dalam satuan detik
                var selisihWaktu = waktuAkhir / 1000 - waktuAwal;
                // foto gambar disembunyikan di emoticon Ayana
                //var pesan = '<a href="'+tg.util.random(fotoAyana)+'">🧕</a> '
                var pesan = `<b>Kecepatan reaksi bot <code>${selisihWaktu.toLocaleString()}</code> detik.</b>`;

                return tg.editMessageText(
                    msg.chat.id,
                    newMsg.message_id,
                    false,
                    pesan,
                    "HTML"
                );
            }

            // tangkap pesan echo atau say
            var pola = /^([\/!](echo|say))/i;
            if ((cocok = pola.exec(msg.text))) {
                var pesan = msg.text.replace(cocok[1], "");
                // bersihkan pesan dari spasi
                pesan = pesan.trim();
                // deteksi jika panjang pesan < 1, jangan lakukan apa-apa
                if (pesan.length < 1) return false;

                // kirim pesan echo / say nya, tanpa parse_mode
                return tg.sendMsg(msg, pesan);
            }

            // kirim foto dari URL
            //var pola = /^[\/!](jadwal)$/i
            //var pola = /(^[\/!]jadwal$|^[\/!]jadwal@rsmb_id_bot$)/i
            var pola = /^[\/!]jadwal(@rsmb_id_bot)?|📜 Jadwal Realtime$/i;
            if ((cocok = pola.exec(msg.text))) {
                var url =
                    "https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Jadwal%20Dokter%20Juli%202021.jpg";
                var caption =
                    "<b>Jadwal Dokter Juli 2021 dan Versi Realtime H-1 di https://j.mp/jadwal-dokter-rsmb</b>";
                return tg.sendPhoto(msg.chat.id, url, caption, "HTML");
            }

            // kalau mau kembangin sendiri menjadi bot interaktif, code nya taruh di bawah ini
            // -- mulai custom deteksi text --
            var pola = /^[\/!]regonline(@rsmb_id_bot)?|👨‍💻 Registrasi Online$/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "👓 *Daftar Online Rawat Jalan via Website di https://j.mp/regonline-rsmb*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            var pola = /^[\/!]android(@rsmb_id_bot)?|📱 RSMB Online$/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "📲 *Download Aplikasi RSMB Online di https://j.mp/rsmb-online*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            var pola = /^[\/!]telekonsul(@rsmb_id_bot)?|🧑‍⚕️ Telekonsultasi$/i;
            if ((cocok = pola.exec(msg.text))) {
                var url =
                    "https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Telekonsultasi.jpeg";
                var caption =
                    "👩‍⚕️ <b>Daftar Konsultasi Dokter dari Rumah di https://j.mp/telekonsultasi-rsmb</b>";
                return tg.sendPhoto(msg.chat.id, url, caption, "HTML");
            }

            var pola = /^[\/!]homecare(@rsmb_id_bot)?|🤱 HomeCare$/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "👩‍⚕️ *Daftar Perawatan di Rumah di https://j.mp/homecare-rsmb*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            var pola = /(^📰 Berita Terbaru$)/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "📰 *Baca artikel berita terbaru di http://j.mp/berita-rsmb*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            var pola = /(^🎉 Kuesioner Pelayanan$)/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "🎉 *Sharing pendapat anda mengenai pelayanan RS Muhammadiyah Bandung di https://j.mp/kuesioner-rsmb*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            var pola = /(^🧧 Saran & Kritik$)/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "📜 *Suara publik untuk peningkatan kualitas pelayanan RS Muhammadiyah Bandung di https://j.mp/saran-rsmb*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            var pola = /(^🌏 Website$)/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "🌏 *Kunjungi Situs Resmi RS Muhammadiyah Bandung di https://rsmb.co.id*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            if (/^😎 Author$/i.exec(msg.text)) {
                let pesan =
                    "🧕 <b>Customer Self-Service Bot</b>\n<b>🏥 RS Muhammadiyah Bandung</b>\n<b>oleh <a href='https://t.me/rescenic'>Muhammad Ridwan Hakim, S.T.</a></b>\n<b>9 Dzulhijjah 1442H / 19 Juli 2021.</b>";

                let keyboard = [
                    [
                        { text: "💵 Shodaqoh", callback_data: "me_say" },
                        { text: "🦸‍♂️ Rescenic", callback_data: "me_click" },
                    ],
                    [{ text: "🌐 rescenic.xyz", url: "https://rescenic.xyz" }],
                ];
                return sendMsgKeyboardInline(msg.chat.id, pesan, keyboard);
            }

            var pola = /(^[\/!]prokes(@rsmb_id_bot)?$)/i;
            if ((cocok = pola.exec(msg.text))) {
                var url =
                    "https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Gerakan%201-5-6.jpg";
                var caption =
                    "<b>Cegah dan Kendalikan Penyebaran Virus Covid-19 Dengan Gerakan 1-5-6</b>";
                return tg.sendPhoto(msg.chat.id, url, caption, "HTML");
            }

            var pola = /(^[\/!]shodaqoh(@rsmb_id_bot)?$)/i;
            if (pola.exec(msg.text)) {
                // menggunakan parse_mode Markdown
                return tg.sendMessage(
                    msg.chat.id,
                    "🌏 *Anda dapat bershodaqoh untuk meningkatkan kualitas bot ini dengan cara menghubungi penulis di: https://j.mp/donasi-bot*",
                    "Markdown",
                    false,
                    false,
                    msg.message_id
                );
            }

            // Event Respon Penambahan Tag
            // Dengan format: /+tag #namatag isi
            var pola = /^(\/\+tag (#\w+)\s).{1,}/i;
            if (pola.exec(msg.text)) {
                // pisah nama tag dan isi pesan
                var cocok = msg.text.match(pola);
                var tagName = cocok[2];
                var tagValue = msg.text.replace(cocok[1], "");
                var pesanTag = tagTambah(tagName, tagValue);
                return tg.kirimPesan(msg.chat.id, pesanTag);
            }

            // Event Respon #tag dan Menampilkan Isinya
            // ini menggunakan regex yang awam susah paham, intinya klo ada hashtag ( 1 kata yang depannya ada # nya ) :
            var pola = /^#\w+$/i;
            if (pola.exec(msg.text)) {
                var pesanTag = tagCari(msg.text);
                if (pesanTag) {
                    //return tg.kirimPesan(msg.chat.id, pesanTag);
                    return sendMsgReplyTag(msg, pesanTag);
                }
            }

            // Event Respon Penghapusan Tag
            // Dengan format: /-tag #namatag
            var pola = /^\/-tag (#\w+)$/i;
            if (pola.exec(msg.text)) {
                // ambil nama tag nya aja
                var cocok = msg.text.match(pola);
                var tagName = cocok[1];
                var pesanTag = hapusTag(tagName);
                return tg.kirimPesan(msg.chat.id, pesanTag);
            }

            // Event Respon List Tag
            // Dengan format: /tags
            var pola = /^\/tags(@rsmb_id_bot)?$/i;
            if (pola.exec(msg.text)) {
                var pesanTag = tagList();
                return tg.kirimPesan(msg.chat.id, pesanTag);
            }
            //CUSTOM-WELCOME-AWAL
            // trigger set Welcome
            var pola = /^([!\/]setwelcome )/i;
            if ((cocok = pola.exec(msg.text))) {
                // periksa dulu user ID nya, jika tidak ada akses tolak saja.
                if (!tg.util.punyaAkses(adminBot, msg.from.id))
                    return tg.sendMsg(
                        msg,
                        "🚫 Kamu tidak punya akses.",
                        false,
                        false,
                        msg.message_id
                    );

                // buang pola yang di dapatkan dengan menggantinya dengan karakter kosong atau tidak ada
                var pesanWelcome = msg.text.replace(cocok[1], "");

                // uji dulu pesan yang diset bener atau enggak dalam format html :

                try {
                    // kirim pesan berhasil disimpan
                    tg.sendMsg(
                        msg,
                        "✅ <b>WELCOME</b>: " + pesanWelcome,
                        "HTML",
                        false,
                        msg.message_id
                    );

                    // simpan pesanWelcome
                    user.setValue("welcomeMessage" + msg.chat.id, pesanWelcome);
                } catch (e) {
                    // jika gagal, keluarkan pesan error
                    var pesanError = e.message;

                    // tangkep pesan error yang dari Telegram saja
                    if ((error = /({(?:.*)})/gim.exec(pesanError)))
                        pesanError = error[1];

                    // kalau Error gak usah di format HTML, buat keperluan debugging
                    tg.sendMsg(
                        msg,
                        "⛔️ ERROR: " + pesanError,
                        false,
                        false,
                        msg.message_id
                    );
                }

                // selesai kecocokan pola, kembalikan
                return;
            }

            // trigger cek Welcome
            var pola = /^[!\/]cekwelcome$/i;
            if ((cocok = pola.exec(msg.text))) {
                // periksa dulu user ID nya, jika tidak ada akses tolak saja.
                if (!tg.util.punyaAkses(adminBot, msg.from.id))
                    return tg.sendMsg(
                        msg,
                        "🚫 Kamu tidak punya akses.",
                        false,
                        false,
                        msg.message_id
                    );

                // buang pola yang di dapatkan dengan menggantinya dengan karakter kosong atau tidak ada
                var pesanWelcome = user.getValue(
                    "welcomeMessage" + msg.chat.id
                );

                // jika kosong variablenya
                if (!pesanWelcome)
                    return tg.sendMsg(
                        msg,
                        "🚫 Tidak ada welcome.",
                        false,
                        false,
                        msg.message_id
                    );

                // kirim pesan welcome:
                return tg.sendMsg(
                    msg,
                    "🗣 WELCOME: " + pesanWelcome,
                    "HTML",
                    false,
                    msg.message_id
                );
            }

            // trigger reply set Welcome
            var pola = /^[!\/]setwelcome$/i;
            if ((cocok = pola.exec(msg.text))) {
                // periksa dulu user ID nya, jika tidak ada akses tolak saja.
                if (!tg.util.punyaAkses(adminBot, msg.from.id))
                    return tg.sendMsg(
                        msg,
                        "🚫 Kamu tidak punya akses.",
                        false,
                        false,
                        msg.message_id
                    );

                // periksa ada reply atau tidak
                if (!msg.reply_to_message)
                    return tg.sendMsg(
                        msg,
                        "🚫 Harus reply pesan",
                        false,
                        false,
                        msg.message_id
                    );

                // sederhanakan variable reply_to_message
                var msgr = msg.reply_to_message;

                // periksa lagi, yang di reply text atau bukan
                if (!msgr.text)
                    return tg.sendMsg(
                        msg,
                        "🚫 Harus tipe teks",
                        false,
                        false,
                        msg.message_id
                    );

                // set up message yang akan di olah
                var pesanWelcome = msgr.text;

                // uji dulu pesan yang diset bener atau enggak dalam format html :

                try {
                    // kirim pesan berhasil disimpan
                    tg.sendMsg(
                        msg,
                        "✅ <b>WELCOME</b>: " + pesanWelcome,
                        "HTML",
                        false,
                        msg.message_id
                    );

                    // simpan pesanWelcome
                    user.setValue("welcomeMessage" + msg.chat.id, pesanWelcome);
                } catch (e) {
                    // jika gagal, keluarkan pesan error
                    var pesanError = e.message;

                    // tangkep pesan error yang dari Telegram saja
                    if ((error = /({(?:.*)})/gim.exec(pesanError)))
                        pesanError = error[1];

                    // kalau Error gak usah di format HTML, buat keperluan debugging
                    tg.sendMsg(
                        msg,
                        "⛔️ ERROR: " + pesanError,
                        false,
                        false,
                        msg.message_id
                    );
                }

                // selesai kecocokan pola, kembalikan
                return;
            }

            // trigger untuk button Welcome
            // level: advance

            /* syntax: !buttonWelcome jmlKolomButton SYNTAX_URL
  
   jmlKolomButton banyaknya kolom dalam 1 baris: button1, button2
   SYNTAX_URL format markdown [title](URL)
   
   URL protocol yang benar (http/https).
   
   SYNTAX_URL dipisahkan apa aja, boleh spasi, ENTER, koma, dlsb
*/
            var pola = /^[!\/]buttonWelcome (\d+)/i;
            if ((cocok = pola.exec(msg.text))) {
                // periksa dulu user ID nya, jika tidak ada akses tolak saja.
                if (!tg.util.punyaAkses(adminBot, msg.from.id))
                    return tg.sendMsg(
                        msg,
                        "🚫 Kamu tidak punya akses.",
                        false,
                        false,
                        msg.message_id
                    );

                // periksa ada reply atau tidak, keluarkan pesan error
                if (!msg.reply_to_message)
                    return tg.sendMsg(
                        msg,
                        "🚫 Harus reply pesan.",
                        false,
                        false,
                        msg.message_id
                    );

                // sederhanakan variable reply_to_message
                var msgr = msg.reply_to_message;

                // periksa lagi, yang di reply text atau bukan
                if (!msgr.text)
                    return tg.sendMsg(
                        msg,
                        "🚫 Harus bertipe text.",
                        false,
                        false,
                        msg.message_id
                    );

                // set up message yang akan di olah
                var pesanWelcome = msgr.text;

                // sekarang kita parsing button nya
                // jangan kebalik ya, yang diparsing adalah msg biasa, bukan msgr (messsage reply)
                var pesanButton = msg.text;

                // sanitasi: ubah ke Integer
                var jmlKolomButton = parseInt(cocok[1]);

                // periksa berapa nilainya, jika 0 batalin aja
                if (jmlKolomButton < 1)
                    return tg.sendMsg(
                        msg,
                        "🚫 Minimal 1",
                        false,
                        false,
                        msg.message_id
                    );

                // kasih batas maksimal aja juga, terserah berapa sepantasnya
                // di sini aku kasih 5 aja
                var jmlMaxKolomButton = 5;
                if (jmlKolomButton > jmlMaxKolomButton)
                    return tg.sendMsg(
                        msg,
                        "🚫 Maksimal " + jmlMaxKolomButton,
                        false,
                        false,
                        msg.message_id
                    );

                // proses pembuatan / penyusunan button
                // dipahami sendiri ya, ini rumit bagi yang baru memulai. Makanya level nya advance

                // pola button
                var polaButton =
                    /\[(?<judul>[^\]]+)\]\((?<url>https?:\/\/[^\)]+)\)/gim;

                // buat variable pendukung
                var keyboard = [];
                var baris = [];
                var nBaris = 0;
                var kolom = [];
                var nKolom = 0;

                // proses penyusunan
                while ((cocokButton = polaButton.exec(pesanButton))) {
                    // buat 1 button di variable button
                    tombol = tg.button.url(
                        cocokButton.groups.judul,
                        cocokButton.groups.url
                    );

                    // susun dalam baris
                    baris.push(tombol);

                    // tambah index button kolom
                    nKolom++;

                    // jika index button kolom sesuai jmlKolomButton
                    if (nKolom == jmlKolomButton) {
                        // masukkan ke dalam susunan keyboard
                        keyboard[[nBaris][0]] = baris;

                        // tambahkan index baris / row keyboardnya
                        nBaris++;

                        // reset index kolom dan baris
                        nKolom = 0;
                        baris = [];
                    }
                }

                // sisa baris yang tidak diakomodir, masukkan di baris paling akhir
                if (nKolom > 0) keyboard[[nBaris][0]] = baris;

                // keyboard udah jadi, tinggal di coba send

                // uji dulu pesan yang diset bener atau enggak dalam format html
                // verifikasi text dan keyboad

                try {
                    // kirim pesan berhasil disimpan
                    // syntax lib 2 API: sendMsgKeyboardInline(msg, text, keyboard, parse_mode, disable_web_page_preview, reply_to_message_id)
                    tg.sendMsgKeyboardInline(
                        msg,
                        pesanWelcome,
                        keyboard,
                        "HTML",
                        false,
                        msg.message_id
                    );

                    // simpan pesanWelcome
                    user.setValue("welcomeMessage" + msg.chat.id, pesanWelcome);
                    // simpan buttonnya juga, bentuk string
                    user.setValue(
                        "welcomeMessageButton" + msg.chat.id,
                        JSON.stringify(keyboard)
                    );
                } catch (e) {
                    // jika gagal, keluarkan pesan error
                    var pesanError = e.message;

                    // tangkep pesan error yang dari Telegram saja
                    if ((error = /({(?:.*)})/gim.exec(pesanError)))
                        pesanError = error[1];

                    // kalau Error gak usah di format HTML, buat keperluan debugging
                    tg.sendMsg(
                        msg,
                        "⛔️ ERROR: " + pesanError,
                        false,
                        false,
                        msg.message_id
                    );
                }

                // selesai kecocokan pola, kembalikan
                return;
            }

            // Akhir deteksi pesan text
        }

        // deteksi jika ada foto
        //if (msg.photo) {
        // taruh codinganmu di sini
        // misal menampilkan foto ID
        //return tg.sendMsg(msg, '⚜️ File ID: ' + msg.photo[0].file_id)
        //}

        // Akhir update message
    }

    // Deteksi callback
    if (update.callback_query) {
        // proses di halaman berikutnya, biar gak terlalu panjang
        return prosesCallback(update.callback_query);
    }
}
