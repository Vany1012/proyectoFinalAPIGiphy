window.onload = (e) => {
    console.log('JS is in tha house!');

    const btnBuscar = document.querySelector('#btn-buscar');
    const divRespuesta = document.querySelector('#respuesta');

    btnBuscar.addEventListener('click', event => {
        const inpBusqueda = document.querySelector('#inp-Gif');
        const busqueda = inpBusqueda.value.trim();
        const apiKey = "uKPmfJ0DgDLyhoWpdruIY4sLv9uiCbPq";

        if (busqueda === "") {
            alert('Ingrese una palabra para empezar a buscar');
        }
        else {
            
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log('Datos de la respuesta', data);
                    console.log(data.data);
                    insertarGif(data.data);
                })
                .catch((error) => {
                    console.error('Hubo un error:', error);
                });
        }
    });

    function insertarGif(gifs){
        divRespuesta.innerHTML = "";
        gifs.forEach(gif => {
            console.log("insertando gif");
            console.log(gif.title);
            console.log(gif.url);

            const gifHTML = `<div class="gif">
                    <p>${gif.title}</p>
                    <img src="${gif.images.original.url}" alt="${gif.title}">
                </div>`;
            divRespuesta.innerHTML += gifHTML;
        });
    }
};

