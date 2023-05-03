import {
  DatosEstados,
  EtapaProps,
} from "@component/components/RealizarPedido/RealizarPedido";
import {
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as Yup from "yup";

type Focused = "name" | "number" | "expiry" | "cvc" | "";

interface CardState {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused;
}

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .min(16, "Ingrese un numero de tarjeta correcto")
    .max(16, "Ingrese un numero de tarjeta correcto")
    .matches(/^4.+$/, "Por el momento solo aceptamos tarjetas Visa")
    .required("Campo requerido"),
  name: Yup.string()
    .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Debes ingresar nombre y apellido")
    .required("Campo requerido"),
  cvc: Yup.string()
    .matches(/^[0-9]+$/, "Ingrese un codigo de seguridad valido").min(3,"Ingrese un codigo de seguridad valido").max(3,"Ingrese un codigo de seguridad valido")
    .required("Campo requerido"),
  expiry: Yup.string().required("Campo requerido").min(7,"Ingrese una fecha valida").max(7,"Ingrese una fecha valida"),
});

export const PagoTarjeta = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
}: EtapaProps) => {
  const [state, setState] = useState<CardState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt: any) => {
    const { name, value } = evt.target;

    setState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#415D23",
      },
    },
  });

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          number: datosEstados.pasarelaPago.datosTarjeta?.numeroTarjeta,
          expiry: datosEstados.pasarelaPago.datosTarjeta?.fechaVencimiento,
          cvc: datosEstados.pasarelaPago.datosTarjeta?.codigoSeguridad,
          name: datosEstados.pasarelaPago.datosTitular?.nombreTitular,
        }}
        onSubmit={(values: {
          numeroTarjeta: any;
          fechaVencimiento: any;
          codigoSeguridad: any;
          nombreTitular: any;
          apellidoTitular: any;
        }) => {
          setDatosEstados((prev: DatosEstados) => {
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
          avanzarEtapa();
        }}
      >
        {({ handleSubmit, errors, touched, handleChange }) => (
            <Container sx={{ padding: "12pt" }}>
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid
                  container
                  sx={{ maxWidth: "500px", marginTop: "8pt" }}
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="number"
                      label="Numero de Tarjeta"
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      onFocus={handleInputFocus}
                      error={touched.number && Boolean(errors.number)}
                      helperText={touched.number && errors.number}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Nombre del Titular"
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      onFocus={handleInputFocus}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="expiry"
                      label="Fecha de Vencimiento"
                      error={touched.expiry && Boolean(errors.expiry)}
                      helperText={touched.expiry && errors.expiry}
                      onChange={(event) => {
                        const { value } = event.target;
                        let formattedValue = value;

                        // Insertamos la barra en la posición correcta
                        if (value.length == 2) {
                          formattedValue = `${value.slice(0, 2)}/${value.slice(
                            2
                          )}`;
                        }
                        event.target.value = formattedValue;
                        handleInputChange(event);
                        handleChange(event);
                      }}
                      onFocus={handleInputFocus}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="cvc"
                      label="Codigo de Seguridad"
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      onFocus={handleInputFocus}
                      error={touched.cvc && Boolean(errors.cvc)}
                      helperText={touched.cvc && errors.cvc}
                    />
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
          )
        }
      </Formik>
    </>
  );
};
