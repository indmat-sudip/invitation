(function () {
  "use strict";
  var C = window.INVITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ================= language, guest, helpers ================= */
  var params = new URLSearchParams(location.search);
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var lang = params.get("lang") || store("lang") || C.defaultLang || "en";
  if (lang !== "bn") lang = "en";
  function clean(s, n) { return (s || "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, n); }
  var guest = clean(params.get("to"), 60);
  var guestMsg = clean(params.get("m"), 400);

  function esc(s) { return String(s).replace(/[&<>"']/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]; }); }
  function t(v) { if (v == null) return ""; if (typeof v === "string") return v; return v[lang] != null ? v[lang] : (v.en || ""); }
  function num(n) { return lang === "bn" ? String(n).replace(/\d/g, function (d) { return "০১২৩৪৫৬৭৮৯".charAt(d); }) : String(n); }
  function fmt(date, opts) {
    var o = { timeZone: "Asia/Kolkata" }; for (var k in opts) o[k] = opts[k];
    try { return new Intl.DateTimeFormat(lang === "bn" ? "bn-IN" : "en-IN", o).format(date); } catch (e) { return ""; }
  }

  var UI = {
    en: { invited: "You are invited", forGuest: "For", tap: "Tap to open", dearGuest: "Dear", weds: "&", until: "Until",
      days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds", story: "Our Story", moments: "Our Moments",
      functions: "The Celebrations", dress: "Dress Code", stay: "Where to Stay", join: "Will you join us?",
      gift: "Blessings", location: "View Location", cal: "Add to Calendar", map: "Open map",
      name: "Your name", guests: "Number of guests", yes: "Joyfully accept", no: "Regretfully decline",
      send: "Send RSVP on WhatsApp", scroll: "scroll", venue: "Venue", namePh: "Full name" },
    bn: { invited: "আপনি আমন্ত্রিত", forGuest: "প্রিয়", tap: "খুলতে ট্যাপ করুন", dearGuest: "প্রিয়", weds: "ও", until: "শুভদিন",
      days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", story: "আমাদের গল্প", moments: "আমাদের মুহূর্ত",
      functions: "অনুষ্ঠানসূচি", dress: "পোশাকবিধি", stay: "থাকার ব্যবস্থা", join: "আপনি কি আসবেন?",
      gift: "আশীর্বাদ", location: "অনুষ্ঠানস্থল দেখুন", cal: "ক্যালেন্ডারে যোগ করুন", map: "মানচিত্রে দেখুন",
      name: "আপনার নাম", guests: "অতিথি সংখ্যা", yes: "সানন্দে আসছি", no: "দুঃখিত, আসতে পারছি না",
      send: "হোয়াটসঅ্যাপে জানান", scroll: "স্ক্রল করুন", venue: "অনুষ্ঠানস্থল", namePh: "পুরো নাম" }
  };
  function ui(k) { return UI[lang][k]; }

  /* ================= seeded random ================= */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ================= flower symbols ================= */
  (function buildDefs() {
    function ring(count, dist, rx, ry, fill, off) {
      var s = "";
      for (var i = 0; i < count; i++) {
        s += '<ellipse cx="0" cy="' + (-dist) + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '" stroke="#b65a05" stroke-opacity=".35" stroke-width=".8" transform="rotate(' + (i * 360 / count + off) + ')"/>';
      }
      return s;
    }
    var marigold = '<symbol id="marigold" viewBox="-50 -50 100 100">' +
      ring(18, 34, 9.5, 15, "url(#gMg1)", 0) + ring(14, 26, 8.5, 13, "url(#gMg2)", 10) + ring(10, 17, 7.5, 11, "url(#gMg3)", 5) +
      '<circle r="7" fill="#c25f08"/><circle r="3.4" fill="#8a3d05"/></symbol>';
    var rose = '<symbol id="rose" viewBox="-50 -50 100 100"><circle r="38" fill="url(#gRose)"/>' +
      '<g fill="none" stroke="#6e0b1b" stroke-width="2.2" stroke-linecap="round" opacity=".85"><path d="M-22 -4a24 24 0 0 1 36 -14"/><path d="M26 6a24 24 0 0 1 -36 20"/><path d="M-6 -14a12 12 0 0 1 20 6"/><path d="M8 8a10 10 0 0 1 -14 -2"/></g>' +
      '<path d="M-26 -22a34 34 0 0 1 30 -14" fill="none" stroke="#f08a9a" stroke-width="3" stroke-linecap="round" opacity=".7"/></symbol>';
    var jasmine = '<symbol id="jasmine" viewBox="-30 -30 60 60"><g fill="#fffdf5" stroke="#e3d7b8" stroke-width="1">' +
      [0, 72, 144, 216, 288].map(function (a) { return '<ellipse cx="0" cy="-15" rx="8" ry="14" transform="rotate(' + a + ')"/>'; }).join("") +
      '</g><circle r="4" fill="#e2b24a"/></symbol>';
    var leaf = '<symbol id="leaf" viewBox="-20 -56 40 64"><path d="M0 8C-13-8-11-36 0-54 11-36 13-8 0 8Z" fill="url(#gLeaf)"/><path d="M0 8V-46" stroke="#e5efc9" stroke-opacity=".55" stroke-width="1.3" fill="none"/></symbol>';
    var paisley = '<symbol id="paisley" viewBox="0 0 60 80"><path d="M30 76C8 76 3 50 17 33 25 24 27 13 21 3 44 7 58 27 54 50 51 66 42 76 30 76Z" fill="url(#gGold)"/><path d="M30 64C17 64 14 50 22 40 27 34 30 28 29 21 40 26 46 38 44 50 43 58 38 64 30 64Z" fill="none" stroke="#7a0f1e" stroke-opacity=".55" stroke-width="2"/><circle cx="31" cy="48" r="4" fill="#7a0f1e" fill-opacity=".6"/></symbol>';
    var svg = $("#defs");
    svg.innerHTML =
      '<defs>' +
      '<radialGradient id="gMg1" cx="50%" cy="60%" r="70%"><stop offset="0" stop-color="#f8a21b"/><stop offset="1" stop-color="#e2700b"/></radialGradient>' +
      '<radialGradient id="gMg2" cx="50%" cy="60%" r="70%"><stop offset="0" stop-color="#fdbb2a"/><stop offset="1" stop-color="#f08f10"/></radialGradient>' +
      '<radialGradient id="gMg3" cx="50%" cy="60%" r="70%"><stop offset="0" stop-color="#ffe070"/><stop offset="1" stop-color="#fbb720"/></radialGradient>' +
      '<radialGradient id="gRose" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#e8445b"/><stop offset=".6" stop-color="#b0152b"/><stop offset="1" stop-color="#7d0c1e"/></radialGradient>' +
      '<linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6fa56a"/><stop offset="1" stop-color="#2f6b4f"/></linearGradient>' +
      '<linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc8b"/><stop offset=".5" stop-color="#d9a73e"/><stop offset="1" stop-color="#a97522"/></linearGradient>' +
      '<linearGradient id="gFlapF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3182b"/><stop offset="1" stop-color="#7a0f1e"/></linearGradient>' +
      '<linearGradient id="gFlapB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e2bb"/><stop offset="1" stop-color="#fbf0da"/></linearGradient>' +
      '</defs>' + marigold + rose + jasmine + leaf + paisley;
  })();

  /* ================= garland builders ================= */
  function use(id, x, y, size, rot) {
    return '<use href="#' + id + '" x="' + (x - size / 2).toFixed(1) + '" y="' + (y - size / 2).toFixed(1) + '" width="' + size + '" height="' + size + '" transform="rotate(' + rot.toFixed(0) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"/>';
  }
  function lineP(x1, y1, x2, y2, n) {
    var p = [], a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    for (var i = 0; i <= n; i++) { var k = i / n; p.push({ x: x1 + (x2 - x1) * k, y: y1 + (y2 - y1) * k, a: a }); }
    return p;
  }
  function arcP(cx, cy, r, a0, a1, n) {
    var p = [];
    for (var i = 0; i <= n; i++) {
      var a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      p.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, a: a * 180 / Math.PI + 90 });
    }
    return p;
  }
  function quadP(x1, y1, cx, cy, x2, y2, n) {
    var p = [];
    for (var i = 0; i <= n; i++) {
      var k = i / n, u = 1 - k;
      var x = u * u * x1 + 2 * u * k * cx + k * k * x2, y = u * u * y1 + 2 * u * k * cy + k * k * y2;
      var dx = 2 * u * (cx - x1) + 2 * k * (x2 - cx), dy = 2 * u * (cy - y1) + 2 * k * (y2 - cy);
      p.push({ x: x, y: y, a: Math.atan2(dy, dx) * 180 / Math.PI });
    }
    return p;
  }
  function chain(points, seed, size) {
    var r = rng(seed), out = "", kinds = ["marigold", "marigold", "rose", "marigold", "marigold", "jasmine"];
    size = size || 32;
    points.forEach(function (p) { out += use("leaf", p.x + (r() - .5) * 6, p.y + (r() - .5) * 6, size * .95, p.a + 90 + (r() - .5) * 120); });
    points.forEach(function (p, i) {
      var id = kinds[(i + Math.floor(seed)) % kinds.length];
      var s = id === "jasmine" ? size * .55 : id === "rose" ? size * .85 : size * (.95 + r() * .15);
      out += use(id, p.x + (r() - .5) * 3, p.y + (r() - .5) * 3, s, r() * 360);
    });
    return out;
  }
  function rectChain(w, h, inset, step, seed) {
    var x1 = inset, y1 = inset, x2 = w - inset, y2 = h - inset, pts = [];
    pts = pts.concat(lineP(x1, y1, x2, y1, Math.round((x2 - x1) / step)));
    pts = pts.concat(lineP(x2, y1, x2, y2, Math.round((y2 - y1) / step)).slice(1));
    pts = pts.concat(lineP(x2, y2, x1, y2, Math.round((x2 - x1) / step)).slice(1));
    pts = pts.concat(lineP(x1, y2, x1, y1, Math.round((y2 - y1) / step)).slice(1, -1));
    return chain(pts, seed);
  }
  function toranSVG(seed) {
    var out = "", W = 400;
    [[-10, 133, 70], [133, 266, 70], [266, 410, 70]].forEach(function (s, i) {
      out += chain(quadP(s[0], -4, (s[0] + s[1]) / 2, s[2], s[1], -4, 7), seed + i);
    });
    function strand(x, y, len, n, delay, sd) {
      var o = '<g class="sway" style="transform-origin:' + x + "px " + y + "px;animation-delay:" + delay + 's">';
      o += chain(lineP(x, y, x, y + len, n), sd, 28);
      o += use("paisley", x, y + len + 22, 34, 0) + "</g>";
      return o;
    }
    out += strand(133, 0, 78, 3, "0s", 21) + strand(266, 0, 78, 3, "-1.3s", 22);
    out += strand(66, 30, 34, 1, "-.6s", 23) + strand(200, 33, 34, 1, "-2s", 24) + strand(333, 30, 34, 1, "-.9s", 25);
    return '<svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMin slice" aria-hidden="true">' + out + "</svg>";
  }
  function archGarland(seed) {
    var pts = lineP(14, 388, 14, 150, 9).concat(arcP(150, 150, 136, 180, 360, 15).slice(1)).concat(lineP(286, 150, 286, 388, 9).slice(1));
    return '<svg viewBox="0 0 300 400" aria-hidden="true">' + chain(pts, seed) + "</svg>";
  }
  function wreathSVG(seed) {
    return '<svg viewBox="0 0 340 340" aria-hidden="true">' + chain(arcP(170, 170, 148, 0, 360, 32).slice(0, -1), seed, 36) + "</svg>";
  }
  var DIVIDER = '<svg class="divider" viewBox="0 0 260 28" aria-hidden="true"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M6 14H100M160 14H254"/><path d="M100 14c8-8 16-8 20 0M160 14c-8-8-16-8-20 0" /></g><path d="M130 3l11 11-11 11-11-11Z" fill="currentColor"/><circle cx="6" cy="14" r="2.5" fill="currentColor"/><circle cx="254" cy="14" r="2.5" fill="currentColor"/></svg>';

  /* ================= templates ================= */
  var d = new Date(C.date);
  function initial(p) { var s = (p.name.en || "").trim(); return s.charAt(0).toUpperCase(); }
  function sealText() { return initial(C.partner1) + "<i>&amp;</i>" + initial(C.partner2); }

  function renderIntro() {
    var el = $("#introInner"); if (!el) return;
    var who = guest ? '<p class="env-for">' + esc(ui("forGuest")) + '</p><p class="env-guest">' + esc(guest) + "</p>" : '<p class="env-for">' + esc(ui("invited")) + "</p>";
    el.innerHTML =
      '<div class="env-body"><div class="env-frame"></div><div class="env-text">' + who + '<p class="env-names">' + esc(t(C.partner1.name)) + " " + ui("weds") + " " + esc(t(C.partner2.name)) + "</p></div></div>" +
      '<div class="flap" id="flap"><svg class="face f" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="0,0 100,0 50,100" fill="url(#gFlapF)" stroke="#e2b24a" stroke-width="2.4" vector-effect="non-scaling-stroke"/><polygon points="7,0 93,0 50,86" fill="none" stroke="#e2b24a" stroke-width="1.2" stroke-dasharray="3 5" vector-effect="non-scaling-stroke"/></svg>' +
      '<svg class="face b" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="0,0 100,0 50,100" fill="url(#gFlapB)"/></svg></div>' +
      '<div class="toran-i">' + toranSVG(5) + "</div>" +
      '<div class="seal"><span>' + sealText() + "</span></div>" +
      '<div class="tap"><span>' + esc(ui("tap")) + "</span><i></i></div>";
  }

  function photoHero() {
    var src = C.photos && C.photos.hero;
    var inner = '<div class="mono"><span>' + sealText() + "</span></div>";
    if (src) inner = '<img src="' + esc(src) + '" alt="' + esc(t(C.partner1.name) + " & " + t(C.partner2.name)) + '" class="hero-img">' + inner;
    return '<div class="photo-wrap reveal"><div class="photo-arch">' + inner + "</div>" + archGarland(31) + "</div>";
  }

  function personalText() {
    if (guestMsg) return esc(guestMsg);
    var m = esc(t(C.personal.message));
    return m.replace(/\{name\}/g, guest ? "<b>" + esc(guest) + "</b>" : "");
  }

  function eventsHTML() {
    return C.events.map(function (ev) {
      var dt = new Date(ev.date + "T12:00:00+05:30");
      var when = fmt(dt, { weekday: "long", day: "numeric", month: "long" });
      return '<article class="card ev reveal"><p class="ev-date">' + esc(when) + "</p><h3>" + t(ev.title) + '</h3><p class="ev-time">' + t(ev.time) + "</p>" +
        (ev.venue ? '<p class="ev-venue">' + t(ev.venue) + "</p>" : "") + (ev.text ? '<p class="ev-text">' + t(ev.text) + "</p>" : "") + "</article>";
    }).join("");
  }

  function galleryHTML() {
    var g = (C.photos && C.photos.gallery) || [];
    if (!g.length) return "";
    var figs = g.map(function (it) {
      var src = typeof it === "string" ? it : it.src, cap = typeof it === "string" ? "" : t(it.caption);
      return '<figure class="shot" data-src="' + esc(src) + '"><img src="' + esc(src) + '" alt="' + esc(cap) + '" loading="lazy">' + (cap ? "<figcaption>" + cap + "</figcaption>" : "") + "</figure>";
    }).join("");
    return '<section class="red gallery" id="gallerySec"><h2 class="reveal">' + ui("moments") + "</h2>" + DIVIDER + '<div class="gal">' + figs + "</div></section>";
  }

  function renderApp() {
    var p1 = t(C.partner1.name), p2 = t(C.partner2.name);
    var altL = lang === "en" ? "bn" : "en";
    var alt = (C.partner1.name[altL] || "") + " " + (altL === "bn" ? "ও" : "&") + " " + (C.partner2.name[altL] || "");
    var story = (C.story[lang] || C.story.en).map(function (s) { return "<p>" + s + "</p>"; }).join("");
    var dateLong = fmt(d, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    var html =
      /* HERO */
      '<section class="hero red">' +
        '<div class="toran">' + toranSVG(5) + "</div>" +
        '<p class="blessing reveal">' + t(C.blessing) + "</p>" +
        '<p class="invite-line reveal">' + t(C.intro) + "</p>" +
        photoHero() +
        '<h1 class="names reveal"><span>' + esc(p1) + '</span><em>' + ui("weds") + "</em><span>" + esc(p2) + "</span></h1>" +
        '<p class="alt-names reveal">' + esc(alt) + "</p>" +
        '<p class="parents reveal">' + t(C.partner1.parents) + "<br>" + t(C.partner2.parents) + "</p>" +
        '<div class="date-block reveal"><span class="dow">' + esc(fmt(d, { weekday: "long" })) + '</span><span class="dnum">' + esc(fmt(d, { day: "numeric" })) +
          '</span><span class="dmon">' + esc(fmt(d, { month: "long" })) + '</span><span class="dyear">' + esc(fmt(d, { year: "numeric" })) + "</span></div>" +
        '<p class="venue reveal"><b>' + t(C.venue.name) + "</b><br>" + t(C.venue.city) + "</p>" +
        '<div class="btn-row reveal"><a class="btn" target="_blank" rel="noopener" href="' + esc(C.venue.mapsUrl) + '">' + ui("location") + '</a><button class="btn ghost" id="calBtn" type="button">' + ui("cal") + "</button></div>" +
        '<div class="scroll-hint" aria-hidden="true">' + ui("scroll") + "<i></i></div>" +
      "</section>" +

      /* PERSONAL MESSAGE */
      '<section class="cream personal"><div class="card msg reveal">' +
        (guest ? '<p class="dear">' + ui("dearGuest") + " " + esc(guest) + "</p>" : "") +
        '<p class="msg-text">' + personalText() + "</p>" +
        '<p class="sign">' + t(C.personal.signature) + "</p></div></section>" +

      /* COUNTDOWN */
      '<section class="red count-sec"><p class="caps small reveal">' + ui("until") + (lang === "en" ? " " : " · ") + esc(dateLong) + "</p>" +
        '<div class="frame reveal"><svg class="frame-g" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">' + rectChain(400, 300, 12, 26, 41) + "</svg>" +
        '<div class="count-grid">' +
          '<div class="cd"><b id="cdD">0</b><span>' + ui("days") + "</span></div>" +
          '<div class="cd"><b id="cdH">0</b><span>' + ui("hours") + "</span></div>" +
          '<div class="cd"><b id="cdM">0</b><span>' + ui("minutes") + "</span></div>" +
          '<div class="cd"><b id="cdS">0</b><span>' + ui("seconds") + "</span></div>" +
        "</div></div></section>" +

      /* STORY */
      '<section class="cream story-sec"><h2 class="reveal">' + ui("story") + "</h2>" + DIVIDER + '<div class="story reveal">' + story + "</div></section>" +

      galleryHTML() +

      /* FUNCTIONS */
      '<section class="cream events-sec"><h2 class="reveal">' + ui("functions") + "</h2>" + DIVIDER + '<div class="events">' + eventsHTML() + "</div></section>" +

      /* VENUE + DRESS */
      '<section class="red venue-sec"><h2 class="reveal">' + ui("venue") + "</h2>" + DIVIDER +
        '<p class="venue big reveal"><b>' + t(C.venue.name) + "</b><br>" + t(C.venue.city) + '</p><div class="btn-row reveal"><a class="btn gold" target="_blank" rel="noopener" href="' + esc(C.venue.mapsUrl) + '">' + ui("map") + "</a></div></section>" +

      '<section class="cream dress-sec"><h2 class="reveal">' + ui("dress") + "</h2>" + DIVIDER + "<p class=\"reveal\">" + t(C.dressCode.text) + '</p><div class="swatches reveal">' +
        C.dressCode.colors.map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></section>" +

      /* STAY */
      '<section class="red stay-sec"><h2 class="reveal">' + ui("stay") + "</h2>" + DIVIDER + '<p class="reveal">' + t(C.stay.text) + '</p><div class="hotels">' +
        C.stay.hotels.map(function (h) { return '<a class="hotel reveal" target="_blank" rel="noopener" href="' + esc(h.link) + '"><b>' + t(h.name) + "</b><span>" + t(h.note) + "</span></a>"; }).join("") + "</div></section>" +

      /* RSVP */
      '<section class="cream rsvp-sec"><h2 class="reveal">' + ui("join") + "</h2>" + DIVIDER + '<p class="caps small reveal">' + t(C.rsvp.deadline) + "</p>" +
        (C.rsvp.whatsapp ? '<form id="rsvpForm" class="rsvp reveal" autocomplete="off">' +
          '<label>' + ui("name") + '<input name="name" required placeholder="' + esc(ui("namePh")) + '" value="' + esc(guest) + '"></label>' +
          '<label>' + ui("guests") + '<input name="guests" type="number" min="1" max="10" value="1"></label>' +
          '<div class="choice"><label><input type="radio" name="att" value="yes" checked><span>' + ui("yes") + '</span></label><label><input type="radio" name="att" value="no"><span>' + ui("no") + "</span></label></div>" +
          '<button class="btn" type="submit">' + ui("send") + "</button></form>" : "") + "</section>" +

      /* BLESSINGS / GIFT */
      '<section class="red gift-sec"><div class="wreath reveal"><div class="wreath-ring">' + wreathSVG(61) + '</div><div class="wreath-text"><h2>' + ui("gift") + "</h2><p>" + t(C.gift.text) + '</p></div></div>' +
        '<p class="foot reveal">' + t(C.personal.signature) + "</p></section>";

    $("#app").innerHTML = html;
    afterRender();
  }

  /* ================= after each render ================= */
  var opened = false, io = null;
  function afterRender() {
    // photos that fail to load: hero falls back to the monogram, gallery items vanish
    $$(".hero-img").forEach(function (im) { im.addEventListener("error", function () { im.remove(); }); });
    $$(".shot img").forEach(function (im) {
      im.addEventListener("error", function () {
        var f = im.closest(".shot"); if (f) f.remove();
        if (!$(".shot")) { var s = $("#gallerySec"); if (s) s.remove(); }
      });
    });
    $$(".shot").forEach(function (f) { f.addEventListener("click", function () { var lb = $("#lb"); $("img", lb).src = f.dataset.src; lb.hidden = false; }); });
    var cal = $("#calBtn"); if (cal) cal.addEventListener("click", addToCalendar);
    var form = $("#rsvpForm"); if (form) form.addEventListener("submit", sendRSVP);
    if (opened) $$(".reveal").forEach(function (e) { e.classList.add("in"); });
    tick();
  }

  function tick() {
    var el = $("#cdD"); if (!el) return;
    var s = Math.floor(Math.max(0, d.getTime() - Date.now()) / 1000);
    el.textContent = num(Math.floor(s / 86400));
    $("#cdH").textContent = num(Math.floor(s % 86400 / 3600));
    $("#cdM").textContent = num(Math.floor(s % 3600 / 60));
    $("#cdS").textContent = num(s % 60);
  }
  setInterval(tick, 1000);

  function addToCalendar() {
    function f(x) { return x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
    var end = new Date(d.getTime() + 4 * 3600 * 1000);
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invite//EN", "BEGIN:VEVENT", "UID:" + d.getTime() + "@wedding-invite",
      "DTSTAMP:" + f(new Date()), "DTSTART:" + f(d), "DTEND:" + f(end),
      "SUMMARY:Wedding of " + C.partner1.name.en + " & " + C.partner2.name.en,
      "LOCATION:" + C.venue.name.en + ", " + C.venue.city.en, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "wedding.ics"; document.body.appendChild(a); a.click(); a.remove();
  }

  function sendRSVP(e) {
    e.preventDefault();
    var f = e.target, yes = f.att.value === "yes", name = clean(f.name.value, 60), n = f.guests.value;
    var msg = lang === "bn"
      ? (yes ? "নমস্কার! আমি " + name + "। আমরা " + num(n) + " জন আপনাদের বিয়েতে আসছি। 🎉" : "নমস্কার! আমি " + name + "। দুঃখিত, আমি আসতে পারছি না। আপনাদের জন্য অনেক শুভকামনা। 💐")
      : (yes ? "Hi! This is " + name + ". " + n + " of us will be attending your wedding. 🎉" : "Hi! This is " + name + ". Sorry, I won't be able to attend. Wishing you both all the happiness! 💐");
    window.open("https://wa.me/" + C.rsvp.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  }

  /* ================= scroll reveal ================= */
  function watch() {
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: .12 });
      $$(".reveal").forEach(function (el) { io.observe(el); });
    } else $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ================= language switch ================= */
  function setLang(l) {
    lang = l; store("lang", l);
    document.documentElement.lang = l;
    document.title = t(C.partner1.name) + " & " + t(C.partner2.name) + " · " + (l === "bn" ? "শুভ বিবাহ" : "Wedding Invitation");
    $$("#langSw button").forEach(function (b) { b.classList.toggle("on", b.dataset.l === l); });
    var y = window.scrollY;
    renderIntro(); renderApp();
    if (opened) window.scrollTo(0, y);
    else if (io) io.disconnect();
  }
  $$("#langSw button").forEach(function (b) {
    b.addEventListener("click", function (e) { e.stopPropagation(); setLang(b.dataset.l); });
  });

  var lastY = 0, sw = $("#langSw");
  addEventListener("scroll", function () {
    var y = window.scrollY; sw.classList.toggle("hide", y > lastY && y > 120); lastY = y;
  }, { passive: true });

  /* ================= envelope open ================= */
  var intro = $("#intro");
  function open() {
    if (opened) return; opened = true;
    intro.classList.add("open");
    Music.start();
    setTimeout(function () {
      document.body.classList.remove("locked");
      intro.classList.add("gone");
      watch(); petals();
    }, 2200);
    setTimeout(function () { intro.remove(); }, 3600);
  }
  intro.addEventListener("click", open);
  intro.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });

  /* ================= lightbox ================= */
  $("#lb").addEventListener("click", function () { this.hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") $("#lb").hidden = true; });

  /* ================= music ================= */
  var Music = (function () {
    var btn = $("#music"), audio = $("#bgm"), mode = (C.music && C.music.mode) || "synth", file = C.music && C.music.file;
    var ctx, master, delayIn, timer, on = false, nextTan = 0, nextMel = 0, step = 0;
    var SA = 146.83, BEAT = .62; // D3 as Sa
    function f(semi) { return SA * Math.pow(2, semi / 12); }
    // Raag Yaman style phrases: [semitone from upper Sa, beats]; null = rest
    var PHRASES = [
      [[4, 1], [6, .5], [7, 1], [9, .5], [7, .5], [6, .5], [4, 1], [2, 1], [0, 2]],
      [[7, 1], [9, 1], [11, .5], [12, 1.5], [11, .5], [9, .5], [7, 1], [6, .5], [4, 2]],
      [[0, 1], [2, .5], [4, 1], [6, 1], [7, 1.5], [9, .5], [7, .5], [6, .5], [4, 2]],
      [[12, 1], [11, .5], [9, 1], [7, .5], [9, .5], [6, 1], [4, 1], [2, .5], [4, 2.5]]
    ];
    var queue = [];
    function pluck(freq, t0, vol) {
      [[1, 1], [2, .55], [3, .3], [4, .16], [5, .08]].forEach(function (h) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = freq * h[0] * (1 + (Math.random() - .5) * .0025);
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol * h[1], t0 + .012);
        g.gain.exponentialRampToValueAtTime(.0001, t0 + 4.2);
        o.connect(g); g.connect(master); g.connect(delayIn); o.start(t0); o.stop(t0 + 4.3);
      });
    }
    function flute(freq, t0, dur, vol) {
      var o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
      var lfo = ctx.createOscillator(), lg = ctx.createGain();
      o.type = "triangle"; o2.type = "sine"; o.frequency.value = freq; o2.frequency.value = freq * 2;
      lfo.frequency.value = 5.2; lg.gain.value = 7; lfo.connect(lg); lg.connect(o.detune); lg.connect(o2.detune);
      lp.type = "lowpass"; lp.frequency.value = 2400;
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + .09);
      g.gain.setValueAtTime(vol * .85, t0 + dur * .7); g.gain.linearRampToValueAtTime(0, t0 + dur + .12);
      var g2 = ctx.createGain(); g2.gain.value = .18; o2.connect(g2); g2.connect(lp);
      o.connect(lp); lp.connect(g); g.connect(master); g.connect(delayIn);
      [o, o2, lfo].forEach(function (x) { x.start(t0); x.stop(t0 + dur + .2); });
    }
    function schedule() {
      var now = ctx.currentTime;
      var tan = [f(-5), f(0), f(0), f(-12)];
      while (nextTan < now + 2.5) { pluck(tan[step % 4], nextTan, .075); step++; nextTan += 1.55; }
      while (nextMel < now + 2.5) {
        if (!queue.length) {
          var ph = PHRASES[Math.floor(Math.random() * PHRASES.length)].slice();
          queue = ph.concat([[null, 2 + Math.floor(Math.random() * 3)]]);
        }
        var n = queue.shift(), dur = n[1] * BEAT;
        if (n[0] !== null) flute(f(n[0] + 12), nextMel, dur * .95, .11);
        nextMel += dur;
      }
    }
    function init() {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      delayIn = ctx.createGain(); delayIn.gain.value = .5;
      var dl = ctx.createDelay(1); dl.delayTime.value = .32; var fb = ctx.createGain(); fb.gain.value = .38;
      var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1800;
      delayIn.connect(dl); dl.connect(lp); lp.connect(fb); fb.connect(dl); lp.connect(master);
      return true;
    }
    function startSynth() {
      if (!ctx && !init()) return;
      ctx.resume();
      nextTan = nextMel = ctx.currentTime + .1; step = 0; queue = [];
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(.8, ctx.currentTime + 3);
      schedule(); timer = setInterval(schedule, 700); on = true; ui_();
    }
    function stopSynth() {
      if (!ctx) return;
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + .6);
      clearInterval(timer); on = false; ui_();
    }
    function ui_() { btn.classList.toggle("off", !on); }
    function start() {
      if (mode === "off" && !file) return;
      btn.hidden = false;
      if (file) { audio.src = file; audio.volume = .6; audio.play().then(function () { on = true; ui_(); }).catch(function () { on = false; ui_(); }); }
      else startSynth();
    }
    btn.addEventListener("click", function () {
      if (file) { if (audio.paused) { audio.play(); on = true; } else { audio.pause(); on = false; } ui_(); }
      else if (on) stopSynth(); else startSynth();
    });
    document.addEventListener("visibilitychange", function () {
      if (!ctx || file) return;
      if (document.hidden) ctx.suspend(); else if (on) ctx.resume();
    });
    return { start: start };
  })();

  /* ================= falling petals ================= */
  var cv = $("#petals"), cx = cv.getContext("2d"), P = [], running = false;
  function size() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
  size(); addEventListener("resize", size);
  var COLS = ["#f59e0b", "#fbbf24", "#f97316", "#e11d48", "#fcd34d", "#fb923c"];
  function mk(any) {
    return { x: Math.random() * innerWidth, y: any ? Math.random() * innerHeight : -20, s: 4 + Math.random() * 5, vy: .5 + Math.random() * .9,
      vx: (Math.random() - .5) * .4, r: Math.random() * 6, vr: (Math.random() - .5) * .04, t: Math.random() * 6, a: .6 + Math.random() * .35, c: COLS[Math.floor(Math.random() * COLS.length)] };
  }
  function petals() {
    if (running || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running = true;
    for (var i = 0; i < (innerWidth < 500 ? 16 : 26); i++) P.push(mk(true));
    (function loop() {
      cx.clearRect(0, 0, cv.width, cv.height); var k = devicePixelRatio;
      P.forEach(function (p, i) {
        p.y += p.vy; p.x += Math.sin(p.t += .02) * .6 + p.vx; p.r += p.vr;
        if (p.y > innerHeight + 20) P[i] = mk(false);
        cx.save(); cx.translate(p.x * k, p.y * k); cx.rotate(p.r); cx.scale(1, .6 + .4 * Math.sin(p.t));
        cx.fillStyle = p.c; cx.globalAlpha = p.a; cx.beginPath(); cx.ellipse(0, 0, p.s * k, p.s * .62 * k, 0, 0, 6.283); cx.fill(); cx.restore();
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ================= go ================= */
  setLang(lang);
})();
