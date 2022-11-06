import { LangIt } from ".";

const ENG = {
  entries: {
    scope1: {
      word1: "Scope1 Word1",
      word2: "Scope1 Word2"
    },
    word1: "Word1",
    word2: "Word2"
  },
  name: "English"
};

type Lang = typeof ENG;

const SPA: Lang = {
  entries: {
    scope1: {
      word1: "Alcance1 Palabra1",
      word2: "Alcance1 Palabra2"
    },
    word1: "Palabra1",
    word2: "Palabra2"
  },
  name: "Español"
};

const LANGS = {
  ENG,
  SPA
};

type LangKey = keyof typeof LANGS;

describe("translation tests", (): void => {
  test("changes language", (): void => {
    const lng = new LangIt<LangKey, Lang["entries"]>(LANGS, "ENG");

    const { setLang, t } = lng;

    expect(t().word1).toBe(ENG.entries.word1);
    expect(t().word2).toBe(ENG.entries.word2);
    setLang("SPA");
    expect(t().word1).toBe(SPA.entries.word1);
    expect(t().word2).toBe(SPA.entries.word2);

    setLang("ENG");
    expect(t().scope1.word1).toBe(ENG.entries.scope1.word1);
    expect(t().scope1.word2).toBe(ENG.entries.scope1.word2);
    setLang("SPA");
    expect(t().scope1.word1).toBe(SPA.entries.scope1.word1);
    expect(t().scope1.word2).toBe(SPA.entries.scope1.word2);
  });
});
