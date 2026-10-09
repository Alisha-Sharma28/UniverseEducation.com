/* ==========================================================================
   SITE SETTINGS — edit this one file to update numbers, links and integrations.
   Anything left as null or "" shows up on the site as a highlighted
   [placeholder] so nothing unverified is presented as fact.
   ========================================================================== */
window.SITE = {
  name: "UniVerse Education",
  mission: "Closing the digital divide for rural South Asian students, one computer lab at a time.",

  /* ---- Impact numbers (home page counter strip) — VERIFY EVERY NUMBER ---- */
  stats: {
    raised: 10000,        // USD raised so far
    computers: 40,        // desktops and laptops donated
    students: 550         // students reached
  },

  /* ---- Legal / trust ---- */
  legalStatus: "",        // e.g. "a registered 501(c)(3) nonprofit" — confirm before publishing
  ein: "",                // e.g. "12-3456789"

  /* ---- Contact & social (leave "" to hide a social icon's link) ---- */
  email: "",              // e.g. "hello@universeeducation.org"
  social: {
    instagram: "",
    linkedin: "",
    youtube: "",
    facebook: ""
  },

  /* ---- Integrations ---- */
  // Mailchimp: Audience → Signup forms → Embedded form → copy the <form action="..."> URL
  mailchimpAction: "",
  // Contact / volunteer forms. Leave "" if hosting on Netlify (Netlify Forms work automatically).
  // For GitHub Pages, create a free form at formspree.io and paste its endpoint, e.g. "https://formspree.io/f/abcdwxyz"
  formEndpoint: "",
  // Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX". Cookie banner only appears when this is set.
  gaId: "",
  // Fundraiser starter kit (PDF in /images or a Google Drive link)
  starterKitUrl: "",

  /* ---- Featured event ---- */
  event: {
    title: "Dinner Night for Education and Hygiene",
    start: "",            // ISO format, e.g. "2026-11-14T18:00:00-08:00"
    end: "",              // e.g. "2026-11-14T21:00:00-08:00"
    dateLabel: "",        // e.g. "Saturday, November 14, 2026 · 6–9 PM"
    venue: "",            // e.g. "Community Center, 123 Main St, San Jose, CA"
    ticketUrl: ""         // Eventbrite / Givebutter ticket link
  }
};
