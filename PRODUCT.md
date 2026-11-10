# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: React 19 + TypeScript + Vite + Tailwind CSS di frontend, Express + PostgreSQL di backend, dengan pg-mem sebagai database demo in-memory agar aplikasi langsung dapat dijalankan.

## Users

- **Mahasiswa**: melihat ketersediaan, mengajukan peminjaman untuk kegiatan UKM/organisasi dengan surat izin, dan melacak status.
- **Dosen / staf**: meminjam ruang untuk perkuliahan, rapat, atau kegiatan program studi dengan jalur persetujuan prioritas.
- **Admin Sarpras**: meninjau pengajuan, mengelola ruang dan fasilitas, serta membaca laporan penggunaan.

## Product Purpose

Menggantikan koordinasi peminjaman ruang yang tersebar di chat dan spreadsheet dengan satu sumber kebenaran untuk ketersediaan, pengajuan, persetujuan, dan laporan. Keberhasilan berarti pengguna menemukan ruang kosong dengan cepat, pengajuan tidak bentrok, dan Sarpras dapat meninjau dengan konteks yang cukup.

## Positioning

IDB Space menggabungkan kalender ketersediaan, aturan akademik kampus (H-3, surat izin, jadwal kuliah reguler), dan alur persetujuan Sarpras dalam satu alur yang dapat dipahami mahasiswa, dosen, dan admin tanpa berpindah alat.

## Operating Context

Digunakan di kampus Institut Desain dan Bisnis Bali, Denpasar. Pengguna mengakses lewat desktop di kantor/studio dan lewat ponsel saat berada di kampus. Kegiatan mencakup kelas reguler, rapat program studi, seminar, workshop, dan kegiatan UKM. Surat izin diunggah sebagai PDF atau gambar. Keputusan Sarpras dikomunikasikan lewat notifikasi in-app.

## Capabilities and Constraints

- Katalog dan kalender ketersediaan per tanggal.
- Pengajuan untuk rentang 30 menit, jam 07.00–22.00.
- Mahasiswa wajib memilih organisasi/UKM resmi, melampirkan surat izin, dan mengajukan minimal H-3.
- Referensi resmi BEM, HMJ, dan UKM tersedia sebagai data awal.
- Dosen/staf/admin mendapat persetujuan otomatis jika slot tersedia.
- Pencegahan double booking di level database melalui `booking_slots`.
- Pengecekan bentrok jadwal kuliah reguler.
- Persetujuan/penolakan admin dan notifikasi.
- Pengelolaan ruang dan fasilitas oleh admin.
- Laporan agregat dan ekspor CSV.
- Data demo berbasis in-memory dan ter-reset saat server dimulai ulang.
- Di luar cakupan: SSO kampus, pembayaran, peminjaman kendaraan, dan integrasi WhatsApp/email.

## Brand Commitments

Nama produk: **IDB Space** — Sistem Peminjaman Ruangan Kampus IDB Bali. Kesan yang dijaga: profesional, hangat, modern, dan cocok untuk kampus desain & bisnis. Warna inti mengikuti logo IDB Bali: teal, orange, dan netral slate; emerald dipakai untuk status tersedia. Bahasa antarmuka: Indonesia, ringkas, dan tidak birokratis.

## Evidence on Hand

Tidak ada data operasional nyata. Seluruh ruang, pengguna, jadwal, dan pengajuan di seed adalah data sintetis untuk demonstrasi. Foto ruang berasal dari Unsplash dan berfungsi sebagai placeholder visual; ganti dengan foto kampus asli sebelum produksi.

## Product Principles

1. Ketersediaan harus terlihat sebelum pengguna diminta mengisi formulir.
2. Aturan akademik harus dijelaskan di tempat keputusan dibuat, bukan disembunyikan dalam error.
3. Slot yang sudah diajukan tidak boleh diam-diam direbut pengguna lain.
4. Admin harus melihat bukti dan konteks sebelum menyetujui.
5. Status harus selalu jelas: tersedia, dipakai, menunggu, disetujui, atau selesai.

## Accessibility & Inclusion

Target WCAG 2.1 AA untuk teks, kontrol, fokus, dan dialog. Mendukung navigasi keyboard pada modal, focus ring yang terlihat, label form, serta `prefers-reduced-motion`.
