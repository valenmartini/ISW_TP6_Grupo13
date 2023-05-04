import {
  DatosEstados,
  EtapaProps,
  theme,
} from "@component/components/RealizarPedido/RealizarPedido";
import { Formik } from "formik";
import React from "react";

import Image from "next/image";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const validationSchema = Yup.object().shape({
  montoEfectivo: Yup.number()
    .min(100, "El minimo es de 100 pesos")
    .required("Campo requerido"),
});

export const PagoEfectivo = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
}: EtapaProps) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        montoEfectivo: datosEstados.pasarelaPago.montoEfectivo,
      }}
      onSubmit={(values) => {
        setDatosEstados((prev: DatosEstados) => {
          prev.pasarelaPago.montoEfectivo = values.montoEfectivo;
          return prev;
        });
        avanzarEtapa();
      }}
    >
      {({ handleChange, handleSubmit, errors, touched }) => (
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "12pt",
            }}
          >
            <Image src="/cash.png" alt="efectivo" width={200} height={163} />
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ maxWidth: "500px", marginTop: "8pt" }}
            >
              <Grid item xs={12}>
                <Typography className="dark-color">
                  Indicale al repartidor con cuanto vas a pagar
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth style={{ marginTop: "12pt" }}>
                  <InputLabel htmlFor="cantidad-cash">
                    Cantidad en efectivo
                  </InputLabel>
                  <OutlinedInput
                    id="cantidad-cash"
                    name="montoEfectivo"
                    label="Cantidad en efectivo"
                    error={touched.montoEfectivo && Boolean(errors.montoEfectivo)}
                    inputProps={{
                      inputMode:"numeric"
                    }}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                      handleChange(e);
                    }}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                  {touched.montoEfectivo && (<FormHelperText error>{errors.montoEfectivo}</FormHelperText>)}
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "12pt",
                }}
              >
                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Siguiente
                  </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </Formik>
  );
};
