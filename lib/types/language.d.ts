import type { DeepRecord } from "utils/types";
declare type Entry = DeepRecord<string | undefined>;
interface Language<T extends Entry = Entry> {
    entries: T;
    name: string;
}
export type { Entry, Language };
