import { ScatterplotLayer, GeoJsonLayer } from "@deck.gl/layers";
import store from '@/store/index.js';

/**
 * Deck.GL functions
 */

export function createScatterPlotLayer(data) {
  return new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: data,
    autoHighlight: true,
    pickable: true,
    radiusScale: 2,
    radiusMinPixels: 2,
    radiusMaxPixels: 8,
    getPosition: d => [d.geometry.coordinates[0], d.geometry.coordinates[1]],
    getFillColor: d => getUnitColor(d.properties.unit_country),
    onHover: d => store.commit('timeline/setTooltip', {x: d.x, y: d.y, object: d.object}),
    onClick: d => {
      store.commit('modal/setReferenceId', 1)
      store.commit('modal/showModal', 'UnitModal')
    },
    getRadius: 1000
  })
}

export function createGeoJsonLayer(data) {
  return new GeoJsonLayer({
      id: 'geojson-layer',
      data,
      stroked: true,
      lineWidthScale: 20,
      filled: false,
      lineWidthMinPixels: 2,
      getLineColor: [255, 0, 0, 200],
      getRadius: 100,
      getLineWidth: 2,
  })
}

export function getUnitColor(name) {
  const GER_COLOR = [173, 27, 27];
  const ALLIED_COLOR = [0, 35, 149];
  const UK_COLOR = [32, 142, 201];
  const CA_COLOR = [221, 215, 215];
  switch (name) {
    case 'GMN':
      return GER_COLOR;
    case 'UK':
      return CA_COLOR;
    case 'CAN':
      return UK_COLOR;
    case 'USA':
      return ALLIED_COLOR;
    default:
      return ALLIED_COLOR;
  }
}
