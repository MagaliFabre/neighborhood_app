import React, { useState } from 'react';
import axios from 'axios';

function AddressSuggest({ setAddress }) {
  const [query, setQuery] = useState('');

  const handleInputChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.length > 2) { // Commence à chercher après 2 caractères
      try {
        const response = await axios.get('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json', {
          params: {
            apikey: 'AIzaSyA8u9fgXmtkcJKH4VUNmzkDheIt0MhbemM',
            query: newQuery,
            maxresults: 5,
            country: 'FRA',
          }
        });

        // Logique pour traiter la réponse et éventuellement mettre à jour l'adresse
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des suggestions:', error);
      }
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Commencez à taper une adresse"
    />
  );
}

export default AddressSuggest;
