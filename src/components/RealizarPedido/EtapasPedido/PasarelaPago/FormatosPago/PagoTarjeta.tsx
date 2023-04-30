import { DatosEstados, EtapaProps } from '@component/components/RealizarPedido/RealizarPedido'
import { Formik } from 'formik'
import React from 'react'

export const PagoTarjeta = (props : EtapaProps) => {
  return (
    <Formik initialValues={{
        numeroTarjeta: props.datosEstados.pasarelaPago.datosTarjeta?.numeroTarjeta,
        fechaVencimiento: props.datosEstados.pasarelaPago.datosTarjeta?.fechaVencimiento,
        codigoSeguridad: props.datosEstados.pasarelaPago.datosTarjeta?.codigoSeguridad,
        nombreTitular: props.datosEstados.pasarelaPago.datosTitular?.nombreTitular,
        apellidoTitular: props.datosEstados.pasarelaPago.datosTitular?.apellidoTitular
      }}
      onSubmit={(values) => {
        props.setDatosEstados((prev: DatosEstados) => {
            prev.pasarelaPago.datosTarjeta = {
                numeroTarjeta: values.numeroTarjeta,
                fechaVencimiento: values.fechaVencimiento,
                codigoSeguridad: values.codigoSeguridad
            };
            prev.pasarelaPago.datosTitular = {
                nombreTitular: values.nombreTitular,
                apellidoTitular: values.apellidoTitular
            }
          return prev;
        });
      }}
      >
  
      </Formik>
  )
}
