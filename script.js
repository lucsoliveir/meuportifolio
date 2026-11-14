const projectDialog = document.querySelector("#project-preview-dialog");
const projectPreviewButtons = document.querySelectorAll(
  ".project-preview-trigger, .project-open-button",
);
const projectDialogCloseButton = document.querySelector(".project-dialog-close");
const projectPreviewScroller = projectDialog?.querySelector(".project-dialog-preview");
const projectDialogImage = projectDialog?.querySelector(".project-dialog-image");
const projectDialogCategory = projectDialog?.querySelector(".project-dialog-category");
const projectDialogTitle = projectDialog?.querySelector(".project-dialog-title");
const projectDialogDescription = projectDialog?.querySelector(".project-dialog-description");
const projectDialogLink = projectDialog?.querySelector(".project-dialog-link");
const projectDialogDomain = projectDialog?.querySelector(".project-dialog-url");
const projectPreviewModes = projectDialog?.querySelector(".project-preview-modes");
const projectPreviewModeButtons = projectDialog?.querySelectorAll(".project-preview-mode");

if (!(projectDialog instanceof HTMLDialogElement)) {
  throw new Error("A janela de prévia do projeto não foi encontrada.");
}

if (
  !(projectDialogCloseButton instanceof HTMLButtonElement) ||
  !(projectPreviewScroller instanceof HTMLElement) ||
  !(projectDialogImage instanceof HTMLImageElement) ||
  !(projectDialogCategory instanceof HTMLElement) ||
  !(projectDialogTitle instanceof HTMLElement) ||
  !(projectDialogDescription instanceof HTMLElement) ||
  !(projectDialogLink instanceof HTMLAnchorElement) ||
  !(projectDialogDomain instanceof HTMLElement) ||
  !(projectPreviewModes instanceof HTMLElement) ||
  !projectPreviewModeButtons
) {
  throw new Error("Não foi possível inicializar todos os controles da prévia do projeto.");
}

let activeProject = null;
let activePreviewMode = "desktop";

function setProjectPreviewMode(mode) {
  if (!activeProject || !projectDialogImage || !projectPreviewScroller) {
    throw new Error("Não há um projeto ativo para exibir.");
  }

  const previewModes = {
    desktop: {
      src: activeProject.projectPreview,
      alt: activeProject.projectPreviewAlt,
    },
    mobile: {
      src: activeProject.projectMobile,
      alt: activeProject.projectMobileAlt,
    },
    showcase: {
      src: activeProject.projectShowcase,
      alt: activeProject.projectShowcaseAlt,
    },
  };
  const selectedMode = previewModes[mode];

  if (!selectedMode?.src || !selectedMode.alt) {
    throw new Error(`A prévia "${mode}" não está disponível para este projeto.`);
  }

  activePreviewMode = mode;
  projectDialogImage.src = selectedMode.src;
  projectDialogImage.alt = selectedMode.alt;
  projectPreviewScroller.classList.toggle("is-mobile", mode === "mobile");
  projectPreviewScroller.scrollTop = 0;

  for (const button of projectPreviewModeButtons) {
    const selected = button.dataset.previewMode === activePreviewMode;
    button.hidden = !previewModes[button.dataset.previewMode]?.src;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  }
}

for (const button of projectPreviewButtons) {
  button.addEventListener("click", () => {
    const project = button.dataset;
    const requiredValues = [
      project.projectTitle,
      project.projectCategory,
      project.projectDescription,
      project.projectUrl,
      project.projectDomain,
      project.projectPreview,
      project.projectPreviewAlt,
    ];

    if (requiredValues.some((value) => !value)) {
      throw new Error("Faltam informações para abrir a prévia deste projeto.");
    }

    activeProject = project;
    projectDialogTitle.textContent = project.projectTitle;
    projectDialogCategory.textContent = project.projectCategory;
    projectDialogDescription.textContent = project.projectDescription;
    projectDialogLink.href = project.projectUrl;
    projectDialogDomain.textContent = project.projectDomain;
    projectPreviewModes.hidden = !project.projectMobile && !project.projectShowcase;
    setProjectPreviewMode("desktop");
    projectDialog.showModal();
  });
}

for (const button of projectPreviewModeButtons) {
  button.addEventListener("click", () => {
    setProjectPreviewMode(button.dataset.previewMode);
  });
}

projectDialogCloseButton.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});
