const container = document.querySelector('container');
const resultado = document.querySelector('#resultado');
const formulario =document.querySelector('#formulario');



//nueva forma de cargar y escuchar el dom
window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})

//se pasa el evento del formulario en e
function buscarClima(e){
    e.preventDefault();
    
    
    //validar
        const ciudad = document.querySelector('#ciudad').value;
        const pais = document.querySelector('#pais').value;

        //console.log(ciudad)
        //console.log(pais)



        //validando el formulario

        if(ciudad ==='' || pais ===''){
            //hubo un herror
            mostraError('Ambos campos son obligatorios')
            return; //detenemos la ejecucion
        }




    //consultar la api

    consultarApi(ciudad, pais)

}


function mostraError(mensaje){
    //console.log(mensaje)

    const alerta = document.querySelector('.bg-red-100');
    
    
    //crear alerta con scripting
    if(!alerta){

        const alerta = document.createElement('div')
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md',
        'mx-auto','mt-6','text-center');

        alerta.innerHTML=`
                <strong class="font-bold">ERROR!</strong>
                <span class="block">${mensaje}</span>
        `;


        //cargamos el scripting creado al dom
        formulario.appendChild(alerta);
        setTimeout(()=>{
            alerta.remove();
            formulario.reset();
           
        }, 3000)
        
    }
}


//consultar nal servidor
function consultarApi(ciudad, pais){
    const appId = '2ba26f921e7594b5dd39b90fcced2012';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    //llamamos a la funcion del spinner
    spinner();

    setTimeout(() => {
        fetch(url)
        .then( respuesta => respuesta.json())
        .then(datos =>{
            console.log(datos)
            limpiarHtml();
            if(datos.cod ==="404"){
                mostraError('Ciudad No Encontrada en el Servidor de Clima')
                return;
            }

            //imprime la respuesta en el html
            mostrarClima(datos);
            formulario.reset();
        })
    }, 2000);

   

    //console.log(url)

    

}

function spinner(){
    

    //limpiamos html previo
    

   
        limpiarHtml()
        const divSpinner = document.createElement('div');
    divSpinner.classList.add('.sk-cube-grid');
    divSpinner.innerHTML = `
            <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
            </div>
    `;

        resultado.appendChild(divSpinner)
  

    
    
}


function mostrarClima(datos){
    
   
    
    //le asemos destruction al objeto datos
    const{ name, main:{temp, temp_max, temp_min}} = datos;
      centigrados = dekelvinAcentigrados(temp);
      centigrados_max= dekelvinAcentigrados(temp_max);
      centigrados_min = dekelvinAcentigrados(temp_min);

      const ciudad = name;

      //agregamos la ciudad
      const ciudadActual = document.createElement('p');
      //agregamos el scripting con html 5 por ende va innerhtml
      ciudadActual.textContent = `${ciudad} `;
      ciudadActual.classList.add('text-xl');

      

    //pasar de temperatura kelvin a grados  (valor - 273.15)

    //creamos el scripting
    const actual = document.createElement('p');
    //agregamos el scripting con html 5 por ende va innerhtml
    actual.innerHTML = `${centigrados} &#8451; `;
    actual.classList.add('font-bold', 'text-6xl');

    //creamos el parrafod de la temperatura maxima
    const temperaturaMAxima = document.createElement('p');
    //agregamos el scripting con html 5 por ende va innerhtml
    temperaturaMAxima.innerHTML = `Max: ${centigrados_max} &#8451; `;
    temperaturaMAxima.classList.add('text-xl');

    //creamos el parrafod de la temperatura minima
    const temperaturaMinima = document.createElement('p');
    //agregamos el scripting con html 5 por ende va innerhtml
    temperaturaMinima.innerHTML = `Min: ${centigrados_min} &#8451; `;
    temperaturaMinima.classList.add('text-xl');

    //creamos el div que contendra el parrafo

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(ciudadActual);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temperaturaMAxima);
    resultadoDiv.appendChild(temperaturaMinima);

    resultado.appendChild(resultadoDiv);
    

    console.log('temperatura: '+ centigrados + '  temperatura maxima : ' + centigrados_max + '  temperatura minima :' + centigrados_min)
}

/*
function dekelvinAcentigrados(grados){
    //formateamos el codigo
    return parseInt(grados - 273.15);
}
*/
const dekelvinAcentigrados = grados => parseInt(grados - 273.15);





function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}