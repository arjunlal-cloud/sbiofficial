import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import chapters from '../data/chapters.json'

/* Custom SVG pin in brand green — also avoids Leaflet's broken default
   icon paths under bundlers. */
const pin = L.divIcon({
  className: '',
  html: `<svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 1C8.6 1 1 8.6 1 18c0 12.75 17 27 17 27s17-14.25 17-27C35 8.6 27.4 1 18 1z"
      fill="#043f2e" stroke="#c8f169" stroke-width="2"/>
    <circle cx="18" cy="18" r="6.5" fill="#c8f169"/>
  </svg>`,
  iconSize: [36, 46],
  iconAnchor: [18, 45],
  popupAnchor: [0, -40],
})

/* Fit view to wherever chapters actually are — keeps pins on-screen at any
   viewport width, and adapts automatically as chapters are added. */
const bounds = L.latLngBounds(chapters.map((c) => [c.location.lat, c.location.lng]))

export default function ChapterMap() {
  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [80, 80], maxZoom: 6 }}
      minZoom={2}
      scrollWheelZoom={true}
      className="z-0 h-[45vh] min-h-80 w-full rounded-2xl border border-forest-100 shadow-[0_12px_32px_-12px_rgba(4,63,46,0.25)]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {chapters.map((c) => (
        <Marker key={c.id} position={[c.location.lat, c.location.lng]} icon={pin}>
          <Tooltip direction="top" offset={[0, -40]}>{c.name}</Tooltip>
          <Popup>
            <div className="min-w-52 font-body">
              <p className="font-display text-base font-semibold text-forest-900">
                {c.name} <span className="font-mono text-xs text-muted">({c.abbreviation})</span>
              </p>
              <p className="mt-1 text-sm text-ink-soft">{c.description}</p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-forest-700 uppercase">Services</p>
              <p className="text-sm text-ink-soft">{c.services.join(' · ')}</p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-forest-700 uppercase">Contact</p>
              <a href={`mailto:${c.contact}`} className="text-sm text-accent-blue underline">
                {c.contact}
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
