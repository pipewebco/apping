const fetch = require('node-fetch');

var countryIdT = 'CO';

getCounties();
findCountry(countryIdT);

function getCounties() {
  fetch('https://api.garantto.com/api/v1/pais')
  .then(res => res.json())
  .then(data => {
    console.log('Punto #1: ' + data.length + ' registros');
    console.log(data);
  });
}

function findCountry(countryIdT) {
  fetch('https://api.garantto.com/api/v1/pais')
  .then(res => res.json())
  .then(data => {
    country = data.find(country => country.IdT === countryIdT);
    if (country) {
      console.log('Punto #2');
      getCategories(country.Id);

    } else {
      console.log('Punto #2');
      console.log('No existe el país con IdT igual a CO');
    }
  });
}

function getCategories(countryId) {
  fetch('https://api.garantto.com/api/v1/categoria?idPais=' + countryId)
  .then(res => res.json())
  .then(data => {
    categorias = data.filter(categoria => categoria.Hijos.find(hijo => hijo.IdT == 'Carro' || hijo.IdT == 'Televisor'));
    console.log(categorias.map(categoria => categoria.Descripcion))
  });
}