import { Feature, Map, View } from "ol/index";
import { OSM, Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import { Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import Logo from "../../assets/images/icons/koana_mtn.png";

import { useRef, useState, useEffect } from "react";

const MapsOL = ({ className: style_container }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  useGeographic();

  useEffect(() => {
    if (ref.current && !map) {
      const markerIcon = "KoaonaMountains";
      const place = [-155.10754366343065, 19.55125614955651];
      const point = new Point(place);

      const map = new Map({
        target: "map",
        view: new View({
          center: place,
          zoom: 8,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [
                new Feature({
                  geometry: point,
                  name: markerIcon,
                }),
              ],
            }),
            style: new Style({
              image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                src: Logo,
                scale: 0.2,
              }),
            }),
          }),
        ],
      });
      setMap(map);
      map.on("click", (evt) => {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });

        if (feature?.values_?.name === markerIcon) {
          window.open(
            "https://www.google.com/maps/dir//Koana,+18-1325+Old+Volcano+Rd,+Mountain+View,+HI+96771/@19.551059,-155.1118996,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x7953cdbce39b4f45:0xe9a9b13d06b4489d!2m2!1d-155.1075018!2d19.5510317",
            "_blank"
          );
        }
      });
    }
  }, [ref, map]);

  return <div id="map" ref={ref} className={style_container}></div>;
};

export default MapsOL;
