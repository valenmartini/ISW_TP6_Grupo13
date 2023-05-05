import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
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
    .min(0, "No puede ingresar un numero negativo")
    .typeError("El número debe ser un valor numérico")
    .required("El número es obligatorio"),
});

export const DomicilioForm = ({
  titulo,
  avanzarEtapa,
  datosEstados,
  setDatosEstados,
  tipo,
}: any) => {
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
      setDatosEstados((previo: DatosEstados) => {
        if (tipo == "Comercio") {
          previo.direccionComercio.ciudad = values.ciudad;
          previo.direccionComercio.calle = values.calle;
          previo.direccionComercio.numero = Number(values.numero);
          previo.direccionComercio.referencia = values.referencia;
        }
        if (tipo == "Entrega") {
          previo.direccionEntrega.ciudad = values.ciudad;
          previo.direccionEntrega.calle = values.calle;
          previo.direccionEntrega.numero = Number(values.numero);
          previo.direccionEntrega.referencia = values.referencia;
        }
        return previo;
      });
      avanzarEtapa();
    },
  });
  return (
    <Container>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Grid container spacing={3} sx={{ maxWidth: "500px" }}>
          <Grid item xs={12}>
            <Typography
              textAlign="center"
              style={{
                color: "#0E182C",
                fontWeight: "bold",
                marginTop: "24pt",
                marginBottom: "16pt",
              }}
            >
              {titulo}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
            >
              <InputLabel id="ciudad-label">Ciudad</InputLabel>
              <Select
                labelId="ciudad-label"
                id="ciudad"
                name="ciudad"
                value={ciudad}
                onChange={(event) => {
                  formik.handleChange(event);
                  handleChangeCiudad(event);
                }}
              >
                <MenuItem value={"Córdoba"}>Córdoba</MenuItem>
                <MenuItem value={"San Fransisco"}>San Fransisco</MenuItem>
                <MenuItem value={"Villa Carlos Paz"}>Villa Carlos Paz</MenuItem>
              </Select>
              {formik.touched.ciudad && (<FormHelperText error>{formik.errors.ciudad}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              error={formik.touched.calle && Boolean(formik.errors.calle)}
              fullWidth
              id="calle"
              name="calle"
              label="Calle"
              value={formik.values.calle}
              onChange={formik.handleChange}
              helperText={formik.touched.calle && formik.errors.calle}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={formik.touched.numero && Boolean(formik.errors.numero)}
              fullWidth
              id="numero"
              name="numero"
              label="Número"
              type="number"
              value={formik.values.numero}
              onChange={formik.handleChange}
              helperText={formik.touched.numero && formik.errors.numero}
            />
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
