# Perapihan Navigasi Atas & Efek Animasi Mengambang Kartu Interaktif

Penyempurnaan visual navigasi atas menjadi tab segmented halus dengan bayangan lembut, serta penambahan efek mengambang terangkat 4px (*smooth 4px lift & graduated shadow*) pada seluruh kartu di setiap halaman portofolio sesuai preferensi yang dikonfirmasi.

## User Review & Critical Decisions

> [!IMPORTANT]
> Seluruh keputusan telah dikonfirmasi melalui klarifikasi:
> - **Gaya Navigasi Atas**: Tab segmented halus berlatar netral dengan bayangan lembut (`p-1 bg-neutral-200/60 rounded-lg border border-neutral-200/80` dengan item aktif `bg-white text-neutral-950 font-semibold shadow-xs`).
> - **Intensitas Animasi Kartu**: Mengambang halus terangkat 4px (`hover:-translate-y-1` atau `transform: translateY(-4px)`) dipadu bayangan bergradasi lembut (`hover:shadow-md`) dengan kurva easing `cubic-bezier(0.22, 1, 0.36, 1)`.
> - **Cakupan Kartu**: Diterapkan secara konsisten ke seluruh kartu di semua halaman (Beranda, Alur Kerja, Proyek & Instrumen, FGD, Profil & Sertifikat).

---

## 1. Overview & Core Concept

- **Tujuan**: Menghilangkan tampilan navigasi yang kaku dengan menghadirkan wadah navigasi segmented yang rapi, simetris, dan nyaman dipandang ("enak dilihat"). Memberikan umpan balik fisik yang responsif (*tactile feedback*) ketika kursor menyentuh kartu apa pun di dalam web, memperkuat kesan modern minimalist dan editorial berkelas tanpa unsur "AI slop".
- **Target Persona**: Perekrut, HR Manager, dan eksekutif Talent Acquisition yang menelusuri dokumen, alur kerja, dan sertifikat Hilmi Assidqi.
- **Nilai Tambah**: Navigasi terasa seperti aplikasi web kelas enterprise yang terstruktur rapi, sementara kartu konten memiliki interaksi sentuh yang menyenangkan dan hidup.

---

## 2. User Experience & Visual Design

### Navigasi Atas (Navbar)
- Menggantikan garis bawah `border-b` yang sebelumnya kaku dengan **Segmented Tab Strip**:
  - Kontainer luar: Latar netral halus `bg-neutral-200/60`, border hairline `border-neutral-200/80`, sudut membulat `rounded-lg`, padding `p-1`.
  - Item Aktif: `bg-white text-neutral-950 font-semibold shadow-xs rounded-md`.
  - Item Non-aktif: `text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60 rounded-md`.
  - Transisi warna dan perpindahan tab berkecepatan 200ms bebas flicker.
  - Tampilan responsif pada perangkat mobile diperbarui selaras.

### Efek Mengambang Kartu (Floating Card Interaction)
- Diterapkan melalui utility terpusat `.card-floating` di `src/index.css` atau class Tailwind terstandarisasi:
  ```css
  .card-floating {
    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                border-color 0.28s ease;
    will-change: transform, box-shadow;
  }
  .card-floating:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04);
    border-color: #D4D4D4;
  }
  ```
- **Aksesibilitas**: Mematuhi `@media (prefers-reduced-motion: reduce)` dengan menonaktifkan translasi vertikal bagi pengguna dengan preferensi sensitivitas gerakan.

---

## 3. Komponen & Halaman yang Disempurnakan

```
┌─────────────────────────────────────────────────────────────┐
│                       Top Navbar                            │
│  [Hilmi Assidqi]  [Dashboard | Alur | Proyek | FGD | Profil]│
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│  Dashboard Cards             │       │  Proyek & Alur Kerja Cards   │
│  - Hero Overview Frame       │       │  - Pipeline Stages 01-04     │
│  - Recruiter Identity Box    │       │  - Interactive Tools & Apps  │
│  - CV Management Hub         │       │  - Assessment Forms (User/HR)│
│  - 4 Key Metric Tiles        │       └──────────────────────────────┘
│  - 4 Navigation Module Tiles │                       │
└──────────────────────────────┘                       ▼
                                       ┌──────────────────────────────┐
                                       │  Profil & Sertifikat Cards   │
                                       │  - Experience Timeline Tiles │
                                       │  - Capability Matrix Tiles   │
                                       │  - 11 Certificate Cards      │
                                       └──────────────────────────────┘
```

1. **`src/components/Navbar.tsx`**:
   - Struktur segmented tab dengan margin dan padding yang proporsional.
   - Penyesuaian spacing pada header desktop dan drawer navigasi mobile.
2. **`src/index.css`**:
   - Penambahan utility `.card-floating` dan penyesuaian cubic-bezier transition.
3. **`src/pages/DashboardPage.tsx`**:
   - Integrasi `.card-floating` pada Hero card, Recruiter badge, CV card, 4 Metrik tiles, dan 4 Modul navigasi.
4. **`src/pages/AlurKerjaPage.tsx`**:
   - Integrasi `.card-floating` pada 4 tahapan alur kerja dan kartu matriks evaluasi.
5. **`src/pages/ProyekPage.tsx`**:
   - Integrasi `.card-floating` pada kartu MBTI, ATS tracker, dan 2 formulir penilaian wawancara.
6. **`src/pages/FgdPage.tsx`**:
   - Integrasi `.card-floating` pada kartu perbandingan metodologi, riset skripsi, dan rubrik dinamika kelompok.
7. **`src/pages/ProfilPage.tsx`**:
   - Integrasi `.card-floating` pada kartu CV, riwayat pengalaman, matriks kapabilitas, dan seluruh 11 kartu sertifikat resmi.

---

## 4. Verification & Testing Plan

1. **Visual Testing**:
   - Periksa tab navigasi atas di desktop dan drawer mobile: pastikan tidak ada teks yang terpotong, kontras teks memenuhi WCAG AA, dan peralihan tab mulus.
   - Periksa hover/touch pada seluruh kartu di setiap halaman: pastikan kartu terangkat 4px dengan bayangan bergradasi halus tanpa lag atau pergeseran layout tetangga (*no layout shifts*).
2. **Kompilasi & Linting**:
   - Jalankan `compile_applet` dan `lint_applet` bersamaan untuk memastikan tidak ada kesalahan TypeScript atau CSS.
3. **Aksesibilitas Gerakan**:
   - Pastikan aturan `prefers-reduced-motion` tetap menjaga keterbacaan tanpa animasi paksaan.
