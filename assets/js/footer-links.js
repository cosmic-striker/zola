(() => {
  async function loadEnvFile() {
    const response = await fetch(".env", { cache: "no-store" });
    if (!response.ok) {
      return {};
    }

    const text = await response.text();
    const env = {};

    text.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }

      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) {
        return;
      }

      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (key) {
        env[key] = value;
      }
    });

    return env;
  }

  function applyLinks(env) {
    document.querySelectorAll("[data-env]").forEach((link) => {
      const key = link.getAttribute("data-env");
      if (!key || !(key in env)) {
        return;
      }

      let href = env[key];
      if (key === "MAIL_URL" && href && !href.startsWith("mailto:")) {
        href = `mailto:${href}`;
      }

      link.setAttribute("href", href);

      if (href.startsWith("http") && !link.hasAttribute("target")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  loadEnvFile().then(applyLinks).catch(() => {});
})();
