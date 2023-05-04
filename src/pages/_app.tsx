import "@component/styles/globals.css";
import type { AppProps } from "next/app";
import DireccionComercio from "./../components/RealizarPedido/EtapasPedido/DireccionComercio/DireccionComercio";
import DireccionEntrega from "./../components/RealizarPedido/EtapasPedido/DireccionEntrega/DireccionEntrega";
import { RealizarPedido } from "@component/components/RealizarPedido/RealizarPedido";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RealizarPedido />
    </div>
  );
}
