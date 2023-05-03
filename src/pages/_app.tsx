import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import DireccionComercio from "./../components/RealizarPedido/EtapasPedido/DireccionComercio/DireccionComercio";
import DireccionEntrega from "./../components/RealizarPedido/EtapasPedido/DireccionEntrega/DireccionEntrega";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <><div>
      <DireccionComercio />
      <DireccionEntrega />
    </div><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbfBvd17eO9x_r_80zR2LycNeRIBiTM_M&libraries=places"></script></>

  );
}
