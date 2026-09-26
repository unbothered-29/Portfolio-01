const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Letter size (612 x 792) or A4 (595.28 x 841.89)
// The screenshot is standard US Letter / A4 with 36pt margins.
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 32, bottom: 32, left: 38, right: 38 },
  autoFirstPage: true,
  info: {
    Title: 'Jessicaa Chauhan - Resume',
    Author: 'Jessicaa Chauhan',
    Subject: 'Front-end Web Developer Resume',
    Keywords: 'Frontend, React, TypeScript, Next.js, Developer, Jessicaa Chauhan',
  }
});

const outPath1 = path.join(publicDir, 'Jessicaa_Chauhan_Resume.pdf');
const outPath2 = path.join(publicDir, 'resume.pdf');

const stream1 = fs.createWriteStream(outPath1);
doc.pipe(stream1);

// Standard LaTeX resume styling
const black = '#000000';
const linkBlue = '#0033cc';
const leftMargin = 38;
const rightMargin = 557.28;
const contentWidth = rightMargin - leftMargin; // 519.28

// Helper: section header with full horizontal rule
function sectionHeader(title) {
  doc.y += 6;
  doc
    .font('Times-Bold')
    .fontSize(10)
    .fillColor(black)
    .text(title.toUpperCase(), leftMargin, doc.y, { characterSpacing: 0.5 });
  
  const lineY = doc.y + 1;
  doc
    .strokeColor('#000000')
    .lineWidth(0.6)
    .moveTo(leftMargin, lineY)
    .lineTo(rightMargin, lineY)
    .stroke();

  doc.y = lineY + 3;
}

// 1. NAME HEADER
doc
  .font('Times-Roman')
  .fontSize(23)
  .fillColor(black)
  .text('Jessicaa Chauhan', leftMargin, 32, { align: 'center', width: contentWidth });

doc.y += 2;

// Contact Line 1
const contactY1 = doc.y;
doc.font('Times-Roman').fontSize(9).fillColor(black);

// Center contact line 1: Mumbai, Maharashtra | +91 8855872136 | chauhanjessicaa27@gmail.com | github.com/unbothered-29 |
const part1 = 'Mumbai, Maharashtra  |  +91 8855872136  |  ';
const part2 = 'chauhanjessicaa27@gmail.com';
const part3 = '  |  ';
const part4 = 'github.com/unbothered-29';
const part5 = '  |';

const w1 = doc.widthOfString(part1);
const w2 = doc.widthOfString(part2);
const w3 = doc.widthOfString(part3);
const w4 = doc.widthOfString(part4);
const w5 = doc.widthOfString(part5);
const totalW1 = w1 + w2 + w3 + w4 + w5;
let startX1 = leftMargin + (contentWidth - totalW1) / 2;

doc.fillColor(black).text(part1, startX1, contactY1, { lineBreak: false });
startX1 += w1;
doc.fillColor(linkBlue).text(part2, startX1, contactY1, { link: 'mailto:chauhanjessicaa27@gmail.com', underline: false, lineBreak: false });
startX1 += w2;
doc.fillColor(black).text(part3, startX1, contactY1, { lineBreak: false });
startX1 += w3;
doc.fillColor(linkBlue).text(part4, startX1, contactY1, { link: 'https://github.com/unbothered-29', underline: false, lineBreak: false });
startX1 += w4;
doc.fillColor(black).text(part5, startX1, contactY1);

// Contact Line 2: linkedin.com/in/jessicaachauhan
const contactY2 = doc.y + 1;
const linkedText = 'linkedin.com/in/jessicaachauhan';
const wLinked = doc.widthOfString(linkedText);
const startX2 = leftMargin + (contentWidth - wLinked) / 2;
doc.fillColor(linkBlue).text(linkedText, startX2, contactY2, { link: 'https://linkedin.com/in/jessicaachauhan', underline: false });

doc.y = contactY2 + 11;

// 2. PROFESSIONAL SUMMARY
sectionHeader('Professional Summary');
doc
  .font('Times-Roman')
  .fontSize(8.7)
  .fillColor(black)
  .text(
    'Dedicated Front-end Web Developer who enjoys turning ideas into functional, polished websites. Skilled in building responsive frontend interfaces with React.js, Next.js, TypeScript, and Tailwind CSS, with strong attention to detail, reusable components, clean design, and user experience.',
    leftMargin,
    doc.y,
    { width: contentWidth, lineGap: 1.2 }
  );

// 3. EDUCATION
sectionHeader('Education');

const eduY = doc.y + 1;
doc
  .font('Times-Bold')
  .fontSize(9.2)
  .fillColor(black)
  .text('Rajiv Gandhi Institute of Technology (RGIT), Mumbai', leftMargin, eduY, { lineBreak: false });

doc
  .font('Times-Roman')
  .fontSize(9)
  .fillColor(black)
  .text('Sep 2024 – May 2028', rightMargin - 130, eduY, { width: 130, align: 'right' });

doc.y = eduY + 11;
doc
  .font('Times-Italic')
  .fontSize(8.8)
  .fillColor(black)
  .text('Bachelor of Engineering (B.E.) – Artificial Intelligence & Data Science, 8.5 CGPA', leftMargin);

doc.y += 1;
doc
  .font('Times-Roman')
  .fontSize(8.6)
  .fillColor(black)
  .text('•  ', leftMargin + 8, doc.y, { lineBreak: false });

const crsX = leftMargin + 18;
const crsY = doc.y;
doc
  .font('Times-Bold')
  .fontSize(8.6)
  .text('Relevant Coursework: ', crsX, crsY, { lineBreak: false });

const rcwW = doc.widthOfString('Relevant Coursework: ');
doc
  .font('Times-Roman')
  .fontSize(8.6)
  .text(
    'Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Software Engineering',
    crsX + rcwW,
    crsY,
    { width: contentWidth - 18 - rcwW, lineGap: 1.1 }
  );

// 4. TECHNICAL SKILLS
sectionHeader('Technical Skills');

const skillRows = [
  { label: 'Frontend: ', val: 'HTML5, CSS3, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS' },
  { label: 'Backend: ', val: 'Java, Spring Boot, REST APIs, Kafka, Microservices' },
  { label: 'Tools & Cloud: ', val: 'Git, GitHub, Docker, Vercel, AWS' },
  { label: 'Concepts: ', val: 'Responsive Design, Component-Based Architecture' },
];

skillRows.forEach(row => {
  const rowY = doc.y + 1;
  doc
    .font('Times-Bold')
    .fontSize(8.8)
    .fillColor(black)
    .text(row.label, leftMargin, rowY, { lineBreak: false });

  const labelW = doc.widthOfString(row.label);
  doc
    .font('Times-Roman')
    .fontSize(8.8)
    .text(row.val, leftMargin + labelW, rowY, { width: contentWidth - labelW, lineGap: 1 });
  doc.y = rowY + 11;
});

// 5. PROFESSIONAL EXPERIENCE
sectionHeader('Professional Experience');

// Exp 1: President - RGIT FE-SAHYOG
const exp1Y = doc.y + 1;
doc
  .font('Times-Bold')
  .fontSize(9.2)
  .fillColor(black)
  .text('President', leftMargin, exp1Y, { lineBreak: false });

doc
  .font('Times-Roman')
  .fontSize(8.8)
  .text('Aug 2026 – Present', rightMargin - 120, exp1Y, { width: 120, align: 'right' });

doc.y = exp1Y + 11;
doc
  .font('Times-Italic')
  .fontSize(8.8)
  .fillColor(black)
  .text('RGIT FE-SAHYOG', leftMargin);

const exp1Bullets = [
  'Leading a team of 30+ members, defining goals and setting strategic direction for the academic year.',
  'Manage and track progress across operational domains, ensuring accountability and timely delivery.',
  'Plan and executed 2+ events for first-year students in collaboration with the team.'
];

exp1Bullets.forEach(b => {
  doc.y += 1.5;
  const bY = doc.y;
  doc.font('Times-Roman').fontSize(8.6).text('•  ', leftMargin + 8, bY, { lineBreak: false });
  doc.text(b, leftMargin + 18, bY, { width: contentWidth - 18, lineGap: 1.1 });
});

// Exp 2: Content Team Head - Roamevo Private Limited
doc.y += 4;
const exp2Y = doc.y;
doc
  .font('Times-Bold')
  .fontSize(9.2)
  .fillColor(black)
  .text('Content Team Head', leftMargin, exp2Y, { lineBreak: false });

doc
  .font('Times-Roman')
  .fontSize(8.8)
  .text('Feb 2026 – Present', rightMargin - 120, exp2Y, { width: 120, align: 'right' });

doc.y = exp2Y + 11;
doc
  .font('Times-Italic')
  .fontSize(8.8)
  .fillColor(black)
  .text('Roamevo Private Limited', leftMargin);

const exp2Bullets = [
  'Designed 10+ trip itineraries and coordinated content delivery aligned with founder expectations.',
  'Created marketing collateral including flyers, banners, posters, and Instagram posts for company promotions.',
  'Collaborated with the team to develop and execute promotional campaigns, improving content consistency and audience engagement.'
];

exp2Bullets.forEach(b => {
  doc.y += 1.5;
  const bY = doc.y;
  doc.font('Times-Roman').fontSize(8.6).text('•  ', leftMargin + 8, bY, { lineBreak: false });
  doc.text(b, leftMargin + 18, bY, { width: contentWidth - 18, lineGap: 1.1 });
});

// 6. SELECTED PROJECTS
sectionHeader('Selected Projects');

// Project 1: SPIT Sahyog
const p1Y = doc.y + 1;
doc
  .font('Times-Bold')
  .fontSize(9.2)
  .fillColor(black)
  .text('SPIT Sahyog', leftMargin, p1Y, { lineBreak: false });

const p1NameW = doc.widthOfString('SPIT Sahyog');
doc
  .font('Times-Roman')
  .fontSize(9)
  .fillColor(black)
  .text('  |  ', leftMargin + p1NameW, p1Y, { lineBreak: false });

const p1SepW = doc.widthOfString('  |  ');
doc
  .font('Times-Roman')
  .fontSize(9)
  .fillColor(linkBlue)
  .text('spit-sahyog.vercel.app', leftMargin + p1NameW + p1SepW, p1Y, { link: 'https://spit-sahyog.vercel.app', lineBreak: false });

doc
  .font('Times-Roman')
  .fontSize(8.8)
  .fillColor(black)
  .text('2026', rightMargin - 60, p1Y, { width: 60, align: 'right' });

doc.y = p1Y + 11;
doc
  .font('Times-Italic')
  .fontSize(8.8)
  .fillColor(black)
  .text('React.js, TypeScript, Vite, Tailwind CSS, Leaflet.js', leftMargin);

const p1Bullets = [
  'Developed a mobile-first Progressive Web App for campus navigation, combining interactive Leaflet maps with custom SVG floor plans to guide users to classrooms, labs, and facilities.',
  'Implemented fuzzy search, floor-based filtering, offline data caching with IndexedDB, and Zustand state management for reliable navigation with limited connectivity.',
  'Built reusable responsive React components and touch-friendly interfaces optimized for mobile devices; won the Pixel-Perfect Hackathon 2026.'
];

p1Bullets.forEach(b => {
  doc.y += 1.5;
  const bY = doc.y;
  doc.font('Times-Roman').fontSize(8.6).fillColor(black).text('•  ', leftMargin + 8, bY, { lineBreak: false });
  doc.text(b, leftMargin + 18, bY, { width: contentWidth - 18, lineGap: 1.1 });
});

// Project 2: Smart Attendance Tracker & AI Timetable Manager
doc.y += 4;
const p2Y = doc.y;
doc
  .font('Times-Bold')
  .fontSize(9.2)
  .fillColor(black)
  .text('Smart Attendance Tracker & AI Timetable Manager', leftMargin, p2Y, { lineBreak: false });

const p2NameW = doc.widthOfString('Smart Attendance Tracker & AI Timetable Manager');
doc
  .font('Times-Roman')
  .fontSize(9)
  .fillColor(black)
  .text('  |  ', leftMargin + p2NameW, p2Y, { lineBreak: false });

const p2SepW = doc.widthOfString('  |  ');
doc
  .font('Times-Roman')
  .fontSize(9)
  .fillColor(linkBlue)
  .text('attendance-jess.vercel.app', leftMargin + p2NameW + p2SepW, p2Y, { link: 'https://attendance-jess.vercel.app', lineBreak: false });

doc
  .font('Times-Roman')
  .fontSize(8.8)
  .fillColor(black)
  .text('2026', rightMargin - 60, p2Y, { width: 60, align: 'right' });

doc.y = p2Y + 11;
doc
  .font('Times-Italic')
  .fontSize(8.8)
  .fillColor(black)
  .text('React 19, TypeScript, Tailwind CSS, Firebase, Gemini AI', leftMargin);

const p2Bullets = [
  'Built a full-stack attendance platform supporting timetable processing, division and lab-batch scheduling, and attendance analytics.',
  'Integrated Google Gemini Vision to extract structured timetable data from uploaded images and automatically generate academic schedules.',
  'Engineered attendance forecasting and bunk planning with Firebase Auth/Firestore, accounting for holidays and lecture/practical schedules.'
];

p2Bullets.forEach(b => {
  doc.y += 1.5;
  const bY = doc.y;
  doc.font('Times-Roman').fontSize(8.6).fillColor(black).text('•  ', leftMargin + 8, bY, { lineBreak: false });
  doc.text(b, leftMargin + 18, bY, { width: contentWidth - 18, lineGap: 1.1 });
});

// 7. AWARDS & ACTIVITIES
sectionHeader('Awards & Activities');

doc.y += 1;
const a1Y = doc.y;
doc.font('Times-Roman').fontSize(8.6).fillColor(black).text('•  ', leftMargin + 8, a1Y, { lineBreak: false });
doc
  .font('Times-Bold')
  .text('1st Runner Up ', leftMargin + 18, a1Y, { lineBreak: false })
  .font('Times-Roman')
  .text('– Pixel Perfect ’26 Frontend Hackathon (80 teams)  •  Participated in Smart India Hackathon (SIH) 2025');

doc.y += 1.5;
const a2Y = doc.y;
doc.font('Times-Roman').fontSize(8.6).fillColor(black).text('•  ', leftMargin + 8, a2Y, { lineBreak: false });
doc
  .font('Times-Roman')
  .text('Participated in Saksham 26 Fix It  •  Part of Programmers Date 4.0', leftMargin + 18, a2Y);

// 8. CERTIFICATIONS & LANGUAGES
sectionHeader('Certifications & Languages');

const certList = [
  { text: '•  The Front-End Web Developer Bootcamp: HTML, CSS, JS & React – 11 hrs ', linkText: '[Certificate]', url: 'https://udemy-certificate.b-cdn.net/UC-fc96a9cf-939e-4e44-8cb3-1b918f60f640.pdf' },
  { text: '•  Complete JavaScript, XML, AJAX and React Bootcamp – Hands-On – 12.5 hrs ', linkText: '[Certificate]', url: 'https://udemy-certificate.b-cdn.net/UC-91c6bf48-3564-44b2-a42e-1e4113e6d246.pdf' },
  { text: '•  Practical Next.js & React – Build a real WebApp with Next.js – 11 hrs ', linkText: '[Certificate]', url: 'https://udemy-certificate.b-cdn.net/UC-6ffc6cf0-7e4e-4f7f-a63e-32943714b35e.pdf' },
];

certList.forEach(c => {
  doc.y += 1.5;
  const cY = doc.y;
  doc
    .font('Times-Roman')
    .fontSize(8.6)
    .fillColor(black)
    .text(c.text, leftMargin + 8, cY, { lineBreak: false });

  const tW = doc.widthOfString(c.text);
  doc
    .font('Times-Roman')
    .fontSize(8.6)
    .fillColor(linkBlue)
    .text(c.linkText, leftMargin + 8 + tW, cY, { link: c.url, underline: false });
});

doc.y += 1.5;
const langY = doc.y;
doc
  .font('Times-Roman')
  .fontSize(8.6)
  .fillColor(black)
  .text('•  Languages: ', leftMargin + 8, langY, { lineBreak: false });

const langLabelW = doc.widthOfString('•  Languages: ');
doc
  .font('Times-Roman')
  .fontSize(8.6)
  .text('English (Fluent)  •  Hindi (Native)  •  Gujarati (Native)', leftMargin + 8 + langLabelW, langY);

doc.end();

stream1.on('finish', () => {
  fs.copyFileSync(outPath1, outPath2);
  console.log('Successfully generated exact resume PDF at:', outPath1, 'and', outPath2);
  console.log('Final page count:', doc.bufferedPageRange().count);
});
