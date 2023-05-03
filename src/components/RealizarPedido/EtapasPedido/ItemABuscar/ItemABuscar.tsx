import React from "react";
import { EtapaProps } from "../../RealizarPedido";
import { Button, Grid, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const ItemABuscar = ({
  datosEstados,
  setDatosEstados,
  avanzarEtapa,
}: EtapaProps) => {
  const [file, setFile] = React.useState(null);
  const [producto, setProd] = React.useState<string>("");
  const [warn, setWarn] = React.useState(false);

  const handleChangeFoto = (newFile: any) => {
    setFile(newFile);
  };

  const handleChangePorducto = (evento:any) => {
    setProd(evento.target.value);
  };

  

  function validate_prod() {

    if (producto != ""){
      avanzarEtapa()

    }
    else
      setWarn(true)
      

  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "32pt" }}
    >
      <form>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Producto"
              onChange={handleChangePorducto}
              variant="outlined"
              error={warn}
              helperText={warn?"Este campo es requerido":null}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <MuiFileInput
              value={file}
              label="Foto(opc)"
              onChange={handleChangeFoto}
              fullWidth
              //InputProps={accept:"application/png"}
              inputProps={{accept:"application/png"}}
            />
          </Grid>

          <Grid item xs={10}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "48pt",
              }}
            >
              <Button
                onClick={validate_prod}
                variant="contained"
                style={{
                  backgroundColor: "#0E182C",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Siguiente
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ItemABuscar;
