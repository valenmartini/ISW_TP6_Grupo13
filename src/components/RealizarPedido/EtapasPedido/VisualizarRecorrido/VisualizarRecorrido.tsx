import React, { useState } from "react";
import { EtapaProps, theme } from "../../RealizarPedido";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { GMap, dirToString } from "@component/components/utils/GMap";
import {
  Button,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";

interface Distancia {
  text?: string;
  value?: number;
}

export const VisualizarRecorrido = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
  etapa,
}: EtapaProps) => {
  const origen = datosEstados.direccionEntrega;
  const destino = datosEstados.direccionComercio;
  const [distancia, setDistancia] = useState<Distancia>();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container justifyContent="center" sx={{ maxWidth: "920px" }}>
        <Grid item xs={12}>
          <Paper sx={{ marginBottom: "-16pt" }}>
            {etapa === 3 && (
              <GMap
                ruta={{ dirrecionOrigen: origen, dirrecionDestino: destino }}
                setDistancia={setDistancia}
              />
            )}
          </Paper>
          <Paper
            sx={{
              zIndex: "999",
              position: "relative",
              borderRadius: "36px 36px 0 0",
              height: "52vh",
              padding: "12pt",
              paddingRight: "24pt",
            }}
          >
            <Grid item xs={12} md={12}>
              <Typography
                align="center"
                style={{
                  color: "#0D3B66",
                  fontWeight: "bold",
                  fontSize: "30px",
                  marginBottom: "24pt",
                }}
              >
                Recorrido
              </Typography>
              <Typography
                align="left"
                style={{
                  color: "#b7b7b7",
                  fontWeight: "bold",
                  marginLeft: "10pt",
                  marginBottom: "8pt",
                }}
              >
                Dirrecion de entrega:{" "}
                <span style={{ color: "#0E182C", float: "right" }}>
                  {dirToString(destino)}
                </span>
              </Typography>
            </Grid>
            <Typography
              align="left"
              style={{
                color: "#b7b7b7",
                fontWeight: "bold",
                marginLeft: "10pt",
                marginBottom: "8pt",
              }}
            >
              Dirrecion del comercio:{" "}
              <span style={{ color: "#0E182C", float: "right" }}>
                {dirToString(origen)}
              </span>
            </Typography>
            <Typography
              align="left"
              style={{
                color: "#b7b7b7",
                fontWeight: "bold",
                marginLeft: "10pt",
                marginBottom: "8pt",
              }}
            >
              Distancia del recorrido:{" "}
              <span style={{ color: "#0E182C", float: "right" }}>
                {distancia?.text}
              </span>
            </Typography>
            <Typography
              align="left"
              style={{
                color: "#b7b7b7",
                fontWeight: "bold",
                marginLeft: "10pt",
                marginBottom: "8pt",
              }}
            >
              Tiempo estimado de entrega:
            </Typography>
            <Typography
              align="left"
              style={{
                color: "#b7b7b7",
                fontWeight: "bold",
                marginLeft: "10pt",
                marginBottom: "8pt",
              }}
            >
              Precio
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "56px",
              }}
            >
              <ThemeProvider theme={theme}>
                <Button
                  onClick={avanzarEtapa}
                  variant="contained"
                  style={{ textTransform: "none", fontWeight: "bold" }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Siguiente
                </Button>
              </ThemeProvider>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
