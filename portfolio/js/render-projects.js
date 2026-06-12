(function (global) {
  var FEATURED_LIMIT = 3;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sortedProjects(projects) {
    return projects.slice().sort(function (a, b) {
      return b.order - a.order;
    });
  }

  function isExternalProject(project) {
    return /^https?:\/\//.test(project.path);
  }

  function resolveHref(project, linkPrefix) {
    if (isExternalProject(project)) {
      return project.path;
    }
    if (project.path.charAt(0) === "/") {
      return project.path;
    }
    return linkPrefix + project.path;
  }

  function resolvePreview(project, imagePrefix) {
    return imagePrefix + project.preview;
  }

  function buildCard(project, options) {
    var linkPrefix = options.linkPrefix || "";
    var imagePrefix = options.imagePrefix || "";
    var href = resolveHref(project, linkPrefix);
    var preview = resolvePreview(project, imagePrefix);
    var linkLabel = project.linkLabel || "Open project";
    var external = isExternalProject(project);
    var linkExtra = external
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
    var linkIcon = external
      ? "fa-arrow-up-right-from-square"
      : "fa-arrow-right";

    return (
      '<article class="ip-project-card flex h-full flex-col overflow-hidden rounded-2xl border-2 border-stone-200 bg-white shadow-sm">' +
      '<img src="' +
      escapeHtml(preview) +
      '" alt="' +
      escapeHtml(project.previewAlt) +
      '" class="ip-card-img h-48 w-full object-cover" width="400" height="240">' +
      '<div class="flex flex-grow flex-col p-5">' +
      '<h3 class="font-display text-xl font-bold text-ink">' +
      escapeHtml(project.title) +
      "</h3>" +
      '<p class="mt-2 flex-grow text-sm text-muted">' +
      escapeHtml(project.description) +
      "</p>" +
      '<a class="relative mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark" href="' +
      escapeHtml(href) +
      '"' +
      linkExtra +
      ">" +
      escapeHtml(linkLabel) +
      ' <i class="fa-solid ' +
      linkIcon +
      ' ms-2" aria-hidden="true"></i></a>' +
      "</div></article>"
    );
  }

  function renderInto(selector, projects, options) {
    var container = document.querySelector(selector);
    if (!container) {
      return;
    }

    container.innerHTML = projects
      .map(function (project) {
        return buildCard(project, options);
      })
      .join("");
  }

  function getFeaturedProjects(projects, limit) {
    return sortedProjects(projects)
      .filter(function (project) {
        return !project.excludeFromFeatured;
      })
      .slice(0, limit || FEATURED_LIMIT);
  }

  function getProjectsByType(projects, type) {
    return sortedProjects(projects).filter(function (project) {
      return project.type === type;
    });
  }

  global.PortfolioProjects = {
    FEATURED_LIMIT: FEATURED_LIMIT,
    renderFeatured: function (selector, options) {
      var projects = global.PORTFOLIO_PROJECTS || [];
      var limit = options && options.limit ? options.limit : FEATURED_LIMIT;
      renderInto(selector, getFeaturedProjects(projects, limit), options || {});
    },
    renderByType: function (selector, type, options) {
      var projects = global.PORTFOLIO_PROJECTS || [];
      renderInto(selector, getProjectsByType(projects, type), options || {});
    },
  };
})(window);
