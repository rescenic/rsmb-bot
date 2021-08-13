import "google-apps-script";

// variable global umum

// Masukkan ID File Sheetmu Di SINI
let ssid = "1UrHII0XK-HIpdsUJHqakTB5lNlwIlyOqJFANvCDXTT4";

// nama sheet nya
let sheetName = "tags";

// buat variable baru untuk menampung sheet nya
let sheet = SpreadsheetApp.openById(ssid).getSheetByName(sheetName);

// --- spesifik

// menentukan kolom pertama dimana nama tag di simpan, yakni Name
let kolom = 1;

// pencarian dimulai dari baris ke 2
// baris pertama kita pakai buat judul kolom sheet tag (name dan value)
let baris = 2;

// inisiasi posisi kolom hasil (nilai tag)
let kolomHasil = 2;

// fungsi untuk menambah tag
function tagTambah(kata, isi) {
    // cari dulu kata tag-nya sudah ada apa belum
    // fungsi pencariannya ada dibawah
    let barisTag = tagCariIndex(kata);

    // jika tag sudah ada, kita akan update
    if (barisTag) {
        // tentukan target range untuk diupdate
        let targetRange = sheet.getRange(barisTag, kolomHasil);
        targetRange.setValues([[isi]]);

        // tampilkan pesan tag sudah berhasil diupdate
        return "☑️ Tag " + kata + " diupdate";

        // jika tag belum ada, kita tambahkan
    } else {
        // cari posisi terakhir di sheet dan tambahkan
        let lastRow = sheet.getLastRow();
        sheet.appendRow([kata, isi]);

        // tampilkan pesan tag sudah berhasil ditambahkan
        return "✅ Tag " + kata + " sudah ditambahkan";
    }
}

// fungsi untuk menghapus tag
function hapusTag(kata) {
    // cari dulu kata tag-nya sudah ada apa belum
    let barisTag = tagCariIndex(kata);

    // jika tag sudah ada, kita hapus
    if (barisTag) {
        sheet.deleteRow(barisTag);
        return "✅ Tag " + kata + " telah dihapus.";
    } else {
        // kalau gak ketemu, tampilkan saja pesan error
        return "ℹ️ Tag " + kata + " tidak ditemukan untuk dihapus.";
    }
}

// fungsi buat nyari tag dan temukan isinya
function tagCari(kata) {
    // menemukan nomor index
    // hasilnya -2 sesuai start barisnya
    let indexCari = tagCariIndex(kata);

    // definisikan hasil dulu, anggap gagal atau tidak ketemu
    let hasil = false;

    // jika pencarian berhasil, update hasilnya
    if (indexCari) {
        // tentukan kolom isi tag, yakni di kolom berikutnya (kolomHasil=2)
        let tagIsi = sheet.setActiveRange(
            sheet.getRange(indexCari, kolomHasil)
        );

        // hasil isi tag dijadiin return value fungsi
        hasil = tagIsi.getValue();
    }

    return hasil;
}

// fungsi buat membuat daftar semua tag name
function tagList() {
    // mendapatkan semua isi kolom buat dicari
    // dimulai dari baris 2
    let isiKolom = sheet.getRange(baris, kolom, sheet.getLastRow()).getValues();

    // definisikan hasil dulu
    let hasil = "🔖 Tag tersedia:\n\n";

    for (var i = 0; i < isiKolom.length; i++) {
        // susun berjejer kesamping
        // jika ingin kebawah, ganti " " dengan "\n"
        hasil += isiKolom[i][0] + " ";
    }

    return hasil;
}

// fungsi buat nyari tag dan hasilnya berupa nomor barisnya saja
// agar bisa dipakai disemua fungsi yang memerlukannya
function tagCariIndex(kata) {
    // buat regex kata kunci yang sama persis kecuali huruf besar kecil (inCase Sensitive)
    let kataKunci = new RegExp("^" + kata + "$", "i");

    // mendapatkan semua isi kolom buat dicari
    // dimulai dari baris 2
    let isiKolom = sheet.getRange(baris, kolom, sheet.getLastRow()).getValues();

    // menemukan nomor index
    // hasilnya -2 sesuai baris memulainya
    let indexCari = isiKolom.findIndex(kataKunci);

    // definisikan hasil dulu, anggap gagal atau tidak ketemu
    let hasil = false;

    // jika pencarian berhasil, update hasilnya
    if (indexCari != -1) {
        // hasil kita tambah sesuai baris mulai (2)
        hasil = indexCari + baris;
    }

    return hasil;
}

// fungsi buat nyari text di dalam array dipakai di fungsi tagCariIndex
// kata kunci search dalam mode regex
// cuma temuan pertama aja yang dihasilkan
Array.prototype.findIndex = function (search) {
    if (search == "") return false;
    for (var i = 0; i < this.length; i++) if (search.exec(this[i])) return i;

    return -1;
};
