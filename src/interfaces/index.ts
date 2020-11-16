export interface ListItem {
  readonly id: number;
  readonly title: string;
  isMarked: boolean;
}

export interface ListStoreView {
  readonly getList: ListItem[];
  readonly listCount: number;
  readonly listItem: (id: number) => ListItem;
}

export interface ListStore extends ListStoreView{
  readonly addItem: (item: ListItem) => void;
  readonly setChecked: (id: number) => void;
  readonly filter: (keyword: string) => void;
}

export interface Event {
  readonly target: Value;
}

interface Value {
  readonly value: string;
}