import type { LangData } from "types/language";

class LangState<K extends string = string> {
  private readonly data: Record<K, LangData>;
  private readonly defaultLang: K;
  private lang: K;

  public constructor(langsData: Record<K, LangData>, lang: K) {
    this.data = langsData;
    this.defaultLang = lang;

    this.lang = this.defaultLang;
  }

  public get = (): K => this.lang;

  public getData = (lang?: K): LangData => this.data[lang ?? this.lang];

  public reset = (): void => {
    this.lang = this.defaultLang;
  };

  public set = (lang: K): void => {
    this.lang = lang;
  };
}

export { LangState };
