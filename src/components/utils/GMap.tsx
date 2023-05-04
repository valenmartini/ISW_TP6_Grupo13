import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { Direccion } from "../RealizarPedido/RealizarPedido";

interface Ruta {
  dirrecionOrigen: Direccion;
  dirrecionDestino: Direccion;
}

interface GMapProps {
  ruta: Ruta;
  setDistancia: any;
}


const dirToString = (toTransform: Direccion) => {

  const numeroMap = (toTransform.numero === 0) ? "" : toTransform.numero;
  return `${toTransform.calle} ${numeroMap}, ${toTransform.ciudad}`;
};

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

export const GMap = ({ ruta, setDistancia }: GMapProps) => {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
  });
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);

  const [routeNotFound, setRouteNotFound] = useState<boolean>(false);
  const routeNotFoundMessage = `Error!! No se pudo calcular una ruta para las siguientes dirreciones: Origen:${dirToString(ruta.dirrecionOrigen)} Destino:${dirToString(ruta.dirrecionDestino)}`;
  const calculateRoute = async (dirOrigen: Direccion, dirDestino: Direccion) => {
    const directionService = new window.google.maps.DirectionsService();
    const routeResponse = await directionService
      .route({
        origin: dirToString(dirOrigen),
        destination: dirToString(dirDestino),
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        setRouteNotFound(true);
        return null;
      });
    
    setRoute(routeResponse);
    setDistancia(routeResponse?.routes[0].legs[0].distance)
  };

  useEffect(() => {
    isLoaded && calculateRoute(ruta.dirrecionOrigen, ruta.dirrecionDestino);
  }, [isLoaded]);

  return isLoaded && !routeNotFound ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <GoogleMap
        zoom={5}
        mapContainerStyle={{ width: "100%", height: "50vh", borderBottom: "solid 1px #e1e1e0" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {route && <DirectionsRenderer directions={route} />}
      </GoogleMap>
    </div>
  ) : (
    <div>{routeNotFoundMessage}</div>
  );
};
