import { pokemones } from "./PokeArray/pokemones.js";
import { apiUrls } from "./UrlsRandomApi/urls.js";

async function selectRandomPokemon() {
    const pokemonAleatorio = pokemones[Math.floor(Math.random() * pokemones.length)];
    console.log(`Pokémon aleatorio seleccionado: ${pokemonAleatorio}`);
};
selectRandomPokemon();

// Objeto para almacenar los datos de cada API
const apiData = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchDataWithDelay(url, name) {
    try {
        await sleep(1300);  // Espera 1,3 segundos entre solicitudes
        const response = await fetch(url);
        
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en ${name}: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Almacena los datos en el objeto apiData
        apiData[name] = data;

    } catch (error) {
        console.error(`Error en la llamada de ${name}:`, error);
    }
}

async function fetchData() {
    try {
        await fetchDataWithDelay(apiUrls.user_url, 'usuario');
        await fetchDataWithDelay(apiUrls.address_url, 'dirección');
        await fetchDataWithDelay(apiUrls.beers_url, 'cerveza');
        
        // Puedes trabajar con los datos almacenados en apiData aquí
        console.log("Datos almacenados:", apiData);
        describeCerveza()

    } catch (err) {
        console.error('Error al leer el archivo:', err);
    }
}


fetchData();

function describeCerveza (){
    console.log(`Cerveza ${apiData['cerveza']['brand']}${apiData['cerveza']['name']}${apiData['cerveza']['style']}`);
};