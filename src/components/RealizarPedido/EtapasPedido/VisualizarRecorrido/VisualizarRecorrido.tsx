import React, { useState } from "react";
import { EtapaProps } from "../../RealizarPedido";
import { DatosEstados } from "../../RealizarPedido";
import { useLoadScript } from "@react-google-maps/api";
import { GMap } from "@component/components/utils/GMap";

interface Distancia {
  text?: string;
  value?: number
}

export const VisualizarRecorrido = ({ datosEstados, setDatosEstados, avanzarEtapa, etapa }: EtapaProps) => {
  const origen = { calle: "fuastino Allende", numero: 12, ciudad: "cordoba" };
  const destino = { calle: "Maestro M. Lopez esq, Cruz Roja Argentina", numero:0 , ciudad: "cordoba" };

  const [distancia, setDistancia] = useState<Distancia>();
  return (
    <>
      {etapa === 3 && <GMap ruta={{dirrecionOrigen:origen,  dirrecionDestino:destino}} setDistancia={setDistancia}/>}
      <p>Visualizar Recorrido</p>
      <p>Distancia  magica {distancia?.value}</p>
    </>
  );
};
