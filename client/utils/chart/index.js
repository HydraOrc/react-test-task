import { START } from 'defaults';

export const standalone = false;

export const axisStyleAxis = {
  shapeRendering: 'crispEdges',
  strokeWidth: 0,
};

export const axisStyleAxisLabel = {
  fill: '#000',
  fontFamily: 'inherit',
  letterSpacing: '0.18px',
  fontSize: 9,
  fontWeight: 300,
  padding: 10,
};

export const axisStyleTicks = {
  shapeRendering: 'crispEdges',
  size: -10,
};

export const axisStyleTickLabels = {
  fill: '#142335',
  fontFamily: 'SF UI Text',
  fontSize: 9,
  letterSpacing: '0.2px',
  textAnchor: START,
  opacity: 0.4,
};

export const axisStyleGrid = {
  shapeRendering: 'crispEdges',
  stroke: '#343B3E',
  strokeWidth: 1,
  opacity: (tick) => (tick === 0 ? 0.4 : 0.1),
};

export const barStyleLabels = {
  fill: '#202E3B',
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: -0.28,
};
