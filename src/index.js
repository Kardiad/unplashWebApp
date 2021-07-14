import './css/style.css';
import { conexion } from './js/http-provider';
const buscar = document.getElementById('busca');
let numeroPagina = 1;
let casa = '';
const cambioPagina = document.getElementById('numeros');
const paginaMas = document.getElementById('mas');
const paginaMenos = document.getElementById('menos');
const numPag = document.getElementById('num');
buscar.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        numeroPagina = 1;
        casa = buscar.value;
        conexion(numeroPagina, casa);
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
    conexion(numeroPagina, casa);
});
paginaMas.addEventListener('click', ()=>{
    numeroPagina = numeroPagina - 1;
    numPag.value = 0;
    numPag.value = numeroPagina;
    conexion(numeroPagina, casa);
});
paginaMenos.addEventListener('click', ()=>{
    numeroPagina = numeroPagina +1;
    numPag.value = 0;
    numPag.value = numeroPagina;
    conexion(numeroPagina, casa);
});