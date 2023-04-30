import React from "react";
import { DatosEstados, EtapaProps } from "../../RealizarPedido";
import { Formik } from "formik";
import { PagoEfectivo } from "./FormatosPago/PagoEfectivo";
import { PagoTarjeta } from "./FormatosPago/PagoTarjeta";

export const PasarelaPago = (props: EtapaProps) => {
  if (!props.datosEstados.pasarelaPago.formaDePago) null;

  if (props.datosEstados.pasarelaPago.formaDePago === 0)
    <PagoEfectivo {...props} />;
  return <PagoTarjeta {...props} />;
};
