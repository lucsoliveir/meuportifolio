(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Header: sombra ao rolar
  --------------------------------------------------------- */
  var header = document.getElementById("header");
  function onScrollHeader() {
    if (window.scrollY > 12) {
      header.style.boxShadow = "0 10px 30px -20px rgba(0,0,0,0.6)";
      header.style.background = "rgba(11, 15, 23, 0.88)";
    } else {
      header.style.boxShadow = "none";
      header.style.background = "rgba(11, 15, 23, 0.7)";
    }
  }
  document.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------
     Marquee infinito: duplica os grupos o quanto for
     necessário para nunca sobrar vão vazio, em qualquer
     largura de tela.
  --------------------------------------------------------- */
  var marquee = document.getElementById("marquee");
  var marqueeTrack = document.getElementById("marquee-track");
  var MARQUEE_SPEED = 55; // pixels por segundo

  function buildMarquee() {
    if (!marquee || !marqueeTrack) return;

    var baseGroup = marqueeTrack.querySelector(".marquee__group");
    if (!baseGroup) return;

    // Reseta para um único grupo de referência antes de medir
    marqueeTrack.innerHTML = "";
    marqueeTrack.appendChild(baseGroup);

    var groupWidth = baseGroup.getBoundingClientRect().width;
    var containerWidth = marquee.getBoundingClientRect().width;
    if (!groupWidth || !containerWidth) return;

    // Quantos grupos cabem (com folga) para cobrir a tela inteira de uma vez
    var groupsPerHalf = Math.max(2, Math.ceil(containerWidth / groupWidth) + 1);

    // Monta duas metades idênticas: a animação anda -50% e o loop fica perfeito
    for (var half = 0; half < 2; half++) {
      for (var i = 0; i < groupsPerHalf; i++) {
        if (half === 0 && i === 0) continue; // já existe (baseGroup)
        marqueeTrack.appendChild(baseGroup.cloneNode(true));
      }
    }

    // Velocidade constante, independente de quantos grupos foram necessários
    var halfWidth = groupWidth * groupsPerHalf;
    var duration = halfWidth / MARQUEE_SPEED;
    marqueeTrack.style.animationDuration = duration + "s";
  }

  buildMarquee();

  var marqueeResizeTimeout;
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(marqueeResizeTimeout);
      marqueeResizeTimeout = setTimeout(buildMarquee, 200);
    },
    { passive: true }
  );

  /* ---------------------------------------------------------
     Menu mobile
  --------------------------------------------------------- */
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------------------------------------------------------
     FAQ Accordion
  --------------------------------------------------------- */
  var triggers = document.querySelectorAll(".accordion__trigger");
  triggers.forEach(function (trigger) {
    var panel = trigger.nextElementSibling;
    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      triggers.forEach(function (t) {
        if (t !== trigger) {
          t.setAttribute("aria-expanded", "false");
          t.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isOpen) {
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------------------------------------------------------
     Reveal on scroll (IntersectionObserver)
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------
     Agendar Reunião — abre o WhatsApp com mensagem específica
  --------------------------------------------------------- */
  var scheduleBtn = document.getElementById("schedule-btn");
  if (scheduleBtn) {
    scheduleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var url =
        "https://wa.me/5521981668039?text=Ol%C3%A1%21%20Quero%20fazer%20um%20or%C3%A7amento%20de%20um%20site." +
        encodeURIComponent("Olá! Gostaria de agendar uma reunião com a BeWork.");
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  /* ---------------------------------------------------------
     Modal de Pré-visualização (Pop-up) dos projetos
  --------------------------------------------------------- */
  var PROJECTS = {
    apex: {
      domain: "apexperfomance.vercel.app",
      tag: "Fitness / Consultoria Online",
      title: "Apex Performance",
      desc: "Site focado em conversão para consultoria fitness online, treinos personalizados e evolução física.",
      url: "https://apexperfomance.vercel.app/",
      ctaLabel: "Visitar Site ao Vivo",
      ctaIcon: "↗",
      image: "assets/projects/apex-performance.jpg",
      imageAlt: "Página inicial do projeto Apex Performance"
    },
    alinea: {
      domain: "nail-designexemplo.vercel.app",
      tag: "Estética Premium / Nail Designer",
      title: "NailStudio",
      desc: "Design sofisticado, orgânico e de luxo focado 100% em Nail Design, alongamentos e agendamento de clientes.",
      url: "https://nail-designexemplo.vercel.app/",
      ctaLabel: "Visitar Site ao Vivo",
      ctaIcon: "↗",
      image: "assets/projects/alinea-studio.jpg",
      imageAlt: "Página inicial do projeto NailStudio"
    },
    pragtech: {
      domain: "pragtech-exemplo.vercel.app",
      tag: "Serviços Técnicos / Imunização",
      title: "PragTech Imunização",
      desc: "Site técnico e de alta conversão para dedetizadora e controle de pragas urbanas (residencial e comercial).",
      url: "https://pragtech-exemplo.vercel.app/",
      ctaLabel: "Visitar Site ao Vivo",
      ctaIcon: "↗",
      image: "assets/projects/pragtech.jpg",
      imageAlt: "Página inicial do projeto PragTech"
    }
  };

  var overlay = document.getElementById("preview-overlay");
  var modal = document.getElementById("preview-modal");
  var closeBtn = document.getElementById("preview-close");
  var secondaryBtn = document.getElementById("preview-secondary");
  var domainEl = document.getElementById("preview-domain");
  var viewportEl = document.getElementById("preview-viewport");
  var tagEl = document.getElementById("preview-tag");
  var titleEl = document.getElementById("preview-modal-title");
  var descEl = document.getElementById("preview-desc");
  var ctaEl = document.getElementById("preview-cta");

  var lastFocusedEl = null;

  function openPreview(projectId) {
    var data = PROJECTS[projectId];
    if (!data || !overlay) return;

    lastFocusedEl = document.activeElement;

    // Popula o conteúdo do modal
    domainEl.textContent = data.domain;
    tagEl.textContent = data.tag;
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    ctaEl.href = data.url;
    ctaEl.innerHTML = data.ctaLabel + ' <span aria-hidden="true">' + data.ctaIcon + "</span>";

    // Insere a captura real do site no viewport do modal
    viewportEl.innerHTML = "";
    var img = document.createElement("img");
    img.src = data.image;
    img.alt = data.imageAlt;
    viewportEl.appendChild(img);

    overlay.hidden = false;
    // força reflow para a transição funcionar
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    closeBtn.focus();

    document.addEventListener("keydown", onKeydown);
  }

  function closePreview() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);

    var finish = function () {
      overlay.hidden = true;
      viewportEl.innerHTML = "";
    };

    if (prefersReducedMotion) {
      finish();
    } else {
      setTimeout(finish, 350);
    }

    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      closePreview();
      return;
    }
    if (e.key === "Tab") {
      var focusables = modal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.querySelectorAll("[data-preview-trigger]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openPreview(trigger.getAttribute("data-preview-trigger"));
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closePreview);
  if (secondaryBtn) secondaryBtn.addEventListener("click", closePreview);

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePreview();
    });
  }
})();
