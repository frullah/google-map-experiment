const defaultPolygonOptions: google.maps.PolygonOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  editable: true,
};

async function initializeMap() {
  const { DeleteMenu } = await import('./DeleteMenu');

  const map = createMap();
  const polygon = createAndAddTrianglePolygon({ map });

  const deleteMenu = new DeleteMenu();

  // Google Event reference: https://developers.google.com/maps/documentation/javascript/events

  google.maps.event.addListener(polygon, 'click', (e: any) => {
    // Check if click was on a vertex control point
    if (e.vertex == undefined) {
      return;
    }

    // polygon.getPath()
    // menu.removeVertex();
    deleteMenu.open(map, polygon.getPath(), e.vertex);
  });

  // doesn't work
  google.maps.event.addListener(polygon, 'contextmenu', (e: any) => {
    // Check if click was on a vertex control point
    if (e.vertex == undefined) {
      return;
    }

    deleteMenu.open(map, polygon.getPath(), e.vertex);
  });
  // polyline is not a polygon
  // TODO: remove one of its path
}

function createMap() {
  return new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 5,
    center: { lat: 24.886, lng: -70.268 },
    mapTypeId: 'terrain',
  });
}

function createAndAddTrianglePolygon({ map }: { map: google.maps.Map }) {
  const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 26.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 },
  ];

  const polygon = new google.maps.Polygon({
    ...defaultPolygonOptions,
    paths,
    map,
  });

  return polygon;
}

export { initializeMap };
