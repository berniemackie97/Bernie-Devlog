import { describe, expect, it } from "vitest";
import { THEMES, DEFAULT_THEME } from "../../src/utils/themes";

describe("theme registry", () => {
  it("includes the original retro palette", () => {
    const retro = THEMES.find((theme) => theme.id === "retro");
    expect(retro).toBeTruthy();
    expect(retro?.fonts?.display).toContain("Basteleur");
    expect(retro?.fonts?.body).toContain("Young Serif");
  });

  it("ensures every theme exposes fonts", () => {
    THEMES.forEach((theme) => {
      expect(theme.fonts).toBeTruthy();
      expect(theme.fonts?.display?.length).toBeGreaterThan(0);
      expect(theme.fonts?.body?.length).toBeGreaterThan(0);
    });
  });

  it("validates the default theme", () => {
    expect(THEMES.map((theme) => theme.id)).toContain(DEFAULT_THEME);
  });

  it("keeps the original newspaper font pairing on the default theme", () => {
    const country = THEMES.find((theme) => theme.id === DEFAULT_THEME);
    expect(country?.fonts?.display).toContain("Playfair Display");
    expect(country?.fonts?.body).toContain("Newsreader");
  });
});
