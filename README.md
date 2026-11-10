# IDB Space

**Sistem Peminjaman Ruangan Kampus IDB Bali**

IDB Space adalah sistem peminjaman ruangan kampus untuk **Institut Desain dan Bisnis Bali**. Aplikasi ini mencakup katalog ruang, kalender ketersediaan, pengajuan peminjaman, persetujuan Sarpras, notifikasi, pengelolaan ruang, dan laporan penggunaan.

Antarmuka dibangun dengan React + Tailwind CSS, API dengan Express, dan database relasional PostgreSQL. Untuk pengembangan tanpa setup database, server otomatis memakai PostgreSQL in-memory (`pg-mem`) berisi data demo.

## Menjalankan

```bash
npm install
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:4000
- Health check: http://localhost:4000/api/health

Build produksi:

```bash
npm run build
npm start
```

Setelah build, Express menyajikan frontend dan API dari http://localhost:4000.


## Akses dari perangkat lain

Jika komputer dan ponsel/tablet berada di jaringan Wi-Fi yang sama, jalankan aplikasi seperti biasa lalu buka alamat IP lokal komputer.

```bash
# macOS
ipconfig getifaddr en0
# atau
ipconfig getifaddr en1
```

Contoh: jika IP lokal `192.168.1.10`, buka:

- Build produksi: `http://192.168.1.10:4000`
- Mode development: `http://192.168.1.10:5173`

Server Express dan Vite sudah dikonfigurasi untuk mendengarkan di `0.0.0.0`, sehingga dapat diakses dari perangkat lain pada jaringan yang sama. Jika jaringan kampus mengisolasi perangkat (client isolation), gunakan tunnel seperti Cloudflare Tunnel atau deploy ke server kampus.

## Akun demo

| Peran | Email | Kata sandi |
|---|---|---|
| Mahasiswa | `mahasiswa@idb.ac.id` | `mhs12345` |
| Dosen / Staf | `dosen@idb.ac.id` | `dosen123` |
| Admin Sarpras | `admin@idb.ac.id` | `admin123` |

Tombol akun demo di halaman login bisa dipakai untuk masuk langsung.

> Data demo disimpan di memori. Setiap server di-restart, data kembali ke seed awal. Upload surat tetap tersimpan di `server/uploads`.

## PostgreSQL sungguhan

Jalankan PostgreSQL lewat Docker:

```bash
docker compose up -d
cp server/.env.example server/.env
```

Atur `DATABASE_URL` di `server/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ruang_idb
JWT_SECRET=rahasia-produksi-yang-panjang
CLIENT_ORIGIN=http://localhost:5173
TZ=Asia/Makassar
```

Server membuat tabel dari `server/db/schema.sql` dan mengisi seed jika tabel `users` masih kosong. Tanpa `DATABASE_URL`, mode demo in-memory aktif.

## Fitur

- **Dashboard per peran** dengan ringkasan ketersediaan, timeline jadwal real-time, agenda terdekat, dan antrean persetujuan.
- **Katalog ruang** dengan pencarian, filter jenis/kapasitas/ketersediaan, foto, fasilitas, dan status.
- **Kalender bulanan** dengan penanda agenda dan daftar ruang kosong per tanggal.
- **Pengajuan peminjaman** lewat modal dua kolom: pilih organisasi/UKM resmi, validasi langsung, cek bentrok, unggah surat izin, dan ringkasan ketersediaan.
- **Peminjaman saya** untuk melacak status, membaca catatan Sarpras, mengunduh surat, dan membatalkan.
- **Persetujuan admin** dengan detail pemohon, surat izin, peta jadwal, catatan keputusan, serta aksi setujui/tolak.
- **Kelola ruangan** termasuk tambah ruang, edit detail, atur fasilitas, dan status perawatan.
- **Laporan** berisi jam terpakai, utilisasi, komposisi kegiatan, ruang teraktif, dan ekspor CSV.
- **Notifikasi** in-app untuk pengajuan baru, persetujuan, penolakan, dan pembatalan.

## Aturan bisnis yang diterapkan

1. Mahasiswa wajib mengunggah surat izin kegiatan.
2. Pengajuan mahasiswa minimal **H-3**; dosen/staf/admin boleh mengajukan untuk hari ini.
3. Peminjaman mahasiswa disetujui manual oleh Admin Sarpras.
4. Peminjaman dosen/staf/admin langsung berstatus `APPROVED` jika slot tersedia (`priority = HIGH`).
5. Semua pengguna tidak boleh bentrok dengan jadwal kuliah reguler di ruangan yang sama.
6. Jam operasional 07.00–22.00, kelipatan 30 menit, durasi minimal 30 menit.
7. Slot berstatus `PENDING` ikut menahan jadwal agar tidak terjadi pengajuan ganda.
8. Penolakan atau pembatalan melepas seluruh slot ruang.
9. Ruangan berstatus `MAINTENANCE` tidak dapat dipinjam.
10. Persetujuan ulang divalidasi terhadap konflik kelas dan status ruangan.

## Pencegahan double booking

Setiap peminjaman dipecah menjadi slot 30 menit pada tabel `booking_slots`:

```sql
CREATE TABLE booking_slots (
  room_id UUID NOT NULL,
  booking_date DATE NOT NULL,
  slot_min INTEGER NOT NULL,
  booking_id UUID NOT NULL,
  PRIMARY KEY (room_id, booking_date, slot_min)
);
```

Alur `POST /api/bookings`:

1. Validasi aturan bisnis dan konflik jadwal kuliah.
2. Jalankan transaksi database.
3. Simpan booking + dokumen.
4. Insert seluruh slot 30 menit dalam satu perintah.
5. Composite primary key menjamin dua booking tidak bisa memiliki slot yang sama, bahkan jika dua request masuk bersamaan.
6. Jika terjadi unique violation (`23505`), transaksi di-rollback dan API mengembalikan `409 Conflict`.
7. Saat pengajuan ditolak/dibatalkan, baris slot untuk booking tersebut dihapus.

Pendekatan ini bekerja baik di PostgreSQL maupun mode demo `pg-mem`, tanpa bergantung pada satu proses Node.

## Skema database

File lengkap: [`server/db/schema.sql`](server/db/schema.sql)

```mermaid
erDiagram
  USERS ||--o{ BOOKINGS : membuat
  ORGANIZATIONS ||--o{ BOOKINGS : atas_nama
  USERS ||--o{ NOTIFICATIONS : menerima
  ROOMS ||--o{ BOOKINGS : dipinjam
  ROOMS ||--o{ CLASS_SCHEDULES : memiliki
  ROOMS ||--o{ ROOM_FACILITIES : memiliki
  FACILITIES ||--o{ ROOM_FACILITIES : tersedia_di
  BOOKINGS ||--o| BOOKING_DOCUMENTS : melampirkan
  BOOKINGS ||--o{ BOOKING_SLOTS : menahan
```

| Tabel | Fungsi |
|---|---|
| `users` | Akun, peran (`STUDENT`, `LECTURER`, `ADMIN`), program studi |
| `rooms` | Data ruang, kapasitas, gedung, foto, status |
| `organizations` | Referensi resmi BEM, HMJ, dan UKM IDB Bali |
| `facilities` | Master fasilitas dan ikon |
| `room_facilities` | Relasi many-to-many ruang–fasilitas |
| `class_schedules` | Jadwal kuliah reguler berulang per hari |
| `bookings` | Pengajuan, organisasi, status, prioritas, catatan admin |
| `booking_documents` | Surat izin kegiatan |
| `booking_slots` | Slot 30 menit; kunci utama pencegah double booking |
| `notifications` | Notifikasi in-app per pengguna |

## API utama

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| `POST` | `/api/auth/login` | Publik | Login dan JWT |
| `GET` | `/api/auth/me` | Auth | Profil saat ini |
| `GET` | `/api/dashboard` | Auth | Data dashboard |
| `GET` | `/api/rooms` | Auth | Katalog + status saat ini |
| `GET` | `/api/organizations` | Auth | Referensi BEM, HMJ, dan UKM |
| `GET` | `/api/rooms/:id/availability?date=` | Auth | Jadwal dan jendela kosong |
| `GET` | `/api/schedule?date=` | Auth | Timeline semua ruang |
| `GET` | `/api/calendar?month=` | Auth | Penanda agenda bulanan |
| `POST` | `/api/bookings` | Auth | Buat pengajuan (multipart) |
| `GET` | `/api/bookings?scope=mine\|all&status=` | Auth | Daftar peminjaman |
| `PATCH` | `/api/bookings/:id/cancel` | Pemilik/Admin | Batalkan |
| `PATCH` | `/api/bookings/:id/review` | Admin | Setujui/tolak |
| `GET` | `/api/bookings/:id/document` | Pemilik/Admin | Unduh surat izin secara privat |
| `GET` | `/api/notifications` | Auth | Notifikasi + unread count |
| `POST/PATCH` | `/api/rooms` | Admin | Tambah/edit ruang |
| `GET` | `/api/admin/reports?month=` | Admin | Laporan agregat |
| `GET` | `/api/admin/reports/export?month=` | Admin | Ekspor CSV |

## Struktur proyek

```text
.
├── client/                 React + Vite + Tailwind
│   ├── public/images/      Foto ruang
│   └── src/
│       ├── components/     Layout, kartu, modal, timeline, kalender
│       ├── context/        Auth dan toast
│       ├── pages/          Dashboard, katalog, kalender, admin
│       ├── lib/            API client, util tanggal, classnames
│       └── types/          Tipe domain
├── server/
│   ├── db/schema.sql       DDL PostgreSQL
│   ├── src/
│   │   ├── lib/            Database, availability, seed, upload
│   │   ├── middleware/     Auth dan role guard
│   │   └── routes/         Auth, rooms, bookings, dashboard, admin
│   └── uploads/            Dokumen surat izin
├── PRD.md                  Product Requirements Document
├── PRODUCT.md
├── DESIGN.md
└── docker-compose.yml
```

## Catatan produksi

- Ganti `JWT_SECRET`, gunakan HTTPS, dan tambahkan rate limiting pada endpoint login.
- JWT saat ini disimpan di `localStorage`; untuk keamanan lebih tinggi gunakan cookie `HttpOnly` + CSRF protection.
- Batasi MIME dan ukuran upload sesuai kebijakan kampus; saat ini PDF/JPG/PNG/WEBP maksimum 5 MB.
- Dokumen surat izin disajikan lewat endpoint terautentikasi; file di `server/uploads` tidak diekspos sebagai URL publik.
- Backup database dan file upload secara berkala.
- Untuk integrasi SSO kampus, ganti alur `/api/auth/login` dengan penyedia identitas kampus.

## Aset foto

Foto ruang adalah placeholder dari [Unsplash](https://unsplash.com) dan perlu diganti dengan foto kampus asli. Sumber foto: `1505373877841-8d25f7d46678`, `1497366754035-f200968a6e72`, `1531482615713-2afd69097998`, `1431540015161-0bf868a2d407`, `1524178232363-1fb2b075b655`, `1601506521937-0121a7fc2a6b`, `1524758631624-e2822e304c36`, `1556761175-b413da4baf72`, `1497366811353-6870744d04b2`, `1540575467063-178a50c2df87`, `1498050108023-c5249f4df085`, dan `1580582932707-520aed937b7b`.
