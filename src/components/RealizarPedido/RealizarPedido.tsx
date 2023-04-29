import React, { useState } from "react";
import ItemABuscar from "./EtapasPedido/ItemABuscar/ItemABuscar";
import { DireccionComercio } from "./EtapasPedido/DireccionComercio/DireccionComercio";
import { DireccionEntrega } from "./EtapasPedido/DireccionEntrega/DireccionEntrega";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      componente: <ItemABuscar />,
    },
    {
      idEtapa: 1,
      componente: <DireccionComercio />,
    },
    {
      idEtapa: 2,
      componente: <DireccionEntrega />,
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

  return (
    <div>
      <div>
        <IconButton
          onClick={volverEtapa}
          style={{
            position: "absolute",
            left: "24pt",
            top: "24pt",
            zIndex: "999",
          }}
        >
          <div
            style={{
              backgroundColor: "#ede8e8",
              borderRadius: "50%",
              width: "28pt",
              height: "28pt",
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
      {etapas.map(({ idEtapa, componente }) => (
        <div
          key={idEtapa}
          style={idEtapa === etapaActual ? activeStyle : transitionStyle}
        >
          {componente}
        </div>
      ))}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "24pt" }}
      >
        <Button
          onClick={avanzarEtapa}
          variant="contained"
          style={{ marginLeft: "24pt", backgroundColor: '#0E182C' }}
          endIcon={<ArrowForwardIcon />}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
