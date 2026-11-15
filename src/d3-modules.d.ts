declare module "d3-geo" {
  export interface GeoProjection {
    fitSize(size: [number, number], object: unknown): this;
  }
  export function geoNaturalEarth1(): GeoProjection;
  export function geoPath(projection?: GeoProjection): (feature: unknown) => string | null;
}

declare module "topojson-client" {
  export function feature(topology: unknown, object: unknown): unknown;
}
