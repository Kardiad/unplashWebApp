const buscar = document.getElementById('busca');
const httpProvider = 'https://api.unsplash.com/search/collections?page=';
const key = '&client_id=MJ5WIePFxCl3MFZNUOZFrS64tE7NEtkV48yWo2nR89Q';
const creadorImagenes = document.querySelector('.row');
const cambioPagina = document.getElementById('numeros');
let casa = '';
let numeroPagina = 1;
const paginaMas = document.getElementById('mas');
const paginaMenos = document.getElementById('menos');
const numPag = document.getElementById('num');
const conexion = async() =>{
    const resp =  await fetch(`${httpProvider}${numeroPagina}&query=${casa}${key}`);
    const data = await resp.json();
    console.log(data);
    creadorImagenes.innerHTML = '';
    if (data.total_pages<numeroPagina){
        console.log('hi');
        creadorImagenes.innerHTML = '<p class="error">No se han encontrado más resultados</p>';
    }else{
        data.results.forEach(element => {
            creadorImagenes.innerHTML += `
            <div class="card col-6 fondo">
              <img src="${element.cover_photo.urls.small}" class="card-img-top mt-1" alt="${element.cover_photo.alt_description}">
              <div class="card-body text-center mx-0 px-0 reducir">
                <h5>Aut@r: <p class="text-center">${element.cover_photo.user.name}</p></h5>
                <p class="card-text"><p>Instagram: ${element.cover_photo.user.social.instagram_username}</p> <a href="${element.cover_photo.urls.raw}" target="_blank">Pincha aquí</a><small class="text-muted"> Likes: ${element.cover_photo.user.total_likes}</small></p>
                <p class="card-text"></p>
              </div>
            </div>
            `
        });
    }
}
buscar.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        numeroPagina = 1;
        casa = buscar.value;
        conexion();
        if(cambioPagina.getAttribute('id')==='numeros'){
            cambioPagina.classList.remove('numeros');
            cambioPagina.classList.add('numeros_ver');
        }
    }
});
numPag.addEventListener('change', ()=>{
    numeroPagina = 0;
    numeroPagina = parseInt(numPag.value) + numeroPagina;
    numPag.value.innerHTML = numeroPagina;
    conexion();
});
paginaMas.addEventListener('click', ()=>{
    numeroPagina = numeroPagina - 1;
    numPag.value = 0;
    numPag.value = numeroPagina;
    conexion();
});
paginaMenos.addEventListener('click', ()=>{
    numeroPagina = numeroPagina +1;
    numPag.value = 0;
    numPag.value = numeroPagina;
    conexion();
});