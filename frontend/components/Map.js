"use client";

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { OSM } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { Draw, Select, Modify, Snap } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { saveShapeData } from "./shapeService";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Polygon from "ol/geom/Polygon";

const DrawingMap = ({ drawType }) => {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const source = new VectorSource({ wrapX: false });

  useEffect(() => {
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: source,
      style: vectorLayerStyle,
    });

    const mapObject = new Map({
      target: mapElement.current,
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: fromLonLat([-73.935242, 40.73061]),
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

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (map && draw) {
      map.removeInteraction(draw);
    }
    if (map && drawType) {
      let drawInteraction;
      if (drawType === "Star") {
        drawInteraction = new Draw({
          source: map.getLayers().item(1).getSource(),
          type: "Circle",
          geometryFunction: createStarGeometryFunction(5, 0.5),
        });
      } else if (drawType === "Rectangle") {
        drawInteraction = new Draw({
          source: map.getLayers().item(1).getSource(),
          type: "Circle",
          geometryFunction: createRectangleGeometryFunction(),
        });
      } else if (drawType === "Circle") {
        drawInteraction = new Draw({
          source: map.getLayers().item(1).getSource(),
          type: "Circle",
        });
      }

      drawInteraction.on("drawend", (event) => {
        const feature = event.feature;
        let geometry;

        if (drawType === "Circle") {
          const circleGeom = feature.getGeometry();
          const radius = circleGeom.getRadius();
          const center = circleGeom.getCenter();
          geometry = {
            center: center,
            radius: radius,
          };
        } else {
          geometry = feature
            .getGeometry()
            .clone()
            .transform("EPSG:3857", "EPSG:4326")
            .getCoordinates();
        }

        const shapeType = drawType.toLowerCase();

        const shapeData = {
          shape_type: shapeType,
          geometry: geometry,
        };

        saveShapeData(shapeData);
      });

      map.addInteraction(drawInteraction);
      setDraw(drawInteraction);
    }
  }, [drawType, map]);

  return <div ref={mapElement} style={mapContainer} />;
};

const createStarGeometryFunction = (points, ratio) => {
  return (coordinates, geometry) => {
    const center = coordinates[0];
    const end = coordinates[1];
    const radius = Math.sqrt(
      Math.pow(end[0] - center[0], 2) + Math.pow(end[1] - center[1], 2)
    );
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

const createRectangleGeometryFunction = () => {
  return (coordinates, geometry) => {
    const start = coordinates[0];
    const end = coordinates[1];

    const rectangleCoordinates = [
      start,
      [start[0], end[1]],
      end,
      [end[0], start[1]],
      start,
    ];

    if (!geometry) {
      geometry = new Polygon([rectangleCoordinates]);
    } else {
      geometry.setCoordinates([rectangleCoordinates]);
    }

    return geometry;
  };
};

const vectorLayerStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.2)",
  }),
  stroke: new Stroke({
    color: "#ffcc33",
    width: 2,
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: "#ffcc33",
    }),
  }),
});

const mapContainer = {
  width: "100%",
  height: "100vh",
};

export default DrawingMap;
