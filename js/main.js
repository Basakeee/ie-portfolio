/* อ่านข้อมูลจาก DATA (js/data.js) แล้ววาดลงหน้าเว็บ */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);

  // สร้าง element แบบสั้น ๆ: el("div", { class: "x", text: "hi" }, [ลูก ๆ])
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value == null || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value);
    }
    for (const child of [children].flat(Infinity)) {
      if (child != null && child !== false) node.append(child);
    }
    return node;
  }

  const p = DATA.profile;

  /* ---------- ข้อความทั่วไป (data-bind) ---------- */
  const initials = (p.nameEn || "").replace(/[\[\]]/g, "").split(/\s+/).map((w) => w[0] || "").join("").slice(0, 2).toUpperCase() || "IE";
  const bindings = {
    brand: p.nameEn, name: p.name, nameEn: p.nameEn, title: p.title,
    tagline: p.tagline, availability: p.availability, contactLead: p.contactLead
  };
  document.querySelectorAll("[data-bind]").forEach((node) => {
    const key = node.dataset.bind;
    if (key === "resumePdf") {
      if (p.resumePdf) node.href = p.resumePdf; else node.remove();
    } else if (bindings[key]) {
      node.textContent = bindings[key];
    } else {
      node.remove();
    }
  });
  document.title = `${p.nameEn} | Industrial Engineering Portfolio`;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- รูปโปรไฟล์ ---------- */
  const photoBox = $("#heroPhoto");
  const photoFallback = () => photoBox.replaceChildren(el("span", { class: "hero__initials", text: initials }));
  if (p.photo) {
    const img = el("img", { src: p.photo, alt: p.name });
    img.addEventListener("error", photoFallback);
    photoBox.append(img);
  } else {
    photoFallback();
  }

  /* ---------- About ---------- */
  $("#aboutText").append(...DATA.about.paragraphs.map((t) => el("p", { text: t })));
  $("#aboutStats").append(...DATA.about.stats.map((s) =>
    el("div", { class: "stat" }, [
      el("div", { class: "stat__value", text: s.value }),
      el("div", { class: "stat__label", text: s.label })
    ])
  ));

  /* ---------- Resume ---------- */
  function timeline(targetId, items) {
    const target = $(targetId);
    if (!items || !items.length) {            // ไม่มีข้อมูล = ซ่อนหัวข้อไปด้วย
      target.previousElementSibling.remove();
      target.remove();
      return;
    }
    target.append(...items.map((it) =>
      el("article", { class: "tl" }, [
        el("div", { class: "tl__period", text: it.period }),
        el("div", { class: "tl__body" }, [
          el("h4", { class: "tl__title", text: it.title }),
          el("p", { class: "tl__place", text: it.place }),
          it.details && it.details.length
            ? el("ul", { class: "tl__details" }, it.details.map((d) => el("li", { text: d })))
            : null
        ])
      ])
    ));
  }
  timeline("#education", DATA.education);
  timeline("#experience", DATA.experience);
  timeline("#activities", DATA.activities);

  $("#skills").append(...DATA.skills.map((g) =>
    el("div", { class: "skill-group" }, [
      el("p", { class: "skill-group__name", text: g.group }),
      el("div", { class: "tags" }, g.items.map((s) => el("span", { class: "tag", text: s })))
    ])
  ));
  $("#certificates").append(...DATA.certificates.map((c) => el("li", { text: c })));
  $("#languages").append(...DATA.languages.map((l) => el("li", { text: l })));

  // หัวกระดาษตอนพิมพ์ Resume
  $("#printHeader").append(
    el("h1", { text: `${p.name} (${p.nameEn})` }),
    el("p", { text: p.title }),
    el("p", { text: p.contacts.map((c) => `${c.label}: ${c.value}`).join("  |  ") })
  );
  $("#printBtn").addEventListener("click", () => window.print());

  /* ---------- Projects ---------- */
  const cardsBox = $("#projectCards");
  const modal = $("#projectModal");
  const modalBody = $("#modalBody");

  function cover(project, className) {
    const placeholder = () => el("div", { class: `${className} cover--empty` }, el("span", { text: project.category }));
    if (!project.cover) return placeholder();
    const img = el("img", { class: className, src: project.cover, alt: project.title, loading: "lazy" });
    img.addEventListener("error", () => img.replaceWith(placeholder()));
    return img;
  }

  function metrics(list) {
    if (!list || !list.length) return null;
    return el("div", { class: "metrics" }, list.map((m) =>
      el("div", { class: "metric" }, [
        el("div", { class: "metric__value", text: m.value }),
        el("div", { class: "metric__label", text: m.label })
      ])
    ));
  }

  function block(label, text) {
    return text ? el("div", { class: "modal__block" }, [el("h4", { text: label }), el("p", { text })]) : null;
  }

  function openProject(project) {
    modalBody.replaceChildren(
      cover(project, "modal__cover"),
      el("div", { class: "modal__content" }, [
        el("p", { class: "card__meta", text: `${project.category} · ${project.year}` }),
        el("h3", { class: "modal__title", text: project.title }),
        el("p", { class: "modal__role", text: `บทบาท: ${project.role}` }),
        metrics(project.metrics),
        block("ปัญหา (Problem)", project.problem),
        block("วิธีการ (Method)", project.method),
        block("ผลลัพธ์ (Result)", project.result),
        el("div", { class: "tags" }, (project.tools || []).map((t) => el("span", { class: "tag", text: t }))),
        project.images && project.images.length
          ? el("div", { class: "modal__gallery" }, project.images.map((src) => el("img", { src, alt: project.title, loading: "lazy" })))
          : null,
        project.links && project.links.length
          ? el("div", { class: "modal__links" }, project.links.map((l) =>
              el("a", { class: "btn btn--small", href: l.href, target: "_blank", rel: "noopener", text: l.label })))
          : null
      ])
    );
    modal.showModal();
  }

  function renderProjects(category) {
    const list = category === "All" ? DATA.projects : DATA.projects.filter((x) => x.category === category);
    cardsBox.replaceChildren(...list.map((project) =>
      el("button", { class: "card", type: "button", onclick: () => openProject(project) }, [
        cover(project, "card__cover"),
        el("div", { class: "card__body" }, [
          el("p", { class: "card__meta", text: `${project.category} · ${project.year}` }),
          el("h3", { class: "card__title", text: project.title }),
          el("p", { class: "card__summary", text: project.summary }),
          el("span", { class: "card__more", text: "ดูรายละเอียด →" })
        ])
      ])
    ));
  }

  const categories = ["All", ...new Set(DATA.projects.map((x) => x.category))];
  const filterBox = $("#filters");
  filterBox.append(...categories.map((c, i) =>
    el("button", {
      class: "filter" + (i === 0 ? " is-active" : ""), type: "button", text: c,
      onclick: (e) => {
        filterBox.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
        e.currentTarget.classList.add("is-active");
        renderProjects(c);
      }
    })
  ));
  renderProjects("All");

  $("#modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); }); // คลิกพื้นหลังเพื่อปิด

  /* ---------- Contact ---------- */
  $("#contactList").append(...p.contacts.map((c) => {
    const inner = [el("span", { class: "contact__label", text: c.label }), el("span", { class: "contact__value", text: c.value })];
    return c.href
      ? el("a", { class: "contact__item", href: c.href, target: c.href.startsWith("http") ? "_blank" : null, rel: "noopener" }, inner)
      : el("div", { class: "contact__item" }, inner);
  }));

  /* ---------- เมนู: มือถือ + ไฮไลต์หัวข้อที่กำลังดู ---------- */
  const navLinks = $("#navLinks");
  const navToggle = $("#navToggle");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navLinks.classList.remove("is-open");
  });

  const linkFor = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach((a) => { linkFor[a.getAttribute("href").slice(1)] = a; });
  // section ไหนอยู่กลางจอ = ไฮไลต์ลิงก์ของ section นั้น
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      Object.values(linkFor).forEach((a) => a.classList.remove("is-current"));
      if (linkFor[entry.target.id]) linkFor[entry.target.id].classList.add("is-current");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
})();
