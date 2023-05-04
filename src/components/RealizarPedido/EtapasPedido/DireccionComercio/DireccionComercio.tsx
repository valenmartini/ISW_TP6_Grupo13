import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, makeStyles } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EtapaProps } from '../../RealizarPedido';

const schema = yup.object().shape({
  ciudad: yup.string().required('La ciudad es obligatoria'),
  calle: yup.string().required('La calle es obligatoria'),
  numero: yup
    .number()
    .typeError('El número debe ser un valor numérico')
    .required('El número es obligatorio'),
});


function DireccionComercio(props: EtapaProps) {
  
  const [ciudad, setCiudad] = useState('');
  const handleChangeCiudad = (event: any) => {
    setCiudad(event.target.value as string);
  };

  const formik = useFormik({
    initialValues: {
      ciudad: '',
      calle: '',
      numero: '',
      referencia: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    
    <form onSubmit={formik.handleSubmit}>
      <h2>Indica la dirección de tu comercio</h2>
      <FormControl >
        <InputLabel id="ciudad-label">Ciudad</InputLabel>
        <Select
          labelId="ciudad-label"
          id="ciudad"
          name="ciudad"
          value={ciudad}
          onChange={handleChangeCiudad}
        >
          <MenuItem value={'Córdoba'}>Córdoba</MenuItem>
          <MenuItem value={'San Fransisco'}>San Fransisco</MenuItem>
          <MenuItem value={'Villa Carlos Paz'}>Villa Carlos Paz</MenuItem>
        </Select>
      </FormControl>
      {formik.errors.ciudad && formik.touched.ciudad && (
        <div>{formik.errors.ciudad}</div>
      )}

      <TextField
        id="calle"
        name="calle"
        label="Calle"
        value={formik.values.calle}
        onChange={formik.handleChange}
      />
      {formik.errors.calle && formik.touched.calle && (
        <div>{formik.errors.calle}</div>
      )}

      <TextField
        id="numero"
        name="numero"
        label="Número"
        type="number"
        value={formik.values.numero}
        onChange={formik.handleChange}
      />
      {formik.errors.numero && formik.touched.numero && (
        <div>{formik.errors.numero}</div>
      )}

      <TextField
        id="referencia"
        name="referencia"
        label="Referencia"
        value={formik.values.referencia}
        onChange={formik.handleChange}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Enviar
      </Button>
    </form>
  );
}

export default DireccionComercio;