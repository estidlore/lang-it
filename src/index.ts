import type { LangData, LangEntry } from "types/language";

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

class LangIt<K extends string = string, E extends LangEntry = LangEntry> {
  private readonly state: LangState<K>;
  private readonly entries: Record<K, E>;

  public constructor(state: LangState<K>, entries: Record<K, E>) {
    this.state = state;
    this.entries = entries;
  }

  public getState = (): LangState<K> => this.state;

  public t = (): E => this.entries[this.state.get()];
}

export { LangIt, LangState };
