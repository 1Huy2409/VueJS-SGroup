<script setup>
import { ref } from 'vue';
import { fetchPromise } from './utils';
import { getIDPokemon } from './utils/getID';
// ref state
let htmlPokemon = ref('');
let htmlPokemonTypes = ref('');
let valueSearch = ref('');
let filteredPokemons = ref([]);
// end ref state

let pokemons = JSON.parse(localStorage.getItem("pokemonsData")) || [];
filteredPokemons.value = pokemons;
let offset = 0;
let limit = 36;

// delay start function
// function debounce(func, wait) {
//     let timeout;
//     return function(...args) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, args), wait);
//     };
// }

// begin create pokemon types
function createPokemonType(types) {
    htmlPokemonTypes.value = '';
    const typesName = types.map(type => type.type.name);
    typesName.forEach((item) => {
        htmlPokemonTypes.value += 
        `<div class="type-item ${item}">${item}</div>
        `;
    });
}
// end create pokemon types
// begin create pokemon element
function createPokemonElement(pokemon) {
    createPokemonType(pokemon.types);
    return `
        <div class="poke-item">
            <div class="item__id">#${pokemon.id}</div>
            <img class="item__image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
            <h3 class="item__name">${pokemon.name}</h3>
            <div class="flex-types" v-html="htmlPokemonTypes"></div>
        </div>
    `;
}
// end create pokemon element

// begin set up list of promises
function createPromiseList() {
    const pokePromise = [];
    const renderLimit = offset + limit;
    for (; offset < renderLimit; offset++) {
        const pokemon = filteredPokemons[offset];
        if (!pokemon) {
            break;
        }
        const promise = fetchPromise(pokemon.url);
        pokePromise.push(promise);
    }
    return Promise.all(pokePromise);
}
// end set up list of promises

// begin render pokemon
async function render() {
    const pokeData = await createPromiseList();
    pokeData.forEach((pokemon) => {
        if (pokemon) {
            htmlPokemon.value += createPokemonElement(pokemon);
        }
    });
}
// end render pokemon

//begin getPokemon (refresh website => localStorage ....)
async function getPokemon()
{
    if (pokemons.length) {
        filteredPokemons.value = pokemons;
        // render();
    } else {
        const response = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
        if (response && response.results) {
            pokemons = response.results;
            filteredPokemons.value = pokemons;
            localStorage.setItem("pokemonsData", JSON.stringify(pokemons));
            // render();
        }
    }
};
// end getPokemon

// begin event handler function
function handleSearch()
{
    offset = 0;
    htmlPokemon.value = '';
    filteredPokemons.value = pokemons.filter((pokemon) => {
        return pokemon.name.includes(valueSearch.value.toLowerCase());
    })
    render();
}
function handleLoadMore()
{
    render();
}
// end event handler function
getPokemon();
console.log(filteredPokemons.value);
</script>

<template>
    <div class="container">
        <div class="header">
            <h2>Pokemon API</h2>
        </div>
        <input type="text" placeholder="Search some Pokemon" class="poke-search" v-model="valueSearch" @input="handleSearch">
        <div class="poke-list">
            <div class="poke-item" v-for="pokemon in filteredPokemons" :key="pokemon">
                <div class="item__id">#{{ getIDPokemon(pokemon.url) }}</div>
                <img class="item__image" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(pokemon.url)}.png`">
                <h3 class="item__name">{{pokemon.name}}</h3>
                <div class="flex-types"></div>
            </div>
        </div>
        <button class="load-page-btn" @click="handleLoadMore">Load More</button>
    </div>
</template>

<style>
.header
{
    font-size: 25px;
}
.header h2
{
    font-weight: 400;
}
.container
{
    max-width: 1200px;
    margin-inline: auto;
    text-align: center;
}
.poke-list
{
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    /* justify-content: space-between; */
    margin-top: 50px;
}
.poke-search
{
    max-width: 500px;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
    border-radius: 30px;
    font-size: 16px;
    padding: 20px;
    border: none;
    outline: 1px solid #00000036;
}
.poke-search:focus
{
    outline: 1px solid #000000;
}
.load-page-btn
{
    border-radius: 10px;
    padding: 20px 25px;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    background-color: #ff4d4f;
    border: none;
    margin-top: 20px;
    margin-inline: auto;
}

.poke-item
{
    height: auto;
    border-radius: 15px;
    box-shadow: #0000001a 0 4px 12px;
    padding: 20px 0;
    margin: 10px 5px;
    text-transform: capitalize;
}
/* css pokemon types */
.flex-types
{
    display: flex;
    justify-content: center;
    gap: 10px;
}
.type-item
{
    font-size: 14px;
    border-radius: 5px;
    font-weight: 500;
    padding: 3px 4px;
    text-transform: capitalize;
}
.grass
{
    background-color: #78CD54;
}
.fire
{
    background-color: #FF421C;
}
.water
{
    background-color: #6390F0;
}
.electric
{
    background-color: #F7D02C;
}
.ice
{
    background-color: #96D9D6;
}
.fighting
{
    background-color: #C22E28;
}
.poison
{
    background-color: #A33EA1;
}
.ground
{
    background-color: #E2BF65;
}
.flying
{
    background-color: #A98FF3;
}
.psychic
{
    background-color: #F95587;
}
.bug
{
    background-color: #A6B91A;
}
.rock
{
    background-color: #B6A136;
}
.ghost
{
    background-color: #735797;
}
.dragon
{
    background-color: #6F35FC;
}
.dark
{
    background-color: #705746;
}
.steel
{
    background-color: #B7B7CE;
}
.fairy
{
    background-color: #D685AD;
}
.normal
{
    background-color: #A8A77A;
}
/* responsive mobile */
@media screen and (max-width: 739px)
{
    .poke-item
    {
        width: calc(90%/2);
    }
}
/* responsive tablet */
@media screen and (max-width: 1023px) and (min-width: 740px)
{
    .poke-item
    {
        width: calc(90%/4);
    }
}
</style>
