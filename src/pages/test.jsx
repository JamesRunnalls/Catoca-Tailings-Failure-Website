import "./leaflet.motion.min";

console.log(river);
    this.map = L.map("map", {
      preferCanvas: true,
      zoomControl: false,
      center: [-9.381499, 20.288831],
      zoom: 9,
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
    var url_to_geotiff_file =
      "https://geotiff.github.io/georaster-layer-for-leaflet-example/example_4326.tif";

    

var coords = river.geometry.coordinates.map((c) => [c[1], c[0]]);
    L.motion
      .polyline(
        coords,
        {
          color: "red",
        },
        {
          auto: true,
          duration: 30000,
        },
        {}
      )
      .addTo(this.map);