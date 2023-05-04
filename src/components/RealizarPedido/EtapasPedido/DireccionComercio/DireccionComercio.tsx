import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  ciudad: yup.string().required('La ciudad es obligatoria'),
  calle: yup.string().required('La calle es obligatoria'),
  numero: yup
    .number()
    .typeError('El número debe ser un valor numérico')
    .required('El número es obligatorio'),
});

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function DireccionComercio() {
  const classes = useStyles();
  const [ciudad, setCiudad] = useState('');
  const handleChangeCiudad = (event: React.ChangeEvent<{ value: unknown }>) => {
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
      <FormControl className={classes.formControl}>
        <InputLabel id="ciudad-label">Ciudad</InputLabel>
        <Select
          labelId="ciudad-label"
          id="ciudad"
          name="ciudad"
          value={ciudad}
          onChange={handleChangeCiudad}
        >
          <MenuItem value={'Córdoba'}>Córdoba</MenuItem>
          <MenuItem value={'Rosario'}>Rosario</MenuItem>
        </Select>
      </FormControl>
      {formik.errors.ciudad && formik.touched.ciudad && (
        <div>{formik.errors.ciudad}</div>
      )}

      <TextField
        id="calle"
        name="calle"
        label="Calle"
        className={classes.textField}
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
        className={classes.textField}
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
        className={classes.textField}
        value={formik.values.referencia}
        onChange={formik.handleChange}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
      >
        Enviar
      </Button>
    </form>
  );
}

export default DireccionComercio;