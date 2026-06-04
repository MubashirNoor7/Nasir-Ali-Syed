/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Book {
  id: string;
  title: string;
  titleEnglish: string;
  year: string;
  publisher: string;
  publisherEnglish: string;
  genre: string;
  genreEnglish: string;
  description: string;
  descriptionEnglish: string;
  cover?: string;
  pdf?: string;
  reader?: BookReaderConfig;
  color: string;
}

export interface BookReaderConfig {
  folder: string;
  pagePrefix: string;
  pageSuffix: string;
  start: number;
  end: number;
}

export interface Video {
  id: string;
  title: string;
  titleEnglish: string;
  description: string;
  descriptionEnglish: string;
  url: string;
  thumbnail?: string;
  date: string;
}

export interface Ghazal {
  id: string;
  title: string;
  titleEnglish: string;
  content: string[][]; // Array of couplets [line1, line2]
  theme: string;
  themeEnglish: string;
  image?: string;
}

export interface Achievement {
  year: string;
  title: string;
  titleEnglish: string;
  icon: string;
}

export const books: Book[] = [
  {
    id: "char-su",
    title: "چار سُو",
    titleEnglish: "Char Su",
    year: "2020",
    publisher: "ملاقات پبلیکیشنز، پشاور",
    publisherEnglish: "Mulaqat Publications, Peshawar",
    genre: "مضامین",
    genreEnglish: "Essays",
    description: "مختلف موضوعات پر مضامین کا مجموعہ",
    descriptionEnglish: "A curated collection of essays and columns on contemporary social and literary topics.",
    cover: "/images/Char-So/Char%20Su-Book%20Cover.jpeg",
    pdf: "/images/Char-So/Char-So.pdf",
    reader: {
      folder: "/images/Char-So",
      pagePrefix: "Char-So-",
      pageSuffix: ".webp",
      start: 1,
      end: 122
    },
    color: "#0F172A"
  },
  {
    id: "shamien-farib-dety-hain",
    title: "شامیں فریب دیتی ہیں",
    titleEnglish: "Shamien Farib Dety Hain",
    year: "2010",
    publisher: "ملاقات پبلیکیشنز",
    publisherEnglish: "Mulaqat Publications",
    genre: "شاعری",
    genreEnglish: "Poetry",
    description: "غزل اور نظم کا شعری مجموعہ",
    descriptionEnglish: "A beautiful collection of Urdu Ghazals and Poems reflecting human emotions.",
    cover: "/images/Shamien%20Farib%20Dety%20Hain/Shamien%20Farib%20Dety%20Hain-Book%20Cover.jpeg",
    pdf: "/images/Shamien%20Farib%20Dety%20Hain/Shamien%20Farib%20Dety%20Hain.pdf",
    reader: {
      folder: "/images/Shamien%20Farib%20Dety%20Hain",
      pagePrefix: "Shamien-Farib-Dety-Hain-",
      pageSuffix: ".webp",
      start: 1,
      end: 290
    },
    color: "#7F1D1D"
  },
  {
    id: "adab-ke-atraf-mein",
    title: "ادب کے اطراف میں",
    titleEnglish: "Adab Ke Atraf Mein",
    year: "2013",
    publisher: "ملاقات پبلیکیشنز، پشاور",
    publisherEnglish: "Mulaqat Publications, Peshawar",
    genre: "تنقید",
    genreEnglish: "Criticism",
    description: "ادبی تنقید کا مجموعہ",
    descriptionEnglish: "Deep critical analysis and essays on contemporary and classical Urdu literature.",
    cover: "/images/Adab%20Ke%20Atraf%20Mein/Adab%20Ke%20Atraf%20Mein-Book%20Cover.webp",
    reader: {
      folder: "/images/Adab%20Ke%20Atraf%20Mein",
      pagePrefix: "Adab-Ke-Atraf-Main-",
      pageSuffix: ".webp",
      start: 1,
      end: 356
    },
    color: "#312E81"
  },
  {
    id: "khayal-khatri-ahbab",
    title: "خیال خاطر احباب",
    titleEnglish: "Khayal Khatri Ahbab",
    year: "2015",
    publisher: "ملاقات پبلیکیشنز",
    publisherEnglish: "Mulaqat Publications",
    genre: "یادیں/خطوط",
    genreEnglish: "Memoirs",
    description: "احباب کی یادیں اور خطوط",
    descriptionEnglish: "A nostalgic collection of letters and memories shared with literary friends through the decades.",
    cover: "/images/Khayal%20Khatri%20Ahbab/Khayal%20Khatri%20Ahbab-Book%20Cover.jpeg",
    pdf: "/images/Khayal%20Khatri%20Ahbab/Khayal%20Khatri%20Ahbab.pdf",
    reader: {
      folder: "/images/Khayal%20Khatri%20Ahbab",
      pagePrefix: "Khayal Khatri Ahbab - Page ",
      pageSuffix: ".webp",
      start: 0,
      end: 273
    },
    color: "#065F46"
  },
  {
    id: "america-kitna-door-kitna-paas",
    title: "امریکہ کتنا دور کتنا پاس",
    titleEnglish: "America Kitna Door Kitna Paas",
    year: "2018",
    publisher: "ملاقات پبلیکیشنز، پشاور",
    publisherEnglish: "Mulaqat Publications, Peshawar",
    genre: "سفرنامہ",
    genreEnglish: "Travelogue",
    description: "امریکہ کے ادبی اور سماجی اسفار کی روداد",
    descriptionEnglish: "A fascinating travelogue documenting literary and social journeys across the United States.",
    cover: "/images/America%20Kitna%20Door%20Kitna%20Paas/America%20Kitna%20Door%20Kitna%20Paas-%20Book%20Cover.webp",
    pdf: "/images/America%20Kitna%20Door%20Kitna%20Paas/America%20Kitna%20Door%20Kitna%20Paas.pdf",
    reader: {
      folder: "/images/America%20Kitna%20Door%20Kitna%20Paas",
      pagePrefix: "America Kitna Door-Page ",
      pageSuffix: ".webp",
      start: 1,
      end: 103
    },
    color: "#1E3A8A"
  }
];

export const sampleGhazals: Ghazal[] = [
  {
    id: "g1",
    title: "غزل",
    titleEnglish: "Ghazal",
    content: [
      ["یہ اور بات کہ موجود اپنے گھر میں ہوں", "ایک انہونی کا ڈر ہے اور میں"],
      ["آج اک اور برس بیت گیا اس کے بغیر", "جس کے ہوتے ہوئے ہوتے زمانے میرے"]
    ],
    theme: "فلسفیانہ",
    themeEnglish: "Philosophical",
    image: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-3.jpeg"
  }
];

export const bio = {
  name: "پروفیسر ناصر علی سید",
  nameEnglish: "Professor Nasir Ali Syed",
  birthYear: "1948",
  birthPlace: "اکوڑہ خٹک",
  birthPlaceEnglish: "Akora Khattak",
  education: "ایم اے اردو ادب (یونیورسٹی آف پشاور)",
  educationEnglish: "MA Urdu Literature (University of Peshawar)",
  career: "پروفیسر اور شعبہ اردو کے سربراہ، گورنمنٹ کالج پشاور (31 سال)",
  careerEnglish: "Professor & Head of Urdu Department, Government College Peshawar (31 Years)",
  awards: [
    { urdu: "صدارتی ایوارڈ برائے ادب", english: "Presidential Award for Literature" },
    { urdu: "پروین شاکر ایوارڈ", english: "Parveen Shakir Award" },
    { urdu: "آباسین آرٹس کونسل گولڈ میڈل", english: "Abasin Arts Council Gold Medal" },
    { urdu: "قائداعظم ایوارڈ", english: "Quaid-e-Azam Award (Pak-American Coalition)" }
  ],
  currentRole: "چیئرمین، سندیکٹ آف رائٹرز پاکستان",
  currentRoleEnglish: "Chairman, Syndicate of Writers Pakistan",
  expertise: ["اردو", "پشتو", "ہندکو ادب"],
  expertiseEnglish: ["Urdu", "Pashto", "Hindko Literature"],
  genres: ["شاعری", "تنقید", "ڈرامہ", "کہانی", "تدریس"],
  genresEnglish: ["Poetry", "Criticism", "Drama", "Storytelling", "Teaching"],
  stats: [
    { label: "سال تدریس", labelEnglish: "Years Teaching", value: 31 },
    { label: "کتابیں", labelEnglish: "Books Published", value: books.length },
    { label: "ادبی سفر", labelEnglish: "Literary Journey", value: 50 },
    { label: "ایوارڈز", labelEnglish: "Awards", value: 4 }
  ]
};

export const timelineEvents = [
  { year: "1948", title: "پیدائش", titleEnglish: "Birth", description: "اکوڑہ خٹک", descriptionEnglish: "Born in Akora Khattak" },
  { year: "1970s", title: "تعلیم", titleEnglish: "Education", description: "ایم اے اردو ادب - یونیورسٹی آف پشاور", descriptionEnglish: "MA Urdu Literature - University of Peshawar" },
  { year: "1980s", title: "تدریس کا آغاز", titleEnglish: "Teaching Career", description: "گورنمنٹ کالج پشاور میں 31 سالہ تدریسی سفر کا آغاز", descriptionEnglish: "Started 31-year teaching journey at Government College Peshawar" },
  { year: "2013", title: "ادب کے اطراف میں", titleEnglish: "Literary Criticism", description: "تنقیدی مجموعے کی اشاعت", descriptionEnglish: "Publication of his critical work 'Adab Ke Atraf Mein'" },
  { year: "2016", title: "رباعیات خوشحال خان خٹک", titleEnglish: "Edited Works", description: "ترتیب و تدوین", descriptionEnglish: "Compilation of Khushhal Khan Khattak's Rubaiyat" },
  { year: "موجودہ", title: "چیئرمین سندیکٹ", titleEnglish: "Present", description: "چیئرمین، سندیکٹ آف رائٹرز پاکستان", descriptionEnglish: "Currently Chairman, Syndicate of Writers Pakistan" }
];

export const images = {
  logo: "/images/logo without bacground.webp",
  hero: [
    "/images/Gallery/Hero 1.jpeg",
    "/images/Gallery/Hero 2.jpeg",
    "/images/Gallery/Hero 3.jpeg",
    "/images/Gallery/Hero 4.jpeg",
    "/images/Gallery/Hero 5.jpeg"
  ],
  gallery: [
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-14.jpeg", caption: "ادبی سیمینار سے خطاب", captionEnglish: "Addressing a Literary Seminar" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.32-AM-1.jpeg", caption: "شخصیات کے ساتھ یادگار گفتگو", captionEnglish: "Memorable Dialogue with Personalities" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.32-AM.jpeg", caption: "ایوارڈ کی تقریب", captionEnglish: "Award Distribution Ceremony" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.29.13-PM.jpeg", caption: "نیشنل بک فیئر", captionEnglish: "National Book Fair Panel" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.29.27-PM.jpeg", caption: "ریڈیو پاکستان پشاور کا انٹرویو", captionEnglish: "Radio Pakistan Peshawar Interview" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.30.39-PM.jpeg", caption: "ادبی جرگہ پشاور", captionEnglish: "Literary Assembly Peshawar" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.33.37-PM.jpeg", caption: "صدرِ محفل کی حیثیت سے", captionEnglish: "Presiding Over Literary Session" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.36.31-PM.jpeg", caption: "ہم عصر مصنفین کے ہمراہ", captionEnglish: "With Contemporary Writers" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.37.21-PM.jpeg", caption: "اعزازی شیلڈ وصول کرتے ہوئے", captionEnglish: "Receiving Honorary Shield" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.37.50-PM.jpeg", caption: "پشتو اکیڈمی کا اجلاس", captionEnglish: "Pashto Academy Executive Council Meeting" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-19-at-12.44.49-AM.jpeg", caption: "دانشوروں کے ساتھ فکری نشست", captionEnglish: "Intellectual Session with Scholars" },

    { src: "/images/Gallery/EDITRED-2.webp" },
    { src: "/images/Gallery/Nasir-Ali-Syed.webp" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-10.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-11.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-12.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-13.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-2.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-3.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-4.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-5.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-6.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-7.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-8.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-08-07-at-1.42.31-AM-9.jpeg" },

    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.22.50-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.25.03-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.25.16-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.25.31-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.27.08-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.27.51-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.28.30-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.28.45-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.28.58-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.30.07-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.30.53-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.31.30-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.31.47-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.32.04-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.33.06-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.33.21-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.33.59-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.34.37-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.35.34-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.35.47-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.36.05-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.37.01-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.38.10-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.38.33-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.39.08-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.39.24-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.39.42-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.39.58-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-15-at-10.40.14-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-16-at-7.59.59-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-16-at-8.00.18-PM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-09-19-at-12.44.32-AM.jpeg" },
    { src: "/images/Gallery/WhatsApp-Image-2025-12-02-at-10.50.40-PM.jpeg" },
    { src: "/images/Gallery/pic-2.webp" }
  ]
};

export const videos: Video[] = [
  {
    id: "v1",
    title: "ادبی شو: گفتگو ناصر علی سید اور سلمیٰ قاصر کے ساتھ (حصہ دوم)",
    titleEnglish: "Literary Dialogue: Prof. Nasir Ali Syed with Salma Qasir (Part 2)",
    description: "ادبی شو کا دوسرا حصہ جس میں پروفیسر ناصر علی سید اپنی زندگی کے تخلیقی سفر اور علمی مشاغل پر تفصیلی روشنی ڈال رہے ہیں۔",
    descriptionEnglish: "The second part of an engaging talk show featuring Prof. Nasir Ali Syed discussing his creative journey and academic endeavors.",
    url: "https://youtu.be/SbVAG8FEYls",
    date: "2025"
  },
  {
    id: "v2",
    title: "پروفیسر ناصر علی سید کی خوبصورت کلام خوانی",
    titleEnglish: "Eloquence in Poetry: Selected Verses by Prof. Nasir Ali Syed",
    description: "پروفیسر ناصر علی سید کا خوبصورت کلام اور منتخب اشعار ان کی اپنی مخصوص آواز اور لہجے میں۔",
    descriptionEnglish: "A captivating poetry recital featuring selected verses in the unique voice and rhythm of Prof. Nasir Ali Syed.",
    url: "https://youtu.be/6BKOOOxrr8w",
    date: "2025"
  },
  {
    id: "v3",
    title: "شعری کلام: وہی منظر پرانا چاہتا ہے",
    titleEnglish: "Ghazal Recitation: 'Wohi Manzar Purana Chahta Hai'",
    description: "پروفیسر ناصر علی سید کی مقبولِ عام غزل 'وہی منظر پرانا چاہتا ہے' کی پُر اثر اور دلسوز پیشکش۔",
    descriptionEnglish: "A deeply emotional and impactful recitation of his highly acclaimed Urdu ghazal 'Wohi Manzar Purana Chahta Hai'.",
    url: "https://www.youtube.com/watch?v=H2z65Jxg77Y",
    date: "2023"
  },
  {
    id: "v4",
    title: "بین الاقوامی مشاعرہ: پروفیسر ناصر علی سید اور محمود شام",
    titleEnglish: "International Mushaira: Prof. Nasir Ali Syed with Mahmood Sham",
    description: "عالمی مشاعرے کے پنڈال سے پروفیسر ناصر علی سید کی شرکت اور معروف صحافی و شاعر محمود شام کی صدارت میں خوبصورت کلام۔",
    descriptionEnglish: "Prof. Nasir Ali Syed participating in an international mushaira presided over by the veteran journalist and poet Mahmood Sham.",
    url: "https://www.youtube.com/watch?v=ncFuKiqZqrA",
    date: "2023"
  },
  {
    id: "v5",
    title: "کتاب اور چائے: احمد فراز کی فکری جہات پر ادبی نشست",
    titleEnglish: "Books & Tea: Tribute Discussion on Ahmad Faraz with Prof. Nasir Ali Syed",
    description: "کتاب اور چائے پروگرام کے زیرِ اہتمام احمد فراز کی فکری اور شعری روایات پر ناصر علی سید کی مدلل اور فکر انگیز گفتگو۔",
    descriptionEnglish: "An intellectual discussion from the 'Books and Tea' series, with Prof. Nasir Ali Syed shedding light on the thoughts and poetry of Ahmad Faraz.",
    url: "https://www.youtube.com/watch?v=MZXVKkty_sY",
    date: "2024"
  },
  {
    id: "v6",
    title: "اردو غزل: محبتوں کے مراحل کے باب رہنے دو",
    titleEnglish: "Urdu Ghazal Recital: 'Mohabatoon Ke Marahel Ke Baab Rehne Do'",
    description: "پروفیسر ناصر علی سید کا خوبصورت ترنم اور ان کی مشہور غزل 'محبتوں کے مراحل کے باب رہنے دو' کی شاندار قرأت۔",
    descriptionEnglish: "A beautiful and artistic presentation of his elegant ghazal 'Mohabatoon Ke Marahel Ke Baab Rehne Do'.",
    url: "https://www.youtube.com/watch?v=G42Nptnjeuk",
    date: "2022"
  },
  {
    id: "v7",
    title: "خصوصی انٹرویو: غالب اکیڈمی آف کینیڈا میں نسرین سید سے گفتگو",
    titleEnglish: "Exclusive Interview with Prof. Nasir Ali Syed (Ghalib Academy of Canada)",
    description: "غالب اکیڈمی آف کینیڈا کے لیے نسرین سید کا پروفیسر ناصر علی سید کے ساتھ ایک تفصیلی اور علمی انٹرویو۔",
    descriptionEnglish: "A comprehensive and academic interview of Prof. Nasir Ali Syed conducted by Nasreen Syed for the Ghalib Academy of Canada.",
    url: "https://www.youtube.com/watch?v=wy0pI6qP4ZI",
    date: "2023"
  },
  {
    id: "v8",
    title: "پروفیسر ناصر علی سید کی تازہ ترین کلام خوانی",
    titleEnglish: "Fresh Verses: Latest Urdu Poetry Recital by Prof. Nasir Ali Syed",
    description: "تازہ ترین تخلیقات، نئے اسالیب اور خوبصورت لب و لہجے کے ساتھ پروفیسر ناصر علی سید کی تازہ کلام خوانی کی ویڈیو۔",
    descriptionEnglish: "A fresh and engaging poetry recitation session displaying the latest literary works and new stylistic trends by the professor.",
    url: "https://www.youtube.com/watch?v=kiO_-CSHWnQ",
    date: "2023"
  },
  {
    id: "v9",
    title: "ایک شام پروفیسر ناصر علی سید کے نام (ڈینور، کولوراڈو)",
    titleEnglish: "An Evening in Honor of Prof. Nasir Ali Syed (Denver, Colorado)",
    description: "ڈینور، کولوراڈو، امریکہ میں پروفیسر ناصر علی سید کے اعزاز میں منعقدہ تقریب اور خوبصورت ادبی محفل کی یادگار جھلکیاں۔",
    descriptionEnglish: "Memorable highlights from a special literary evening held in Denver, Colorado, USA, to honor the achievements of Prof. Nasir Ali Syed.",
    url: "https://www.youtube.com/watch?v=EZi2erFZqRg",
    date: "2022"
  },
  {
    id: "v10",
    title: "دستخط غزل: یہ اور بات کہ موجود اپنے گھر میں ہوں",
    titleEnglish: "Signature Ghazal Recitation: 'Ye Aur Baat Ke Mojud Apne Ghar'",
    description: "پروفیسر ناصر علی سید کی شاہکار اور دستخط غزل 'یہ اور بات کہ موجود اپنے گھر میں ہوں' کی یادگار پیشکش۔",
    descriptionEnglish: "A classic rendition of his signature ghazal 'Ye Aur Baat Ke Mojud Apne Ghar' capturing his philosophical depth.",
    url: "https://www.youtube.com/watch?v=o93GmyF0yjM",
    date: "2021"
  },
  {
    id: "v11",
    title: "پشاور لٹریری فیسٹیول (PLF 2023): پروفیسر ناصر علی سید کا شعری کلام",
    titleEnglish: "Peshawar Literary Festival (PLF 2023): Urdu Poetry Recital",
    description: "پشاور لٹریری فیسٹیول (2023) کے اسٹیج سے پروفیسر ناصر علی سید کی خوبصورت کلام خوانی اور پُرجوش ادبی گفتگو۔",
    descriptionEnglish: "Urdu poetry recitation and literary interactive talk by Prof. Nasir Ali Syed at the Peshawar Literary Festival (PLF 2023).",
    url: "https://youtu.be/s3qsCb-KgMc",
    date: "2023"
  },
  {
    id: "v12",
    title: "اسلام آباد مشاعرہ: پروفیسر ناصر علی سید کا خوبصورت کلام",
    titleEnglish: "Islamabad Mushaira: Exquisite Poetry Recital by Prof. Nasir Ali Syed",
    description: "وفاقی دارالحکومت اسلام آباد میں منعقدہ مشاعرے سے پروفیسر ناصر علی سید کی خوبصورت کلام خوانی کی ویڈیو جھلکیاں۔",
    descriptionEnglish: "Poetry recitation highlights from a grand mushaira event held in the federal capital Islamabad.",
    url: "https://youtu.be/ZEnexwXCn-k",
    date: "2024"
  },
  {
    id: "v13",
    title: "پروفیسر ناصر علی سید: ایک مایہ ناز ڈرامہ نگار، شاعر اور صحافی",
    titleEnglish: "Profile Tribute: Prof. Nasir Ali Syed - The Playwright, Poet & Journalist",
    description: "ان کے کثیر الجہتی فنی سفر، ریڈیو و ٹی وی ڈراموں، کالم نگاری اور شاعری کی خدمات پر مشتمل دستاویزی خراجِ تحسین۔",
    descriptionEnglish: "A documentary tribute celebrating his multidimensional career as a celebrated playwright, poet, and veteran journalist.",
    url: "https://youtu.be/5EBMR0sxR1c",
    date: "2023"
  },
  {
    id: "v14",
    title: "پروفیسر ناصر علی سید کی اردو اور ہندکو شاعری کا حسین سنگم",
    titleEnglish: "Multilingual Poetry Session: Urdu & Hindko Verses by Prof. Nasir Ali Syed",
    description: "پشاور کی ثقافتی پہچان کو اجاگر کرتی پروفیسر ناصر علی سید کی دلکش اردو اور ہندکو شاعری کی لائیو پیشکش۔",
    descriptionEnglish: "An exceptional poetry session reflecting the dual heritage of Peshawar, featuring both Urdu and Hindko verses by the professor.",
    url: "https://youtu.be/cmsAj8toRV8",
    date: "2022"
  },
  {
    id: "v15",
    title: "فخرِ اردو پروگرام: پروفیسر ناصر علی سید (ماورا لٹریری فورم امریکہ)",
    titleEnglish: "Fakhr-e-Urdu Tribute Program: Prof. Nasir Ali Syed (Mavra Forum USA)",
    description: "امریکہ کے ماورا لٹریری فورم کی جانب سے پروفیسر ناصر علی سید کی نصف صدی پر محیط ادبی خدمات کے اعتراف میں خصوصی تقریب۔",
    descriptionEnglish: "A virtual tribute session organized by Mavra World Literary Forum America to recognize his lifelong services to Urdu literature.",
    url: "https://youtu.be/PA7j8AGoatk",
    date: "2025"
  },
  {
    id: "v16",
    title: "کلیدی صدارتی خطاب: سالانہ تعلیمی و ادبی سیمینار (پشاور)",
    titleEnglish: "Keynote Presidential Address: Annual Educational & Literary Seminar (Peshawar)",
    description: "سالانہ تعلیمی و ادبی سیمینار پشاور میں پروفیسر ناصر علی سید کا کلیدی اور فکر انگیز صدارتی خطاب۔",
    descriptionEnglish: "A highly scholarly keynote presidential address delivered by Prof. Nasir Ali Syed at the annual congress in Peshawar.",
    url: "https://youtu.be/eWcxTvVRyI8",
    date: "2019"
  },
  {
    id: "v17",
    title: "ادبی شو: گفتگو ناصر علی سید اور سلمیٰ قاصر کے ساتھ (حصہ اول)",
    titleEnglish: "Literary Dialogue: Prof. Nasir Ali Syed with Salma Qasir (Part 1)",
    description: "ادبی ٹاک شو کا پہلا حصہ جس میں پروفیسر ناصر علی سید اپنے علمی سفر، اساتذہ اور پشاور یونیورسٹی کے تدریسی زمانوں کا تذکرہ کر رہے ہیں۔",
    descriptionEnglish: "The first part of an interactive literary show with guest of honor Prof. Nasir Ali Syed sharing memories of his education and teaching days.",
    url: "https://youtu.be/EjGsutdfoUQ",
    date: "2022"
  },
  {
    id: "v18",
    title: "حمد و نعت خوانی: سالانہ حمدیہ و نعتیہ مشاعرہ 2025",
    titleEnglish: "Beautiful Hamd & Naat Recital: Annual Hamdia Naat Mushaira 2025",
    description: "سالانہ حمدیہ و نعتیہ مشاعرہ 2025 سے پروفیسر ناصر علی سید کی پُراثر حمدیہ اور نعتیہ کلام خوانی۔",
    descriptionEnglish: "A deeply spiritual recitation of devotional hamd and naat poetry by Prof. Nasir Ali Syed at the Annual Hamdia Naat Mushaira 2025.",
    url: "https://youtu.be/smFmiSfOpJk",
    date: "2025"
  },
  {
    id: "v19",
    title: "ادبی نشست اور پوڈ کاسٹ: پروفیسر ناصر علی سید کا منتخب کلام اور خصوصی گفتگو",
    titleEnglish: "Literary Sitting & Podcast: Prof. Nasir Ali Syed Recites Chosen Ghazals & Dialogue",
    description: "خصوصی ادبی نشست اور پوڈ کاسٹ جس میں پروفیسر ناصر علی سید نے اپنے منتخب اور پسندیدہ کلام کا جادو جگایا۔",
    descriptionEnglish: "An intimate literary sitting and podcast featuring Prof. Nasir Ali Syed reading a curation of his personal favorite poetry and ghazals.",
    url: "https://youtu.be/Uzxexs3839s",
    date: "2024"
  },
  {
    id: "v20",
    title: "ہندکو ثقافتی پروگرام: پروفیسر ناصر علی سید کے ساتھ خصوصی گفتگو (حصہ اول)",
    titleEnglish: "Hindko Cultural Program: Special Interview with Prof. Nasir Ali Syed (Part 1)",
    description: "ہندکو ثقافتی شو کا پہلا حصہ جس میں میزبان ایس کے جدون کے ساتھ پشاور کی ثقافت اور ہندکو ادب پر گفتگو کی گئی۔",
    descriptionEnglish: "The first part of a specialized Hindko cultural broadcast featuring Prof. Nasir Ali Syed sharing views on Peshawar's heritage with host S. K. Jadoon.",
    url: "https://youtu.be/zlANft72zb0",
    date: "2024"
  },
  {
    id: "v21",
    title: "شعری نشست: ناصر علی سید کا خوبصورت منظوم کلام",
    titleEnglish: "Literary Sitting: Poetic Recital by Professor Nasir Ali Syed",
    description: "خوبصورت شعری اور منظوم نشست سے پروفیسر ناصر علی سید کا بہترین کلام۔",
    descriptionEnglish: "An exquisite poetic gathering showcasing some of the best verses written and performed by Prof. Nasir Ali Syed.",
    url: "https://youtu.be/IetD8wtsTXY",
    date: "2024"
  },
  {
    id: "v22",
    title: "عالمی اردو مشاعرہ: پروفیسر ناصر علی سید کا صدارتی شعری کلام",
    titleEnglish: "International Urdu Mushaira: Featured Poetry Recitation",
    description: "عالمی اردو مشاعرے کے پلیٹ فارم سے پروفیسر ناصر علی سید کا صدارتی کلام اور سامعین سے داد و تحسین۔",
    descriptionEnglish: "Excerpts of the keynote presidential poetry recitation by Prof. Nasir Ali Syed at a major global Urdu mushaira.",
    url: "https://youtu.be/DwHoQY_MZZE",
    date: "2023"
  },
  {
    id: "v23",
    title: "یادگار مشاعرہ: ناصر علی سید کی منفرد کلام خوانی",
    titleEnglish: "Memorable Mushaira: Signature Poetic Performance",
    description: "ناصر علی سید کی منفرد کلام خوانی اور مشاعرے کی یادگار وڈیو جھلکیاں۔",
    descriptionEnglish: "A short and memorable compilation of highlights from a classic mushaira event, showcasing his signature poetry recital style.",
    url: "https://youtu.be/AKLbT_qwN30",
    date: "2024"
  },
  {
    id: "v24",
    title: "ادبی شو: ناصر علی سید کا فکری سفر اور ہم عصر اردو ادب (حصہ دوم)",
    titleEnglish: "Literary Show: Discussion on Contemporary Urdu Literature (Part 2)",
    description: "ادبی شو کا دوسرا حصہ جس میں پروفیسر ناصر علی سید نے ہم عصر ادب، کالم نگاری اور جدید رجحانات پر کھل کر گفتگو کی۔",
    descriptionEnglish: "The second installment of the detailed broadcast focusing on contemporary Urdu literature, prose, and the modern writer's role.",
    url: "https://youtu.be/Vxwuthf29hg",
    date: "2024"
  },
  {
    id: "v25",
    title: "خصوصی لیکچر: کلاسیکی اردو شاعری اور ہماری ادبی روایات",
    titleEnglish: "Special Lecture: Classical Urdu Poetry and Literary Traditions",
    description: "کلاسیکی اردو شاعری کے اصولوں اور ہماری شاندار تہذیبی و ادبی روایات پر پروفیسر ناصر علی سید کا بصیرت افروز لیکچر۔",
    descriptionEnglish: "A highly educational and deep lecture by Prof. Nasir Ali Syed exploring the classical foundations of Urdu poetry and culture.",
    url: "https://youtu.be/e7qdWYWU7vw",
    date: "2023"
  },
  {
    id: "v26",
    title: "نشستِ ادب: ناصر علی سید کی منتخب غزلیں اور منظومات",
    titleEnglish: "Evening of Literature: Selected Ghazals and Verses",
    description: "ادبی محفل سے ناصر علی سید کی بہترین غزلیں اور فکری گہرائی سے مزین منظومات۔",
    descriptionEnglish: "A beautiful compilation of selected ghazals and thematic poems recited by the professor during an evening of pure literature.",
    url: "https://youtu.be/DakqS-45d7A",
    date: "2024"
  },
  {
    id: "v27",
    title: "پشتو ادبی پروگرام: ناصر علی سید کی علمی و ادبی خدمات پر گفتگو",
    titleEnglish: "Pashto Literary Special: Honoring the Scholarly Works of Prof. Nasir Ali Syed",
    description: "پشتو ادبی پروگرام جس میں پروفیسر ناصر علی سید کی علمی و ادبی خدمات کو خراجِ تحسین پیش کیا گیا۔",
    descriptionEnglish: "A specialized Pashto cultural program paying tribute to the scholarly, academic, and creative legacies of Prof. Nasir Ali Syed.",
    url: "https://youtu.be/0Gi5PJtu0hQ",
    date: "2024"
  },
  {
    id: "v28",
    title: "ٹریبون پروگرام: پروفیسر ناصر علی سید کی صحافتی اور ادبی جہات",
    titleEnglish: "Tribute Program: Chronicling the Journalism and Literary Legacy of Prof. Nasir Ali Syed",
    description: "پروفیسر ناصر علی سید کی بے مثال کالم نگاری، ڈرامہ نگاری اور تخلیقی کاموں پر ایک شاندار خراجِ عقیدت۔",
    descriptionEnglish: "A comprehensive tribute profile highlighting the outstanding journalistic contributions and everlasting literary footprint of the professor.",
    url: "https://youtu.be/A0VkAqG1HhE",
    date: "2024"
  }
];
