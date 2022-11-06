import type { Entry, Language } from "types/language";

class LangIt<K extends string, E extends Entry> {
  private lang: K;
  private readonly langs: Record<K, Language<E>>;

  public constructor(langs: Record<K, Language<E>>, defaultLang: K) {
    this.lang = defaultLang;
    this.langs = langs;
  }

  public setLang = (lang: K): void => {
    this.lang = lang;
  };

  public t = (): E => this.langs[this.lang].entries;
}

export { LangIt };
