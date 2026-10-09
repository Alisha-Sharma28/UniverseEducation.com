/* ==========================================================================
   Shared header + footer. Edit the menu or footer here once and every page
   updates. Each page includes:
     <div id="site-header"></div> ... <div id="site-footer"></div>
     <script src="js/config.js"></script>
     <script src="js/layout.js"></script>
   ========================================================================== */
(function () {
  var S = window.SITE || {};
  var current = document.body.getAttribute("data-page") || "";

  var NAV = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "impact", href: "impact.html", label: "Our Impact" },
    { id: "story", href: "story.html", label: "Our Story" },
    { id: "how", href: "how-it-works.html", label: "How It Works" },
    { id: "involved", href: "get-involved.html", label: "Get Involved" },
    { id: "events", href: "events.html", label: "Events" },
    { id: "contact", href: "contact.html", label: "Contact" }
  ];

  var ICON = {
    menu: '<svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.6v3.3h2.7V22H14v-10.2h2.7l.4-3.3z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
  };
  window.ICON = ICON;

  function socialList(extraClass) {
    var names = { instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube", facebook: "Facebook" };
    var out = '<ul class="social ' + (extraClass || "") + '">';
    Object.keys(names).forEach(function (k) {
      var url = (S.social || {})[k];
      // Until a link is added, the icon points to the Contact page so nothing is broken.
      out += '<li><a href="' + (url || "contact.html") + '"' + (url ? ' target="_blank" rel="noopener"' : "") +
        ' aria-label="' + names[k] + (url ? "" : " (link coming soon)") + '">' + ICON[k] + "</a></li>";
    });
    if (S.email) out += '<li><a href="mailto:' + S.email + '" aria-label="Email us">' + ICON.mail + "</a></li>";
    return out + "</ul>";
  }
  window.socialList = socialList;

  function brandMark(logo) {
    return '<a class="brand" href="index.html" aria-label="UniVerse Education home">' +
      '<img src="images/' + logo + '" alt="" width="45" height="40">' +
      '<span class="brand-name">Uni<span>Verse</span> Education</span></a>';
  }
  var brand = brandMark("logo.png");

  var navItems = NAV.map(function (n) {
    return '<li><a href="' + n.href + '"' + (n.id === current ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
  }).join("");

  var header =
    '<a class="skip-link" href="#main">Skip to main content</a>' +
    '<header class="site-header" id="top">' +
    '<div class="container header-inner">' + brand +
    '<nav class="site-nav" id="site-nav" aria-label="Main"><ul>' + navItems + "</ul></nav>" +
    '<a class="btn btn-accent header-donate" href="donate.html"' + (current === "donate" ? ' aria-current="page"' : "") + ">Donate</a>" +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">' + ICON.menu + ICON.close + "</button>" +
    "</div></header>";

  var legal = (S.legalStatus ? "UniVerse Education is " + S.legalStatus + "." : '<span class="tbd">[Confirm nonprofit status]</span>') +
    " EIN: " + (S.ein ? S.ein : '<span class="tbd">[EIN]</span>');

  var footer =
    '<footer class="site-footer"><div class="container">' +
    '<div class="footer-grid">' +
      "<div>" + brandMark("logo-light.png") + "<p>" + (S.mission || "") + "</p>" + socialList() + "</div>" +
      '<div><h2>Quick links</h2><ul class="footer-links">' +
        NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
        '<li><a href="donate.html">Donate</a></li>' +
      "</ul></div>" +
      "<div><h2>Stay in the loop</h2><p>Lab updates and student stories, a few times a year. No spam.</p>" +
        '<form class="newsletter js-newsletter" novalidate>' +
          '<label class="visually-hidden" for="footer-email">Email address</label>' +
          '<input id="footer-email" type="email" name="EMAIL" placeholder="you@example.com" autocomplete="email" required>' +
          '<button class="btn btn-accent btn-sm" type="submit">Subscribe</button>' +
          '<p class="form-status small" role="status" aria-live="polite"></p>' +
        "</form></div>" +
    "</div>" +
    '<div class="footer-bottom"><span>' + legal + "</span>" +
    "<span>© " + new Date().getFullYear() + " UniVerse Education. Student-led, grassroots-funded.</span></div>" +
    "</div></footer>";

  var h = document.getElementById("site-header");
  var f = document.getElementById("site-footer");
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
})();
