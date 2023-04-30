import { DatosEstados, EtapaProps } from '@component/components/RealizarPedido/RealizarPedido';
import { Formik } from 'formik';
import React from 'react'

export const PagoEfectivo = (props : EtapaProps) => {
  return (
    <Formik initialValues={{
        montoEfectivo: props.datosEstados.pasarelaPago.montoEfectivo
      }}
      onSubmit={(values) => {
        props.setDatosEstados((prev: DatosEstados) => {
          prev.pasarelaPago.montoEfectivo = values.montoEfectivo;
          return prev;
        });
      }}>
  
      </Formik>
  )
}
