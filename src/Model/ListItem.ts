// interface to be exported to the full list file

export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

// list item class (array object) to be exported to the full list file

export default class ListItem implements Item {
  // as the items will be called from outside the class, we need getters and setters

  public get item(): string {
    return this._item;
  }
  public set item(item: string) {
    this._item = item;
  }
  public get id(): string {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }
  public get checked(): boolean {
    return this._checked;
  }
  public set checked(checked: boolean) {
    this._checked = checked;
  }
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}
}
