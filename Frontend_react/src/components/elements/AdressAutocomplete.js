import React from 'react';
import Autocomplete from 'react-google-autocomplete';

function AddressAutocomplete({ onAddressSelect }) {
  return (
    <Autocomplete
      style={{ width: '100%' }}
      onPlaceSelected={(place) => {
        onAddressSelect(place.formatted_address); // Ou toute autre propriété pertinente de l'objet 'place'
      }}
      types={['address']}
      componentrestrictions={{country: 'fr'}}
    />
  );
}

export default AddressAutocomplete;
