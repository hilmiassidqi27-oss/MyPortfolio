import { AssessmentFormItem } from '../types';

export const ASSESSMENT_FORMS_DATA: AssessmentFormItem[] = [
  {
    id: 'user-interview',
    title: 'Form Penilaian Interview User & Departemen Teknis',
    shortTitle: 'Form Penilaian Interview User',
    badge: 'Instrumen Asesmen User',
    code: 'DPP/HR/FRM-INT-USR/2026',
    organization: 'PT Dian Pandu Pratama',
    assessorRole: 'User Manager / Head of Department / Lead Engineer',
    methodology: 'Technical Competency, Problem Solving & Job Execution Fit',
    isConfidential: true,
    confidentialNotice:
      'Dokumen internal PT Dian Pandu Pratama bersifat rahasia (confidential). Portofolio ini menampilkan visualisasi lembar kerja contoh yang telah disanitasi, rubrik kompetensi terstruktur, dan simulator skoring tanpa mempublikasikan berkas dokumen asli perusahaan.',
    samplePhotoCaption:
      'Foto lembar kerja resmi evaluasi wawancara teknis operasional PT Dian Pandu Pratama (format tersanitasi).',
    samplePhotoUrl: '/assets/aistudio/image_bcdba23c.png',
    description:
      'Instrumen evaluasi baku yang digunakan para User Manager di PT Dian Pandu Pratama untuk menilai kesiapan teknis, logika operasional lapangan, penguasaan alat kerja, serta kecocokan kandidat terhadap beban kerja riil divisi terkait.',
    scoringGuide:
      'Skala 1 - 5 (1: Sangat Kurang, 2: Kurang, 3: Cukup / Standar Minimal, 4: Baik, 5: Sangat Baik / Istimewa). Nilai maksimal 25 poin.',
    maxScore: 25,
    thresholds: {
      recommended: 20,
      considered: 15
    },
    sampleLayoutDetails: {
      docTitle: 'LEMBAR PENILAIAN WAWANCARA USER & OPERASIONAL',
      docSub: 'Departemen Produksi, Maintenance & Rekayasa Operasional',
      revision: 'Rev. 02 / ISO 9001:2015 Compliant',
      division: 'Divisi Operasional & Engineering',
      securityLevel: 'INTERNAL RESTRICTED / TERPROTEKSI',
      sampleCandidate: 'Dimas Prasetyo, S.T. (Kandidat Uji)',
      samplePosition: 'Staff Operasional & Maintenance Mesin',
      sampleScores: [
        {
          criterion: '1. Penguasaan Teknis & Keahlian Khusus Posisi',
          score: 4,
          notes: 'Memahami alur troubleshooting PLC & sensor produksi dengan runtut.'
        },
        {
          criterion: '2. Pemecahan Masalah Operasional & Analisis Kasus',
          score: 4,
          notes: 'Dapat menentukan prioritas perbaikan ketika jalur produksi terhambat.'
        },
        {
          criterion: '3. Kesiapan Eksekusi, Disiplin & Manajemen Waktu',
          score: 4,
          notes: 'Terbiasa bekerja dengan tenggat shift ketat dan kepatuhan K3 tinggi.'
        },
        {
          criterion: '4. Kemampuan Adaptasi Sistem & Alat Baru',
          score: 4,
          notes: 'Cepat memahami software maintenance log internal.'
        },
        {
          criterion: '5. Kesesuaian Beban Kerja & Komitmen Kontribusi',
          score: 5,
          notes: 'Siap on-call dan memiliki komitmen loyalitas jangka panjang.'
        }
      ],
      summaryConclusion:
        'Kandidat memenuhi seluruh kualifikasi teknis yang disyaratkan divisi. Direkomendasikan untuk lanjut ke tahap penawaran kerja (Offering Letter).'
    },
    criteria: [
      {
        id: 'tech-mastery',
        name: 'Penguasaan Teknis & Keahlian Khusus Posisi',
        category: 'Hard Skill & Technical',
        description:
          'Kedalaman pemahaman kandidat terhadap konsep inti, prosedur teknis, dan portofolio kerja yang relevan dengan posisi yang dilamar.',
        indicators: {
          poor: 'Pemahaman teori dangkal, minim pengalaman aplikatif, tidak mampu menjelaskan dasar teknis.',
          competent:
            'Menguasai prosedur standar kerja dengan baik, mampu menyelesaikan tugas teknis harian secara mandiri.',
          excellent:
            'Sangat menguasai teknis mendalam, mampu memberikan insight optimasi dan efisiensi prosedur.'
        },
        defaultScore: 4
      },
      {
        id: 'problem-solving',
        name: 'Pemecahan Masalah Operasional & Analisis Kasus',
        category: 'Analytical Thinking',
        description:
          'Kemampuan menganalisis akar masalah (root-cause analysis), mengambil inisiatif solusi taktis di lapangan, dan berpikir sistematis saat menghadapi kendala.',
        indicators: {
          poor: 'Bingung saat diberi studi kasus lapangan, solusinya tidak realistis atau cenderung menyalahkan keadaan.',
          competent:
            'Mampu mengidentifikasi pokok persoalan secara logis dan mengusulkan solusi yang terstruktur.',
          excellent:
            'Analisis tajam dan cepat, mempertimbangkan risiko operasional dan efisiensi biaya secara matang.'
        },
        defaultScore: 4
      },
      {
        id: 'work-execution',
        name: 'Kesiapan Eksekusi, Disiplin & Manajemen Waktu',
        category: 'Work Execution & Output',
        description:
          'Kemampuan menetapkan skala prioritas, menjaga target tenggat waktu (deadline), dan konsistensi terhadap SOP keselamatan kerja.',
        indicators: {
          poor: 'Kurang teratur, kesulitan mengatur skala prioritas, riwayat sering meleset dari target penyelesaian.',
          competent:
            'Memiliki ritme kerja teratur, mampu membagi prioritas tugas, dan disiplin terhadap tenggat waktu.',
          excellent:
            'Sangat terorganisir, proaktif mempercepat proses tanpa mengabaikan aspek kepatuhan dan akurasi.'
        },
        defaultScore: 4
      },
      {
        id: 'adaptability',
        name: 'Kemampuan Adaptasi Sistem, Alat & Lingkungan Industri',
        category: 'Technical Adaptability',
        description:
          'Kecepatan dan kemauan mempelajari perangkat lunak operasional baru, adaptasi terhadap ritme kerja dinamis perusahaan.',
        indicators: {
          poor: 'Kaku terhadap perubahan, menolak sistem baru, membutuhkan supervisi terus-menerus.',
          competent:
            'Cepat menyesuaikan diri dengan alat baru setelah mendapatkan instruksi dan pelatihan awal.',
          excellent:
            'Cepat belajar mandiri (fast learner), antusias mengeksplorasi teknologi untuk perbaikan kerja tim.'
        },
        defaultScore: 4
      },
      {
        id: 'role-alignment',
        name: 'Kesesuaian Ekspektasi Beban Kerja & Komitmen Kontribusi',
        category: 'Role & Organizational Fit',
        description:
          'Kesiapan menghadapi dinamika kerja lapangan, jadwal shift/lembur operasional, serta komitmen jangka panjang di posisi ini.',
        indicators: {
          poor: 'Ekspektasi tidak realistis mengenai beban kerja, ragu-ragu terhadap jadwal kerja divisi.',
          competent:
            'Memahami tuntutan kerja dengan wajar dan bersedia mengikuti ritme operasional perusahaan.',
          excellent:
            'Sangat siap dan termotivasi tinggi untuk berkontribusi maksimal pada target pencapaian departemen.'
        },
        defaultScore: 4
      }
    ],
    standardQuestions: [
      'Jelaskan proyek paling menantang yang pernah Anda selesaikan secara teknis dan bagaimana Anda mengatasi kendala utamanya?',
      'Jika mesin/sistem mengalami hambatan mendadak 30 menit sebelum pergantian shift, langkah investigasi apa yang pertama Anda ambil?',
      'Bagaimana cara Anda memprioritaskan pekerjaan ketika datang 3 permintaan mendesak secara bersamaan dari divisi berbeda?',
      'Pernahkah Anda menemukan SOP yang kurang efisien? Tindakan nyata apa yang Anda ajukan untuk memperbaikinya?',
      'Bagaimana kesiapan Anda dalam beradaptasi dengan jadwal kerja dinamis dan target produksi di PT DPP?'
    ]
  },
  {
    id: 'hr-interview',
    title: 'Form Penilaian Interview HR (Behavioral & STAR Method)',
    shortTitle: 'Form Penilaian Interview HR',
    badge: 'Instrumen Seleksi HR',
    code: 'DPP/HR/FRM-INT-HR/2026',
    organization: 'PT Dian Pandu Pratama',
    assessorRole: 'HR Recruitment Staff (Hilmi Assidqi, S.Psi)',
    methodology: 'Behavioral Event Interview (BEI), STAR Method & Cultural Alignment',
    isConfidential: true,
    confidentialNotice:
      'Dokumen internal PT Dian Pandu Pratama bersifat rahasia (confidential). Portofolio ini menampilkan visualisasi lembar kerja contoh yang telah disanitasi, rubrik perilaku metode STAR, dan simulator skoring tanpa mempublikasikan berkas dokumen asli perusahaan.',
    samplePhotoCaption:
      'Foto lembar kerja resmi wawancara perilaku (Behavioral Event Interview) berbasis metode STAR PT Dian Pandu Pratama.',
    samplePhotoUrl: '/assets/aistudio/image_03cc9a2c.png',
    description:
      'Instrumen wawancara perilaku terstandar berbasis metodologi STAR (Situation, Task, Action, Result) yang dirancang dan digunakan oleh Hilmi Assidqi untuk menggali integritas rekam jejak, resiliensi tekanan, deteksi kecenderungan social loafing, dan kesesuaian kultur nilai perusahaan.',
    scoringGuide:
      'Skala 1 - 5 (1: Sangat Rendah, 2: Kurang, 3: Memenuhi Standar, 4: Baik / Konsisten, 5: Unggul / Panutan). Nilai maksimal 30 poin.',
    maxScore: 30,
    thresholds: {
      recommended: 24,
      considered: 18
    },
    sampleLayoutDetails: {
      docTitle: 'LEMBAR PENILAIAN WAWANCARA HR & PERILAKU KERJA',
      docSub: 'Behavioral Event Interview (BEI) — Standar Rekrutmen Terpusat',
      revision: 'Rev. 03 / HR-TA DPP 2026',
      division: 'Divisi Human Resources & People Operations',
      securityLevel: 'CONFIDENTIAL / TERSANITASI',
      sampleCandidate: 'Nadia Rahmawati, S.E. (Kandidat Uji)',
      samplePosition: 'Staff Administrasi & Keuangan Proyek',
      sampleScores: [
        {
          criterion: '1. Komunikasi Verbal, Artikulasi & Daya Dengar Aktif',
          score: 4,
          notes: 'Penyampaian terstruktur, mendengarkan cermat tanpa interupsi.'
        },
        {
          criterion: '2. Motivasi Berprestasi, Dorongan Kerja & Inisiatif',
          score: 5,
          notes: 'Inisiatif tinggi dalam menyederhanakan pelaporan berkas magang.'
        },
        {
          criterion: '3. Kolaborasi Tim & Bebas Sikap Social Loafing',
          score: 5,
          notes: 'Aktif berpartisipasi merata, tidak membiarkan beban menumpuk pada rekan.'
        },
        {
          criterion: '4. Integritas, Etika Kerja & Akuntabilitas Pribadi',
          score: 5,
          notes: 'Jujur mengakui kendala sebelumnya dan menunjukkan solusi bertanggung jawab.'
        },
        {
          criterion: '5. Toleransi Tekanan, Stabilitas Emosi & Resiliensi',
          score: 4,
          notes: 'Tetap tenang dan sistematis saat menghadapi studi kasus tenggat sempit.'
        },
        {
          criterion: '6. Kesesuaian Nilai Budaya Perusahaan (Culture Fit)',
          score: 5,
          notes: 'Sangat selaras dengan budaya disiplin, teliti, dan etos kerja PT DPP.'
        }
      ],
      summaryConclusion:
        'Kandidat menunjukkan profil perilaku matang, nilai integritas tinggi, dan bebas dari social loafing. Sangat direkomendasikan untuk tahap Wawancara User.'
    },
    criteria: [
      {
        id: 'communication',
        name: 'Komunikasi Verbal, Artikulasi & Daya Dengar Aktif',
        category: 'Interpersonal & Communication',
        description:
          'Kemampuan menyampaikan ide secara runtut, lugas, santun, serta mendengarkan instruksi secara aktif tanpa interupsi negatif.',
        indicators: {
          poor: 'Artikulasi berbelit-belit, sering memotong pembicaraan atau tidak menangkap inti pertanyaan asesor.',
          competent:
            'Mampu menjelaskan gagasan dengan jelas, bahasa tubuh sopan, dan tanggap terhadap konteks pertanyaan.',
          excellent:
            'Penyampaian sangat terstruktur, persuasif, memiliki empati komunikasi tinggi dan pendengar yang cermat.'
        },
        defaultScore: 4
      },
      {
        id: 'motivation-initiative',
        name: 'Motivasi Berprestasi, Dorongan Kerja & Inisiatif',
        category: 'Achievement Drive',
        description:
          'Antusiasme bekerja, komitmen belajar mandiri, serta inisiatif melangkah lebih jauh dari sekadar instruksi tugas minimal.',
        indicators: {
          poor: 'Hanya bekerja jika diperintah (pasif), orientasi semata transaksional tanpa visi pengembangan diri.',
          competent:
            'Memiliki etos kerja positif, berkeinginan maju, dan dapat diandalkan menyelesaikan target tugas.',
          excellent:
            'Penuh inisiatif solutif, proaktif mencari cara kerja yang lebih baik, memiliki motivasi internal kuat.'
        },
        defaultScore: 5
      },
      {
        id: 'teamwork-anti-loafing',
        name: 'Kolaborasi Tim & Bebas Sikap Social Loafing',
        category: 'Teamwork & Cohesion',
        description:
          'Kemampuan bersinergi dalam tim heterogen, berkontribusi nyata secara merata (tidak menumpang nama/social loafing), dan toleransi pendapat.',
        indicators: {
          poor: 'Cenderung individualistis atau terindikasi pasif membiarkan anggota tim lain menanggung beban (social loafing).',
          competent:
            'Bekerja sama dengan baik dalam tim, kooperatif, dan memegang tanggung jawab porsinya secara disiplin.',
          excellent:
            'Pendorong semangat tim, aktif membantu rekan yang kesulitan, dan mampu meredakan friksi kelompok.'
        },
        defaultScore: 4
      },
      {
        id: 'integrity-attitude',
        name: 'Integritas, Etika Kerja & Akuntabilitas Pribadi',
        category: 'Integrity & Ethics',
        description:
          'Kejujuran dalam menyampaikan rekam jejak, transparansi saat berbuat kesalahan, serta loyalitas pada aturan dan etika kerja.',
        indicators: {
          poor: 'Ditemukan inkonsistensi jawaban dengan riwayat dokumen, melempar kesalahan kepada pihak lain.',
          competent:
            'Menjunjung kejujuran, bertanggung jawab atas hasil kerja sendiri, dan menghormati peraturan kerja.',
          excellent:
            'Menunjukkan integritas moral tinggi, berani mengakui kesalahan dan langsung memperbaikinya secara bertanggung jawab.'
        },
        defaultScore: 5
      },
      {
        id: 'stress-tolerance',
        name: 'Toleransi Tekanan, Stabilitas Emosi & Resiliensi',
        category: 'Emotional Stability',
        description:
          'Ketenangan dalam menghadapi tenggat waktu mepet, kritik konstruktif, serta kemampuan bangkit dari kegagalan tanpa demotivasi.',
        indicators: {
          poor: 'Mudah panik atau defensif saat dikritik, performa menurun drastis ketika berada di bawah tekanan waktu.',
          competent:
            'Tetap tenang dan terkontrol saat menghadapi situasi mendesak, mampu memfilter respon emosional.',
          excellent:
            'Sangat tangguh (resilient), mengonversi tekanan menjadi energi fokus pemecahan masalah.'
        },
        defaultScore: 4
      },
      {
        id: 'culture-fit',
        name: 'Kesesuaian Nilai Budaya Perusahaan (Culture Fit)',
        category: 'Organizational Values',
        description:
          'Kecocokan prinsip kandidat dengan nilai-nilai profesionalisme, ketelitian, kerendahhatian, dan disiplin di PT DPP.',
        indicators: {
          poor: 'Prinsip kerja bertolak belakang dengan etika korporat, orientasi kerja berlawanan dengan budaya kerja tim.',
          competent:
            'Memiliki nilai-nilai kepribadian yang selaras dengan etos perusahaan dan mudah beradaptasi.',
          excellent:
            'Perwujudan alami dari nilai-nilai inti perusahaan; berpotensi menjadi culture ambassador positif.'
        },
        defaultScore: 5
      }
    ],
    standardQuestions: [
      'Ceritakan situasi saat Anda harus bekerja sama dengan rekan tim yang sulit diajak berkomunikasi. Apa langkah nyata yang Anda ambil dan bagaimana hasilnya? (Metode STAR)',
      'Bagaimana cara Anda membagi beban kerja dalam sebuah proyek kelompok agar semua orang berkontribusi adil tanpa ada yang pasif?',
      'Ceritakan sebuah kegagalan atau kesalahan yang pernah Anda buat di tempat kerja sebelumnya. Bagaimana Anda bertanggung jawab atas hal tersebut?',
      'Ketika Anda dihadapkan pada target mendesak dengan instruksi yang berubah mendadak, bagaimana Anda menjaga stabilitas emosi dan fokus kerja?',
      'Apa yang membuat Anda tertarik bergabung di PT Dian Pandu Pratama dibandingkan opsi tempat kerja lainnya?'
    ]
  }
];
