import {Instance, ModelActions, types} from 'mobx-state-tree';
import {ListItem as ListItemI, ListStoreView} from '../interfaces'

const listFake: ListItemI[] = [
  {id: 1, title: 'Item1', isMarked: false},
  {id: 2, title: 'test', isMarked: true},
  {id: 3, title: 'test2', isMarked: false},
  {id: 4, title: 'Item4', isMarked: true},
  {id: 5, title: 'Item5', isMarked: false}
]

const ListItem = types.model('ListItem', {
  id: types.identifierNumber,
  title: types.string,
  isMarked: types.boolean
});

const ListStore = types.model('ListStore', {
  list: types.optional(types.array(ListItem), listFake),
  searchResult: types.optional(types.array(types.reference(ListItem)), []),
  isKeyword: types.optional(types.boolean, false),
}).views((self): ListStoreView => ({
  get getList(): ListItemI[] {
    if (self.searchResult.length > 0 || self.isKeyword) {
      return self.searchResult;
    }

    return self.list;
  },
  get listCount(): number {
    return self.list.length
  },
  listItem(id: number): ListItemI {
    const item: ListItemI | undefined = self.list.find((item: ListItemI): boolean => item.id === id);

    if (!item) {
      throw `item with id=${id} not found`;
    }

    return item;
  }
})).actions(
  (self: Instance<typeof ListStore>): ModelActions => ({
    addItem(item: ListItemI): void {
      const el = self.list.find((listItem: ListItemI): boolean => listItem.title === item.title);

      if (!el) {
        self.list.push(item);
      }
    },
    setChecked(id: number): void {
      const item: ListItemI = self.listItem(id);

      item.isMarked = !item.isMarked;
    },
    filter(keyword: string): void {
      const value = keyword.trim();

      self.searchResult = self.list.filter((item: ListItemI) =>
        item.title.toUpperCase().includes(value.toUpperCase()));

      if (value !== '') {
        self.isKeyword = true;
      }
    }
  })
);

export default ListStore;