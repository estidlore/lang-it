import type { LangData } from "types/language";

import { LangIt } from "./LangIt";
import { LangState } from "./LangState";

type LangKey = "ENG" | "SPA";

const LANGS_DATA: Record<LangKey, LangData> = {
  ENG: {
    name: "English"
  },
  SPA: {
    name: "Español"
  }
};

const LANG1: LangKey = "ENG";
const LANG2: Exclude<LangKey, typeof LANG1> = "SPA";

const ENG = {
  scope1: {
    word1: "Scope1 Word1",
    word2: "Scope1 Word2"
  },
  word1: "Word1",
  word2: "Word2"
};

type Lang = typeof ENG;

const SPA: Lang = {
  scope1: {
    word1: "Alcance1 Palabra1",
    word2: "Alcance1 Palabra2"
  },
  word1: "Palabra1",
  word2: "Palabra2"
};

const ENTRIES = { ENG, SPA };

const ENG2 = {
  scope2: {
    word1: "Scope2 Word1",
    word2: "Scope2 Word2"
  }
};

const SPA2 = {
  scope2: {
    word1: "Alcance2 Palabra1",
    word2: "Alcance2 Palabra2"
  }
};

const ENTRIES2 = { ENG: ENG2, SPA: SPA2 };

describe("LangState tests", (): void => {
  test("gets/sets/resets language", (): void => {
    const lngState = new LangState<LangKey>(LANGS_DATA, LANG1);

    expect(lngState.get()).toBe(LANG1);
    lngState.set(LANG2);
    expect(lngState.get()).toBe(LANG2);
    lngState.reset();
    expect(lngState.get()).toBe(LANG1);
  });

  test("gets language data", (): void => {
    const lngState = new LangState<LangKey>(LANGS_DATA, LANG1);

    expect(lngState.getData()).toBe(LANGS_DATA[LANG1]);
    expect(lngState.getData(LANG1)).toBe(LANGS_DATA[LANG1]);
    expect(lngState.getData(LANG2)).toBe(LANGS_DATA[LANG2]);
    lngState.set(LANG2);
    expect(lngState.getData()).toBe(LANGS_DATA[LANG2]);
    expect(lngState.getData(LANG1)).toBe(LANGS_DATA[LANG1]);
    expect(lngState.getData(LANG2)).toBe(LANGS_DATA[LANG2]);
  });
});

describe("LangIt tests", (): void => {
  test("translates", (): void => {
    const lngState = new LangState<LangKey>(LANGS_DATA, LANG1);
    const lng = new LangIt(lngState, ENTRIES);
    const { t } = lng;

    expect(t().word1).toBe(ENTRIES[LANG1].word1);
    expect(t().word2).toBe(ENTRIES[LANG1].word2);
    lng.getState().set(LANG2);
    expect(t().word1).toBe(ENTRIES[LANG2].word1);
    expect(t().word2).toBe(ENTRIES[LANG2].word2);

    lng.getState().set(LANG1);
    expect(t().scope1.word1).toBe(ENTRIES[LANG1].scope1.word1);
    expect(t().scope1.word2).toBe(ENTRIES[LANG1].scope1.word2);
    lng.getState().set(LANG2);
    expect(t().scope1.word1).toBe(ENTRIES[LANG2].scope1.word1);
    expect(t().scope1.word2).toBe(ENTRIES[LANG2].scope1.word2);
  });

  test("shares state", (): void => {
    const lngState = new LangState<LangKey>(LANGS_DATA, LANG1);
    const lng1 = new LangIt(lngState, ENTRIES);
    const lng2 = new LangIt(lngState, ENTRIES2);

    expect(lng1.getState().get()).toBe(LANG1);
    expect(lng2.getState().get()).toBe(LANG1);

    lng1.getState().set(LANG2);
    expect(lng1.getState().get()).toBe(LANG2);
    expect(lng2.getState().get()).toBe(LANG2);
    lng1.getState().reset();
    expect(lng1.getState().get()).toBe(LANG1);
    expect(lng2.getState().get()).toBe(LANG1);

    lng2.getState().set(LANG2);
    expect(lng1.getState().get()).toBe(LANG2);
    expect(lng2.getState().get()).toBe(LANG2);
    lng2.getState().reset();
    expect(lng1.getState().get()).toBe(LANG1);
    expect(lng2.getState().get()).toBe(LANG1);
  });
});
