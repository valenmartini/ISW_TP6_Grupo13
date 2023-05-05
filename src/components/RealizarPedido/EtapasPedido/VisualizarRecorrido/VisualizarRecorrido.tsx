import React, { useState } from "react";
import { EtapaProps } from "../../RealizarPedido";
import { DatosEstados } from "../../RealizarPedido";
import { useLoadScript } from "@react-google-maps/api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { GMap, dirToString } from "@component/components/utils/GMap";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";

interface Distancia {
  text?: string;
  value?: number;
}

export const VisualizarRecorrido = ({ datosEstados, setDatosEstados, avanzarEtapa, etapa }: EtapaProps) => {
  const origen = datosEstados.direccionEntrega;
  const destino = datosEstados.direccionComercio;
  const [distancia, setDistancia] = useState<Distancia>();
  return (
    <Grid container justifyContent={"center"} alignContent={"center"} spacing={2} marginTop={"20pt"}>
      <Grid item xs={8} md={4}>
        <Paper>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={12} >
              <Typography
                align="center"
                style={{
                  color: "#0E182C",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Tu recorrido
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                align="left"
                style={{
                  color: "#0E182C",
                  fontWeight: "bold",
                  marginLeft: "10pt",
                }}
              >
                Dirrecion de entrega: {dirToString(destino)}
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography
                align="left"
                style={{
                  color: "#0E182C",
                  fontWeight: "bold",
                  marginLeft: "10pt",
                }}
              >
                Dirrecion del comercio: {dirToString(origen)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                align="left"
                style={{
                  color: "#0E182C",
                  fontWeight: "bold",
                  marginLeft: "10pt",
                }}
              >
                Distancia del recorrido: {distancia?.text}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                align="left"
                style={{
                  color: "#0E182C",
                  fontWeight: "bold",
                  marginLeft: "10pt",
                }}
              >
                Tiempo estimado de entrega:
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                align="left"
                style={{
                  color: "#0E182C",
                  fontWeight: "bold",
                  marginLeft: "10pt",
                }}
              >
                Precio
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper>{etapa === 3 && <GMap ruta={{ dirrecionOrigen: origen, dirrecionDestino: destino }} setDistancia={setDistancia} />}</Paper>
      </Grid>
      <Grid item xs={12} md={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={avanzarEtapa}
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
  );
};
