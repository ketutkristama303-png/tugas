# Design

## Direction

**Campus studio administration.** IDB Space terasa seperti sistem operasional kampus desain: lapang, terang, tenang, dengan teal dan orange dari logo resmi IDB Bali di atas ink yang dalam. Informasi jadwal menjadi material utama, bukan dekorasi. Kerapian administrasi tetap terasa manusiawi.

## Color Tokens

| Token | Value | Use |
|---|---|---|
| `ink-950` | `#0d1b21` | Sidebar, teks utama, CTA gelap |
| `ink-800` | `#1e3a44` | Judul dan teks kuat |
| `brand-600` | `#027c93` | Teal logo, aksen, fokus |
| `brand-50` | `#eefbfc` | Latar lembut |
| `coral-500` | `#f8951e` | Orange logo, titik status, garis waktu |
| `coral-700` | `#a84a0c` | Teks aksen orange dengan kontras aman |
| `danger-600` | `#cf291d` | Aksi destruktif |
| `mint-500` | `#14b787` | Status tersedia/disetujui |
| `amber-400` | `#fbbf24` | Status menunggu |
| `canvas` | `#f5f7f8` | Latar halaman |
| `paper` | `#ffffff` | Permukaan kartu/dialog |
| `line` | `#e4e9ec` | Garis dan border |
| `muted` | `#64717a` | Teks sekunder (≥4.5:1 pada canvas) |

Aturan: aksi utama memakai deep ink (`btn-primary`); teal dan orange logo dipakai sebagai aksen; merah `danger-*` khusus aksi destruktif. Orange sebagai latar teks putih hanya memakai `coral-700` atau lebih gelap. Status selalu punya label teks, bukan hanya warna.

## Typography

- **Display:** Bricolage Grotesque Variable, weight 600, tracking −0.025em sampai −0.045em.
- **Body/UI:** Manrope Variable, weight 400–800.
- Skala halaman: 30–38px (mobile→desktop), h2 16–24px, body 13–14px, metadata 10–11px, label form 12px uppercase tracking 0.12em.
- Angka waktu dan tanggal memakai `tabular-nums`.

## Layout

- Sidebar gelap tetap 264px di desktop, drawer 272px di mobile.
- Topbar sticky 70px dengan blur tipis di atas canvas.
- Konten maksimum 1520px; padding 16 → 40px.
- Grid utama dashboard: timeline full width, lalu 1.35fr/0.65fr.
- Kartu ruang 1 kolom mobile, 2 tablet, 3 desktop.
- Sudut: 12px input/button, 16–24px kartu, 28px modal.
- Bayangan lembut dengan offset dan blur; tidak ada glow tanpa offset.

## Components

- **Room card:** foto 16:10, badge status, kode ruang, nama, lokasi, kapasitas, tiga fasilitas, CTA.
- **Availability timeline:** label ruang 176px + 15 jam horizontal, blok kelas (teal muda), peminjaman (ink gelap), menunggu (amber), garis waktu sekarang (orange).
- **Calendar:** tujuh kolom, tanggal terpilih ink gelap, titik agenda orange/amber.
- **Booking modal:** dua kolom; form di kiri, ringkasan ruang + mini timeline + ketentuan di kanan. Footer tetap.
- **Admin approval:** daftar antrean di kiri, detail pemohon/dokumen/jadwal di kanan, dialog keputusan.
- **Status badge:** pill 10–11px, titik warna + label.
- **Primary action:** satu gaya commit, deep ink teal. Orange hanya untuk aksen; merah `danger` untuk konfirmasi destruktif.
- Fokus keyboard: outline teal 2px offset 3px.

## Motion

Satu gerak masuk halaman (`fade-up` 550ms, ease-out eksponensial), modal `scale-in`, drawer `translate`, toast `scale-in`. Hover kartu mengangkat 4px. Semua animasi dimatikan pada `prefers-reduced-motion`.

## Voice

Bahasa Indonesia. Judul langsung dan manusiawi (“Temukan ruang yang pas.”, “Atur waktumu.”). Aksi menyebut hasil (“Kirim pengajuan”, “Setujui peminjaman”). Error menyebut masalah dan pemulihan (“Slot ini baru saja dipesan pengguna lain. Silakan pilih waktu atau ruangan lain.”).

## Content Rules

Tidak memakai klaim faktual yang tidak tersedia. Semua foto dan angka demo ditandai sebagai data sintetis di dokumentasi. Nama ruang dan kegiatan ditulis dalam bahasa Indonesia yang wajar, bukan lorem ipsum.
