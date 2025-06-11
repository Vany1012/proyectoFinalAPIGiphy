window.onload = (e) => {
    console.log('JS is in tha house!');

    const btnBuscar = document.querySelector('#btn-buscar');
    const btnLupa = document.querySelector('#btn-lupa');
    const divRespuesta = document.querySelector('#respuesta');
    const inpBusqueda = document.querySelector('#inp-Gif');

    function buscarGIF(){
        const busqueda = inpBusqueda.value.trim();
        const apiKey = "uKPmfJ0DgDLyhoWpdruIY4sLv9uiCbPq";

        if (busqueda === "") {
            alert('Ingrese una palabra para empezar a buscar');
        }
        else {
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
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
    };

    function insertarGif(gifs){
        divRespuesta.innerHTML = "";
        gifs.forEach(gif => {
            console.log("insertando gif");
            console.log(gif.title);
            console.log(gif.url);

            const gifHTML = `<div class="gif">
                    <p class="nombre">${gif.title}</p>
                    <img class="imgGIF" src="${gif.images.original.url}" alt="${gif.title}">
                </div>`;
            divRespuesta.innerHTML += gifHTML;
        });
    }

    btnBuscar.addEventListener('click', buscarGIF);
    btnLupa.addEventListener('click', buscarGIF);
    inpBusqueda.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            buscarGIF();
        }
    });
};

