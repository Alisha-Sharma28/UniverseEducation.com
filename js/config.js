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

  /* ---- Contact & social (paste the full profile links) ---- */
  email: "UniVerseEducation.org@gmail.com",
  social: {
    instagram: "",
    linkedin: ""
  },

  /* ---- Integrations ---- */
  // Inquiry form delivery: FormSubmit emails every message to the address in this URL.
  // The very first message sends an activation email to that inbox; click "Activate Form" once.
  formEndpoint: "https://formsubmit.co/ajax/UniVerseEducation.org@gmail.com",
  // Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX". Cookie banner only appears when this is set.
  gaId: "",
  // Officer application form (the Apply now button on team.html links here directly)
  officerApplicationUrl: "https://forms.gle/UgfrWf4JL1zNh55z7"
};
