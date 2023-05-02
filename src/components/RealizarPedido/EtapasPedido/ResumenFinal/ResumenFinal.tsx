import React from 'react'
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

// Avatares
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const style = {
  width: '100%',
  maxWidth: '360px',
  margin: "auto",
  bgcolor: 'background.paper',
};

export const ResumenFinal = (props: EtapaProps) => {
  const { itemABuscar, direccionComercio, direccionEntrega, pasarelaPago, visualizarRecorrido, resumenFinal } = props.datosEstados

  const direccionComercioCompleta = direccionComercio.calle && direccionComercio.numero ? direccionComercio.calle + " " +  direccionComercio.numero : "";
  const direccionEntregaCompleta = direccionEntrega.calle && direccionEntrega.numero ? direccionEntrega.calle + direccionEntrega.numero : "";

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
        <ListItemText primary="Hora de Envio" secondary={resumenFinal.horaEnvio} />
      </ListItem>
    </List>
  );
}

export default ResumenFinal;