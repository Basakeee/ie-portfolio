/* =====================================================================
   ข้อมูลทั้งหมดของเว็บอยู่ในไฟล์นี้ไฟล์เดียว
   แก้ที่นี่ แล้ว refresh หน้าเว็บ ไม่ต้องแตะ index.html / main.js
   ข้อความในวงเล็บ [ ... ] คือ placeholder ที่รอข้อมูลจริง
   ===================================================================== */

const DATA = {

  profile: {
    name: "[ชื่อ นามสกุล]",
    nameEn: "[Firstname Lastname]",
    title: "นักศึกษาวิศวกรรมอุตสาหการ ชั้นปีที่ 4",
    tagline: "[ประโยคแนะนำตัวสั้น ๆ 1-2 บรรทัด เช่น สนใจงานปรับปรุงกระบวนการผลิตและการวิเคราะห์ข้อมูล]",
    availability: "พร้อมฝึกสหกิจ: [เดือน ปี] – [เดือน ปี]",
    photo: "",                       // เช่น "assets/profile.jpg" (เว้นว่าง = แสดงตัวอักษรย่อ)
    resumePdf: "assets/resume.pdf",  // ไฟล์ CV สำหรับปุ่ม Download CV
    contactLead: "[ข้อความชวนติดต่อ เช่น ยินดีพูดคุยเรื่องตำแหน่งสหกิจศึกษาด้าน ...]",
    contacts: [
      { label: "Email",    value: "[email@example.com]", href: "mailto:[email@example.com]" },
      { label: "โทร",      value: "[0xx-xxx-xxxx]",      href: "tel:[0xxxxxxxxx]" },
      { label: "LinkedIn", value: "[linkedin.com/in/...]", href: "#" },
      { label: "ที่อยู่",    value: "[จังหวัด]",            href: "" }
    ]
  },

  about: {
    paragraphs: [
      "[ย่อหน้าที่ 1: เป็นใคร เรียนที่ไหน สนใจงาน IE ด้านไหน]",
      "[ย่อหน้าที่ 2: จุดแข็ง วิธีคิด/วิธีทำงาน และสิ่งที่อยากได้จากการฝึกสหกิจ]"
    ],
    stats: [
      { value: "[0.00]", label: "GPAX" },
      { value: "[0]",    label: "โปรเจกต์" },
      { value: "[0]",    label: "ใบรับรอง" },
      { value: "[0]",    label: "เครื่องมือที่ใช้ได้" }
    ]
  },

  education: [
    {
      period: "[25xx] – ปัจจุบัน",
      title: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมอุตสาหการ",
      place: "[ชื่อมหาวิทยาลัย]",
      details: ["GPAX [0.00]", "[วิชาเด่น เช่น Work Study, Quality Control, Operations Research]"]
    },
    {
      period: "[25xx] – [25xx]",
      title: "[มัธยมศึกษาตอนปลาย สายวิทย์-คณิต]",
      place: "[ชื่อโรงเรียน]",
      details: []
    }
  ],

  experience: [
    {
      period: "[เดือน ปี] – [เดือน ปี]",
      title: "[ตำแหน่ง / ฝึกงานภาคฤดูร้อน]",
      place: "[ชื่อบริษัท]",
      details: ["[ทำอะไร + ผลลัพธ์เป็นตัวเลข เช่น เก็บข้อมูลเวลา 5 สถานีงาน เสนอปรับ layout ลดระยะเดิน 12%]"]
    }
  ],

  activities: [
    {
      period: "[ปี]",
      title: "[ตำแหน่งในชมรม / ค่าย / การแข่งขัน]",
      place: "[ชื่อกิจกรรม]",
      details: ["[บทบาทและสิ่งที่ทำ]"]
    }
  ],

  skills: [
    { group: "IE Core",        items: ["[Work Study]", "[Lean / 7 Wastes]", "[QC 7 Tools]", "[Production Planning]"] },
    { group: "Data & Tools",   items: ["[Excel]", "[Minitab]", "[Power BI]", "[Python]"] },
    { group: "Design / Sim",   items: ["[AutoCAD]", "[SolidWorks]", "[Arena / FlexSim]"] },
    { group: "Soft Skills",    items: ["[การนำเสนอ]", "[ทำงานเป็นทีม]"] }
  ],

  certificates: [
    "[ชื่อใบรับรอง – ผู้ออก (ปี)]",
    "[ชื่อคอร์สอบรม – ผู้ออก (ปี)]"
  ],

  languages: [
    "ไทย – ภาษาแม่",
    "อังกฤษ – [ระดับ / คะแนน TOEIC]"
  ],

  /* ---------------------------------------------------------------
     ผลงาน: 1 ก้อน { } = 1 การ์ด  อยากเพิ่มก็ก๊อปทั้งก้อนไปวางต่อ
     category ใช้ทำปุ่มกรองอัตโนมัติ (สะกดให้ตรงกันถ้าอยู่หมวดเดียวกัน)
     --------------------------------------------------------------- */
  projects: [
    {
      title: "[ชื่อโปรเจกต์ 1]",
      category: "Process Improvement",
      year: "[ปี]",
      cover: "",                     // เช่น "assets/projects/p1.jpg"
      summary: "[สรุป 1 บรรทัด: ทำอะไร ได้ผลอะไร]",
      role: "[บทบาท เช่น หัวหน้าทีม / เก็บและวิเคราะห์ข้อมูล]",
      tools: ["[Time Study]", "[Excel]"],
      problem: "[ปัญหาคืออะไร วัดจากอะไร]",
      method: "[ใช้เครื่องมือ/วิธีอะไร ทำไมเลือกวิธีนี้]",
      result: "[ผลลัพธ์ ก่อน-หลัง]",
      metrics: [
        { value: "[-00%]", label: "Cycle time" },
        { value: "[+00%]", label: "Productivity" }
      ],
      images: [],                    // รูปเพิ่มเติมในหน้ารายละเอียด
      links: []                      // เช่น [{ label: "รายงาน PDF", href: "assets/projects/p1.pdf" }]
    },
    {
      title: "[ชื่อโปรเจกต์ 2]",
      category: "Data Analysis",
      year: "[ปี]",
      cover: "",
      summary: "[สรุป 1 บรรทัด]",
      role: "[บทบาท]",
      tools: ["[Minitab]", "[Power BI]"],
      problem: "[ปัญหา]",
      method: "[วิธีการ]",
      result: "[ผลลัพธ์]",
      metrics: [{ value: "[00]", label: "[ตัวชี้วัด]" }],
      images: [],
      links: []
    },
    {
      title: "[ชื่อโปรเจกต์ 3]",
      category: "Simulation",
      year: "[ปี]",
      cover: "",
      summary: "[สรุป 1 บรรทัด]",
      role: "[บทบาท]",
      tools: ["[Arena]"],
      problem: "[ปัญหา]",
      method: "[วิธีการ]",
      result: "[ผลลัพธ์]",
      metrics: [{ value: "[00]", label: "[ตัวชี้วัด]" }],
      images: [],
      links: []
    },
    {
      title: "[โปรเจกต์จบ / Senior Project]",
      category: "Senior Project",
      year: "[ปี]",
      cover: "",
      summary: "[สรุป 1 บรรทัด]",
      role: "[บทบาท]",
      tools: ["[เครื่องมือ]"],
      problem: "[ปัญหา]",
      method: "[วิธีการ]",
      result: "[ผลลัพธ์ / ความคืบหน้า]",
      metrics: [],
      images: [],
      links: []
    }
  ]
};
