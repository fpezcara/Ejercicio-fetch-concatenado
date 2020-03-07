const form = document.forms[0];
const submit = form.elements[0];

form.onsubmit = e => {
  e.preventDefault();
  buscarClimaPorCiudad(submit.value);
};

const buscarClimaPorCiudad = ciudad => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=4a9575224a0bf83849d62ff1f25ae74d`
  )
    .then(res => res.json())
    .then(datosClimaActual => {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=metric&appid=4a9575224a0bf83849d62ff1f25ae74d`
      )
        .then(res => res.json())
        .then(datosPorHora => {
          const contenedor = document.querySelector("#contenedor");
          console.log(datosClimaActual);
          console.log(datosPorHora);
          const ciudad = datosClimaActual.name;
          const estadoClima = datosClimaActual.weather[0].description;
          const temperatura = datosClimaActual.main.temp;
          const precipitacion = datosClimaActual.clouds.all;
          const humedad = datosClimaActual.main.humidity;
          const viento = datosClimaActual.wind.speed;
          const iconoClima = datosClimaActual.weather[0].icon;

          const clima = `
    <div class="card">
<div class="arriba">
<h3 class="ciudad">${ciudad}</h3>
<p class="descripcion_clima">${estadoClima}</p>
</div>

<div class="abajo">
  <div class="clima">
      <img src="http://openweathermap.org/img/wn/${iconoClima}.png" alt="icono_weather">
      <p>${temperatura}</p><span>°C</span>
  </div>
  <div class="detalles">
      <p>Precipitación: ${precipitacion}%</p>
      <p>Humedad: ${humedad}%</p>
      <p>Viento: ${viento}m/s</p>
  </div>
</div>


</div>
    
    `;
          contenedor.innerHTML = clima;

          let fechaYHora = "";
          let iconoExtendido = "";
          let temperaturaExtendido = "";
          let detalleExtendido = "";
          let climaExtendido = "";
          // let climaExtendido = '';
          datosPorHora.list.map(datos => {
            fechaYHora = datos.dt_txt;
            iconoExtendido = datos.weather[0].icon;
            temperaturaExtendido = datos.main.temp;
            detalleExtendido = datos.weather[0].description;
            return (climaExtendido += `
            
        <div class="cardExtendido">
         <div class="hora-y-fecha">
         <span>${fechaYHora}</span>
         </div>
        <div class="temperatura-extendido">
              <img src="http://openweathermap.org/img/wn/${iconoExtendido}.png" alt="icono_weather">
              <p>${temperaturaExtendido}</p><span>°C</span>
          </div>
          <div class="descripcion-del-clima">
        <p>${detalleExtendido}</p>
        </div>
        </div>
        </div>
       
            
             `);
          });

          const contenedorClimaExtendido = document.querySelector("#contenedor-extendido");
          const contenedorTitulo = document.querySelector("#titulo-extendido");

          
          contenedorClimaExtendido.innerHTML = climaExtendido;
          contenedorTitulo.innerHTML = `<h1>Pronóstico Extendido</h1>`;
        });
      
    });
};

const buscarCiudad = "Londres";
