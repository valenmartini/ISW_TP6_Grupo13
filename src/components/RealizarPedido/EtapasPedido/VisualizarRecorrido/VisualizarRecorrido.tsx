import React, { useEffect, useState } from "react";
import { DatosEstados, EtapaProps, theme } from "../../RealizarPedido";
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

interface Tiempo {
  text?: string;
  value?: number;
}

export const VisualizarRecorrido = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
  etapa,
}: EtapaProps) => {
  const destino = datosEstados.direccionEntrega;
  const origen = datosEstados.direccionComercio;
  const [precio, setPrecio] = useState<number>(0);
  const [distancia, setDistancia] = useState<Distancia>();
  const [tiempo, setTiempo] = useState<Tiempo>();

  useEffect(() => {
    if (distancia?.value) {
      setPrecio(Math.floor(distancia.value / 100) * 10);
    }
  }, [distancia]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container justifyContent="center" sx={{ maxWidth: "920px" }}>
        <Grid item xs={12}>
          <Paper sx={{ marginBottom: "-24pt" }}>
            {etapa === 3 && (
              <GMap
                ruta={{ dirrecionOrigen: origen, dirrecionDestino: destino }}
                setDistancia={setDistancia}
                setTiempo={setTiempo}
              />
            )}
          </Paper>
          <Paper
            sx={{
              zIndex: "999",
              position: "relative",
              borderRadius: "36px 36px 0 0",
              height: "54vh",
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
                  marginBottom: "6pt",
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
                marginBottom: "6pt",
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
                marginBottom: "6pt",
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
                marginBottom: "12pt",
              }}
            >
              Tiempo estimado de entrega:{" "}
              <span style={{ color: "#0E182C", float: "right" }}>
                {tiempo?.text}
              </span>
            </Typography>
            <div
              style={{
                backgroundColor: "#FAF0CA",
                padding: "12pt",
                borderRadius: "24pt",
                textAlign: "center",
                paddingTop: "10pt",
                paddingRight: '13pt'
              }}
            >
              <Typography
                align="left"
                style={{
                  color: "#0E182C",
                  fontWeight: "bold",
                  marginLeft: "10pt",
                  fontSize: "1.3rem",
                }}
              >
                Precio:{" "}
                <span style={{ color: "#0E182C", float: "right" }}>
                  $ {precio}
                </span>
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "36px",
              }}
            >
              <ThemeProvider theme={theme}>
                <Button
                  onClick={() => {
                    setDatosEstados((prev: DatosEstados) => {
                      prev.visualizarRecorrido.total = precio;
                      prev.visualizarRecorrido.tiempo = tiempo?.value
                      return prev;
                    });
                    avanzarEtapa();
                  }}
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
