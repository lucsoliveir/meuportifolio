(() => {
  const dialog = document.querySelector("#project-preview-dialog");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const scroller = dialog.querySelector(".project-dialog-preview");
  const image = dialog.querySelector(".project-dialog-image");
  const category = dialog.querySelector(".project-dialog-category");
  const title = dialog.querySelector(".project-dialog-title");
  const description = dialog.querySelector(".project-dialog-description");
  const link = dialog.querySelector(".project-dialog-link");
  const domain = dialog.querySelector(".project-dialog-url");
  const modes = dialog.querySelector(".project-preview-modes");
  const modeButtons = dialog.querySelectorAll(".project-preview-mode");
  const closeButton = dialog.querySelector(".project-dialog-close");

  let activeProject = null;

  // Os dados de cada projeto ficam uma única vez, no <article class="project-card">.
  function getProject(button) {
    const card = button.closest(".project-card");
    return card ? card.dataset : null;
  }

  function getPreviewModes(project) {
    return {
      desktop: { src: project.projectPreview, alt: project.projectPreviewAlt },
      mobile: { src: project.projectMobile, alt: project.projectMobileAlt },
      showcase: { src: project.projectShowcase, alt: project.projectShowcaseAlt },
    };
  }

  function setPreviewMode(mode) {
    if (!activeProject) return;

    const available = getPreviewModes(activeProject);
    const selected = available[mode]?.src ? mode : "desktop";
    const { src, alt } = available[selected];

    image.src = src;
    image.alt = alt || "";
    scroller.classList.toggle("is-mobile", selected === "mobile");
    scroller.scrollTop = 0;

    for (const button of modeButtons) {
      const key = button.dataset.previewMode;
      const isActive = key === selected;
      button.hidden = !available[key]?.src;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    }
  }

  function openProject(button) {
    const project = getProject(button);
    if (!project?.projectTitle || !project.projectPreview) return;

    // Navegadores sem <dialog>: abre o site direto.
    if (typeof dialog.showModal !== "function") {
      if (project.projectUrl) window.open(project.projectUrl, "_blank", "noopener");
      return;
    }

    activeProject = project;
    title.textContent = project.projectTitle;
    category.textContent = project.projectCategory || "";
    description.textContent = project.projectDescription || "";
    domain.textContent = project.projectDomain || "";

    if (project.projectUrl) {
      link.href = project.projectUrl;
      link.hidden = false;
    } else {
      link.hidden = true;
    }

    modes.hidden = !project.projectMobile && !project.projectShowcase;
    // Abre primeiro: a rolagem só pode ser zerada com a janela visível.
    dialog.showModal();
    setPreviewMode("desktop");
  }

  // A imagem nova muda a altura do conteúdo ao carregar; garante o topo.
  image.addEventListener("load", () => {
    scroller.scrollTop = 0;
  });

  document
    .querySelectorAll(".project-preview-trigger, .project-open-button")
    .forEach((button) => button.addEventListener("click", () => openProject(button)));

  modeButtons.forEach((button) =>
    button.addEventListener("click", () => setPreviewMode(button.dataset.previewMode)),
  );

  closeButton?.addEventListener("click", () => dialog.close());

  // Clique no fundo escurecido fecha o diálogo.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
