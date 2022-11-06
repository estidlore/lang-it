import type { Entry, Language } from "types/language";
declare class LangIt<K extends string, E extends Entry> {
    private lang;
    private readonly langs;
    constructor(langs: Record<K, Language<E>>, defaultLang: K);
    setLang: (lang: K) => void;
    t: () => E;
}
export { LangIt };
