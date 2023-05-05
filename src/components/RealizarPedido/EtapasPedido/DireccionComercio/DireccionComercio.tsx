import React, { useState } from "react";
import { EtapaProps } from "../../RealizarPedido";
import { DomicilioForm } from "@component/components/utils/DomicilioForm";

function DireccionComercio(props: EtapaProps) {
  return (
    <DomicilioForm
      titulo="Ingrese la direccion del comercio"
      avanzarEtapa={props.avanzarEtapa}
      datosEstados={props.datosEstados}
      setDatosEstados={props.setDatosEstados}
      tipo={"Comercio"}
    />
  );
}

export default DireccionComercio;
