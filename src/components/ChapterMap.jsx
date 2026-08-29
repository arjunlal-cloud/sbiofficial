import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle } from 'react-leaflet'
import L from 'leaflet'
import chapters from '../data/chapters.json'

/* Custom SVG pin in brand gold */
const pin = L.divIcon({
  className: '',
  html: `<svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 1C8.6 1 1 8.6 1 18c0 12.75 17 27 17 27s17-14.25 17-27C35 8.6 27.4 1 18 1z"
      fill="#132040" stroke="#c09b2d" stroke-width="2"/>
    <circle cx="18" cy="18" r="6.5" fill="#c09b2d"/>
  </svg>`,
  iconSize: [36, 46],
  iconAnchor: [18, 45],
  popupAnchor: [0, -40],
})

/* Fit view to wherever chapters actually are */
const bounds = L.latLngBounds(chapters.map((c) => [c.location.lat, c.location.lng]))

function parseRadius(radiusStr) {
  // Try to parse "5 miles" -> 8047 meters
  const match = radiusStr.match(/([\d.]+)\s*miles/i)
  if (match && match[1]) {
    return parseFloat(match[1]) * 1609.34
  }
  return 8047 // Default 5 miles
}

export default function ChapterMap() {
  return (
    <MapContainer
      {...(chapters.length === 1
        ? { center: [chapters[0].location.lat, chapters[0].location.lng], zoom: 11 }
        : { bounds, boundsOptions: { padding: [80, 80], maxZoom: 8 } })}
      minZoom={2}
      scrollWheelZoom={true}
      className="z-0 h-full min-h-96 w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {chapters.map((c) => (
        <div key={c.id}>
          <Circle 
            center={[c.location.lat, c.location.lng]}
            radius={parseRadius(c.radius)}
            pathOptions={{ 
              color: '#c09b2d', 
              fillColor: '#c09b2d', 
              fillOpacity: 0.1, 
              weight: 1,
              dashArray: '4 4'
            }}
          />
          <Marker position={[c.location.lat, c.location.lng]} icon={pin}>
            <Tooltip direction="top" offset={[0, -40]} className="!bg-canvas-elevated !text-ink !border-white/10 !font-display">{c.name}</Tooltip>
            <Popup>
              <div className="min-w-52 font-body">
                <p className="font-display text-base font-medium tracking-tight text-ink">
                  {c.name} <span className="font-mono text-xs text-muted">({c.abbreviation})</span>
                </p>
                <p className="mt-2 text-[13px] text-ink-soft leading-relaxed">{c.description}</p>
                {c.leader && (
                  <>
                    <p className="mt-3 text-[10px] font-mono tracking-widest text-gold-500 uppercase">Chapter Lead</p>
                    <p className="mt-1 text-sm text-ink-soft">{c.leader}</p>
                  </>
                )}
                <p className="mt-3 text-[10px] font-mono tracking-widest text-gold-500 uppercase">Services</p>
                <p className="mt-1 text-sm text-ink-soft">{c.services.join(' · ')}</p>
                {c.contact ? (
                  <>
                    <p className="mt-3 text-[10px] font-mono tracking-widest text-gold-500 uppercase">Contact</p>
                    <a href={`mailto:${c.contact}`} className="mt-1 inline-block text-sm text-ink hover:text-gold-400 underline decoration-white/20 hover:decoration-gold-400 transition-colors">
                      {c.contact}
                    </a>
                  </>
                ) : (
                  <p className="mt-3 text-xs italic text-muted">Chapter contact details will be added as the local team comes online.</p>
                )}
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  )
}
