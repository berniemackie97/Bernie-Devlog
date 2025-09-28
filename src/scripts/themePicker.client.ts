import type { ThemeOption } from "../utils/themes";

const STORAGE_KEY = "berniedev-theme";

export type FontPair = {
  display: string;
  body: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem">;

const activePickers = new Set<HTMLElement>();
const pickerControllers = new WeakMap<HTMLElement, AbortController>();

export const parseThemeOptions = (raw: string): ThemeOption[] => {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((candidate): candidate is ThemeOption => {
      return typeof candidate?.id === "string" && Array.isArray(candidate?.swatch);
    });
  } catch (error) {
    console.error("Unable to parse theme options", error, raw);
    return [];
  }
};

export const getInitialFonts = (html: HTMLElement): FontPair => {
  if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
    return {
      display: '"Playfair Display", serif',
      body: '"Newsreader", serif',
    };
  }

  const computed = window.getComputedStyle(html);
  const display = computed.getPropertyValue("--font-display").trim() || '"Playfair Display", serif';
  const body = computed.getPropertyValue("--font-body").trim() || '"Newsreader", serif';

  return { display, body };
};

export interface ApplyThemeArgs {
  id?: string | null;
  themes: ThemeOption[];
  defaultTheme: string;
  html: HTMLElement;
  storage?: StorageLike;
  persist?: boolean;
  fallbackFonts: FontPair;
}

export const applyTheme = ({
  id,
  themes,
  defaultTheme,
  html,
  storage,
  persist = true,
  fallbackFonts,
}: ApplyThemeArgs): string => {
  const resolveTheme = (themeId?: string | null) =>
    themes.find((theme) => theme.id === themeId) ?? themes.find((theme) => theme.id === defaultTheme);

  const theme = resolveTheme(id);
  const activeId = theme?.id ?? defaultTheme;

  html.setAttribute("data-theme", activeId);

  if (theme?.isDark) {
    html.style.colorScheme = "dark";
  } else {
    html.style.removeProperty("color-scheme");
  }

  const displayFont = theme?.fonts?.display ?? fallbackFonts.display;
  const bodyFont = theme?.fonts?.body ?? fallbackFonts.body;
  html.style.setProperty("--font-display", displayFont);
  html.style.setProperty("--font-body", bodyFont);

  if (persist && storage) {
    try {
      storage.setItem(STORAGE_KEY, activeId);
    } catch (error) {
      console.warn("Unable to persist theme", error);
    }
  }

  return activeId;
};

export const highlightActive = (buttons: HTMLElement[], activeId: string) => {
  buttons.forEach((button) => {
    const isActive = button.dataset.themeValue === activeId;
    button.classList.toggle("border-[color:var(--color-border)]", isActive);
    button.classList.toggle("bg-highlight/40", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
};

const getLocalStorage = (): StorageLike | undefined => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

const readStoredTheme = (storage?: StorageLike): string | null => {
  if (!storage) return null;
  try {
    return storage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const teardownThemePickers = () => {
  Array.from(activePickers).forEach((picker) => {
    const controller = pickerControllers.get(picker);
    controller?.abort();
    pickerControllers.delete(picker);
    activePickers.delete(picker);
    delete picker.dataset.initialized;
  });
};

export const setupThemePicker = (picker: HTMLElement) => {
  if (!(picker instanceof HTMLElement)) return;
  if (picker.dataset.initialized === "true") return;

  const controller = new AbortController();
  pickerControllers.set(picker, controller);
  activePickers.add(picker);
  picker.dataset.initialized = "true";

  const menu = picker.querySelector<HTMLElement>("[data-theme-menu]");
  const toggleBtn = picker.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  const themeButtons = Array.from(
    picker.querySelectorAll<HTMLButtonElement>("[data-theme-value]") ?? []
  );

  const defaultTheme = picker.dataset.defaultTheme ?? "country";
  const themes = parseThemeOptions(picker.dataset.themeOptions ?? "[]");
  const html = document.documentElement;
  const storage = getLocalStorage();
  const fallbackFonts = getInitialFonts(html);

  const applyAndHighlight = (themeId?: string | null, persist = true) => {
    const activeId = applyTheme({
      id: themeId,
      themes,
      defaultTheme,
      html,
      storage,
      persist,
      fallbackFonts,
    });
    highlightActive(themeButtons, activeId);
    return activeId;
  };

  const closeMenu = () => {
    toggleBtn?.setAttribute("aria-expanded", "false");
    menu?.classList.add("hidden");
  };

  const openMenu = () => {
    toggleBtn?.setAttribute("aria-expanded", "true");
    menu?.classList.remove("hidden");
  };

  const handleToggleClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!toggleBtn || !menu) return;
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (!menu) return;
    if (picker.contains(event.target as Node)) return;
    closeMenu();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      applyAndHighlight(event.newValue, false);
    }
  };

  const handleAfterSwap = () => {
    const stored = readStoredTheme(storage);
    applyAndHighlight(stored ?? defaultTheme, false);
    closeMenu();
  };

  const storedTheme = readStoredTheme(storage);
  applyAndHighlight(storedTheme ?? defaultTheme, false);

  toggleBtn?.addEventListener("click", handleToggleClick, { signal: controller.signal });

  document.addEventListener("click", handleDocumentClick, { signal: controller.signal });
  document.addEventListener("keydown", handleKeydown, { signal: controller.signal });
  document.addEventListener("astro:after-swap", handleAfterSwap, { signal: controller.signal });
  document.addEventListener("astro:page-load", handleAfterSwap, { signal: controller.signal });
  window.addEventListener("storage", handleStorage, { signal: controller.signal });

  themeButtons.forEach((btn) => {
    btn.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        applyAndHighlight(btn.dataset.themeValue ?? defaultTheme);
        closeMenu();
      },
      { signal: controller.signal }
    );
  });
};

export const bootstrapThemePickers = () => {
  const initAll = () => {
    document
      .querySelectorAll<HTMLElement>("[data-theme-picker]")
      .forEach((picker) => setupThemePicker(picker));
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        initAll();
      },
      { once: true }
    );
  } else {
    initAll();
  }

  document.addEventListener("astro:before-swap", () => teardownThemePickers());
  document.addEventListener("astro:after-swap", initAll);
  document.addEventListener("astro:page-load", initAll);
};

bootstrapThemePickers();
