import createButton from "./createButton";

export class Controls
{
  wrapper: HTMLDivElement;
  deleteButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;

  constructor()
  {
    this.deleteButton = createButton({ text: "Delete" });
    this.cancelButton = createButton({ text: "Cancel" });

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'max-w-100 bg-white text-black';
    this.wrapper.append(this.deleteButton, this.cancelButton);
  }
}