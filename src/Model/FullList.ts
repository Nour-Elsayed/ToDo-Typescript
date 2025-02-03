import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  addItem(itemObj: ListItem): void;
  save(): void;
  load(): void;
  removeItem(id: string): void;
  clearList(): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  // we put private constructor as we use this class for one time as we have one list in the app and we will have a single instance
  private constructor(private _list: ListItem[] = []) {}
  get list(): ListItem[] {
    return this._list;
  }
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clearList(): void {
    this._list = [];
    // we add the save method as make sure it overrides the local storage when list is empty
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    // save method added to save the list once the obj is added to the list array
    this.save();
  }

  removeItem(id: string): void {
    // item id !== id to keep everything that is not = to the id
    this._list = this._list.filter((Item) => Item.id !== id);
    this.save();
  }

  load(): void {
    // we retrieve the item from the local storage
    const storedList: string | null = localStorage.getItem("myList");
    // we are expecting a string as it is stringified but if it happened to be something else, just return
    if (typeof storedList !== "string") return;
    // we will parse the items with the _ not the ones without the _ in the item interface so we need to put them manually
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      // he we add every new list item and we pass in everything that the list items list receives
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }
}
