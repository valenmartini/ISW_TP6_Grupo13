import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { TextField } from '@mui/material';

function DireccionComercio() {
  const [direccion, setDireccion] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [referencia, setReferencia] = useState('');

  const handleSelect = async (address: string) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    const direccionCompleta = results[0].formatted_address;
    setDireccion(direccionCompleta);
  };

  return (
    <div>
      <h2>Indica la dirección de tu comercio</h2>
      <TextField
        id="calle"
        label="Calle"
        value={calle}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCalle(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        id="numero"
        label="Número"
        value={numero}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNumero(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        id="ciudad"
        label="Ciudad"
        value={ciudad}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCiudad(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        id="referencia"
        label="Referencia"
        value={referencia}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setReferencia(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <PlacesAutocomplete
        value={direccion}
        onChange={setDireccion}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({ placeholder: 'Busca tu dirección...' })}
              sx={{ marginBottom: '16px' }}
            />
            <div>
              {loading ? <div>Cargando...</div> : null}

              {suggestions.map((suggestion) => {
  const style = {
    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
  };
  return (
    <div
      {...getSuggestionItemProps(suggestion, { style })}
      key={suggestion.placeId}
    >
      {suggestion.description}
    </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default DireccionComercio;