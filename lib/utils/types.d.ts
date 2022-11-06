declare type DeepPartial<T> = T extends object ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : T;
interface DeepRecord<T = string> {
    [k: string]: T | DeepRecord<T>;
}
export type { DeepPartial, DeepRecord };
