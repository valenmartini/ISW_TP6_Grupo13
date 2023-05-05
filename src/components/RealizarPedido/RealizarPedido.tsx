import React, { useState } from "react";
import ItemABuscar from "./EtapasPedido/ItemABuscar/ItemABuscar";
import DireccionComercio from "./EtapasPedido/DireccionComercio/DireccionComercio";
import DireccionEntrega from "./EtapasPedido/DireccionEntrega/DireccionEntrega";
import { AppBar, Box, Button, IconButton, LinearProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { VisualizarRecorrido } from "./EtapasPedido/VisualizarRecorrido/VisualizarRecorrido";
import { PasarelaPago } from "./EtapasPedido/PasarelaPago/PasarelaPago";
import { ResumenFinal } from "./EtapasPedido/ResumenFinal/ResumenFinal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormatoPago } from "./EtapasPedido/FormatoPago/FormatoPago";
import PedidoRegistrado from "./EtapasPedido/ResumenFinal/PedidoRegistrado";

export interface Direccion {
  calle?: string;
  numero?: number;
  ciudad?: string;
  referencia?: string | null;
}

export interface DatosEstados {
  itemABuscar: {
    descripcionItem?: string;
    imagenItem?: any;
  };
  direccionComercio: Direccion;
  direccionEntrega: Direccion;
  visualizarRecorrido: {
    total?: number;
    tiempo?: number;
  };
  pasarelaPago: {
    formaDePago?: number;
    montoEfectivo?: number;
    datosTarjeta?: {
      numeroTarjeta?: string;
      fechaVencimiento?: string;
      codigoSeguridad?: number;
    };
    datosTitular?: {
      nombreTitular?: string;
      apellidoTitular?: string;
    };
  };
  resumenFinal: {
    horaEnvio?: string;
  };
}

interface Etapa {
  idEtapa: number;
  componente: JSX.Element;
}

export interface EtapaProps {
  datosEstados: DatosEstados;
  setDatosEstados: any;
  avanzarEtapa: any;
  etapa?: number;
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F95738",
    },
  },
});

export const RealizarPedido = () => {
  const [etapaActual, setEtapaActual] = useState<number>(0);
  const [reverse, setReverse] = useState(false);
  const [datosEstados, setDatosEstados] = useState<DatosEstados>({
    itemABuscar: {},
    direccionComercio: {},
    direccionEntrega: {},
    visualizarRecorrido: {},
    pasarelaPago: {},
    resumenFinal: {},
  });

  const avanzarEtapa = () => {
    if (etapaActual < 7) {
      setEtapaActual(etapaActual + 1);
      setReverse(false);
    }
  };

  const volverEtapa = () => {
    if (etapaActual > 0) {
      setEtapaActual(etapaActual - 1);
      setReverse(true);
    }
  };

  const etapas: Etapa[] = [
    {
      idEtapa: 0,
      componente: (
        <ItemABuscar
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
    {
      idEtapa: 1,
      componente: (
        <DireccionComercio
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
    {
      idEtapa: 2,
      componente: (
        <DireccionEntrega
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
    {
      idEtapa: 3,
      componente: (
        <VisualizarRecorrido
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
          etapa={etapaActual}
        />
      ),
    },
    {
      idEtapa: 4,
      componente: (
        <FormatoPago
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
    {
      idEtapa: 5,
      componente: (
        <PasarelaPago
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
    {
      idEtapa: 6,
      componente: (
        <ResumenFinal
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
    {
      idEtapa: 7,
      componente: (
        <PedidoRegistrado
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
  ];

  return (
    <>
      <Box>
        <AppBar></AppBar>
      </Box>
      <ThemeProvider theme={theme}>
        <LinearProgress
          variant="determinate"
          value={(etapaActual / 7) * 100}
          color="primary"
        />
      </ThemeProvider>
      <>
        <IconButton
          onClick={volverEtapa}
          style={{
            position: "absolute",
            left: "12pt",
            top: "18pt",
            zIndex: "999",
          }}
        >
          <div
            className="light-background-color"
            style={{
              borderRadius: "50%",
              width: "26pt",
              height: "26pt",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "12px 3px 19px -11px rgba(0,0,0,0.21)",
            }}
          >
            <ArrowBackIcon className="dark-color" />
          </div>
        </IconButton>
      </>
      <div className="multi-step-container" style={{ position: "relative" }}>
        {etapas.map(({ idEtapa, componente }) => {
          const activeClass =
            etapaActual === idEtapa
              ? "active"
              : etapaActual >= idEtapa
              ? "prev"
              : "next";
          return (
            <div
              className={`multi-step-content ${activeClass}`}
              key={idEtapa}
              style={{ width: "100%" }}
            >
              {componente}
            </div>
          );
        })}
      </div>
    </>
  );
};
