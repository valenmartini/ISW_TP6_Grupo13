import React, { useEffect, useState } from "react";
import { DatosEstados, EtapaProps } from "../../RealizarPedido";
import { Formik } from "formik";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaymentIcon from "@mui/icons-material/Payment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

export const FormatoPago = (props: EtapaProps) => {
  const [formaPago, setFormaPago] = useState(-1);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!error) null;
    if (formaPago >= 0) setError(false);
  }, [formaPago, error]);
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        if (formaPago < 0) {
          setError(true);
          return;
        }
        props.setDatosEstados((prev: DatosEstados) => {
          prev.pasarelaPago.formaDePago = formaPago;
          return prev;
        });
        props.avanzarEtapa();
      }}
    >
      {({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Container sx={{ marginBottom: "24pt" }}>
            <Typography
              align="center"
              style={{
                color: "#0E182C",
                fontWeight: "bold",
                marginTop: "24pt",
              }}
            >
              Elige tu metodo de pago
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: "24pt" }}>
              <Grid item xs={6}>
                <Item
                  sx={{
                    border: `3px solid ${
                      formaPago === 0 ? "#0E182C" : "white"
                    }`,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFormaPago(0);
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        backgroundColor: "#0E182C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        height: "36pt",
                        width: "36pt",
                      }}
                    >
                      <AttachMoneyIcon
                        sx={{ color: "white", fontSize: "1.8rem" }}
                      />
                    </div>
                  </div>
                  <Typography
                    fontWeight={"bold"}
                    sx={{
                      color: "#1A1A1A",
                      marginTop: "8pt",
                      fontSize: "0.8rem",
                    }}
                  >
                    Efectivo
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item
                  sx={{
                    border: `3px solid ${
                      formaPago === 1 ? "#0E182C" : "white"
                    }`,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFormaPago(1);
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        backgroundColor: "#0E182C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        height: "36pt",
                        width: "36pt",
                      }}
                    >
                      <PaymentIcon
                        sx={{ color: "white", fontSize: "1.8rem" }}
                      />
                    </div>
                  </div>
                  <Typography
                    fontWeight={"bold"}
                    sx={{
                      color: "#1A1A1A",
                      marginTop: "8pt",
                      fontSize: "0.8rem",
                    }}
                  >
                    Tarjeta de credito
                  </Typography>
                </Item>
              </Grid>
            </Grid>
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
                style={{
                  backgroundColor: "#0E182C",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Siguiente
              </Button>
            </div>
          </Container>
        </form>
      )}
    </Formik>
  );
};
