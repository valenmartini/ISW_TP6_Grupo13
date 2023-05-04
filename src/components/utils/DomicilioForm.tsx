import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DatosEstados } from "../RealizarPedido/RealizarPedido";

const schema = yup.object().shape({
  ciudad: yup.string().required("La ciudad es obligatoria"),
  calle: yup.string().required("La calle es obligatoria"),
  numero: yup
    .number()
    .typeError("El número debe ser un valor numérico")
    .required("El número es obligatorio"),
});

export const DomicilioForm = ({ titulo, avanzarEtapa, datosEstados, setDatosEstados, tipo }: any) => {
  const [ciudad, setCiudad] = useState("");
  const handleChangeCiudad = (event: any) => {
    setCiudad(event.target.value as string);
  };

  const formik = useFormik({
    initialValues: {
      ciudad: "",
      calle: "",
      numero: 0,
      referencia: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      setDatosEstados((previo: DatosEstados)=> {
        if (tipo=="Comercio"){
          previo.direccionComercio.ciudad=values.ciudad
          previo.direccionComercio.calle=values.calle
          previo.direccionComercio.numero=Number(values.numero)
          previo.direccionComercio.referencia=values.referencia
        }
        if (tipo=="Entrega"){
          previo.direccionEntrega.ciudad=values.ciudad
          previo.direccionEntrega.calle=values.calle
          previo.direccionEntrega.numero=Number(values.numero)
          previo.direccionEntrega.referencia=values.referencia
        }
        return(previo)
      })
      avanzarEtapa();
    },
  });
  return (
    <Container>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ maxWidth: "500px", marginTop: "8pt" }}
        >
          <Grid item xs={12}>
            <h2>{titulo}</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="ciudad-label">Ciudad</InputLabel>
              <Select
                labelId="ciudad-label"
                id="ciudad"
                name="ciudad"
                value={ciudad}
                onChange={(event)=>{
                  formik.handleChange(event);
                  handleChangeCiudad(event);
                }}
              >
                <MenuItem value={"Córdoba"}>Córdoba</MenuItem>
                <MenuItem value={"San Fransisco"}>San Fransisco</MenuItem>
                <MenuItem value={"Villa Carlos Paz"}>Villa Carlos Paz</MenuItem>
              </Select>
            </FormControl>

            {formik.errors.ciudad && formik.touched.ciudad && (
              <div>{formik.errors.ciudad}</div>
            )}
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="calle"
              name="calle"
              label="Calle"
              value={formik.values.calle}
              onChange={formik.handleChange}
            />
            {formik.errors.calle && formik.touched.calle && (
              <div>{formik.errors.calle}</div>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="referencia"
              name="referencia"
              label="Referencia"
              value={formik.values.referencia}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "48pt",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                className="medium-background-color"
                style={{ textTransform: "none", fontWeight: "bold" }}
                endIcon={<ArrowForwardIcon />}
              >
                Siguiente
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
