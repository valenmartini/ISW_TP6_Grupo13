import {
  DatosEstados,
  EtapaProps,
} from "@component/components/RealizarPedido/RealizarPedido";
import { Formik } from "formik";
import React from "react";

export const PagoEfectivo = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
}: EtapaProps) => {
  return (
    <Formik
      initialValues={{
        montoEfectivo: datosEstados.pasarelaPago.montoEfectivo,
      }}
      onSubmit={(values) => {
        setDatosEstados((prev: DatosEstados) => {
          prev.pasarelaPago.montoEfectivo = values.montoEfectivo;
          return prev;
        });
      }}
    ></Formik>
  );
};
