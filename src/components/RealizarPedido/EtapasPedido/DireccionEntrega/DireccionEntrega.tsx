import React, { useState } from "react";

import { EtapaProps } from "../../RealizarPedido";
import { DomicilioForm } from "@component/components/utils/DomicilioForm";

function DireccionEntrega(props: EtapaProps) {
  return (
    <DomicilioForm
      titulo="Ingrese la direccion del punto de entrega"
      avanzarEtapa={props.avanzarEtapa}
      datosEstados={props.datosEstados}
      setDatosEstados={props.setDatosEstados}
      tipo={"Entrega"}
    />
  );
}

export default DireccionEntrega;
