import React, { Component } from "react";
import L from "leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import { isNaN } from "lodash";
import chroma from "chroma-js";
import "./leaflet.motion.min";
import river from "../../data/river.json";
import "./css/leaflet.css";
import "../../App.css";

class Home extends Component {
  componentDidMount() {
    this.map = L.map("map", {
      preferCanvas: true,
      zoomControl: false,
      center: [-9.381499, 20.288831],
      zoom: 12,
      minZoom: 5,
      maxZoom: 15,
      maxBoundsViscosity: 0.5,
    });
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      }
    ).addTo(this.map);
    var url =
      "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/34/L/DQ/2021/7/S2B_34LDQ_20210730_0_L2A/TCI.tif";
    parseGeoraster(url).then((georaster) => {
      const layer = new GeoRasterLayer({
        attribution: "Planet",
        georaster,
        resolution: 128,
        debugLevel: 0,
        pixelValuesToColorFn: (values) => {
          const haveDataForAllBands = values.every(
            (value) => value != false || isNaN(value)
          );
          if (!haveDataForAllBands) {
            return "#00000000";
          }

          const [red, green, blue] = values;
          const color = chroma(red, green, blue);

          return color;
        },
      });
      layer.addTo(this.map);
      console.log("GeoRaster_layer", layer);
    });
    var coords = river.geometry.coordinates.map((c) => [c[1], c[0]]);
    L.motion
      .polyline(
        coords,
        {
          color: "red",
        },
        {
          auto: true,
          duration: 300000,
        },
        {}
      )
      .addTo(this.map);
  }
  render() {
    document.title = "Catoca Diamond Mine Tailings Dam Failure 2021";
    return (
      <div className="map">
        <div id="map"></div>
      </div>
    );
  }
}

export default Home;
