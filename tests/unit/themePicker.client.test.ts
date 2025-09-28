import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

interface ThemeOptionLite {
  id: string;
  label: string;
  description: string;
  swatch: string[];
  isDark?: boolean;
  fonts?: {
    display: string;
    body: string;
  };
}

describe("theme picker client", () => {
  let module: typeof import("../../src/scripts/themePicker.client");

  const baseThemes: ThemeOptionLite[] = [
    {
      id: "country",
      label: "Country",
      description: "",
      swatch: ["#fff"],
      fonts: {
        display: '"Playfair Display", serif',
        body: '"Newsreader", serif',
      },
    },
    {
      id: "nightpress",
      label: "Night",
      description: "",
      swatch: ["#000"],
      isDark: true,
      fonts: {
        display: '"Cormorant Garamond", serif',
        body: '"IBM Plex Sans", sans-serif',
      },
    },
  ];

  beforeEach(async () => {
    vi.resetModules();
    document.body.innerHTML = "";
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.cssText = "";
    window.localStorage.clear();
    module = await import("../../src/scripts/themePicker.client");
  });

  afterEach(() => {
    module.teardownThemePickers();
    document.body.innerHTML = "";
    document.documentElement.removeAttribute("data-theme");
  });

  it("parses theme options safely", () => {
    const valid = JSON.stringify(baseThemes).replace(/</g, "\u003c");
    expect(module.parseThemeOptions(valid)).toHaveLength(2);
    expect(module.parseThemeOptions("{\"oops\":true}")).toEqual([]);
  });

  it("applies dark themes and persists fonts", () => {
    const html = document.documentElement;
    html.style.setProperty("--font-display", '"Playfair Display", serif');
    html.style.setProperty("--font-body", '"Newsreader", serif');

    const fallbackFonts = module.getInitialFonts(html);
    const active = module.applyTheme({
      id: "nightpress",
      themes: baseThemes,
      defaultTheme: "country",
      html,
      storage: window.localStorage,
      fallbackFonts,
    });

    expect(active).toBe("nightpress");
    expect(html.getAttribute("data-theme")).toBe("nightpress");
    expect(html.style.colorScheme).toBe("dark");
    expect(html.style.getPropertyValue("--font-display")).toContain("Cormorant");
    expect(window.localStorage.getItem("berniedev-theme")).toBe("nightpress");

    const reverted = module.applyTheme({
      id: "country",
      themes: baseThemes,
      defaultTheme: "country",
      html,
      storage: window.localStorage,
      fallbackFonts,
    });

    expect(reverted).toBe("country");
    expect(html.style.colorScheme).toBe("");
    expect(html.style.getPropertyValue("--font-display")).toContain("Playfair");
  });

  it("sets up interactive pickers with persisted selection", () => {
    const serialized = JSON.stringify(baseThemes).replace(/</g, "\u003c");

    document.body.innerHTML = `
      <div data-theme-picker data-default-theme="country" data-theme-options='${serialized}'>
        <button data-theme-toggle type="button" aria-expanded="false"></button>
        <div data-theme-menu class="hidden">
          <button data-theme-value="country" aria-checked="true" class="border-transparent"></button>
          <button data-theme-value="nightpress" aria-checked="false" class="border-transparent"></button>
        </div>
      </div>
    `;

    const picker = document.querySelector("[data-theme-picker]") as HTMLElement;
    module.setupThemePicker(picker);

    const toggle = picker.querySelector("[data-theme-toggle]") as HTMLButtonElement;
    const menu = picker.querySelector("[data-theme-menu]") as HTMLElement;
    const nightpressBtn = picker.querySelector("[data-theme-value='nightpress']") as HTMLButtonElement;

    toggle.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(menu.classList.contains("hidden")).toBe(false);

    nightpressBtn.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));

    expect(document.documentElement.getAttribute("data-theme")).toBe("nightpress");
    expect(window.localStorage.getItem("berniedev-theme")).toBe("nightpress");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(menu.classList.contains("hidden")).toBe(true);
    expect(nightpressBtn.getAttribute("aria-checked")).toBe("true");
  });
});
