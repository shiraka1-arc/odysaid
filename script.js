// ==========================================
// 1. SESUAIKAN DATA KAMU DI SINI 👇
// ==========================================
const CONFIG = {
  namaDia: "Odyy", // Ganti dengan nama panggilan dia
  nomorWA: "6281225401223", // Ganti nomor WA kamu (awali dengan 62, tanpa + atau 0)
  pesanMaaf:
    "Aku sadar harusnya aku ga ngetik gitu apapun konteksnya aku sadar aku salah. Asli nggak ada maksud buat seakan akan aku beraninya sama cewe gitu, gaa ada maksud begitu. Maafin ya, nggak seru banget rasanya kalau kamu masih ngambek kayak gini.",
  voucherList: [
    "🌻 Setangkai Bunga Matahari Pas Ketemu Besok",
    "🍟 Cemilan Bebas (Kamu yang Pilih)",
    "📸 Jasa Fotografer Pribadi Seharian (Dijamin Estetik)"
  ]
};

// ==========================================
// 2. LOGIKA INTERAKSI WEBSITE
// ==========================================
document.querySelectorAll(".target-name").forEach((el) => {
  el.textContent = CONFIG.namaDia;
});
document.getElementById("apology-text").textContent = CONFIG.pesanMaaf;

const screenIntro = document.getElementById("screen-intro");
const screenApology = document.getElementById("screen-apology");
const screenAccepted = document.getElementById("screen-accepted");

const btnOpen = document.getElementById("btn-open");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const dodgeHint = document.getElementById("dodge-hint");
const voucherContainer = document.getElementById("voucher-container");
const btnWa = document.getElementById("btn-wa");

btnOpen.addEventListener("click", () => {
  screenIntro.classList.remove("active");
  screenApology.classList.add("active");
});

// Logika Tombol "Masih ngambek" Menghindar Lucu
// Logika Tombol "Masih ngambek" Lompat Jauh & Menghilang
// Logika Tombol "Masih ngambek" Super Random & Mental Jauh
const dodgeMessages = [
  "Wushh! Kecepatan cahaya 💨",
  "Eits, salah tebak arah 😝",
  "Lompat ke ujung dunia dulu~ 🚀",
  "Makin kecil, makin susah ditangkep 👀",
  "Nyerah aja udah, pencet yang ijo 🙏",
  "Satu kali lagi beneran lenyap nih...",
  "Tombolnya resmi menghilang dari peradaban 😂"
];
let dodgeCount = 0;
let yesScale = 1;
let currentX = 0;
let currentY = 0;

function moveNoButton() {
  // Di percobaan ke-7, tombol muter lalu lenyap
  if (dodgeCount >= 6) {
    btnNo.style.transition = "all 0.45s ease-in";
    btnNo.style.transform = "scale(0) rotate(540deg)";
    btnNo.style.opacity = "0";
    dodgeHint.textContent = dodgeMessages[6];
    btnYes.style.transform = "scale(1.3)";
    setTimeout(() => {
      btnNo.style.display = "none";
    }, 450);
    return;
  }

  // Ambil posisi awal tombol sebelum dipindah ke body biar lompatannya mulus
  if (btnNo.parentElement !== document.body) {
    const rect = btnNo.getBoundingClientRect();
    currentX = rect.left;
    currentY = rect.top;

    document.body.appendChild(btnNo);
    btnNo.style.position = "fixed";
    btnNo.style.left = `${currentX}px`;
    btnNo.style.top = `${currentY}px`;
    btnNo.style.margin = "0";
    btnNo.style.zIndex = "999";

    // Paksa browser baca posisi awal dulu sebelum animasi jalan
    btnNo.offsetWidth;
    btnNo.style.transition =
      "left 0.22s cubic-bezier(0.22, 1, 0.36, 1), top 0.22s cubic-bezier(0.22, 1, 0.36, 1), transform 0.22s ease";
  }

  const btnWidth = btnNo.offsetWidth || 130;
  const btnHeight = btnNo.offsetHeight || 45;
  const padding = 24;

  const maxX = Math.max(padding + 10, window.innerWidth - btnWidth - padding);
  const maxY = Math.max(padding + 10, window.innerHeight - btnHeight - padding);

  // Jarak lompat minimal 45% dari ukuran layar biar nggak geser deket-deket doang
  const minDistance = Math.min(window.innerWidth, window.innerHeight) * 0.45;
  let randomX = currentX;
  let randomY = currentY;

  for (let i = 0; i < 25; i++) {
    const candidateX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const candidateY = Math.floor(Math.random() * (maxY - padding)) + padding;
    const distance = Math.hypot(candidateX - currentX, candidateY - currentY);

    randomX = candidateX;
    randomY = candidateY;
    if (distance >= minDistance) break;
  }

  currentX = randomX;
  currentY = randomY;

  // Tambah efek mengecil + miring acak (-25 sampai +25 derajat)
  const shrinkScale = Math.max(0.5, 1 - dodgeCount * 0.08);
  const randomRotate = Math.floor(Math.random() * 50) - 25;

  btnNo.style.left = `${randomX}px`;
  btnNo.style.top = `${randomY}px`;
  btnNo.style.transform = `scale(${shrinkScale}) rotate(${randomRotate}deg)`;

  dodgeHint.textContent = dodgeMessages[dodgeCount];
  dodgeCount++;

  yesScale += 0.06;
  btnYes.style.transform = `scale(${Math.min(yesScale, 1.35)})`;
}

// Mendukung desktop & layar sentuh HP
btnNo.addEventListener("mouseover", moveNoButton);
btnNo.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});
btnNo.addEventListener("click", moveNoButton);

btnYes.addEventListener("click", () => {
  btnNo.style.display = "none";
  screenApology.classList.remove("active");
  screenAccepted.classList.add("active");
});

// Render Daftar Kompensasi
let selectedVoucher = CONFIG.voucherList[0];

CONFIG.voucherList.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "voucher-item" + (index === 0 ? " selected" : "");
  div.textContent = item;

  div.addEventListener("click", () => {
    document.querySelectorAll(".voucher-item").forEach((el) => el.classList.remove("selected"));
    div.classList.add("selected");
    selectedVoucher = item;
  });

  voucherContainer.appendChild(div);
});

// Kirim Balasan ke WhatsApp Kamu
btnWa.addEventListener("click", () => {
  const text = `Oke udah aku maafin ya! 🤝 Buat besok aku klaim kompensasi ini: *${selectedVoucher}*`;
  const waUrl = `https://wa.me/${CONFIG.nomorWA}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, "_blank");
});