import {
  DatosEstados,
  EtapaProps,
} from "@component/components/RealizarPedido/RealizarPedido";
import { Container } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import styles from '../../../../../styles/pasarelaPago.module.css';

export const PagoTarjeta = (props: EtapaProps) => {
  return (
    <Formik
      initialValues={{
        numeroTarjeta:
          props.datosEstados.pasarelaPago.datosTarjeta?.numeroTarjeta,
        fechaVencimiento:
          props.datosEstados.pasarelaPago.datosTarjeta?.fechaVencimiento,
        codigoSeguridad:
          props.datosEstados.pasarelaPago.datosTarjeta?.codigoSeguridad,
        nombreTitular:
          props.datosEstados.pasarelaPago.datosTitular?.nombreTitular,
        apellidoTitular:
          props.datosEstados.pasarelaPago.datosTitular?.apellidoTitular,
      }}
      onSubmit={(values) => {
        props.setDatosEstados((prev: DatosEstados) => {
          prev.pasarelaPago.datosTarjeta = {
            numeroTarjeta: values.numeroTarjeta,
            fechaVencimiento: values.fechaVencimiento,
            codigoSeguridad: values.codigoSeguridad,
          };
          prev.pasarelaPago.datosTitular = {
            nombreTitular: values.nombreTitular,
            apellidoTitular: values.apellidoTitular,
          };
          return prev;
        });
      }}
    >
      <Container>
        <div style={styles.card}>
          <div >**** **** **** 1234</div>
          <div>John Doe</div>
          <div>MM/YY</div>
        </div>
      </Container>
    </Formik>
  );
};
