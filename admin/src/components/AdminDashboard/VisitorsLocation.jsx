// src/components/VisitorsLocation.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// import marker images (ESM-safe)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default icon for many bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Helper: fit bounds when coords change
const FitBounds = ({ coordinates }) => {
  const map = useMap();
  React.useEffect(() => {
    if (!map || !coordinates?.length) return;
    try {
      const bounds = L.latLngBounds(coordinates.map((c) => [c.lat, c.lng]));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    } catch (err) {
      // fallback: do nothing
      console.warn("FitBounds error:", err);
    }
  }, [coordinates, map]);
  return null;
};

/**
 * Small utility to spread duplicate markers so they don't perfectly overlap.
 * - groups: records grouped by exact rounded lat/lng key
 * - for groups with n>1, we apply a small spiral/jitter around the original coordinate
 *   using a radius in degrees (~meters / 111000). The jitter is tiny (~5-20 meters).
 */
const spreadDuplicateCoordinates = (coords) => {
  const groups = new Map();

  // group by lat/lng rounded to 6 decimals (approx ~0.11m precision)
  coords.forEach((c) => {
    const key = `${Number(c.lat).toFixed(6)}_${Number(c.lng).toFixed(6)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(c);
  });

  const out = [];

  groups.forEach((arr, key) => {
    const n = arr.length;
    const baseLat = Number(arr[0].lat);
    const baseLng = Number(arr[0].lng);

    if (n === 1) {
      out.push({
        ...arr[0],
        lat: baseLat,
        lng: baseLng,
        duplicates: 1,
      });
      return;
    }

    // radius in degrees: choose about 8 meters initial radius, increase if needed
    // 1 degree latitude ≈ 111000 meters
    const metersToDeg = (m) => m / 111000;
    const initialMeters = 8; // start offset radius (meters)
    const perRing = 8; // items per ring before increasing radius

    for (let i = 0; i < n; i++) {
      const ring = Math.floor(i / perRing); // 0,1,2...
      const posInRing = i % perRing;
      const itemsInThisRing = Math.min(perRing, n - ring * perRing);

      // spacing angle
      const angle = (2 * Math.PI * posInRing) / itemsInThisRing;
      const radiusMeters = initialMeters * (ring + 1);
      const radiusDeg = metersToDeg(radiusMeters);

      // adjust longitude offset by cos(lat) to keep meters roughly correct
      const offsetLat = radiusDeg * Math.cos(angle);
      const offsetLng = (radiusDeg * Math.sin(angle)) / Math.cos((baseLat * Math.PI) / 180);

      out.push({
        ...arr[i],
        lat: baseLat + offsetLat,
        lng: baseLng + offsetLng,
        duplicates: n,
        origLat: baseLat,
        origLng: baseLng,
      });
    }
  });

  return out;
};

const VisitorsLocation = () => {
  const [visitors, setVisitors] = useState([]);
  const [coordinates, setCoordinates] = useState([]); // processed coords to render
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // default center (India) used temporarily; FitBounds will reposition.
  const defaultCenter = [20.5937, 78.9629];

  useEffect(() => {
    const fetchVisitorsData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("https://mern-full-stake-web.onrender.com/visitors");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setVisitors(data);

        // ---------- Process coordinates ----------
        const rawCoords = [];
        data.forEach((visitor, vIndex) => {
          const sessions = Array.isArray(visitor.sessions) ? visitor.sessions : [];
          sessions.forEach((s, sIndex) => {
            // Defensive access: some sessions may have no location
            const latRaw = s?.location?.latitude ?? null;
            const lngRaw = s?.location?.longitude ?? null;

            // parse numeric (handles string numbers, numbers, null)
            const lat = latRaw === null ? NaN : Number(latRaw);
            const lng = lngRaw === null ? NaN : Number(lngRaw);

            // log for debugging (optional)
            // console.debug(`V[${vIndex}] S[${sIndex}] -> latRaw:${latRaw} lngRaw:${lngRaw} parsed:${lat},${lng}`);

            // skip invalid values - NaN OR both exactly 0 (0,0 usually meaningless here)
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
              // optionally warn:
              // console.warn("Skipping invalid coordinate", { visitorId: visitor.visitorId, latRaw, lngRaw, sIndex });
              return;
            }
            if (lat === 0 && lng === 0) {
              // often placeholder — skip
              return;
            }

            rawCoords.push({
              lat,
              lng,
              visitorId: visitor.visitorId ?? visitor._id ?? "unknown",
              sessionTime: s.sessionStartTime ?? s.createdAt ?? "Unknown time",
            });
          });
        });

        console.info("Raw coordinates extracted:", rawCoords.length);

        // Spread duplicates so markers can be seen when multiple sessions share same lat/lng
        const finalCoords = spreadDuplicateCoordinates(rawCoords);
        console.info("After grouping/spread duplicates → markers to render:", finalCoords.length);

        setCoordinates(finalCoords);
      } catch (err) {
        console.error("Fetch visitors error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorsData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6 ">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
      

        <div className="p-4">
          {isLoading && <div className="text-gray-600">Loading visitors...</div>}
          {error && <div className="text-red-600">Error: {error}</div>}

          {!isLoading && !error && coordinates.length === 0 && (
            <div className="text-gray-600 text-center py-10">No visitor locations available</div>
          )}

          {coordinates.length > 0 && (
            <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <MapContainer
                center={coordinates[0] ? [coordinates[0].lat, coordinates[0].lng] : defaultCenter}
                zoom={6}
                style={{ height: "70vh", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds coordinates={coordinates} />

                {coordinates.map((c, i) => (
                  <Marker key={`${c.lat}_${c.lng}_${i}`} position={[c.lat, c.lng]}>
                    <Popup>
                      <div className="text-sm">
                        <div className="font-semibold">Visitor: {c.visitorId}</div>
                        <div className="text-gray-600">Time: {c.sessionTime}</div>
                        <div className="text-gray-500 mt-1">Lat: {c.origLat ?? c.lat}, Lng: {c.origLng ?? c.lng}</div>
                        {c.duplicates > 1 && <div className="text-xs text-blue-600 mt-1">Grouped sessions: {c.duplicates}</div>}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorsLocation;
