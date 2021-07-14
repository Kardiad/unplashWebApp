const httpProvider = 'https://api.unsplash.com/search/collections?page=';
const key = '&client_id=MJ5WIePFxCl3MFZNUOZFrS64tE7NEtkV48yWo2nR89Q';
const creadorImagenes = document.querySelector('.row');
export const conexion = async(numeroPagina, casa) =>{
    const resp =  await fetch(`${httpProvider}${numeroPagina}&query=${casa}${key}`);
    const data = await resp.json();
    console.log(data);
    creadorImagenes.innerHTML = '';
    if (data.total_pages<numeroPagina){
        creadorImagenes.innerHTML = '<p class="error">No se han encontrado más resultados</p>';
    }else{
        data.results.forEach(element => {
            creadorImagenes.innerHTML += `
            <div class="card col-6 fondo">
              <img src="${element.cover_photo.urls.small}" class="card-img-top mt-1" alt="${element.cover_photo.alt_description}">
              <div class="card-body text-center mx-0 px-0 reducir">
                <h5>Aut@r: <p class="text-center">${element.cover_photo.user.name}</p></h5>
                <p class="card-text"><a href="${element.cover_photo.urls.raw}" target="_blank">Pincha aquí</a><small class="text-muted"> Likes: ${element.cover_photo.user.total_likes}</small></p>
                <p class="card-text"></p>
              </div>
            </div>
            `
        });
    }
}