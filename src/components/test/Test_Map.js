// https://react-leaflet.js.org/docs/example-popup-marker/

import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-markercluster";

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const TestMap = () => {

    return (
        <div className="bx--grid">
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <MapContainer
                    style={ { width: '700px', height: '500px' } }
                    center={[51.0, 19.0]}
                    zoom={4}
                    maxZoom={18}>

                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MarkerClusterGroup>
                        <Marker position={[49.8397, 24.0297]}>
                            <Tooltip>
                                <span>Unknown</span>
                            </Tooltip>
                            <Popup>
                                Location: Unknown <br /> Pmid: 9876
                            </Popup>
                        </Marker>

                        <Marker position={[50.4501, 30.5234]} />
                        <Marker position={[52.2297, 21.0122]} />
                        <Marker position={[50.0647, 19.945]} />
                        <Marker position={[48.9226, 24.7111]} />
                        <Marker position={[48.7164, 21.2611]} />

                        <Marker position={[51.5, -0.09]}>
                            <Popup>
                                Location: London <br /> Pmid: 1234
                            </Popup>
                            <Tooltip direction="bottom">
                                <span>London</span>
                            </Tooltip>
                        </Marker>
                    </MarkerClusterGroup>

                </MapContainer>
            </div>
        </div>
    );
}

export default TestMap