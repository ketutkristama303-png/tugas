# Product Requirements Document (PRD)

## IDB Space — Sistem Peminjaman Ruangan Kampus

| Item | Keterangan |
|---|---|
| Nama produk | IDB Space |
| Nama lengkap | IDB Space — Sistem Peminjaman Ruangan Kampus IDB Bali |
| Nama sebelumnya | RuangBoard IDB Bali (sebelumnya Ruang IDB) |
| Jenis produk | Aplikasi web internal kampus |
| Pemilik produk | Product Team IDB Bali |
| Pemangku kepentingan | Wakil Rektor Kemahasiswaan, Kepala Sarpras, Program Studi, BEM/HMJ/UKM |
| Status dokumen | Living document — MVP baseline |
| Versi | 1.0 |
| Tanggal | 21 Oktober 2026 |
| Platform | Web responsif (desktop dan mobile) |
| Dokumen terkait | `README.md`, `PRODUCT.md`, `DESIGN.md` |

---

## 1. Executive Summary

Institut Desain dan Bisnis Bali (IDB Bali) memiliki kebutuhan operasional yang tinggi terhadap ruang kampus: studio, laboratorium komputer, ruang kelas, ruang rapat, auditorium, hall serbaguna, dan area bersama. Saat ini koordinasi peminjaman berpotensi tersebar di percakapan WhatsApp, pesan langsung, spreadsheet, dan pengajuan manual ke Sarpras. Pola ini menyulitkan mahasiswa, dosen, organisasi mahasiswa, dan pengelola gedung untuk mengetahui ketersediaan ruang secara akurat.

Dampak utamanya adalah risiko bentrok jadwal, pengajuan yang hilang atau terlambat diproses, peminjaman yang bertabrakan dengan kelas reguler, dokumen surat izin yang tidak terarsip, serta minimnya data untuk evaluasi penggunaan ruang. Mahasiswa juga sering harus bertanya berulang kali mengenai status pengajuan, sedangkan Admin Sarpras harus memeriksa beberapa sumber data sebelum mengambil keputusan.

**IDB Space** adalah aplikasi web terpusat untuk melihat ketersediaan ruang, mengajukan peminjaman, meninjau persetujuan, mengelola data ruang, dan membaca laporan penggunaan. Produk ini menggabungkan kalender jadwal, aturan akademik, referensi organisasi resmi, validasi otomatis, serta notifikasi status dalam satu alur kerja.

Baseline MVP telah dibangun dengan arsitektur React + Tailwind CSS di frontend, Express + PostgreSQL di backend, dan mekanisme penguncian slot 30 menit untuk mencegah double booking. Produk dirancang untuk dapat digunakan pada desktop di kantor/studio maupun melalui ponsel saat berada di area kampus.

---

## 2. Latar Belakang dan Problem Statement

### 2.1 Masalah utama

1. **Ketersediaan tidak transparan.** Pengguna tidak memiliki satu sumber kebenaran untuk melihat ruang mana yang kosong pada tanggal dan jam tertentu.
2. **Risiko bentrok jadwal.** Peminjaman dapat bertabrakan dengan kelas reguler, kegiatan lain, atau pengajuan yang masih menunggu persetujuan.
3. **Proses pengajuan tidak konsisten.** Mahasiswa perlu melampirkan surat izin dan mengajukan minimal H-3, tetapi aturan ini belum selalu tervalidasi pada saat pengajuan.
4. **Antrean persetujuan manual.** Admin Sarpras harus meninjau banyak pesan dan dokumen tanpa antrean terpusat.
5. **Status pengajuan tidak terlacak.** Pemohon tidak selalu mendapatkan kepastian apakah pengajuan disetujui, ditolak, atau memerlukan perbaikan.
6. **Data organisasi tidak terhubung.** Nama BEM, HMJ, dan UKM sering ditulis manual sehingga rawan variasi, duplikasi, dan ketidaksesuaian dengan data resmi.
7. **Data penggunaan ruang sulit dievaluasi.** Tidak ada laporan terstruktur tentang jam terpakai, ruang teraktif, dan tingkat persetujuan.

### 2.2 Peluang

IDB Space dapat menjadi sistem operasional tunggal untuk peminjaman ruang kampus, sekaligus menghasilkan data yang dapat digunakan untuk perencanaan kapasitas, kebutuhan fasilitas, dan kebijakan penggunaan ruang.

---

## 3. Product Goals & Objectives

### 3.1 Tujuan produk

1. **Mendigitalisasi alur peminjaman** dari pencarian ruang sampai keputusan Sarpras.
2. **Menghilangkan double booking** melalui validasi slot dan penguncian di level database.
3. **Mencegah bentrok dengan kelas reguler** dan aturan akademik kampus.
4. **Mempercepat pengambilan keputusan** Admin Sarpras melalui antrean dan detail pengajuan yang terpusat.
5. **Meningkatkan transparansi status** melalui notifikasi dan pelacakan pengajuan.
6. **Menghubungkan pengajuan dengan organisasi resmi** BEM, HMJ, dan UKM IDB Bali.
7. **Menyediakan data penggunaan ruang** untuk pengambilan keputusan sarana dan prasarana.

### 3.2 Sasaran terukur

| Sasaran | Metrik | Target |
|---|---|---|
| Adopsi peminjaman digital | Persentase peminjaman yang diproses melalui IDB Space | ≥ 90% dalam 2 bulan setelah peluncuran |
| Akurasi jadwal | Jumlah double booking pada ruang yang sama | 0 kejadian |
| Kecepatan persetujuan | Median waktu dari pengajuan sampai keputusan | ≤ 4 jam kerja |
| Kepatuhan pengajuan | Pengajuan mahasiswa dengan organisasi dan surat izin valid | ≥ 95% |
| Kepuasan pengguna | Skor kepuasan mahasiswa, dosen, dan admin | ≥ 4,2/5 |
| Kualitas layanan | Uptime aplikasi | ≥ 99,5% per bulan |
| Kinerja halaman | Waktu muat dashboard pada 4G | ≤ 2,5 detik |
| Aksesibilitas | Temuan kritis/serius WCAG 2.1 AA | 0 |

---

## 4. Target User / Pengguna Sasaran

### 4.1 Persona utama

#### Persona 1 — Mahasiswa dan Perwakilan Organisasi/UKM

- **Contoh:** Ayu, mahasiswa DKV, pengurus UKM.
- **Kebutuhan:** Mengetahui ruang kosong, mengajukan kegiatan organisasi, melampirkan surat izin, memilih organisasi resmi, dan memantau status.
- **Pain point:** Takut bentrok, tidak tahu harus menghubungi siapa, dan tidak mendapat kabar setelah mengajukan.
- **Kriteria sukses:** Pengajuan selesai dalam satu alur, status jelas, dan keputusan diterima tanpa perlu bertanya ulang.

#### Persona 2 — Dosen dan Staf Akademik

- **Contoh:** Ratu, dosen yang membutuhkan ruang untuk kelas tamu atau rapat program studi.
- **Kebutuhan:** Meminjam ruang dengan jalur prioritas, melihat jadwal kelas, dan mendapatkan konfirmasi cepat.
- **Pain point:** Kebutuhan mendadak untuk rapat atau kelas pengganti.
- **Kriteria sukses:** Peminjaman langsung disetujui saat slot tersedia tanpa mengurangi pengawasan Sarpras.

#### Persona 3 — Admin Sarpras / Pengelola Gedung

- **Contoh:** Rangga, staf Sarpras yang mengelola 12 ruang kampus.
- **Kebutuhan:** Antrean pengajuan, dokumen surat izin, peta jadwal, catatan keputusan, pengelolaan ruang, dan laporan.
- **Pain point:** Data tersebar, konflik jadwal, dan banyak pengajuan yang harus dicek manual.
- **Kriteria sukses:** Meninjau pengajuan dengan konteks lengkap dan mengambil keputusan tanpa berpindah aplikasi.

### 4.2 Matriks peran

| Kapabilitas | Mahasiswa | Dosen/Staf | Admin Sarpras |
|---|---:|---:|---:|
| Melihat dashboard dan ketersediaan | Ya | Ya | Ya |
| Melihat katalog dan fasilitas ruang | Ya | Ya | Ya |
| Mengajukan peminjaman | Ya | Ya | Ya |
| Wajib memilih organisasi/UKM | Ya | Tidak | Tidak |
| Wajib surat izin kegiatan | Ya | Tidak | Tidak |
| Minimal H-3 | Ya | Tidak | Tidak |
| Persetujuan otomatis | Tidak | Ya, jika slot tersedia | Ya, jika slot tersedia |
| Menyetujui/menolak pengajuan | Tidak | Tidak | Ya |
| Mengelola ruang dan status perawatan | Tidak | Tidak | Ya |
| Melihat laporan penggunaan | Tidak | Tidak | Ya |
| Mengunduh dokumen surat izin | Milik sendiri | Milik sendiri | Ya |

---

## 5. Ruang Lingkup

### 5.1 In scope — MVP

- Login berbasis akun kampus dan JWT.
- Dashboard per peran dengan status ketersediaan real-time (polling dan refresh saat navigasi).
- Kalender bulanan dan timeline ketersediaan ruang.
- Katalog ruang dengan foto, kapasitas, fasilitas, dan status.
- Pengajuan peminjaman dengan slot 30 menit.
- Referensi organisasi resmi BEM, HMJ, dan UKM.
- Pemilihan organisasi pada form pengajuan mahasiswa.
- Unggah surat izin PDF/JPG/PNG/WEBP maksimum 5 MB.
- Validasi H-3, bentrok kelas, bentrok peminjaman, dan jam operasional.
- Penguncian slot untuk mencegah double booking.
- Persetujuan/penolakan oleh Admin Sarpras beserta catatan.
- Notifikasi in-app.
- Pengelolaan data ruang dan status perawatan.
- Laporan penggunaan ruang dan ekspor CSV.
- Antarmuka responsif dan aksesibel.

### 5.2 Out of scope — MVP

- Integrasi SSO kampus.
- Notifikasi email, WhatsApp, atau push notification.
- Peminjaman berulang otomatis.
- Waitlist atau antrean otomatis saat slot penuh.
- QR check-in/check-out ruang.
- Pembayaran atau deposit.
- Peminjaman kendaraan dan inventaris.
- Aplikasi native iOS/Android.
- Integrasi penuh dengan sistem akademik.
- Manajemen kontak organisasi secara self-service oleh mahasiswa.

### 5.3 Rencana setelah MVP

- CRUD organisasi/UKM oleh admin.
- Template surat izin dan verifikasi dokumen.
- Notifikasi email dan WhatsApp.
- Persetujuan berjenjang.
- Waitlist dan auto-release slot kedaluwarsa.
- Check-in QR.
- SSO kampus.
- Analitik penggunaan ruang yang lebih dalam.

---

## 6. User Stories & Functional Requirements

### 6.1 User stories prioritas

| ID | User story | Prioritas |
|---|---|---|
| US-01 | Sebagai mahasiswa, saya ingin melihat ketersediaan ruangan secara real-time agar bisa merencanakan kegiatan. | Must |
| US-02 | Sebagai mahasiswa, saya ingin mengajukan peminjaman ruangan dengan melampirkan surat izin kegiatan dan memilih organisasi/UKM terkait. | Must |
| US-03 | Sebagai mahasiswa, saya ingin melihat status pengajuan saya agar tahu apakah masih menunggu, disetujui, atau ditolak. | Must |
| US-04 | Sebagai dosen/staf, saya ingin meminjam ruang untuk kelas atau rapat dengan persetujuan cepat agar kegiatan tidak tertunda. | Must |
| US-05 | Sebagai admin, saya ingin menyetujui atau menolak pengajuan dengan melihat jadwal dan dokumen agar keputusan tidak menimbulkan bentrok. | Must |
| US-06 | Sebagai admin, saya ingin mengelola status ruang dan fasilitas agar katalog selalu akurat. | Must |
| US-07 | Sebagai admin, saya ingin melihat laporan penggunaan ruang agar dapat mengevaluasi kapasitas dan kebutuhan fasilitas. | Should |
| US-08 | Sebagai perwakilan organisasi, saya ingin memilih nama BEM/HMJ/UKM yang resmi agar pengajuan sesuai dengan data kampus. | Must |

### 6.2 Functional requirements

#### Auth dan akses

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-AUTH-01 | Pengguna dapat login menggunakan email dan kata sandi kampus. | Must | Kredensial valid menghasilkan JWT dan sesi; kredensial salah menampilkan pesan yang jelas tanpa membocorkan detail akun. |
| FR-AUTH-02 | Sistem menerapkan RBAC untuk mahasiswa, dosen/staf, dan admin. | Must | Setiap endpoint dilindungi; pengguna tanpa izin menerima 403; admin route tidak dapat diakses peran lain. |
| FR-AUTH-03 | Sesi kedaluwarsa dan pengguna diarahkan kembali ke login. | Must | Token kedaluwarsa menampilkan state login, bukan halaman kosong. |

#### Dashboard dan kalender

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-DASH-01 | Dashboard menampilkan ringkasan ruang tersedia, dipakai, pengajuan menunggu, dan agenda terdekat. | Must | Angka sesuai data pada saat halaman dimuat dan diperbarui berkala. |
| FR-DASH-02 | Dashboard menampilkan timeline ketersediaan seluruh ruang untuk hari ini. | Must | Setiap ruang menampilkan blok kelas, peminjaman, status menunggu, dan garis waktu sekarang. |
| FR-DASH-03 | Kalender bulanan menampilkan tanggal dengan agenda dan panel jadwal per tanggal. | Must | Pengguna dapat berpindah bulan, memilih tanggal, dan melihat daftar ruang kosong serta agenda. |
| FR-DASH-04 | Kalender menampilkan state loading, error, dan retry. | Must | Kegagalan API tidak boleh tampil sebagai jadwal kosong. |

#### Katalog ruang

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-ROOM-01 | Pengguna dapat mencari ruang berdasarkan nama, kode, gedung, atau fasilitas. | Must | Hasil pencarian sesuai kata kunci dan dapat direset. |
| FR-ROOM-02 | Pengguna dapat memfilter ruang berdasarkan jenis, kapasitas, dan ketersediaan saat ini. | Must | Filter dapat dikombinasikan dan menghasilkan jumlah hasil yang benar. |
| FR-ROOM-03 | Kartu ruang menampilkan foto, kode, nama, lokasi, kapasitas, fasilitas, dan status. | Must | Status tersedia/dipakai/perawatan memiliki label, bukan hanya warna. |
| FR-ROOM-04 | Ruang berstatus perawatan tidak dapat dipinjam. | Must | Tombol dipinjam dinonaktifkan dan API menolak permintaan. |

#### Pengajuan peminjaman

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-BOOK-01 | Mahasiswa dapat memilih tanggal, jam mulai, dan jam selesai. | Must | Slot 30 menit, minimum 30 menit, dalam jam operasional 07.00–22.00. |
| FR-BOOK-02 | Mahasiswa wajib memilih organisasi/UKM resmi. | Must | Tanpa organisasi, pengajuan tidak dapat dikirim; organisasi disimpan pada booking. |
| FR-BOOK-03 | Mahasiswa wajib mengunggah surat izin. | Must | File PDF/JPG/PNG/WEBP, maksimum 5 MB; file gagal dihapus jika transaksi gagal. |
| FR-BOOK-04 | Mahasiswa wajib mengajukan minimal H-3. | Must | API dan UI menolak tanggal yang tidak memenuhi aturan. |
| FR-BOOK-05 | Dosen/staf dapat mengajukan untuk hari ini. | Must | Slot tersedia langsung disetujui dengan prioritas tinggi. |
| FR-BOOK-06 | Sistem menolak peminjaman yang bentrok dengan kelas reguler. | Must | Pesan error menyebutkan bentrok dan menyarankan memilih waktu lain. |
| FR-BOOK-07 | Sistem menyimpan organisasi, penyelenggara, deskripsi, dokumen, dan status. | Must | Data tampil di halaman peminjaman saya dan detail admin. |
| FR-BOOK-08 | Peminjaman dapat dibatalkan oleh pemilik atau admin. | Must | Slot dilepas; booking berstatus dibatalkan; aksi memerlukan konfirmasi. |

#### Persetujuan

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-APP-01 | Admin melihat antrean pengajuan dengan filter status. | Must | Daftar menampilkan pemohon, organisasi, ruang, tanggal, dan prioritas. |
| FR-APP-02 | Admin dapat membuka detail pengajuan dan mengunduh surat izin secara privat. | Must | Dokumen hanya dapat diakses pemilik dan admin. |
| FR-APP-03 | Admin dapat menyetujui atau menolak dengan catatan. | Must | Status berubah; slot dilepas saat ditolak; pemohon menerima notifikasi. |
| FR-APP-04 | Persetujuan divalidasi ulang terhadap jadwal kelas dan status ruang. | Must | Admin tidak bisa menyetujui jika ruang dalam perawatan atau bentrok kelas. |

#### Organisasi dan UKM

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-ORG-01 | Sistem menyediakan referensi resmi BEM, HMJ, dan UKM. | Must | Data terkelompok per kategori dan hanya organisasi aktif yang muncul di form. |
| FR-ORG-02 | Form mahasiswa menampilkan dropdown "Atas nama organisasi / UKM". | Must | Pilihan dikelompokkan per BEM/HMJ/UKM dan wajib diisi. |
| FR-ORG-03 | Nama organisasi tersimpan pada booking. | Must | Detail peminjaman dan persetujuan admin menampilkan organisasi dan kategorinya. |
| FR-ORG-04 | Admin dapat menambah, mengubah, dan menonaktifkan organisasi. | Should | Perubahan tercermin di dropdown; organisasi nonaktif tidak dapat dipilih. |
| FR-ORG-05 | Admin dapat mengisi contact person organisasi. | Should | Data contact person tersimpan dan dapat ditampilkan di detail admin. |

#### Notifikasi

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-NOTIF-01 | Sistem mengirim notifikasi saat pengajuan dibuat, disetujui, ditolak, atau dibatalkan. | Must | Notifikasi muncul di menu lonceng dan memiliki status belum dibaca. |
| FR-NOTIF-02 | Admin menerima notifikasi pengajuan baru. | Must | Notifikasi menampilkan pemohon dan ruang yang diajukan. |
| FR-NOTIF-03 | Pengguna dapat menandai notifikasi sebagai dibaca. | Should | Single read dan read-all berfungsi serta memperbarui badge. |

#### Pengelolaan ruang

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-MGMT-01 | Admin dapat menambah ruang dengan kode, nama, jenis, kapasitas, lokasi, foto, dan fasilitas. | Must | Kode ruang unik dan data tampil di katalog. |
| FR-MGMT-02 | Admin dapat mengubah detail ruang dan fasilitas. | Must | Perubahan langsung tercermin pada katalog. |
| FR-MGMT-03 | Admin dapat mengubah status ruang menjadi aktif atau perawatan. | Must | Ruang perawatan tidak dapat dipinjam. |
| FR-MGMT-04 | Admin dapat melihat fasilitas master. | Should | Fasilitas baru dapat ditambahkan melalui data master. |

#### Laporan

| ID | Requirement | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-REP-01 | Admin dapat melihat total pengajuan, persetujuan, jam terpakai, dan utilisasi. | Must | Angka dihitung untuk periode bulan yang dipilih. |
| FR-REP-02 | Admin dapat melihat distribusi harian, aktivitas, dan ruang teraktif. | Should | Grafik dan tabel konsisten dengan data booking. |
| FR-REP-03 | Admin dapat mengekspor laporan ke CSV. | Should | CSV berisi ringkasan dan data per ruangan. |

### 6.3 Acceptance criteria untuk alur utama mahasiswa

**Skenario: mengajukan peminjaman yang valid**

- **Given** mahasiswa sudah login dan memilih ruang aktif,
- **When** mahasiswa memilih organisasi resmi, tanggal minimal H-3, slot yang tidak bentrok, mengisi detail kegiatan, dan mengunggah surat izin,
- **Then** sistem membuat booking berstatus `PENDING`,
- **And** slot ruang langsung ditahan,
- **And** mahasiswa serta admin menerima notifikasi.

**Skenario: double booking**

- **Given** slot ruang sudah ditahan booking lain,
- **When** pengguna mengirim peminjaman pada slot yang sama,
- **Then** API mengembalikan `409 Conflict`,
- **And** tidak ada booking baru atau slot parsial yang tersimpan.

**Skenario: bentrok kelas**

- **Given** ruang memiliki jadwal kuliah pada waktu yang dipilih,
- **When** pengguna mengirim peminjaman,
- **Then** sistem menolak dengan pesan yang menjelaskan bentrok kelas,
- **And** pengguna dapat memilih slot lain tanpa kehilangan data form.

---

## 7. System Features & Modules

### 7.1 Dashboard Interaktif

- Ringkasan status ruang dan pengajuan.
- Timeline ketersediaan harian dengan garis waktu sekarang.
- Agenda terdekat milik pengguna.
- Antrean persetujuan untuk admin.
- Shortcut ke katalog, kalender, dan pengajuan.

### 7.2 Kalender Jadwal

- Tampilan bulanan dengan penanda jumlah agenda.
- Pemisahan visual antara disetujui dan menunggu.
- Panel detail per tanggal berisi status tiap ruang dan aksi pinjam.
- State loading, error, dan retry.

### 7.3 Katalog Ruangan

- Pencarian dan filter.
- Kartu ruang dengan foto, kapasitas, fasilitas, dan status.
- Kategori: ruang kelas, studio, laboratorium, ruang rapat, auditorium/hall, dan area bersama.
- Contoh ruang: Studio Gambar, Studio Foto & Videografi, Lab Komputer Bisnis, Lab Komputer Multimedia/iMac, Auditorium Ida Ayu, Gedung Serbaguna/Hall B, Ruang Kelas 2A, Ruang Kelas Magister, Ruang Rapat Saraswati, Ruang Rapat Sidang Utama, Co-working Lounge, Co-working Space Lt. 3.
- Ruang asistensi dapat ditambahkan sebagai data katalog apabila sudah tersedia di kampus.

### 7.4 Pengajuan Peminjaman

- Form dua kolom dengan ringkasan ruang dan peta ketersediaan.
- Pemilihan organisasi/UKM untuk mahasiswa.
- Validasi langsung untuk tanggal, jam, bentrok, dan dokumen.
- Unggah surat izin dengan drag-and-drop atau pemilih file.
- Estimasi status setelah submit: menunggu admin atau disetujui otomatis untuk staf.

### 7.5 Persetujuan Sarpras

- Antrean pengajuan dengan filter status.
- Detail pemohon, organisasi, kegiatan, dokumen, jadwal, dan peta ruang.
- Aksi setujui/tolak dengan catatan.
- Validasi ulang terhadap kelas dan status ruang.
- Penolakan melepas slot.

### 7.6 Manajemen Organisasi & UKM

- Referensi resmi 16 organisasi IDB Bali.
- Pengelompokan BEM, HMJ, dan UKM.
- Relasi organisasi ke booking melalui `organization_id`.
- Rencana lanjutan: CRUD admin, status aktif, dan contact person.

### 7.7 Manajemen Ruang

- Tambah dan ubah ruang.
- Pengaturan kapasitas, lokasi, deskripsi, foto, dan fasilitas.
- Status aktif/perawatan.
- Katalog selalu mengikuti data master.

### 7.8 Notifikasi

- Notifikasi in-app untuk pengajuan baru, persetujuan, penolakan, dan pembatalan.
- Badge unread dan panel notifikasi.
- Tanda baca untuk satu atau semua notifikasi.
- Rencana lanjutan: email/WhatsApp.

### 7.9 Laporan

- Total pengajuan, disetujui, ditolak, dan dibatalkan.
- Jam terpakai dan utilisasi.
- Distribusi peminjaman per hari.
- Komposisi jenis kegiatan.
- Ruang paling aktif.
- Ekspor CSV.

---

## 8. Business Rules

| ID | Aturan |
|---|---|
| BR-01 | Jam operasional peminjaman adalah 07.00–22.00 WITA. |
| BR-02 | Slot menggunakan kelipatan 30 menit; durasi minimum 30 menit. |
| BR-03 | Mahasiswa wajib memilih organisasi/UKM aktif. |
| BR-04 | Mahasiswa wajib melampirkan surat izin kegiatan. |
| BR-05 | Pengajuan mahasiswa minimal H-3. |
| BR-06 | Dosen/staf/admin mendapat persetujuan otomatis jika slot tersedia. |
| BR-07 | Semua peran tidak boleh bentrok dengan jadwal kuliah reguler. |
| BR-08 | Booking berstatus `PENDING` dan `APPROVED` menahan slot. |
| BR-09 | Penolakan dan pembatalan melepas seluruh slot booking. |
| BR-10 | Ruang berstatus `MAINTENANCE` tidak dapat dipinjam atau disetujui. |
| BR-11 | Satu slot ruang hanya boleh dimiliki satu booking pada satu waktu. |
| BR-12 | Dokumen surat izin hanya dapat diakses pemilik booking dan admin. |
| BR-13 | Organisasi yang dinonaktifkan tidak muncul pada form pengajuan. |
| BR-14 | Admin wajib melihat detail dan dokumen sebelum menyetujui. |

### 8.1 Konkurensi dan double booking

Setiap booking dipecah menjadi slot 30 menit pada tabel `booking_slots` dengan primary key `(room_id, booking_date, slot_min)`. Insert slot dilakukan dalam transaksi yang sama dengan booking. Jika ada konflik, transaksi di-rollback dan API mengembalikan `409 Conflict`. Mekanisme ini melindungi dari dua request yang masuk hampir bersamaan, tidak hanya dari pengecekan aplikasi.

---

## 9. Non-Functional Requirements

### 9.1 Performa

- Dashboard dapat dimuat pada koneksi 4G dalam ≤ 2,5 detik untuk data 12 ruangan.
- Respons API ketersediaan dan pembuatan booking ≤ 500 ms pada kondisi normal.
- Pengecekan bentrok harus tetap akurat saat request paralel.

### 9.2 Keamanan

- Kata sandi di-hash dengan bcrypt.
- JWT digunakan untuk autentikasi; secret wajib diatur melalui environment produksi.
- RBAC diterapkan di setiap endpoint.
- Dokumen surat izin disajikan melalui endpoint terautentikasi, bukan URL publik.
- Upload dibatasi tipe dan ukuran.
- Validasi input menggunakan schema validation di server.
- Rate limiting login dan upload direkomendasikan sebelum produksi.
- Untuk hardening produksi, pertimbangkan cookie HttpOnly dan CSRF protection.

### 9.3 Aksesibilitas

- Target WCAG 2.1 AA.
- Navigasi keyboard, focus ring, focus trap modal, label form, dan pengumuman error.
- Status tidak hanya dibedakan melalui warna.
- Dukungan `prefers-reduced-motion`.
- Audit axe pada halaman utama dan modal harus bebas pelanggaran kritis/serius.

### 9.4 Responsivitas

- Desktop 1280–1600 px.
- Mobile 390 px.
- Tidak boleh ada horizontal overflow pada level halaman.
- Tabel dan filter harus tetap dapat digunakan pada layar kecil.

### 9.5 Reliabilitas

- Uptime ≥ 99,5% per bulan.
- Transaksi booking harus atomik.
- Backup database dan file upload dilakukan berkala.
- Error API tidak boleh ditampilkan sebagai data kosong.

### 9.6 Privasi dan retensi

- Data pengguna hanya digunakan untuk keperluan peminjaman.
- Dokumen surat izin disimpan secara privat.
- Kebijakan retensi data dan penghapusan dokumen perlu ditetapkan oleh kampus.
- Akses dokumen harus dapat diaudit pada fase berikutnya.

### 9.7 Kompatibilitas

- Chrome, Safari, Edge versi modern.
- Web responsif; tidak memerlukan instalasi aplikasi.

### 9.8 Maintainability

- TypeScript untuk frontend.
- Pemisahan route, service, mapper, dan schema database.
- Environment terpisah untuk demo dan produksi.
- Build produksi dan typecheck harus lolos sebelum rilis.

---

## 10. Tech Stack

| Layer | Teknologi | Catatan |
|---|---|---|
| Frontend | React 19 + TypeScript + Vite | SPA responsif |
| Styling | Tailwind CSS | Token warna dan komponen UI |
| State/data | TanStack Query + React Router | Caching, invalidasi, dan routing |
| Backend | Node.js + Express | REST API |
| Auth | JWT + bcrypt | Role-based access control |
| Validasi | Zod | Validasi request server |
| Database | PostgreSQL 16 | Relasi tabel dan transaksi |
| Demo database | pg-mem | PostgreSQL in-memory untuk pengembangan |
| Upload | Multer | PDF/gambar, maksimum 5 MB |
| Deployment | Node.js + PostgreSQL | Dapat menggunakan Docker |
| Alternatif institusi | Laravel + MySQL | Dapat dipertimbangkan bila menjadi standar kampus; bukan baseline saat ini |

### 10.1 Arsitektur ringkas

```text
Browser (React SPA)
        │ HTTPS / JWT
        ▼
Express REST API ─── PostgreSQL
        │
        ├── File dokumen privat
        └── Notifikasi in-app
```

---

## 11. Data Model

### 11.1 Entitas utama

| Entitas | Fungsi |
|---|---|
| `users` | Akun dan peran pengguna |
| `organizations` | Referensi resmi BEM, HMJ, dan UKM |
| `rooms` | Master ruang dan status |
| `facilities` | Master fasilitas |
| `room_facilities` | Relasi ruang–fasilitas |
| `class_schedules` | Jadwal kuliah reguler berulang |
| `bookings` | Pengajuan dan status peminjaman |
| `booking_documents` | Surat izin kegiatan |
| `booking_slots` | Slot 30 menit dan penguncian ruang |
| `notifications` | Notifikasi pengguna |

### 11.2 Relasi penting

```text
users 1 ── N bookings
organizations 1 ── N bookings
rooms 1 ── N bookings
rooms 1 ── N class_schedules
rooms N ── N facilities (room_facilities)
bookings 1 ── 0..1 booking_documents
bookings 1 ── N booking_slots
users 1 ── N notifications
```

### 11.3 Field organisasi

`organizations`:

- `id` UUID
- `name` unik
- `category` (`BEM`, `HMJ`, `UKM`)
- `contact_person` opsional
- `is_active`
- `created_at`

`bookings` menambahkan `organization_id` sebagai foreign key opsional. Untuk booking mahasiswa, field ini wajib terisi.

---

## 12. API Surface

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| POST | `/api/auth/login` | Publik | Login |
| GET | `/api/auth/me` | Auth | Profil pengguna |
| GET | `/api/dashboard` | Auth | Ringkasan dashboard |
| GET | `/api/rooms` | Auth | Katalog ruang |
| GET | `/api/rooms/:id/availability` | Auth | Ketersediaan ruang |
| GET | `/api/schedule` | Auth | Jadwal semua ruang pada tanggal |
| GET | `/api/calendar` | Auth | Ringkasan kalender bulanan |
| GET | `/api/organizations` | Auth | Referensi BEM/HMJ/UKM |
| POST | `/api/bookings` | Auth | Membuat pengajuan |
| GET | `/api/bookings` | Auth | Daftar peminjaman |
| GET | `/api/bookings/:id/document` | Pemilik/Admin | Dokumen privat |
| PATCH | `/api/bookings/:id/cancel` | Pemilik/Admin | Pembatalan |
| PATCH | `/api/bookings/:id/review` | Admin | Persetujuan/penolakan |
| GET | `/api/notifications` | Auth | Notifikasi |
| PATCH | `/api/notifications/read-all` | Auth | Tandai semua dibaca |
| POST/PATCH | `/api/rooms` | Admin | Pengelolaan ruang |
| GET | `/api/admin/reports` | Admin | Laporan |
| GET | `/api/admin/reports/export` | Admin | Ekspor CSV |

---

## 13. Notifications & Communication

### 13.1 Notifikasi MVP

- Pengajuan berhasil dikirim.
- Pengajuan baru untuk admin.
- Peminjaman disetujui.
- Peminjaman ditolak.
- Peminjaman dibatalkan.
- Pengajuan langsung disetujui untuk dosen/staf.

### 13.2 Kanal mendatang

- Email kampus.
- WhatsApp gateway.
- Push notification web.
- Reminder sebelum kegiatan.

---

## 14. Success Metrics & Analytics

### 14.1 Metrik produk

- Jumlah pengajuan per bulan.
- Persentase pengajuan disetujui, ditolak, dibatalkan.
- Rata-rata waktu persetujuan.
- Persentase penggunaan organisasi resmi.
- Persentase pengajuan yang gagal karena bentrok.
- Jumlah ruang unik yang digunakan.
- Utilisasi per ruangan.

### 14.2 Event analitik yang direkomendasikan

- `login_success`
- `room_search`
- `room_filter_applied`
- `booking_started`
- `organization_selected`
- `booking_submitted`
- `booking_conflict`
- `booking_approved`
- `booking_rejected`
- `booking_cancelled`
- `report_exported`

---

## 15. Risks, Assumptions & Dependencies

### 15.1 Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data jadwal kuliah tidak lengkap | Peminjaman dapat bentrok dengan kelas | Jadwal reguler dikelola dan diverifikasi sebelum rilis |
| Admin lambat meninjau | Slot tertahan terlalu lama | SLA persetujuan, reminder, dan auto-expiry pada fase berikutnya |
| Surat izin palsu/tidak valid | Penyalahgunaan ruang | Verifikasi dokumen oleh admin dan templating resmi |
| Perubahan status ruang tidak sinkron | Booking disetujui pada ruang perawatan | Validasi ulang saat persetujuan |
| SSO belum tersedia | Pengelolaan akun manual | Akun awal dikelola admin; SSO pada fase lanjutan |
| Beban pengguna tinggi pada jam tertentu | API melambat | Query optimization, index, caching, dan load test |
| Data demo in-memory ter-reset | Data hilang saat restart | Gunakan PostgreSQL untuk lingkungan non-demo |

### 15.2 Asumsi

- Setiap mahasiswa memiliki akun kampus.
- Admin Sarpras bertanggung jawab atas akurasi data ruang dan jadwal kuliah.
- Surat izin kegiatan diterbitkan oleh organisasi atau program studi terkait.
- Jam operasional ruang kampus adalah 07.00–22.00 WITA.

### 15.3 Dependensi

- Database PostgreSQL untuk produksi.
- Penyimpanan file yang aman dan dapat dibackup.
- Data organisasi resmi dari bagian kemahasiswaan.
- Data jadwal kuliah dari program studi.
- Kebijakan kampus tentang retensi dokumen dan persetujuan.

---

## 16. Release Plan

### Fase 0 — MVP Baseline (selesai)

- Login dan RBAC.
- Dashboard, katalog, kalender.
- Pengajuan dengan surat izin dan organisasi.
- Persetujuan admin.
- Notifikasi in-app.
- Pengelolaan ruang.
- Laporan dan CSV.
- 12 ruang dan 16 organisasi awal.

### Fase 1 — Pilot Kampus

- UAT dengan Sarpras dan perwakilan mahasiswa.
- CRUD organisasi/UKM oleh admin.
- Kontak person organisasi.
- Notifikasi email.
- SLA pengingat pengajuan.
- Audit akses dokumen.
- Migrasi ke PostgreSQL produksi.

### Fase 2 — Efisiensi Operasional

- Auto-expire pengajuan pending.
- Waitlist.
- Peminjaman berulang.
- QR check-in/check-out.
- Template surat izin.
- Persetujuan berjenjang.

### Fase 3 — Integrasi Kampus

- SSO kampus.
- Integrasi jadwal akademik.
- WhatsApp gateway.
- Analitik kapasitas ruang.
- Integrasi inventaris/fasilitas.

---

## 17. Acceptance & QA

### 17.1 Skenario wajib sebelum rilis

- Login untuk tiga peran berhasil.
- Mahasiswa melihat katalog dan jadwal.
- Mahasiswa tanpa organisasi tidak dapat mengirim booking.
- Mahasiswa tanpa surat izin tidak dapat mengirim booking.
- Mahasiswa dengan tanggal H-2 ditolak.
- Mahasiswa dengan tanggal H-3 dapat mengirim.
- Booking yang bentrok dengan kelas ditolak.
- Dua booking pada slot yang sama: satu berhasil, satu mendapat `409`.
- Dosen/staf mendapat persetujuan otomatis saat slot tersedia.
- Admin dapat menyetujui dan menolak dengan catatan.
- Penolakan melepas slot.
- Dokumen hanya dapat diakses pemilik/admin.
- Kalender menampilkan state error, bukan agenda kosong palsu.
- Dashboard, katalog, kalender, dan form berfungsi pada 390 px.
- Modal dapat digunakan dengan keyboard dan mengembalikan fokus.
- Audit axe WCAG A/AA tidak menemukan pelanggaran kritis/serius.

### 17.2 Definition of Done

- Requirement memiliki acceptance criteria yang terpenuhi.
- Typecheck dan build produksi lolos.
- Tidak ada error console pada alur utama.
- Dokumen PRD, README, dan desain diperbarui.
- Data seed dan migrasi database tersedia.
- UAT disetujui Product Owner dan Admin Sarpras.

---

## 18. Open Questions

1. Apakah seluruh 16 organisasi sudah final dan memiliki narahubung resmi?
2. Berapa SLA resmi persetujuan Sarpras untuk setiap pengajuan?
3. Apakah dosen boleh meminjam ruang yang sedang dipakai kelas reguler dengan izin khusus?
4. Apakah surat izin harus menggunakan template resmi kampus?
5. Apakah SSO kampus akan digunakan pada fase pilot atau fase berikutnya?
6. Berapa lama dokumen surat izin perlu disimpan?
7. Apakah ruang asistensi dan studio gambar perlu ditambahkan sebagai kategori khusus?
8. Apakah diperlukan persetujuan berjenjang untuk auditorium atau hall?
9. Apakah notifikasi WhatsApp menjadi kebutuhan wajib setelah pilot?
10. Siapa yang menjadi Product Owner dan approver akhir untuk perubahan ruang?

---

## 19. Appendix

### A. Daftar organisasi resmi awal

| Kategori | Nama |
|---|---|
| BEM | Badan Eksekutif Mahasiswa (BEM IDB Bali) |
| HMJ | HMJ GRAVITY (DKV) |
| HMJ | HMJ WICWAKARMA (Desain Interior) |
| HMJ | HMJ DAMODA (Desain Mode) |
| HMJ | HMJ EXECUTIVE (Bisnis Digital) |
| HMJ | HMJ THEOREMA (Manajemen Bisnis) |
| HMJ | HMJ CREANOVA (Teknologi & Bisnis) |
| HMJ | HMJ CITRAKARA (Arsitektur) |
| UKM | UKM Obscura (Fotografi & Videografi) |
| UKM | UKM Gravity Music Squad (Musik) |
| UKM | UKM Thunder Dance (Dance) |
| UKM | UKM Gravity Football Club (Futsal/Sepak Bola) |
| UKM | UKM Bluerange E-Sport |
| UKM | UKM Mapala WB (Pencinta Alam) |
| UKM | UKM Euphemia Chatra (Paduan Suara) |
| UKM | UKM Creativepreneur |

### B. Inventaris ruang baseline

| Kode | Nama | Tipe | Kapasitas |
|---|---|---|---:|
| AUD-01 | Auditorium Ida Ayu | Auditorium | 180 |
| AUD-02 | Gedung Serbaguna / Hall B | Auditorium/Hall | 100 |
| STD-02 | Studio Gambar | Studio | 30 |
| STD-04 | Studio Foto & Videografi | Studio | 15 |
| LAB-01 | Lab Komputer Bisnis | Laboratorium | 36 |
| LAB-02 | Lab Komputer Multimedia / iMac | Laboratorium | 35 |
| KLS-2A | Ruang Kelas 2A | Ruang kelas | 40 |
| KLS-MAG | Ruang Kelas Magister | Ruang kelas | 30 |
| RPT-03 | Ruang Rapat Saraswati | Ruang rapat | 12 |
| RPT-04 | Ruang Rapat Sidang Utama | Ruang rapat | 20 |
| LNG-01 | Co-working Lounge | Area bersama | 24 |
| LNG-02 | Co-working Space Lt. 3 | Area bersama | 25 |

### C. Glossary

| Istilah | Definisi |
|---|---|
| Booking | Pengajuan penggunaan ruang pada tanggal dan waktu tertentu |
| Slot | Blok waktu 30 menit yang menahan ketersediaan ruang |
| Pending | Pengajuan yang menunggu keputusan admin |
| Double booking | Dua booking pada ruang, tanggal, dan slot yang sama |
| Sarpras | Sarana dan Prasarana |
| BEM | Badan Eksekutif Mahasiswa |
| HMJ | Himpunan Mahasiswa Jurusan |
| UKM | Unit Kegiatan Mahasiswa |
| RBAC | Role-Based Access Control |
| H-3 | Minimal tiga hari sebelum tanggal kegiatan |
| Utilisasi | Rasio jam peminjaman terhadap kapasitas waktu ruang |
