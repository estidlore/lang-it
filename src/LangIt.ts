import type { LangEntry } from "types/language";

import type { LangState } from "./LangState";

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

export { LangIt };
