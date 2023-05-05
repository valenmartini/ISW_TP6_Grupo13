import React from "react";
import { EtapaProps } from "../../RealizarPedido";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Container, Grid, Typography } from "@mui/material";

export const PedidoRegistrado = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
  etapa,
}: EtapaProps) => {
  return (
    <React.Fragment>
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: "200px" }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CheckCircleIcon sx={{ color: "green", fontSize: "20vh" }} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                fontWeight="bold"
                sx={{ fontSize: "1.4rem", marginTop: "12pt" }}
              >
                Tu pedido fue registrado con exito
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default PedidoRegistrado;
