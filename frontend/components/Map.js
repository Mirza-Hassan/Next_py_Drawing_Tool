'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { Draw, Select, Modify, Snap } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Circle from 'ol/geom/Circle';
import { mockShapes } from './mockData';

const DrawingMap = ({ drawType }) => {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    const source = new VectorSource({ wrapX: false });

    const vectorLayer = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    const mapObject = new Map({
      target: mapElement.current,
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: fromLonLat([-73.935242, 40.730610]),
        zoom: 10,
      }),
    });

    setMap(mapObject);

    const select = new Select();
    mapObject.addInteraction(select);

    const modify = new Modify({ source: source });
    mapObject.addInteraction(modify);

    const snap = new Snap({ source: source });
    mapObject.addInteraction(snap);

    // Load mock shapes
    mockShapes.forEach((shape) => {
      const feature = new Feature({
        geometry: shape.shape_type === 'circle'
          ? new Circle(fromLonLat(shape.geometry[0][0]), 1000)
          : new Polygon([shape.geometry[0].map(coord => fromLonLat(coord))]),
        shapeType: shape.shape_type,
      });
      source.addFeature(feature);
    });

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (map && draw) {
      map.removeInteraction(draw);
    }
    if (map && drawType) {
      let drawInteraction;
      if (drawType === 'Star') {
        drawInteraction = new Draw({
          source: map.getLayers().item(1).getSource(),
          type: 'Circle',
          geometryFunction: createStarGeometryFunction(5, 0.5),
        });
      } else {
        drawInteraction = new Draw({
          source: map.getLayers().item(1).getSource(),
          type: drawType === 'Rectangle' ? 'Polygon' : drawType,
        });
      }

      drawInteraction.on('drawend', (event) => {
        const feature = event.feature;
        const geometry = feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326').getCoordinates();
        const shapeType = drawType.toLowerCase();

        console.log('Drawn Shape:', {
          shape_type: shapeType,
          geometry: JSON.stringify(geometry),
        });

        // You can add the mock save logic here if needed
      });

      map.addInteraction(drawInteraction);
      setDraw(drawInteraction);
    }
  }, [drawType, map]);

  return <div ref={mapElement} style={{ width: '100%', height: '100vh' }} />;
};

const createStarGeometryFunction = (points, ratio) => {
  return (coordinates, geometry) => {
    const center = coordinates[0];
    const end = coordinates[1];
    const radius = Math.sqrt(Math.pow(end[0] - center[0], 2) + Math.pow(end[1] - center[1], 2));
    const angle = Math.atan2(end[1] - center[1], end[0] - center[0]);

    const polygonCoordinates = [];
    for (let i = 0; i < points; i++) {
      const theta = (i * 2 * Math.PI) / points - Math.PI / 2 + angle;
      const x = center[0] + radius * Math.cos(theta);
      const y = center[1] + radius * Math.sin(theta);
      polygonCoordinates.push([x, y]);

      const theta2 = ((i + 0.5) * 2 * Math.PI) / points - Math.PI / 2 + angle;
      const x2 = center[0] + radius * ratio * Math.cos(theta2);
      const y2 = center[1] + radius * ratio * Math.sin(theta2);
      polygonCoordinates.push([x2, y2]);
    }
    polygonCoordinates.push(polygonCoordinates[0]);

    if (!geometry) {
      geometry = new Polygon([polygonCoordinates]);
    } else {
      geometry.setCoordinates([polygonCoordinates]);
    }
    return geometry;
  };
};

export default DrawingMap;
