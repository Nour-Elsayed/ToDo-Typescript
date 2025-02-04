import FullList from "../Model/FullList";

interface DOMLIST {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplates implements DOMLIST {
  // we added the ul here to let the typescript pass it and not show error
  ul: HTMLUListElement;
  // this the singleton instance for the constructor
  static instance: ListTemplates = new ListTemplates();
  // this is a singleton so we make constructor private and have one instance
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  // clear the whole ul
  clear(): void {
    this.ul.innerHTML = "";
  }

  //render the ul
  render(fullList: FullList): void {
    // we clear the list so nothing is duplicated
    this.clear();

    // rendering the list to the HTML file
    fullList.list.forEach((Item) => {
      // create li
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";
      this.ul.append(li);
      // create input
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "checkbox";
      input.id = Item.id;
      li.append(input);

      //   li.innerHTML = `<input type="checkbox" id=${Item.id}>
      //                 <label for="1">eat</label>
      //                 <button class="button">X</button>`;

      input.addEventListener("change", () => {
        Item.checked = !Item.checked;
        fullList.save();
      });

      // create label
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = Item.id;
      label.textContent = Item.item;
      li.append(label);

      // create button
      const btn = document.createElement("button") as HTMLButtonElement;
      btn.className = "button";
      btn.textContent = "X";
      li.append(btn);

      btn.addEventListener("click", () => {
        fullList.removeItem(Item.id);
        this.render(fullList);
      });
    });
  }
}
