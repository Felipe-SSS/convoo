import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

// Caminho para o arquivo GeoJSON
const geoUrl = '/data/ne_110m_admin_0_countries.json';

// Dados de conexões por país
const connections = [
  { country: 'BRA', name: 'Brazil', coordinates: [-51.9253, -14.2350], value: 42 },
  { country: 'USA', name: 'United States', coordinates: [-95.7129, 37.0902], value: 31 },
  { country: 'FRA', name: 'France', coordinates: [2.2137, 46.2276], value: 20 },
  { country: 'IND', name: 'India', coordinates: [78.9629, 20.5937], value: 18 },
  { country: 'JPN', name: 'Japan', coordinates: [138.2529, 36.2048], value: 9 },
  { country: 'ZAF', name: 'South Africa', coordinates: [22.9375, -30.5595], value: 12 },
];

const WorldConnectionsMap = () => (
  <ComposableMap projectionConfig={{ scale: 200 }}>
    <Geographies geography={geoUrl}>
    {({ geographies }) =>
        geographies.map((geo) => {
        const isHighlighted = connections.find(
            (conn) => conn.country === geo.properties.ADM0_A3
        );
        return (
            <Geography
            key={geo.rsmKey}
            geography={geo}
            fill={isHighlighted ? '#fde68a' : '#EAEAEC'}
            stroke="#D6D6DA"
            />
        );
        })
    }
    </Geographies>
    {connections.map(({ name, coordinates, value }) => (
      <Marker key={name} coordinates={coordinates}>
        <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
        <text
          textAnchor="middle"
          y={4}
          style={{ fontFamily: 'system-ui', fill: '#fff', fontSize: 10 }}
        >
          {value}
        </text>
      </Marker>
    ))}
  </ComposableMap>
);

export default WorldConnectionsMap;