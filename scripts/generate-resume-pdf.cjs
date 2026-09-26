const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 36, bottom: 36, left: 45, right: 45 }
});

const outPath1 = path.join(publicDir, 'Jessicaa_Chauhan_Resume.pdf');
const outPath2 = path.join(publicDir, 'resume.pdf');

const stream1 = fs.createWriteStream(outPath1);
doc.pipe(stream1);

// Styling constants
const primaryColor = '#111827'; // Dark charcoal / black
const secondaryColor = '#374151'; // Slate gray
const accentColor = '#2563EB'; // Subtle blue for links
const mutedColor = '#4B5563';

// 1. Header: Name & Contact
doc
  .fontSize(22)
  .font('Helvetica-Bold')
  .fillColor(primaryColor)
  .text('Jessicaa Chauhan', { align: 'center' });

doc.moveDown(0.3);

doc
  .fontSize(9)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text(
    'Mumbai, Maharashtra  |  +91 8855872136  |  chauhanjessicaa27@gmail.com  |  github.com/unbothered-29  |  linkedin.com/in/jessicaachauhan',
    { align: 'center' }
  );

doc.moveDown(0.6);

// Helper function to draw section header
function drawSectionHeader(title) {
  doc.moveDown(0.4);
  doc
    .fontSize(10.5)
    .font('Helvetica-Bold')
    .fillColor(primaryColor)
    .text(title.toUpperCase(), { characterSpacing: 0.5 });
  
  const y = doc.y;
  doc
    .strokeColor('#D1D5DB')
    .lineWidth(0.75)
    .moveTo(45, y + 2)
    .lineTo(550, y + 2)
    .stroke();
  doc.y = y + 5;
}

// 2. PROFESSIONAL SUMMARY
drawSectionHeader('Professional Summary');
doc
  .fontSize(8.8)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text(
    'Dedicated Front-end Web Developer who enjoys turning ideas into functional, polished websites. Skilled in building responsive frontend interfaces with React.js, Next.js, TypeScript, and Tailwind CSS, with strong attention to detail, reusable components, clean design, and user experience.',
    { lineGap: 1.5 }
  );

// 3. EDUCATION
drawSectionHeader('Education');
const eduY = doc.y;
doc
  .fontSize(9.5)
  .font('Helvetica-Bold')
  .fillColor(primaryColor)
  .text('Rajiv Gandhi Institute of Technology (RGIT), Mumbai', 45, eduY);

doc
  .fontSize(9)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('Sep 2024 – May 2028', 430, eduY, { align: 'right', width: 120 });

doc.y = eduY + 12;
doc
  .fontSize(9)
  .font('Helvetica-Oblique')
  .fillColor(secondaryColor)
  .text('Bachelor of Engineering (B.E.) – Artificial Intelligence & Data Science, 8.5 CGPA', 45);

doc.moveDown(0.2);
doc
  .fontSize(8.5)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('• Relevant Coursework: ', { continued: true, lineGap: 1.2 })
  .font('Helvetica')
  .text('Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Software Engineering');

// 4. TECHNICAL SKILLS
drawSectionHeader('Technical Skills');
const skills = [
  { label: 'Frontend: ', val: 'HTML5, CSS3, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS' },
  { label: 'Backend: ', val: 'Java, Spring Boot, REST APIs, Kafka, Microservices' },
  { label: 'Tools & Cloud: ', val: 'Git, GitHub, Docker, Vercel, AWS' },
  { label: 'Concepts: ', val: 'Responsive Design, Component-Based Architecture' },
];

skills.forEach(s => {
  doc
    .fontSize(8.8)
    .font('Helvetica-Bold')
    .fillColor(primaryColor)
    .text(s.label, 45, doc.y, { continued: true })
    .font('Helvetica')
    .fillColor(secondaryColor)
    .text(s.val, { lineGap: 1.2 });
});

// 5. PROFESSIONAL EXPERIENCE
drawSectionHeader('Professional Experience');

// Exp 1: RGIT FE-SAHYOG
let exp1Y = doc.y;
doc
  .fontSize(9.5)
  .font('Helvetica-Bold')
  .fillColor(primaryColor)
  .text('President', 45, exp1Y);

doc
  .fontSize(9)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('Aug 2026 – Present', 430, exp1Y, { align: 'right', width: 120 });

doc.y = exp1Y + 12;
doc
  .fontSize(9)
  .font('Helvetica-Oblique')
  .fillColor(secondaryColor)
  .text('RGIT FE-SAHYOG', 45);

doc.moveDown(0.2);
const exp1Bullets = [
  'Leading a team of 30+ members, defining goals and setting strategic direction for the academic year.',
  'Manage and track progress across operational domains, ensuring accountability and timely delivery.',
  'Plan and executed 2+ events for first-year students in collaboration with the team.'
];
exp1Bullets.forEach(b => {
  doc
    .fontSize(8.6)
    .font('Helvetica')
    .fillColor(secondaryColor)
    .text(`• ${b}`, { indent: 10, lineGap: 1.2 });
});

doc.moveDown(0.3);

// Exp 2: Roamevo Private Limited
let exp2Y = doc.y;
doc
  .fontSize(9.5)
  .font('Helvetica-Bold')
  .fillColor(primaryColor)
  .text('Content Team Head', 45, exp2Y);

doc
  .fontSize(9)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('Feb 2026 – Present', 430, exp2Y, { align: 'right', width: 120 });

doc.y = exp2Y + 12;
doc
  .fontSize(9)
  .font('Helvetica-Oblique')
  .fillColor(secondaryColor)
  .text('Roamevo Private Limited', 45);

doc.moveDown(0.2);
const exp2Bullets = [
  'Designed 10+ trip itineraries and coordinated content delivery aligned with founder expectations.',
  'Created marketing collateral including flyers, banners, posters, and Instagram posts for company promotions.',
  'Collaborated with the team to develop and execute promotional campaigns, improving content consistency and audience engagement.'
];
exp2Bullets.forEach(b => {
  doc
    .fontSize(8.6)
    .font('Helvetica')
    .fillColor(secondaryColor)
    .text(`• ${b}`, { indent: 10, lineGap: 1.2 });
});

// 6. SELECTED PROJECTS
drawSectionHeader('Selected Projects');

// Project 1: SPIT Sahyog
let p1Y = doc.y;
doc
  .fontSize(9.5)
  .font('Helvetica-Bold')
  .fillColor(primaryColor)
  .text('SPIT Sahyog', 45, p1Y, { continued: true })
  .font('Helvetica')
  .fillColor(mutedColor)
  .text('  |  spit-sahyog.vercel.app');

doc
  .fontSize(9)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('2026', 490, p1Y, { align: 'right', width: 60 });

doc.y = p1Y + 12;
doc
  .fontSize(8.5)
  .font('Helvetica-Oblique')
  .fillColor(secondaryColor)
  .text('React.js, TypeScript, Vite, Tailwind CSS, Leaflet.js', 45);

doc.moveDown(0.2);
const p1Bullets = [
  'Developed a mobile-first Progressive Web App for campus navigation, combining interactive Leaflet maps with custom SVG floor plans to guide users to classrooms, labs, and facilities.',
  'Implemented fuzzy search, floor-based filtering, offline data caching with IndexedDB, and Zustand state management for reliable navigation with limited connectivity.',
  'Built reusable responsive React components and touch-friendly interfaces optimized for mobile devices; won the Pixel-Perfect Hackathon 2026.'
];
p1Bullets.forEach(b => {
  doc
    .fontSize(8.6)
    .font('Helvetica')
    .fillColor(secondaryColor)
    .text(`• ${b}`, { indent: 10, lineGap: 1.2 });
});

doc.moveDown(0.3);

// Project 2: Smart Attendance Tracker
let p2Y = doc.y;
doc
  .fontSize(9.5)
  .font('Helvetica-Bold')
  .fillColor(primaryColor)
  .text('Smart Attendance Tracker & AI Timetable Manager', 45, p2Y, { continued: true })
  .font('Helvetica')
  .fillColor(mutedColor)
  .text('  |  attendance-jess.vercel.app');

doc
  .fontSize(9)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('2026', 490, p2Y, { align: 'right', width: 60 });

doc.y = p2Y + 12;
doc
  .fontSize(8.5)
  .font('Helvetica-Oblique')
  .fillColor(secondaryColor)
  .text('React 19, TypeScript, Tailwind CSS, Firebase, Gemini AI', 45);

doc.moveDown(0.2);
const p2Bullets = [
  'Built a full-stack attendance platform supporting timetable processing, division and lab-batch scheduling, and attendance analytics.',
  'Integrated Google Gemini Vision to extract structured timetable data from uploaded images and automatically generate academic schedules.',
  'Engineered attendance forecasting and bunk planning with Firebase Auth/Firestore, accounting for holidays and lecture/practical schedules.'
];
p2Bullets.forEach(b => {
  doc
    .fontSize(8.6)
    .font('Helvetica')
    .fillColor(secondaryColor)
    .text(`• ${b}`, { indent: 10, lineGap: 1.2 });
});

// 7. AWARDS & ACTIVITIES
drawSectionHeader('Awards & Activities');
doc
  .fontSize(8.6)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('• 1st Runner Up – Pixel Perfect ’26 Frontend Hackathon (80 teams)   • Participated in Smart India Hackathon (SIH) 2025', { indent: 10, lineGap: 1.2 })
  .text('• Participated in Saksham 26 Fix It   • Part of Programmers Date 4.0', { indent: 10, lineGap: 1.2 });

// 8. CERTIFICATIONS & LANGUAGES
drawSectionHeader('Certifications & Languages');
doc
  .fontSize(8.6)
  .font('Helvetica')
  .fillColor(secondaryColor)
  .text('• The Front-End Web Developer Bootcamp: HTML, CSS, JS & React – 11 hrs [Certificate]', { indent: 10, lineGap: 1.2 })
  .text('• Complete JavaScript, XML, AJAX and React Bootcamp – Hands-On – 12.5 hrs [Certificate]', { indent: 10, lineGap: 1.2 })
  .text('• Practical Next.js & React – Build a real WebApp with Next.js – 11 hrs [Certificate]', { indent: 10, lineGap: 1.2 })
  .text('• Languages: English (Fluent)  •  Hindi (Native)  •  Gujarati (Native)', { indent: 10, lineGap: 1.2 });

doc.end();

stream1.on('finish', () => {
  fs.copyFileSync(outPath1, outPath2);
  console.log('Successfully generated resume PDF at:', outPath1, 'and', outPath2);
});
