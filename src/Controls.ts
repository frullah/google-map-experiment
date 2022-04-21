export class Controls
{
  divWrapper: HTMLDivElement;
  divDelete: HTMLDivElement;
  divCancel: HTMLDivElement;

  constructor()
  {
    this.divDelete = this.createDivDelete();
    this.divCancel = this.createDivCancel();

    this.divWrapper = document.createElement('div');
    this.divWrapper.className = 'bg-white text-black max-w-100';
    this.divWrapper.append(this.divDelete, this.divCancel);
  }

  private createDivDelete()
  {
    const divDelete = document.createElement('div');
    divDelete.className = 'p-2 hover:bg-blue-100';
    divDelete.innerHTML = 'Delete';

    return divDelete;
  }

  private createDivCancel()
  {
    const divCancel = document.createElement('div');
    divCancel.className = 'p-2 hover:bg-blue-100';
    divCancel.innerHTML = 'Cancel';

    return divCancel;
  }
}