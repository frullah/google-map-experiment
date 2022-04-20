// TODO: add delete element at the top left

const defaultPolygonOptions: google.maps.PolygonOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  editable: true,
};

async function initializeMap() {
  const { PolygonDeleteMenu } = await import('./PolygonDeleteMenu');

  const map = createMap();
  const polygon = addTrianglePolygon({ map });
  const { deleteButton, toggleDraggableButton } = createControls(map);

  const deleteMenu = new PolygonDeleteMenu();

  // Google Event reference: https://developers.google.com/maps/documentation/javascript/events

  google.maps.event.addListener(polygon, 'contextmenu', (e: any) => {
    if (e.vertex == undefined) return;

    // polygon.getPath().setAt(e.vertex, {

    // })
    deleteMenu.open(map, polygon.getPath(), e.vertex);
  });
}

function createMap() {
  return new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 5,
    center: { lat: 24.886, lng: -70.268 },
    mapTypeId: 'terrain',
  });
}

function createControls(map: google.maps.Map) {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'p-2 bg-white';
  deleteButton.textContent = 'Delete';

  const toggleDraggableButton = document.createElement('button');
  toggleDraggableButton.className = 'p-2 bg-white';
  toggleDraggableButton.textContent = 'Toggle DOM Attachment';

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
    toggleDraggableButton
  );
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(deleteButton);

  return {
    deleteButton,
    toggleDraggableButton,
  };
}

function addTrianglePolygon({ map }: { map: google.maps.Map }) {
  const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ];

  const polygon = new google.maps.Polygon({
    ...defaultPolygonOptions,
    paths,
    map,
  });

  return polygon;
}

export { initializeMap };
