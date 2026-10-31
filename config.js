/* ==================================================================
   EDIT THIS FILE ONLY. Everything on the invitation comes from here.
   Text written as  { en: "...", bn: "..." }  shows in English or Bengali
   depending on the language the guest picks.
   ================================================================== */
window.INVITE = {

  defaultLang: "en",            // "en" or "bn" (a link can override it: ...?lang=bn)

  /* ---------- The couple ---------- */
  partner1: {
    name: { en: "Sudip", bn: "সুদীপ" },
    parents: { en: "Son of Mr. & Mrs. Shil", bn: "শ্রী ও শ্রীমতী শীলের পুত্র" }
  },

  partner2: {
    name: { en: "Thitika", bn: "তিথিকা" },
    parents: { en: "Daughter of Mr. & Mrs. Char", bn: "শ্রী ও শ্রীমতী চারের কন্যা" }
  },

  blessing: { en: "Shubho Bibaho", bn: "শুভ বিবাহ" },   // shown at the top (you can use e.g. "শ্রী শ্রী গণেশায় নমঃ")
  intro: {
    en: "Together with our families, we joyfully invite you to celebrate our wedding",
    bn: "সপরিবারে আমরা আনন্দের সঙ্গে আপনাকে আমাদের শুভ বিবাহে আমন্ত্রণ জানাচ্ছি"
  },

  /* ---------- Main wedding day ---------- */
  date: "2027-01-26T18:30:00+05:30",       // used for the countdown and calendar (+05:30 = India)
  venue: {
    name: { en: "The Grand Palace Lawns", bn: "দ্য গ্র্যান্ড প্যালেস লনস" },
    city: { en: "Asansole, West Bengal", bn: "আসানসোল, পশ্চিমবঙ্গ" },
    mapsUrl: "https://maps.google.com/?q=Asansole"
  },

  /* ---------- Personal message ----------
     A guest who opens their personal link sees "Dear <their name>" above this message.
     You can also write {name} inside the message to place their name. A custom message
     for one guest can be set when you make their link in generator.html. */
  personal: {
    message: {
      en: "Your blessings and your presence will make our special day complete. We would be so happy to celebrate it with you.",
      bn: "আপনার আশীর্বাদ ও উপস্থিতি আমাদের এই বিশেষ দিনটিকে পূর্ণ করবে। আপনাকে পাশে পেলে আমরা খুব আনন্দিত হব।"
    },
    signature: { en: "With love, Sudip & Tithika", bn: "ভালোবাসায়, সুদীপ ও তিথিকা" }
  },

  /* ---------- Our story ---------- */
  story: {
    en: [
      "We met on a rainy Kolkata evening, under one umbrella, over a very bad cup of chai.",
      "Years of long walks, late-night calls and quiet little promises later, we are saying yes to forever.",
      "Nothing would make us happier than having you with us on the day."
    ],
    bn: [
      "এক বর্ষার সন্ধ্যায়, একটি ছাতা আর এক কাপ বিস্বাদ চায়ের মধ্য দিয়ে কলকাতায় আমাদের প্রথম দেখা।",
      "কত দীর্ঘ হাঁটা, গভীর রাতের ফোন আর ছোট ছোট প্রতিশ্রুতির পর আজ আমরা একসঙ্গে পথ চলার সিদ্ধান্ত নিয়েছি।",
      "সেই দিনটিতে আপনি পাশে থাকলে আমাদের আনন্দ পূর্ণ হবে।"
    ]
  },

  /* ---------- Your photos ----------
     Put image files in the "photos" folder and list them here.
     Missing files are skipped automatically, so you can add or remove freely. */
  photos: {
    hero: "photos/couple.jpg",              // main photo (portrait, about 3:4, under 500 KB)
    gallery: [
      { src: "photos/1.jpg", caption: { en: "Where it began", bn: "যেখানে শুরু" } },
      { src: "photos/2.jpg", caption: { en: "Our favourite place", bn: "আমাদের প্রিয় জায়গা" } },
      { src: "photos/3.jpg", caption: { en: "The proposal", bn: "প্রস্তাবের দিন" } },
      { src: "photos/4.jpg", caption: { en: "Forever begins", bn: "চিরকালের শুরু" } }
    ]
  },

  /* ---------- Functions (delete or add as you like) ---------- */
  events: [
    {
      title: { en: "Gaye Holud", bn: "গায়ে হলুদ" },
      date: "2027-01-23", time: { en: "11:00 AM", bn: "সকাল ১১টা" },
      venue: { en: "Bride's residence", bn: "কনের বাড়ি" },
      text: { en: "Turmeric, laughter and lots of music.", bn: "হলুদ, হাসি আর গানে ভরা এক সকাল।" }
    },
    {
      title: { en: "Bor Jatri", bn: "বর যাত্রী" },
      date: "2027-01-24", time: { en: "5:30 PM", bn: "বিকেল ৫:৩০" },
      venue: { en: "The Grand Palace Lawns", bn: "দ্য গ্র্যান্ড প্যালেস লনস" },
      text: { en: "The groom's procession arrives with music and dance.", bn: "বাজনা আর নাচের সঙ্গে বরের আগমন।" }
    },
    {
      title: { en: "Subho Drishti & Mala Bodol", bn: "শুভদৃষ্টি ও মালা বদল" },
      date: "2027-01-24", time: { en: "6:30 PM", bn: "সন্ধ্যা ৬:৩০" },
      venue: { en: "The Grand Palace Lawns", bn: "দ্য গ্র্যান্ড প্যালেস লনস" },
      text: { en: "The first glance and the exchange of garlands.", bn: "প্রথম দৃষ্টি বিনিময় ও মালা বদলের শুভক্ষণ।" }
    },
    {
      title: { en: "Saat Paak & Sindoor Daan", bn: "সাত পাক ও সিঁদুর দান" },
      date: "2027-01-24", time: { en: "8:00 PM", bn: "রাত ৮:০০" },
      venue: { en: "The Grand Palace Lawns", bn: "দ্য গ্র্যান্ড প্যালেস লনস" },
      text: { en: "The sacred rituals of the wedding.", bn: "বিবাহের পবিত্র আচার-অনুষ্ঠান।" }
    },
    // {
    //   title: { en: "Bou Bhaat (Reception)", bn: "বৌভাত" },
    //   date: "2027-01-25", time: { en: "7:30 PM", bn: "সন্ধ্যা ৭:৩০" },
    //   venue: { en: "Groom's family home", bn: "বরের বাড়ি" },
    //   text: { en: "A feast to welcome the bride into the family.", bn: "নতুন বধূকে পরিবারে বরণ করে নেওয়ার ভোজ।" }
    // }
  ],

  dressCode: {
    text: {
      en: "Traditional attire: sarees, dhoti-panjabi and festive ethnic wear. Reds, golds, yellows and creams are most welcome.",
      bn: "ঐতিহ্যবাহী পোশাক: শাড়ি, ধুতি-পাঞ্জাবি বা উৎসবের পোশাক। লাল, সোনালি, হলুদ ও ক্রিমের ছোঁয়া থাকলে মানানসই।"
    },
    colors: ["#b3122a", "#e2b24a", "#f28c0f", "#fbf0da", "#2f6b4f"]
  },

  stay: {
    text: {
      en: "We have reserved rooms at these nearby hotels. Please mention our names when booking.",
      bn: "আমরা নিকটবর্তী কয়েকটি হোটেলে ঘর সংরক্ষণ করেছি। বুকিং করার সময় অনুগ্রহ করে আমাদের নাম উল্লেখ করুন।"
    },
    hotels: [
      { name: { en: "Hotel Riverside", bn: "হোটেল রিভারসাইড" }, note: { en: "5 minutes from the venue", bn: "অনুষ্ঠানস্থল থেকে ৫ মিনিট" }, link: "https://maps.google.com/?q=Hotel+Kolkata" },
      { name: { en: "The Lotus Inn", bn: "দ্য লোটাস ইন" }, note: { en: "10 minutes from the venue", bn: "অনুষ্ঠানস্থল থেকে ১০ মিনিট" }, link: "https://maps.google.com/?q=Lotus+Inn+Kolkata" }
    ]
  },

  rsvp: {
    deadline: { en: "Kindly reply by 1 January 2027", bn: "অনুগ্রহ করে ১ জানুয়ারি ২০২৭-এর মধ্যে জানান" },
    whatsapp: "919999999999"          // country code + number, digits only. "" hides the RSVP form.
  },

  gift: {
    text: {
      en: "Your presence and blessings are the greatest gift we could ask for.",
      bn: "আপনার উপস্থিতি ও আশীর্বাদই আমাদের সবচেয়ে বড় উপহার।"
    }
  },

  /* ---------- Music ----------
     mode "synth": a soft built-in Indian-style tune (tanpura drone + flute), no file needed.
     file: put your own mp3 in this folder (e.g. "music.mp3") to use it instead (e.g. shehnai). */
  // music: { mode: "synth", file: "" }      // mode: "synth" | "off"
  music: { mode: "synth", file: "music.mp3" }
};
