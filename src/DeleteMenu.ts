/**
 * A menu that lets a user delete a selected vertex of a path.
 */
export class DeleteMenu extends google.maps.OverlayView {
  private divElement: HTMLDivElement;
  private divListener?: google.maps.MapsEventListener;

  constructor() {
    super();
    this.divElement = document.createElement('div');
    // this.divElement.className = 'bg-white text-white z-100 p-4';
    this.divElement.classList.add('bg-white');
    this.divElement.innerHTML = 'Delete';
    this.divElement.addEventListener('click', () => {
      this.removeVertex();
    });
  }

  onAdd() {
    const deleteMenu = this;
    const map = this.getMap() as google.maps.Map;

    this.getPanes()!.floatPane.appendChild(this.divElement);

    // mousedown anywhere on the map except on the menu div will close the
    // menu.
    this.divListener = google.maps.event.addListener(
      map.getDiv(),
      'mousedown',
      (e: Event) => {
        if (e.target != deleteMenu.divElement) {
          deleteMenu.close();
        }
      },
      true
    );
  }

  onRemove() {
    if (this.divListener) {
      google.maps.event.removeListener(this.divListener);
    }

    (this.divElement.parentNode as HTMLElement).removeChild(this.divElement);

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
    const projection = this.getProjection();

    if (!position || !projection) {
      return;
    }

    const point = projection.fromLatLngToDivPixel(position)!;

    this.divElement.style.top = point.y + 'px';
    this.divElement.style.left = point.x + 'px';
  }

  /**
   * Opens the menu at a vertex of a given path.
   */
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

  /**
   * Deletes the vertex from the path.
   */
  removeVertex() {
    const path = this.get('path');
    const vertex = this.get('vertex');

    if (!path || vertex == undefined) {
      this.close();
      return;
    }

    path.removeAt(vertex);
    this.close();
  }
}
