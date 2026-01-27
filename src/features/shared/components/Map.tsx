import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  BsGeoAltFill,
  BsCheckCircle,
  BsXCircle,
  BsDot,
  BsGeoAlt,
} from "react-icons/bs";

const statusConfig = {
  active: {
    color: "#10B981", // green-500
    icon: BsGeoAltFill,
    label: "Active",
  },
  completed: {
    color: "#3B82F6", // blue-500
    icon: BsCheckCircle,
    label: "Completed",
  },
  inactive: {
    color: "#EF4444", // red-500
    icon: BsXCircle,
    label: "Inactive",
  },
};

export const createCustomIcon = (status: keyof typeof statusConfig) => {
  const config = statusConfig[status];

  return L.divIcon({
    html: `
      <div style="
        color: ${config.color};
        background: white;
        border-radius: 50%;
        padding: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
      ">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="${config.color}">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: `custom-marker-${status}`,
  });
};

export const MapLegend = () => {
  return (
    <div className="absolute bottom-4 right-4  bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h4 className="font-semibold text-sm mb-3 text-gray-700">
        Polling Unit Status
      </h4>
      <div className="space-y-2">
        {Object.entries(statusConfig).map(([status, config]) => {
          const Icon = config.icon;
          return (
            <div key={status} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <Icon size={16} style={{ color: config.color }} />
              </div>
              <span className="text-sm text-gray-600">{config.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <BsDot size={16} />
          <span>Click on markers for details</span>
        </div>
      </div>
    </div>
  );
};

export const CustomPopup = ({
  name,
  status,
}: {
  name: string;
  status: string;
}) => {
  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config?.icon || BsGeoAlt;

  return (
    <div className="p-2 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="p-1 rounded"
          style={{ backgroundColor: `${config?.color}20` }}
        >
          <Icon size={16} style={{ color: config?.color }} />
        </div>
        <h3 className="font-bold text-gray-800">{name}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Status:</span>
        <span
          className="px-2 py-1 rounded-full text-xs font-medium capitalize"
          style={{
            backgroundColor: `${config?.color}20`,
            color: config?.color,
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

const MapAttributionOverlay = ({ pollingUnits }: { pollingUnits: any[] }) => (
  <div className="absolute bottom-2 left-2">
    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
      <p className="text-xs text-gray-600">
        <span className="font-medium">Kano State</span> • {pollingUnits.length}{" "}
        polling units
      </p>
    </div>
  </div>
);

const CustomMap = ({ pollingUnits }: { pollingUnits: any[] }) => (
  <>
    <MapContainer
      center={[12.0022, 8.5919]}
      zoom={13}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {pollingUnits.map((pu) => (
        <Marker
          key={pu.id}
          position={[pu.lat, pu.lon]}
          icon={createCustomIcon(pu.status as keyof typeof statusConfig)}
        >
          <Popup>
            <CustomPopup name={pu.name} status={pu.status} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    <MapLegend />
    <MapAttributionOverlay pollingUnits={pollingUnits} />
  </>
);

export default CustomMap;
