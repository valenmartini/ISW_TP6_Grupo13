import React, { useState } from 'react'
import { EtapaProps } from '../../RealizarPedido'
import dayjs from 'dayjs';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Avatares
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const style = {
  width: '100%',
  maxWidth: '700px',
  margin: "auto",
  bgcolor: 'background.paper',
};

export const ResumenFinal = (props: EtapaProps) => {
  const { itemABuscar, direccionComercio, direccionEntrega, pasarelaPago, visualizarRecorrido, resumenFinal } = props.datosEstados

  const direccionComercioCompleta = direccionComercio.calle && direccionComercio.numero ? direccionComercio.calle + " " +  direccionComercio.numero : "";
  const direccionEntregaCompleta = direccionEntrega.calle && direccionEntrega.numero ? direccionEntrega.calle + " " + direccionEntrega.numero : "";
  const numeroTarjetaCodificado = pasarelaPago.datosTarjeta?.numeroTarjeta ? 'XXXX-XXXX-XXXX-' + pasarelaPago.datosTarjeta?.numeroTarjeta.slice(-4) : '';

  const now = dayjs();
  const horaMinimaEnvio = now.add(15, 'minute');
  const horaMinimaEnvioFormat = now.add(15, 'minute').format('HH:mm');

  const [horaRecepcion, setHoraRecepcion] = useState('1');
  const [time, setTime] = useState(horaMinimaEnvioFormat);
  const [readOnly, setReadOnly] = useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setHoraRecepcion(event.target.value as string);
    if (horaRecepcion === '2') {
      setTime(horaMinimaEnvioFormat);
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  };

  const handleChange2 = (event: any) => {
    setTime(event.target.value);
  };

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ShoppingCartIcon />
          </Avatar>
        </ListItemAvatar>       
        <ListItemText primary="Item a Buscar" secondary={itemABuscar.descripcionItem} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StoreIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Direccion del Comercio" secondary={direccionComercioCompleta} />
        {direccionComercio.referencia && (
          <ListItemText primary="Referencia" secondary={direccionComercio.referencia} />
        )}
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Direccion de Entrega" secondary={direccionEntregaCompleta} />
        {direccionEntrega.referencia && (
          <ListItemText primary="Referencia" secondary={direccionEntrega.referencia} />
        )}
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AttachMoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Monto a Pagar" secondary={"$" + visualizarRecorrido.total} />
      </ListItem>
      <Divider />
      <ListItem>        
        <ListItemAvatar>
          <Avatar>
            <AccountBalanceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Forma de Pago" secondary={pasarelaPago.formaDePago} />
      </ListItem>
      <Divider />
      {pasarelaPago.formaDePago === '0' && (
        <React.Fragment>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="¿Con Cuánto Pagas?" secondary={"$" + pasarelaPago.montoEfectivo} />
          </ListItem>
          <Divider />
        </React.Fragment>
      )}
      {pasarelaPago.formaDePago === '1' && (
        <React.Fragment>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Tarjeta Utilizada" secondary={numeroTarjetaCodificado} />
          </ListItem>
          <Divider />
        </React.Fragment>
      )}
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccessTimeIcon />
          </Avatar>
        </ListItemAvatar>
        {/* <ListItemText primary="Hora de Envio" secondary={resumenFinal.horaEnvio} /> */}
        <FormControl fullWidth>
          <InputLabel>Hora de Envio</InputLabel>
          <Select
            value={horaRecepcion ? horaRecepcion.toString() : '2'}
            label="Hora de Envio"
            onChange={handleChange}
          >
            <MenuItem value={'1'}>Lo antes posible</MenuItem>
            <MenuItem value={'2'}>Elegir hora de recepcion</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel>Hora de Envio</InputLabel>
          <Input
            type="time"
            value={time}
            readOnly={readOnly}
            onChange={handleChange2}
          />
        </FormControl>
      </ListItem>
    </List>
  );
}

export default ResumenFinal;