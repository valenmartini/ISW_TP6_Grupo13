import React from "react";
import { DatosEstados, EtapaProps, theme } from "../../RealizarPedido";
import {
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ItemABuscar = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
}: EtapaProps) => {
  const [file, setFile] = React.useState();
  const [producto, setProd] = React.useState<string>("");
  const [warn, setWarn] = React.useState(false);

  const handleChangeFoto = (newFile: any) => {
    
    setFile(newFile);
  };

  const handleChangePorducto = (evento: any) => {
    setProd(evento.target.value);
  };

  function validate_prod() {
    if (producto != "") {
      setDatosEstados((prev: DatosEstados) => {
        prev.itemABuscar.imagenItem = file? URL.createObjectURL(file): null;
        prev.itemABuscar.descripcionItem = producto;
        return prev;
      });
      avanzarEtapa();
    } else setWarn(true);
  }

  return (
    <Container style={{ display: "flex", justifyContent: "center", maxWidth: '500px' }}>
      <form>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography
              textAlign="center"
              style={{
                color: "#0E182C",
                fontWeight: "bold",
                marginTop: "24pt",
                marginBottom: "16pt",
              }}
            >
              Describa el producto que quiere recibir
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Descripcion del Producto*"
              onChange={handleChangePorducto}
              variant="outlined"
              error={warn}
              helperText={warn ? "Este campo es requerido" : null}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <MuiFileInput
              value={file}
              label="Imagen del Producto"
              onChange={handleChangeFoto}
              fullWidth
              inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography style={{ color: "lightgray", fontSize: "0.8rem" }}>
              Los campos con * son obligatorios
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "48pt",
              }}
            >
              <ThemeProvider theme={theme}>
                <Button
                  onClick={validate_prod}
                  variant="contained"
                  style={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Siguiente
                </Button>
              </ThemeProvider>
            </div>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ItemABuscar;
