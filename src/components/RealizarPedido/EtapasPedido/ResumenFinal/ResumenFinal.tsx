import React, { useState } from 'react'
import { EtapaProps } from '../../RealizarPedido'

// export const ResumenFinal = (props: EtapaProps) => {
//   const { itemABuscar, direccionComercio, direccionEntrega, pasarelaPago, visualizarRecorrido } = props.datosEstados
  
//   return (
//     <div>ResumenFinal</div>
//   )
// }

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
  const direccionEntregaCompleta = direccionEntrega.calle && direccionEntrega.numero ? direccionEntrega.calle + direccionEntrega.numero : "";

  const [horaRecepcion, setHoraRecepcion] = useState('')
  const [time, setTime] = useState('00:00')

  const handleChange = (event: SelectChangeEvent) => {
    setHoraRecepcion(event.target.value as string);
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
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Direccion de Entrega" secondary={direccionEntregaCompleta} />
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
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccessTimeIcon />
          </Avatar>
        </ListItemAvatar>
        {/* <ListItemText primary="Hora de Envio" secondary={resumenFinal.horaEnvio} /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Hora de Envio</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={horaRecepcion ? horaRecepcion.toString() : '1'}
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
          <InputLabel id="demo-simple-select-label">Hora de Envio</InputLabel>
          <Input
            type="time"
            value={time}
            onChange={handleChange2}
          />
        </FormControl>
      </ListItem>
    </List>
  );
}

export default ResumenFinal;