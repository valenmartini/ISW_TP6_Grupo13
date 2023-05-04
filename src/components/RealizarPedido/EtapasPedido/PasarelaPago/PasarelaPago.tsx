import React from "react";
import { DatosEstados, EtapaProps } from "../../RealizarPedido";
import { PagoEfectivo } from "./FormatosPago/PagoEfectivo";
import { PagoTarjeta } from "./FormatosPago/PagoTarjeta";

export const PasarelaPago = (props: EtapaProps) => {
  if (typeof props.datosEstados.pasarelaPago.formaDePago === "undefined") {
    return null;
  }
  console.log(props.datosEstados.pasarelaPago);

  if (props.datosEstados.pasarelaPago.formaDePago === 0) {
    return <PagoEfectivo {...props} />;
  } else {
    return <PagoTarjeta {...props} />;
  }
};
