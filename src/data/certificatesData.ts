export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  topic?: string;
  date: string;
  credentialId?: string;
  category: 'talent-acquisition' | 'hr-management' | 'tools-hris';
  pdfUrl: string;
  imageUrl: string;
  description: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Interview Process',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '26 Mei 2025',
    credentialId: 'MS-26/5/2025-kuVUJn2YryFiak8zDEJk',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-1.pdf',
    imageUrl: '/certificates/HR Staff (1)-1.jpg',
    description: 'Sertifikasi kompetensi penyusunan dan eksekusi tahapan proses wawancara seleksi yang terstruktur, objektif, dan efektif.'
  },
  {
    id: 'cert-2',
    title: 'Types of Interview',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '22 Mei 2025',
    credentialId: 'MS-22/5/2025-G9wlYdGD6DOwPtRIhpBF',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-2.pdf',
    imageUrl: '/certificates/HR Staff (1)-2.jpg',
    description: 'Pemahaman ragam metode wawancara seleksi (Behavioral Event Interview / STAR, Wawancara Panel, Case Study, dan Situational Interview).'
  },
  {
    id: 'cert-3',
    title: 'Recruitment and CV Selection',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '22 Mei 2025',
    credentialId: 'MS-22/5/2025-EFiEvcY4jLFXHPHPiB0x',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-3.pdf',
    imageUrl: '/certificates/HR Staff (1)-3.jpg',
    description: 'Keahlian penapisan CV bervolume tinggi, identifikasi kecocokan kualifikasi kunci, serta penyusunan shortlist kandidat potensial.'
  },
  {
    id: 'cert-4',
    title: 'Candidates Background Checking',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '20 Mei 2025',
    credentialId: 'MS-20/5/2025-zR1m5l2SUdxkckKQZKIeA',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-4.pdf',
    imageUrl: '/certificates/HR Staff (1)-4.jpg',
    description: 'Prosedur verifikasi referensi kerja sebelumnya, konfirmasi rekam jejak integritas kandidat, dan mitigasi risiko fraud rekrutmen.'
  },
  {
    id: 'cert-5',
    title: 'Assessment Test for Candidates',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '20 Mei 2025',
    credentialId: 'MS-20/5/2025-rNkPj2CKio3YpAGn5Yi5',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-5.pdf',
    imageUrl: '/certificates/HR Staff (1)-5.jpg',
    description: 'Pengadministrasian alat tes psikometri, tes kompetensi teknis, dan interpretasi profil kepribadian kerja kandidat.'
  },
  {
    id: 'cert-6',
    title: 'Assessing Candidates and Other Strategies in Recruitment',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '20 Mei 2025',
    credentialId: 'MS-20/5/2025-e76bc6BGxn4K6fXctm7G',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-6.pdf',
    imageUrl: '/certificates/HR Staff (1)-6.jpg',
    description: 'Strategi komprehensif penilaian kandidat, standardisasi matriks penilaian asesor, dan optimalisasi alur rekrutmen perusahaan.'
  },
  {
    id: 'cert-7',
    title: 'Employer Branding',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '20 Mei 2025',
    credentialId: 'MS-20/5/2025-BmrxxWzISjL4zsobW3wP',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-7.pdf',
    imageUrl: '/certificates/HR Staff (1)-7.jpg',
    description: 'Pembangunan reputasi positif perusahaan sebagai tempat kerja pilihan untuk memikat talenta terbaik di pasar tenaga kerja.'
  },
  {
    id: 'cert-8',
    title: 'Understanding Recruitment Process',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '13 Mei 2025',
    credentialId: 'MS-13/5/2025-TFhyBkxMHSbn7tgRomdM',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-8.pdf',
    imageUrl: '/certificates/HR Staff (1)-8.jpg',
    description: 'Pemahaman siklus menyeluruh proses rekrutmen dari Manpower Planning, sourcing kanal, seleksi, hingga serah terima onboarding.'
  },
  {
    id: 'cert-9',
    title: 'Talent Acquisition',
    issuer: 'MySkill (E-Learning)',
    topic: 'Recruitment, Onboarding and Offboarding',
    date: '10 Mei 2025',
    credentialId: 'MS-10/5/2025-ik0QoZ9ECUVNBWhfbTOG',
    category: 'talent-acquisition',
    pdfUrl: '/certificates/HR Staff (1)-9.pdf',
    imageUrl: '/certificates/HR Staff (1)-9.jpg',
    description: 'Pendekatan strategis perburuan talenta, pengelolaan talent pool jangka panjang, dan integrasi kebutuhan bisnis dengan calon karyawan.'
  },
  {
    id: 'cert-10',
    title: 'e-Training Kelas MABAR (MSDM Belajar Bareng) - Batch 29',
    issuer: 'PT MSDM Indonesia Bisa',
    topic: 'Performance Management, Hukum Ketenagakerjaan & HR Metrik',
    date: '08 - 30 Januari 2025',
    credentialId: '217/KELAS MABAR/I/2025/MSDM',
    category: 'hr-management',
    pdfUrl: '/certificates/HR Staff (1)-10.pdf',
    imageUrl: '/certificates/HR Staff (1)-10.jpg',
    description: 'Pelatihan intensif 12 materi kompetensi HR: Performance Mgt, PHK Kinerja, Hak PHK PKWT, Efisiensi Cost HR, HR Metric, HRBP, Salary Structure, Employee Engagement, dan HR Reporting.'
  },
  {
    id: 'cert-11',
    title: 'HR di Era Digital: Kenali Tools & HRIS',
    issuer: 'Kelas.work by KELAS.COM',
    topic: 'Digital HR Tools & HRIS Implementation',
    date: '08 Mei 2025',
    credentialId: 'Bootcamp Webinar [FREE TRIAL BOOTCAMP]',
    category: 'tools-hris',
    pdfUrl: '/certificates/HR Staff (1)-11.pdf',
    imageUrl: '/certificates/HR Staff (1)-11.jpg',
    description: 'Webinar pengenalan sistem otomasi HRIS, digitalisasi database karyawan, evaluasi presensi kerja, dan integrasi perangkat lunak rekrutmen modern.'
  }
];
