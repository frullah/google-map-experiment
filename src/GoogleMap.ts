import { Controls } from './Controls'
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
  const controls = new Controls()
  const markers: google.maps.Marker[] = []
  const state = {
    editable: true
  }

  const map = createMap()
  const polygon = new google.maps.Polygon({
    ...defaultPolygonOptions,
    paths: triangleCoords(),
    map
  })
  const toggleEditButton = createButton({ text: "Toggle Edit" })
  const infowindow = new google.maps.InfoWindow({
    content: controls.divWrapper
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

  controls.divCancel.addEventListener("click", () =>
  {
    infowindow.close()
  })

  controls.divDelete.addEventListener("click", () =>
  {
    const marker = infowindow.get("marker") as google.maps.Marker
    const pathIndex = infowindow.get("index")
    polygon.getPath().removeAt(pathIndex)
    marker.setMap(null)
    infowindow.close()
  })

  toggleEditButton.addEventListener("click", async () =>
  {
    if (state.editable) {
      for (const marker of markers) {
        marker.setMap(null)
      }
      state.editable = false
    } else {
      for (const marker of markers) {
        marker.setMap(map)
      }
      state.editable = true
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
