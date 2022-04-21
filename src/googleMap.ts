import { VertexControl } from './VertexControl'
import createButton from './createButton'

const defaultPolygonOptions: google.maps.PolygonOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.9,
  strokeWeight: 1,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
}

// Google Event reference: https://developers.google.com/maps/documentation/javascript/events
async function initializeMap()
{
  const state = {
    editable: true
  }
  const vertexControl = new VertexControl()
  const toggleEditButton = createButton({ text: "Toggle Edit" })
  const markers: google.maps.Marker[] = []

  const map = createMap()
  const polygon = new google.maps.Polygon({
    ...defaultPolygonOptions,
    paths: triangleCoords(),
    map
  })
  const infowindow = new google.maps.InfoWindow({
    content: vertexControl.wrapper
  })

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(toggleEditButton)

  polygon.getPath().forEach((path: google.maps.LatLng, i) =>
  {
    const marker = new google.maps.Marker({
      position: path,
      map,
      draggable: true
    })

    marker.addListener("drag", ({ latLng }: google.maps.PolyMouseEvent) =>
    {
      polygon.getPath().setAt(i, new google.maps.LatLng(latLng!.lat(), latLng!.lng()))
    })

    marker.addListener("click", () =>
    {
      infowindow.set("marker", marker)
      infowindow.set("path", path)
      infowindow.set("index", i)

      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      })
    })

    markers.push(marker)
  })

  vertexControl.cancelButton.addEventListener("click", () =>
  {
    infowindow.close()
  })

  vertexControl.deleteButton.addEventListener("click", () =>
  {
    const marker = infowindow.get("marker") as google.maps.Marker
    const pathIndex = infowindow.get("index")
    polygon.getPath().removeAt(pathIndex)
    marker.setMap(null)
    infowindow.close()
  })

  toggleEditButton.addEventListener("click", async () =>
  {
    const enableEditable = !state.editable
    const newMap = enableEditable ? map : null

    state.editable = enableEditable
    for (const marker of markers) {
      marker.setMap(newMap)
    }    
  })
}

function createMap()
{
  return new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 5,
    center: { lat: 24.886, lng: -70.268 },
    mapTypeId: 'terrain',
  })
}


function triangleCoords()
{
  return [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ]
}

export { initializeMap }
