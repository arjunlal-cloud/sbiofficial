import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import chapters from '../data/chapters.json'

/**
 * Chapter territory map.
 *
 * It used to fit bounds across every chapter — East Brunswick NJ and
 * Guadalajara are ~2,400 miles apart — at maxZoom 8, so the default view was
 * continental and each 5-mile radius rendered sub-pixel. The legend promised
 * "claimed territory" and the map delivered two invisible dots.
 *
 * Now it focuses one chapter at a zoom where the radius is actually a visible
 * circle, with a switcher for the others.
 */

const pin = L.divIcon({
  className: '',
  html: `<svg width="34" height="44" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 1C8.6 1 1 8.6 1 18c0 12.75 17 27 17 27s17-14.25 17-27C35 8.6 27.4 1 18 1z"
      fill="#0b1f3a" stroke="#2869a8" stroke-width="2"/>
    <circle cx="18" cy="18" r="6.5" fill="#2869a8"/>
  </svg>`,
  iconSize: [34, 44],
  iconAnchor: [17, 43],
  popupAnchor: [0, -38],
})

function parseRadiusMeters(radius) {
  const match = String(radius).match(/([\d.]+)\s*miles?/i)
  return (match ? parseFloat(match[1]) : 5) * 1609.34
}

/** Moves the view when the selected chapter changes. */
function FocusChapter({ chapter }) {
  const map = useMap()
  map.setView([chapter.location.lat, chapter.location.lng], 11, { animate: true })
  return null
}

export default function ChapterMap() {
  const [activeId, setActiveId] = useState(chapters[0]?.id)
  const active = chapters.find((c) => c.id === activeId) ?? chapters[0]
  if (!active) return null

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[active.location.lat, active.location.lng]}
        zoom={11}
        minZoom={3}
        scrollWheelZoom={false}
        className="z-0 h-full w-full"
      >
        {/* Keyless OSM tiles; index.css tints them into the brand navy. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <FocusChapter chapter={active} />

        <Circle
          center={[active.location.lat, active.location.lng]}
          radius={parseRadiusMeters(active.radius)}
          pathOptions={{
            color: '#2869a8',
            fillColor: '#2869a8',
            fillOpacity: 0.14,
            weight: 1.5,
          }}
        />
        <Marker position={[active.location.lat, active.location.lng]} icon={pin}>
          <Popup>
            <div className="min-w-48 font-body">
              <p className="font-display text-body font-medium tracking-display text-ink">
                {active.name}
              </p>
              <p className="mt-1 text-body-sm text-ink-soft">{active.region}</p>
              <p className="mt-3 font-mono text-label uppercase tracking-label text-gold-400">
                {active.radius} service area · active
              </p>
              <p className="mt-2 text-body-sm leading-relaxed text-ink-soft">
                {active.services.join(' · ')}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Switcher — only rendered when there is more than one chapter. */}
      {chapters.length > 1 && (
        <div className="pointer-events-auto absolute left-3 top-3 z-[500] flex flex-wrap gap-1.5 rounded-xl border border-[rgba(11,31,58,0.18)] bg-canvas/90 p-1.5 backdrop-blur-sm">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => setActiveId(chapter.id)}
              aria-pressed={chapter.id === activeId}
              data-testid={`button-chapter-map-${chapter.id}`}
              className={`focus-gold min-h-[36px] rounded-lg px-3 font-mono text-label uppercase tracking-label transition-colors ${
                chapter.id === activeId
                  ? 'bg-gold-500 text-navy-950'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {chapter.name}
            </button>
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded-xl border border-[rgba(11,31,58,0.18)] bg-canvas/85 px-3.5 py-2.5 backdrop-blur-sm">
        <p className="flex items-center gap-2 font-mono text-label uppercase tracking-label text-ink-soft">
          <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden="true" />
          Taken
        </p>
        <p className="mt-1.5 flex items-center gap-2 font-mono text-label uppercase tracking-label text-ink-soft">
          <span className="h-2 w-2 rounded-full border border-gold-400/60" aria-hidden="true" />
          Everywhere else is open
        </p>
      </div>
    </div>
  )
}
