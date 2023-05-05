import React from 'react';

const PedidoRegistrado = () => {
  return (
    <div style={{backgroundColor: '#d4edda', border: '1px solid #c3e6cb', padding: '1rem'}}>
      <span style={{color: '#155724', fontSize: '2rem', marginRight: '0.5rem', verticalAlign: 'middle'}}>
        &#10003;
      </span>
      <span style={{color: '#155724', fontSize: '1.5rem', verticalAlign: 'middle'}}>
        Pedido Confirmado
      </span>
    </div>
  );
};

export default PedidoRegistrado;
