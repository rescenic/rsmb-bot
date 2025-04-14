const token = "<bot-token>"; // Insert Bot Token
const bot = new lumpia.init(token);

// Database helper for storing welcome messages and other data
const userDB = new Map();

function setValue(key, value) {
  userDB.set(key, value);
}

function getValue(key) {
  return userDB.get(key);
}

// Admin list
const adminBot = [123456789]; // ID Admin

// Handle webhook communication
function doPost(e) {
  bot.doPost(e);
}

function doGet(e) {
  return ContentService.createTextOutput(
    "Hanya data POST yang kita proses yak!"
  );
}

// Start command handler
bot.cmd("start", (ctx) => {
  const nama =
    ctx.from.first_name + (ctx.from.last_name ? " " + ctx.from.last_name : "");

  let pesan =
    "🧕 Assalamu'alaikum, <b>" + nama + "</b>, perkenalkan saya, Ayana,";
  pesan += " ヾ(≧▽≦*)o Bot Customer Self-Service Anda. ";
  pesan += "RS Muhammadiyah Bandung melayani pasien umum, asuransi dan BPJS. ";
  pesan +=
    "RS Muhammadiyah juga menyediakan pelayanan konsultasi jarak jauh dan perawatan di rumah.";
  pesan += " Untuk pasien lama yang memiliki No. Medrek, dapat mendaftar ";
  pesan += "poliklinik rawat jalan untuk keesokan harinya melalui tombol";
  pesan += " Registrasi Online di bawah ini atau aplikasi RSMB Online.";

  // Creating keyboard with Lumpia
  const keyboard = [
    [
      { text: "👨‍💻 Registrasi Online", url: "https://j.mp/regonline-rsmb" },
      { text: "📱 RSMB Online", url: "https://j.mp/rsmb-online" },
    ],
    [
      { text: "🧑‍⚕️ Telekonsultasi", url: "https://j.mp/telekonsultasi-rsmb" },
      { text: "🤱 HomeCare", url: "https://j.mp/homecare-rsmb" },
    ],
    [
      { text: "📜 Jadwal Realtime", url: "https://j.mp/jadwal-dokter-rsmb" },
      { text: "📰 Berita Terbaru", url: "http://j.mp/berita-rsmb" },
    ],
    [
      { text: "🎉 Kuesioner Pelayanan", url: "https://j.mp/kuesioner-rsmb" },
      { text: "🧧 Saran & Kritik", url: "https://j.mp/saran-rsmb" },
    ],
    [
      { text: "🌏 Website", url: "https://j.mp/rsmb-2021" },
      { text: "😎 Author", callback_data: "me_click" },
    ],
  ];

  return ctx.replyWithHTML(pesan, {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

// Ping command handler
bot.cmd("ping", (ctx) => {
  const waktuAwal = ctx.message.date;

  ctx.replyWithHTML("<b>Pooong</b>").then((sentMsg) => {
    const waktuAkhir = new Date() / 1000;
    const selisihWaktu = waktuAkhir - waktuAwal;

    const pesan = `<b>Kecepatan reaksi bot <code>${selisihWaktu.toLocaleString()}</code> detik.</b>`;

    bot.telegram.editMessageText(ctx.chat.id, sentMsg.message_id, null, pesan, {
      parse_mode: "HTML",
    });
  });
});

// Pong command handler
bot.cmd("pong", (ctx) => {
  return ctx.replyWithMarkdown("🏓 *Piiing! Desss....*");
});

// Echo/Say command handler
bot.cmd(["echo", "say"], (ctx) => {
  const pesan = ctx.message.text.replace(/^\/(?:echo|say)(?:@\w+)?/, "").trim();
  if (pesan.length < 1) return;

  return ctx.reply(pesan);
});

// Jadwal command handler
bot.cmd("jadwal", (ctx) => {
  const url =
    "https://raw.githubusercontent.com/rescenic/rsmb-bot/refs/heads/master/assets/images/Jadwal%20Dokter%20April%202025.jpg";
  const caption =
    "<b>Jadwal Dokter April 2025 dan Versi Realtime H-1 di https://j.mp/jadwal-dokter-rsmb</b>";

  return ctx.replyWithPhoto(url, {
    caption: caption,
    parse_mode: "HTML",
  });
});

// Handle text: Jadwal Realtime
bot.hears("📜 Jadwal Realtime", (ctx) => {
  const url =
    "https://raw.githubusercontent.com/rescenic/rsmb-bot/refs/heads/master/assets/images/Jadwal%20Dokter%20April%202025.jpg";
  const caption =
    "<b>Jadwal Dokter April 2025 dan Versi Realtime H-1 di https://j.mp/jadwal-dokter-rsmb</b>";

  return ctx.replyWithPhoto(url, {
    caption: caption,
    parse_mode: "HTML",
  });
});

// Registrasi Online command and text handler
bot.cmd("regonline", (ctx) => {
  return ctx.replyWithMarkdown(
    "👓 *Daftar Online Rawat Jalan via Website di https://j.mp/regonline-rsmb*"
  );
});

bot.hears("👨‍💻 Registrasi Online", (ctx) => {
  return ctx.replyWithMarkdown(
    "👓 *Daftar Online Rawat Jalan via Website di https://j.mp/regonline-rsmb*"
  );
});

// Android / RSMB Online command and text handler
bot.cmd("android", (ctx) => {
  return ctx.replyWithMarkdown(
    "📲 *Download Aplikasi RSMB Online di https://j.mp/rsmb-online*"
  );
});

bot.hears("📱 RSMB Online", (ctx) => {
  return ctx.replyWithMarkdown(
    "📲 *Download Aplikasi RSMB Online di https://j.mp/rsmb-online*"
  );
});

// Telekonsul command and text handler
bot.cmd("telekonsul", (ctx) => {
  const url =
    "https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Telekonsultasi.jpeg";
  const caption =
    "👩‍⚕️ <b>Daftar Konsultasi Dokter dari Rumah di https://j.mp/telekonsultasi-rsmb</b>";

  return ctx.replyWithPhoto(url, {
    caption: caption,
    parse_mode: "HTML",
  });
});

bot.hears("🧑‍⚕️ Telekonsultasi", (ctx) => {
  const url =
    "https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Telekonsultasi.jpeg";
  const caption =
    "👩‍⚕️ <b>Daftar Konsultasi Dokter dari Rumah di https://j.mp/telekonsultasi-rsmb</b>";

  return ctx.replyWithPhoto(url, {
    caption: caption,
    parse_mode: "HTML",
  });
});

// HomeCard command and text handler
bot.cmd("homecare", (ctx) => {
  return ctx.replyWithMarkdown(
    "👩‍⚕️ *Daftar Perawatan di Rumah di https://j.mp/homecare-rsmb*"
  );
});

bot.hears("🤱 HomeCare", (ctx) => {
  return ctx.replyWithMarkdown(
    "👩‍⚕️ *Daftar Perawatan di Rumah di https://j.mp/homecare-rsmb*"
  );
});

// Shodaqoh command handler with enhanced information
bot.cmd("shodaqoh", (ctx) => {
  let pesan =
    "<b>💰 Shodaqoh untuk Pengembangan Bot Ayana RS Muhammadiyah Bandung</b>\n\n";
  pesan += "Anda dapat bershodaqoh untuk meningkatkan kualitas bot ini. ";
  pesan +=
    "Donasi Anda akan digunakan untuk pengembangan fitur dan pemeliharaan layanan.\n\n";
  pesan += "<b>Metode Donasi:</b>\n";
  pesan += "• <b>Bank BCA:</b> 0083276051\n";
  pesan += "• <b>Atas Nama:</b> Muhammad Ridwan Hakim\n\n";
  pesan +=
    "Jazakallahu khairan untuk kebaikan Anda. Semoga menjadi amal jariyah.";

  // Creating inline keyboard with donation options
  const keyboard = [
    [{ text: "💳 Transfer via BCA Mobile", url: "https://j.mp/donasi-bot" }],
    [{ text: "📱 Hubungi Pengembang", url: "https://t.me/rescenic" }],
    [{ text: "📋 Konfirmasi Donasi", url: "https://j.mp/donasi-bot" }],
  ];

  return ctx.replyWithHTML(pesan, {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

// Other menu button handlers
bot.hears("📰 Berita Terbaru", (ctx) => {
  return ctx.replyWithMarkdown(
    "📰 *Baca artikel berita terbaru di http://j.mp/berita-rsmb*"
  );
});

bot.hears("🎉 Kuesioner Pelayanan", (ctx) => {
  return ctx.replyWithMarkdown(
    "🎉 *Sharing pendapat anda mengenai pelayanan RS Muhammadiyah Bandung di https://j.mp/kuesioner-rsmb*"
  );
});

bot.hears("🧧 Saran & Kritik", (ctx) => {
  return ctx.replyWithMarkdown(
    "📜 *Suara publik untuk peningkatan kualitas pelayanan RS Muhammadiyah Bandung di https://j.mp/saran-rsmb*"
  );
});

bot.hears("🌏 Website", (ctx) => {
  return ctx.replyWithMarkdown(
    "🌏 *Kunjungi Situs Resmi RS Muhammadiyah Bandung di https://rsmb.co.id*"
  );
});

bot.hears("😎 Author", (ctx) => {
  const pesan =
    "🧕 <b>Customer Self-Service Bot</b>\n<b>🏥 RS Muhammadiyah Bandung</b>\n<b>oleh <a href='https://t.me/rescenic'>Muhammad Ridwan Hakim, S.T.</a></b>\n<b>9 Oktober 2022.</b>";

  const keyboard = [
    [
      { text: "💵 Shodaqoh", callback_data: "me_say" },
      { text: "🦸‍♂️ Rescenic", callback_data: "me_click" },
    ],
    [{ text: "🌐 rescenic.my.id", url: "https://rescenic.my.id" }],
  ];

  return ctx.replyWithHTML(pesan, {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

// Prokes command handler
bot.cmd("prokes", (ctx) => {
  const url =
    "https://raw.githubusercontent.com/rescenic/rsmb-bot/master/Gerakan%201-5-6.jpg";
  const caption =
    "<b>Cegah dan Kendalikan Penyebaran Virus Covid-19 Dengan Gerakan 1-5-6</b>";

  return ctx.replyWithPhoto(url, {
    caption: caption,
    parse_mode: "HTML",
  });
});

// Welcome message functionality
bot.cmd("setwelcome", (ctx) => {
  // Check if admin
  if (!adminBot.includes(ctx.from.id)) {
    return ctx.reply("🚫 Kamu tidak punya akses.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  // Check if it's a reply to a message
  if (ctx.message.reply_to_message) {
    const msgr = ctx.message.reply_to_message;

    if (!msgr.text) {
      return ctx.reply("🚫 Harus tipe teks", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const pesanWelcome = msgr.text;

    try {
      ctx.replyWithHTML("✅ <b>WELCOME</b>: " + pesanWelcome, {
        reply_to_message_id: ctx.message.message_id,
      });

      setValue("welcomeMessage" + ctx.chat.id, pesanWelcome);
    } catch (e) {
      let pesanError = e.message;
      const error = /({(?:.*)})/gim.exec(pesanError);
      if (error) pesanError = error[1];

      ctx.reply("⛔️ ERROR: " + pesanError, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    // Extract welcome message from command text
    const pesanWelcome = ctx.message.text.replace(
      /^\/setwelcome(?:@\w+)?\s+/i,
      ""
    );

    if (pesanWelcome.trim().length < 1) {
      return ctx.reply("🚫 Silakan masukkan pesan welcome", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    try {
      ctx.replyWithHTML("✅ <b>WELCOME</b>: " + pesanWelcome, {
        reply_to_message_id: ctx.message.message_id,
      });

      setValue("welcomeMessage" + ctx.chat.id, pesanWelcome);
    } catch (e) {
      let pesanError = e.message;
      const error = /({(?:.*)})/gim.exec(pesanError);
      if (error) pesanError = error[1];

      ctx.reply("⛔️ ERROR: " + pesanError, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  }
});

// Check welcome message
bot.cmd("cekwelcome", (ctx) => {
  if (!adminBot.includes(ctx.from.id)) {
    return ctx.reply("🚫 Kamu tidak punya akses.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  const pesanWelcome = getValue("welcomeMessage" + ctx.chat.id);

  if (!pesanWelcome) {
    return ctx.reply("🚫 Tidak ada welcome.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  return ctx.replyWithHTML("🗣 WELCOME: " + pesanWelcome, {
    reply_to_message_id: ctx.message.message_id,
  });
});

// Handle new member joining
bot.on("new_chat_members", (ctx) => {
  const newUser = ctx.message.new_chat_members[0];

  // Skip if it's the bot itself
  if (newUser.id === bot.telegram.getMe().id) return;

  let namaUser = newUser.first_name;
  if (newUser.last_name) namaUser += " " + newUser.last_name;

  const username = newUser.username ? "@" + newUser.username : "";
  const idUser = newUser.id;
  const namaGrup = ctx.chat.title;
  const idGrup = ctx.chat.id;

  // Get welcome message from database
  const pesanWelcome = getValue("welcomeMessage" + ctx.chat.id);

  // Return if no welcome message set
  if (!pesanWelcome) return;

  // Get buttons if set
  const keyboardStr = getValue("welcomeMessageButton" + ctx.chat.id);

  // Replace placeholders with actual values
  const teks = pesanWelcome
    .replace(/{nam[ae]}/gi, namaUser)
    .replace(/{username}/gi, username)
    .replace(/{iduser}/gi, idUser)
    .replace(/{gro?up}/gi, namaGrup)
    .replace(/{idgro?up}/gi, idGrup);

  // Send welcome message with or without keyboard
  if (keyboardStr) {
    const keyboard = JSON.parse(keyboardStr);

    return ctx.replyWithHTML(teks, {
      reply_markup: {
        inline_keyboard: keyboard,
      },
      reply_to_message_id: ctx.message.message_id,
    });
  }

  return ctx.replyWithHTML(teks, {
    reply_to_message_id: ctx.message.message_id,
  });
});

// Handle callback queries
bot.on("callback_query", (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === "me_click") {
    // Send detailed message as in the original code
    let pesan = "<b>Author: Muhammad Ridwan Hakim, S.T.</b>";
    pesan += "\n<b>Website: https://rescenic.my.id</b>";
    pesan += "\n<b>Version: 6.0</b>";
    pesan += "\n<b>Credits:</b>";
    pesan += "\n<b>Lumpia Library v10</b>";
    pesan += "\n<b>Feedback Sahabat RSMB</b>";

    // First answer the callback to clear the loading state
    ctx.answerCbQuery("🦸‍♂️ Rescenic, Muhammad Ridwan Hakim, S.T.");

    // Then send the detailed message
    return ctx.replyWithHTML(pesan);
  }

  if (data === "me_say") {
    // Send donation info message as in the original code
    let pesan =
      "<b>Anda dapat bershodaqoh untuk meningkatkan kualitas bot ini</b>";
    pesan +=
      "<b> dengan cara menghubungi penulis di: https://j.mp/donasi-bot</b>";

    // First answer the callback
    ctx.answerCbQuery("💵 Bank BCA 0083276051 a.n. Muhammad Ridwan Hakim");

    // Then send the detailed message
    return ctx.replyWithHTML(pesan);
  }

  // Default response for unhandled callbacks
  return ctx.answerCbQuery("✅ Received: " + data);
});

// Command for setting welcome message buttons
bot.cmd("buttonWelcome", (ctx) => {
  // Only admins can set welcome buttons
  if (!adminBot.includes(ctx.from.id)) {
    return ctx.reply("🚫 Kamu tidak punya akses.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  // Check if it's a reply to a message
  if (!ctx.message.reply_to_message) {
    return ctx.reply("🚫 Harus reply pesan.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  const msgr = ctx.message.reply_to_message;

  if (!msgr.text) {
    return ctx.reply("🚫 Harus bertipe text.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  // Get welcome message from reply
  const pesanWelcome = msgr.text;

  // Extract column count from command
  const match = /^\/buttonWelcome\s+(\d+)/i.exec(ctx.message.text);
  if (!match) {
    return ctx.reply("🚫 Format salah! Gunakan /buttonWelcome [jumlah kolom]", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  const jmlKolomButton = parseInt(match[1]);

  if (jmlKolomButton < 1) {
    return ctx.reply("🚫 Minimal 1", {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  const jmlMaxKolomButton = 5;
  if (jmlKolomButton > jmlMaxKolomButton) {
    return ctx.reply("🚫 Maksimal " + jmlMaxKolomButton, {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  // Extract button definitions from message text
  const buttonPattern = /\[(?<judul>[^\]]+)\]\((?<url>https?:\/\/[^\)]+)\)/gim;
  const keyboard = [];
  let row = [];
  let rowCount = 0;
  let colCount = 0;
  let match2;

  while ((match2 = buttonPattern.exec(ctx.message.text)) !== null) {
    const button = {
      text: match2.groups.judul,
      url: match2.groups.url,
    };

    row.push(button);
    colCount++;

    if (colCount === jmlKolomButton) {
      keyboard.push(row);
      row = [];
      colCount = 0;
      rowCount++;
    }
  }

  // Add remaining buttons if any
  if (colCount > 0) {
    keyboard.push(row);
  }

  try {
    ctx.replyWithHTML(pesanWelcome, {
      reply_markup: {
        inline_keyboard: keyboard,
      },
      reply_to_message_id: ctx.message.message_id,
    });

    setValue("welcomeMessage" + ctx.chat.id, pesanWelcome);
    setValue("welcomeMessageButton" + ctx.chat.id, JSON.stringify(keyboard));
  } catch (e) {
    let pesanError = e.message;
    const error = /({(?:.*)})/gim.exec(pesanError);
    if (error) pesanError = error[1];

    ctx.reply("⛔️ ERROR: " + pesanError, {
      reply_to_message_id: ctx.message.message_id,
    });
  }
});

// Tags command handler to show available commands
bot.cmd("tags", (ctx) => {
  let pesan = "<b>🏷 Daftar Perintah Bot Ayana RS Muhammadiyah Bandung:</b>\n\n";
  pesan += "• /start - Memulai percakapan dengan Ayana\n";
  pesan += "• /jadwal - Melihat jadwal dokter bulan ini\n";
  pesan += "• /regonline - Pendaftaran online via website\n";
  pesan += "• /android - Pendaftaran via aplikasi RSMB Online\n";
  pesan += "• /telekonsul - Informasi pendaftaran telekonsultasi\n";
  pesan += "• /homecare - Informasi layanan perawatan di rumah\n";
  pesan += "• /prokes - Informasi promosi kesehatan\n";
  pesan += "• /ping - Mengecek kecepatan reaksi bot\n";
  pesan += "• /shodaqoh - Informasi donasi pengembangan bot\n";

  return ctx.replyWithHTML(pesan);
});
