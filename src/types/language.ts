import type { DeepRecord } from "utils/types";

type LangEntry = DeepRecord<string | undefined>;

interface LangData {
  readonly name: string;
}

interface Lang<E extends LangEntry = LangEntry> {
  readonly data: LangData;
  entries: E;
}

export type { Lang, LangData, LangEntry };
