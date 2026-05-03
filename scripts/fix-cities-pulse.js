const fs = require('fs');
let content = fs.readFileSync('cities.html', 'utf8');

// The new May 3 block
const newBlock = `
      <!-- Today's article — May 3 Global Pulse: Global Networking Trends -->
      <a href="/global-pulse-03-may-2026"
         style="border:1px solid rgba(201,160,47,0.3); border-radius:1rem; padding:1.4rem 1.5rem; text-decoration:none; display:flex; flex-direction:column; gap:0.5rem; background:rgba(201,160,47,0.04); transition:border-color 0.2s, transform 0.2s;"
         onmouseover="this.style.borderColor='rgba(201,160,47,0.6)';this.style.transform='translateY(-2px)'"
         onmouseout="this.style.borderColor='rgba(201,160,47,0.3)';this.style.transform='translateY(0)'">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#ebcf79; font-weight:700;">Global Pulse · Global Networking Trends</span>
          <span style="background:rgba(201,160,47,0.15); color:#ebcf79; border:1px solid rgba(201,160,47,0.4); font-size:0.54rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; padding:2px 6px; border-radius:999px;">TODAY</span>
        </div>
        <div style="font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:600; color:#f6f1e7; line-height:1.3;">This Week in Elite Social: The Return of the Private Room</div>
        <div style="font-size:0.8rem; color:rgba(246,241,231,0.55); line-height:1.65; font-weight:300;">A global recap of luxury networking trends across New York, London, and Paris. Why private access is replacing public visibility in 2026.</div>
        <div style="font-size:0.7rem; color:rgba(246,241,231,0.3); margin-top:0.25rem;">May 3, 2026 · 4 min read</div>
      </a>
`;

// Modify the old May 1 block to be a "Past" block
content = content.replace(
  '<!-- Today\'s article — May 1 Global Pulse: Wealth & Social Capital -->',
  '<!-- Past — May 1 Global Pulse: Wealth & Social Capital -->'
);

// We need to change the style of the May 1 block from the "Today" style to the "Past" style
content = content.replace(
  `         style="border:1px solid rgba(201,160,47,0.3); border-radius:1rem; padding:1.4rem 1.5rem; text-decoration:none; display:flex; flex-direction:column; gap:0.5rem; background:rgba(201,160,47,0.04); transition:border-color 0.2s, transform 0.2s;"
         onmouseover="this.style.borderColor='rgba(201,160,47,0.6)';this.style.transform='translateY(-2px)'"
         onmouseout="this.style.borderColor='rgba(201,160,47,0.3)';this.style.transform='translateY(0)'">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#ebcf79; font-weight:700;">Global Pulse · Wealth &amp; Social Capital</span>
          <span style="background:rgba(201,160,47,0.15); color:#ebcf79; border:1px solid rgba(201,160,47,0.4); font-size:0.54rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; padding:2px 6px; border-radius:999px;">TODAY</span>
        </div>`,
  `         style="border:1px solid rgba(255,255,255,0.08); border-radius:1rem; padding:1.4rem 1.5rem; text-decoration:none; display:flex; flex-direction:column; gap:0.5rem; transition:border-color 0.2s, transform 0.2s;"
         onmouseover="this.style.borderColor='rgba(201,160,47,0.4)';this.style.transform='translateY(-2px)'"
         onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.transform='translateY(0)'">
        <span style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:rgba(246,241,231,0.45); font-weight:600;">Global Pulse · Wealth &amp; Social Capital</span>`
);

// Insert the new May 3 block right after <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:1rem;">
content = content.replace(
  '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:1rem;">',
  '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:1rem;">\n' + newBlock
);

fs.writeFileSync('cities.html', content);
console.log("Fixed cities.html global pulse section");
