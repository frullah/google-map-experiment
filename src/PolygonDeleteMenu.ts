export class PolygonDeleteMenu extends google.maps.OverlayView {
  private divWrapper: HTMLDivElement;
  private divDelete: HTMLDivElement;
  private divCancel: HTMLDivElement;
  private divListener?: google.maps.MapsEventListener;

  constructor() {
    super();
    this.divDelete = this.createDivDelete();
    this.divCancel = this.createDivCancel();

    this.divWrapper = document.createElement('div');
    this.divWrapper.className = 'bg-white text-black max-w-100';
    this.divWrapper.append(this.divDelete, this.divCancel);
  }

  private createDivDelete() {
    const divDelete = document.createElement('div');
    divDelete.className = 'p-2 hover:bg-blue-100';
    divDelete.innerHTML = 'Delete';

    divDelete.addEventListener('click', () => {
      this.removeVertex();
    });

    return divDelete;
  }

  private createDivCancel() {
    const divCancel = document.createElement('div');
    divCancel.className = 'p-2 hover:bg-blue-100';
    divCancel.innerHTML = 'Cancel';

    divCancel.addEventListener('click', () => {
      this.close();
    });

    return divCancel;
  }

  onAdd() {
    const deleteMenu = this;
    const map = this.getMap() as google.maps.Map;

    this.getPanes()!.floatPane.appendChild(this.divWrapper);

    // mousedown anywhere on the map except on the menu div will close the
    // menu.
    // DOESN'T work
    this.divListener = google.maps.event.addListener(
      map.getDiv(),
      'mousedown',
      (e: Event) => {
        alert(123);
        if (e.target != deleteMenu.divWrapper) {
          deleteMenu.close();
        }
      }
    );
  }

  onRemove() {
    if (this.divListener) {
      google.maps.event.removeListener(this.divListener);
    }

    (this.divWrapper.parentNode as HTMLElement).removeChild(this.divWrapper);

    // clean up
    this.set('position', null);
    this.set('path', null);
    this.set('vertex', null);
  }

  close() {
    this.setMap(null);
  }

  draw() {
    const position = this.get('position');
    const projection = this.getProjection(); // TODO: what is this?

    if (!position || !projection) {
      return;
    }

    // alert(`${position.lat()} ${position.lng()}`)

    // this.divElement.style.top = position.lat() + 'px';
    // this.divElement.style.left = position.lng() + 'px';

    const point = projection.fromLatLngToDivPixel(position)!;

    // TODO: how to render divWrapper near to the vertex
    this.divCancel.textContent = `${point.x} ${point.y}`;
    this.divWrapper.style.top = point.y + 'px';
    this.divWrapper.style.left = point.x + 'px';
  }

  open(
    map: google.maps.Map,
    path: google.maps.MVCArray<google.maps.LatLng>,
    vertex: number
  ) {
    this.set('position', path.getAt(vertex));
    this.set('path', path);
    this.set('vertex', vertex);
    this.setMap(map);
    this.draw();
  }

  removeVertex() {
    const path = this.get('path');
    const vertex = this.get('vertex');

    if (path && vertex !== undefined) {
      path.removeAt(vertex);
    }

    this.close();
  }
}
