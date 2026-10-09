/* ==========================================================================
   UniVerse Education — shared site behavior (no frameworks)
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {};
  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }
  function setStatus(el, msg, kind) {
    if (!el) return;
    el.textContent = msg;
    el.className = el.className.replace(/\b(ok|warn)\b/g, "").trim() + (kind ? " " + kind : "");
  }

  /* ---------- Mobile nav ---------- */
  var header = $(".site-header");
  var toggle = $(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) { toggle.click(); toggle.focus(); }
    });
    $$(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (document.body.classList.contains("nav-open")) toggle.click();
      });
    });
  }
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Photo & logo slots: load real image if it exists ---------- */
  $$("[data-img]").forEach(function (slot) {
    var src = slot.getAttribute("data-img");
    var alt = slot.getAttribute("aria-label") || slot.getAttribute("data-alt") || "";
    var img = new Image();
    img.onload = function () {
      img.alt = alt;
      img.decoding = "async";
      slot.insertBefore(img, slot.firstChild);
      slot.classList.add("has-img");
      // the <img> now carries the alt text
      slot.removeAttribute("role");
      slot.removeAttribute("aria-label");
    };
    img.src = src;
  });

  /* ---------- Config-driven text (EIN, email, event details…) ---------- */
  $$("[data-config]").forEach(function (el) {
    var val = get(S, el.getAttribute("data-config"));
    if (val) {
      if (el.tagName === "A" && el.hasAttribute("data-config-href")) {
        el.href = el.getAttribute("data-config-href").replace("{v}", val);
      }
      el.textContent = val;
      el.classList.remove("tbd");
    }
  });

  /* ---------- Animated impact counters ---------- */
  var counters = $$("[data-stat]");
  counters.forEach(function (el) {
    var v = get(S.stats || {}, el.getAttribute("data-stat"));
    if (v == null || v === "") {
      el.innerHTML = '<span class="tbd">[#]</span>';
      el.removeAttribute("data-stat");
    } else {
      el.setAttribute("data-target", v);
      // Show the real number by default; it counts up from 0 when scrolled into view.
      el.textContent = (el.getAttribute("data-prefix") || "") + Number(v).toLocaleString() + (el.getAttribute("data-suffix") || "");
    }
  });
  function runCounter(el) {
    var target = +el.getAttribute("data-target");
    var pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = pre + target.toLocaleString() + suf; return; }
    var start = null, dur = 1600;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(target * eased).toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Subtle scroll reveal + counter trigger ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.hasAttribute("data-target")) runCounter(el);
        else el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
    $$("[data-target]").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
    $$("[data-target]").forEach(runCounter);
  }

  /* ---------- Newsletter (Mailchimp) ---------- */
  $$(".js-newsletter").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      var status = $(".form-status", form);
      var email = $('input[type="email"]', form);
      if (!email.value || !email.checkValidity()) {
        e.preventDefault();
        setStatus(status, "Please enter a valid email address.", "warn");
        email.focus();
        return;
      }
      if (S.mailchimpAction) {
        // Hand off to Mailchimp's hosted confirmation page in a new tab.
        form.action = S.mailchimpAction;
        form.method = "post";
        form.target = "_blank";
        setStatus(status, "Thanks! Check your inbox to confirm.", "ok");
        return; // allow native submit
      }
      e.preventDefault();
      setStatus(status, "Newsletter isn't connected yet — add your Mailchimp URL in js/config.js.", "warn");
    });
  });

  /* ---------- Contact / volunteer forms ----------
     1) If SITE.formEndpoint is set (e.g. Formspree), submit with fetch.
     2) Else, on Netlify, let the native POST happen (Netlify Forms).
     3) Else, show a "not connected" note. */
  $$(".js-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      var status = $(".form-status", form);
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      if (S.formEndpoint) {
        e.preventDefault();
        var btn = $('button[type="submit"]', form);
        if (btn) btn.disabled = true;
        fetch(S.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error();
            form.reset();
            setStatus(status, "Thank you! We'll be in touch soon.", "ok");
          })
          .catch(function () { setStatus(status, "Something went wrong. Please email us instead.", "warn"); })
          .then(function () { if (btn) btn.disabled = false; });
        return;
      }
      if (/netlify\.app$/.test(location.hostname) || form.hasAttribute("data-force-native")) return;
      e.preventDefault();
      setStatus(status, "This form isn't connected yet. Deploy on Netlify or add a Formspree endpoint in js/config.js.", "warn");
    });
  });

  /* ---------- Simple config-driven links ---------- */
  $$("[data-link]").forEach(function (a) {
    var url = get(S, a.getAttribute("data-link"));
    if (url) {
      a.href = url;
      if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    } else {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var note = a.parentNode.querySelector(".notice") || document.createElement("p");
        note.className = "notice";
        note.setAttribute("role", "status");
        note.textContent = a.getAttribute("data-missing") || "Coming soon.";
        if (!note.parentNode) a.parentNode.appendChild(note);
      });
    }
  });

  /* ---------- Add to calendar (.ics download + Google Calendar) ---------- */
  function icsDate(iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  $$(".js-add-calendar").forEach(function (btn) {
    var ev = S.event || {};
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!ev.start) {
        var note = btn.parentNode.querySelector(".notice") || document.createElement("p");
        note.className = "notice";
        note.setAttribute("role", "status");
        note.textContent = "The date hasn't been announced yet — check back soon!";
        if (!note.parentNode) btn.parentNode.appendChild(note);
        return;
      }
      var end = ev.end || new Date(new Date(ev.start).getTime() + 3 * 3600e3).toISOString();
      var desc = "Co-hosted by UniVerse Education and Owed Soap. Proceeds fund computers for rural schools and an ongoing soap supply.";
      var ics = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UniVerse Education//Events//EN", "BEGIN:VEVENT",
        "UID:" + icsDate(ev.start) + "@universeeducation", "DTSTAMP:" + icsDate(new Date().toISOString()),
        "DTSTART:" + icsDate(ev.start), "DTEND:" + icsDate(end),
        "SUMMARY:" + ev.title, "DESCRIPTION:" + desc, "LOCATION:" + (ev.venue || "").replace(/,/g, "\\,"),
        "END:VEVENT", "END:VCALENDAR"
      ].join("\r\n");
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
      a.download = "universe-dinner-night.ics";
      document.body.appendChild(a); a.click(); a.remove();
    });
  });
  $$(".js-google-calendar").forEach(function (a) {
    var ev = S.event || {};
    if (!ev.start) { a.hidden = true; return; }
    var end = ev.end || new Date(new Date(ev.start).getTime() + 3 * 3600e3).toISOString();
    a.href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title) +
      "&dates=" + icsDate(ev.start) + "/" + icsDate(end) + "&location=" + encodeURIComponent(ev.venue || "");
    a.target = "_blank"; a.rel = "noopener";
  });

  /* ---------- Google Analytics (only if configured) + cookie banner ---------- */
  function loadGA() {
    if (!S.gaId || window.gtag) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(S.gaId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", S.gaId, { anonymize_ip: true });
  }
  if (S.gaId) {
    var consent = null;
    try { consent = localStorage.getItem("ue-cookie-consent"); } catch (e) {}
    if (consent === "yes") loadGA();
    else if (consent !== "no") {
      var bar = document.createElement("div");
      bar.className = "cookie-banner";
      bar.setAttribute("role", "region");
      bar.setAttribute("aria-label", "Cookie consent");
      bar.innerHTML = "<p>We use a privacy-friendly analytics cookie to see which pages help people most. OK with that?</p>" +
        '<div class="btn-row"><button class="btn btn-primary btn-sm" data-c="yes">Accept</button>' +
        '<button class="btn btn-outline btn-sm" data-c="no">Decline</button></div>';
      document.body.appendChild(bar);
      bar.addEventListener("click", function (e) {
        var c = e.target.getAttribute("data-c");
        if (!c) return;
        try { localStorage.setItem("ue-cookie-consent", c); } catch (err) {}
        if (c === "yes") loadGA();
        bar.remove();
      });
    }
  }
})();
