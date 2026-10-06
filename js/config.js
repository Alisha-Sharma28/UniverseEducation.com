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
    raised: 16000,        // USD raised grassroots. Note: your notes also say "over $10K" — confirm which is current.
    labsInstalled: 4,     // Note: your notes mention five locations — confirm.
    labsUnderway: 2,
    computers: 40,        // "over forty" desktops and laptops
    students: null        // e.g. 600 — fill in once verified
  },
  locationsLine: "Uttar Pradesh · Maharashtra · Gujarat · Rajasthan · Kathmandu", // confirm

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
  // Payment processor links (Givebutter campaign, PayPal donate link, or Stripe Payment Link)
  donateUrl: "",
  monthlyDonateUrl: "",   // optional separate link for recurring gifts; falls back to donateUrl
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
  },

  /* ---- Map pins (Our Impact page) ----
     status: "installed" or "soon". Coordinates marked approx should be replaced
     with the school's real location. Pins with lat: null are listed but not drawn. */
  labs: [
    { name: "All-girls school, Vizirpur", place: "Vizirpur, Uttar Pradesh, India", lat: 26.85, lng: 80.95, status: "installed", approx: true },
    { name: "Koseli Foundation", place: "Kathmandu, Nepal", lat: 27.7172, lng: 85.324, status: "installed", approx: true },
    { name: "BVJSS", place: "Pune, Maharashtra, India", lat: 18.5204, lng: 73.8567, status: "installed", approx: true },
    { name: "[School name]", place: "Gujarat, India", lat: 22.6, lng: 71.6, status: "installed", approx: true },
    { name: "[School name]", place: "Rajasthan, India", lat: 26.6, lng: 74.2, status: "installed", approx: true },
    { name: "Lab underway #1", place: "[Location to be announced]", lat: null, lng: null, status: "soon" },
    { name: "Lab underway #2", place: "[Location to be announced]", lat: null, lng: null, status: "soon" }
  ]
};
