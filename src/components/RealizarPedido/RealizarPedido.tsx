import React, { useState } from "react";
import ItemABuscar from "./EtapasPedido/ItemABuscar/ItemABuscar";
import DireccionComercio from "./EtapasPedido/DireccionComercio/DireccionComercio";
import DireccionEntrega from "./EtapasPedido/DireccionEntrega/DireccionEntrega";
import { Button, IconButton, LinearProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { VisualizarRecorrido } from "./EtapasPedido/VisualizarRecorrido/VisualizarRecorrido";
import { PasarelaPago } from "./EtapasPedido/PasarelaPago/PasarelaPago";
import { ResumenFinal } from "./EtapasPedido/ResumenFinal/ResumenFinal";
import {createTheme, ThemeProvider} from "@mui/material/styles";

interface DatosEstados {
  itemABuscar: {
    descripcionItem?: string;
    imagenItem?: any;
  };
  direccionComercio: {
    calle?: string;
    numero?: number;
    ciudad?: string;
    referencia?: string | null;
  };
  direccionEntrega: {
    calle?: string;
    numero?: number;
    ciudad?: string;
    referencia?: string | null;
  };
  visualizarRecorrido: {
    total?: number;
  };
  pasarelaPago: {
    formaDePago?: string;
    montoEfectivo?: number;
    datosTarjeta?: {
      numeroTarjeta: string;
      fechaVencimiento: string;
      codigoSeguridad: number;
    };
    datosTitular?: {
      nombreTitular: string;
      apellidoTitular: string;
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
}

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
    setEtapaActual(etapaActual + 1);
    setReverse(false);
  };

  const volverEtapa = () => {
    setEtapaActual(etapaActual - 1);
    setReverse(true);
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
        />
      ),
    },
    {
      idEtapa: 4,
      componente: (
        <PasarelaPago
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
    {
      idEtapa: 5,
      componente: (
        <ResumenFinal
          datosEstados={datosEstados}
          setDatosEstados={setDatosEstados}
          avanzarEtapa={avanzarEtapa}
        />
      ),
    },
  ];

  const transitionStyle = {
    transition: "all 0.5s ease",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    opacity: 0,
    transform: `translateX(${reverse ? "100%" : "-100%"})`,
  };

  const activeStyle = {
    opacity: 1,
    transform: "translateX(0)",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E182C",
      },
    },
  });

  return (
    <div>
      <div>
        <ThemeProvider theme={theme}>
          <LinearProgress
            variant="determinate"
            value={(etapaActual / 5) * 100}
            color="primary"
          />
        </ThemeProvider>
      </div>
      <div>
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
            style={{
              backgroundColor: "#ede8e8",
              borderRadius: "50%",
              width: "26pt",
              height: "26pt",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "12px 3px 19px -11px rgba(0,0,0,0.21)",
            }}
          >
            <ArrowBackIcon />
          </div>
        </IconButton>
      </div>
      <div style={{ position: "relative" }}>
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
              style={{ display: "flex", width: "100%", position: "absolute" }}
            >
              {componente}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "48pt",
        }}
      >
        <Button
          onClick={avanzarEtapa}
          variant="contained"
          style={{ backgroundColor: "#0E182C", textTransform: 'none', fontWeight: 'bold' }}
          endIcon={<ArrowForwardIcon />}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
