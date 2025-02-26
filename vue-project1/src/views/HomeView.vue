<script setup>
import { ref, computed } from 'vue';
// import { fetchPromise } from './utils';
import { fetchPromise } from '@/utils';
import { getIDPokemon } from '@/utils/getID';
import PokeItem from '@/components/PokeItem.vue';
// REF STATE
let filteredPokemons = ref([]);
let offset = ref(0);
let showDetail = ref(true);
// let currentPoke = ref(null);
const renderPokemons = computed(() => {
    return filteredPokemons.value.slice(offset, offset.value + limit);
})
// END REF STATE
// router
// end router
let limit = 36;
const pokePromise = [];
let pokemons = JSON.parse(localStorage.getItem("pokemonsData")) || [];
filteredPokemons.value = pokemons;
async function getPokemon()
{
    if (pokemons.length) {
        filteredPokemons.value = pokemons;
    } else {
        const response = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?.value=0&limit=898");
        if (response && response.results) {
            pokemons = response.results;
            filteredPokemons.value = pokemons;
            localStorage.setItem("pokemonsData", JSON.stringify(pokemons));
        }
    }
};
function fetchPokemonType() {
    if (pokemons){
        pokemons.forEach(pokemon => {
            const promise = fetchPromise(pokemon.url);
            pokePromise.push(promise);
        });
    }
    return pokePromise;
}
async function getPokemonType()
{
    const pokeDataPromise = fetchPokemonType();
    const pokeData = await Promise.all(pokeDataPromise);
    pokeData.forEach((item, index) =>
        {
            if (pokemons[index]) {
                pokemons[index].types = item.types.map(item => item.type.name);
            }
        }
    )
    filteredPokemons.value = [...pokemons];
    localStorage.setItem("pokemonsData", JSON.stringify(pokemons));
}
getPokemonType();
let queryValue = ref('');
function handleSearch() 
{
    filteredPokemons.value = pokemons.filter((pokemon) => {
        return pokemon.name.includes(queryValue.value.toLowerCase());
    })
    offset.value = 0;

}
function handleLoadMore()
{
    offset.value += limit;
}
getPokemon();
</script>

<template>
    <div class="container" v-if="showDetail">
        <div class="header">
            <h2>Pokemon API</h2>
        </div>
        <input type="text" placeholder="Search some Pokemon" class="poke-search" v-model="queryValue" @input="handleSearch">
        <div class="poke-list">
            <PokeItem v-for="pokemon in renderPokemons" :key="getIDPokemon(pokemon.url)" :pokemon="pokemon"/>
        </div>
        <button v-show="renderPokemons.length >= limit" class="load-page-btn" @click="handleLoadMore">Load More</button>
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
    grid-template-columns: repeat(6, auto);
    /* justify-content: space-between; */
    margin-top: 50px;
}
.poke-search
{
    max-width: 400px;
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
    cursor: pointer;
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
    .poke-list
    {
        display: grid;
        grid-template-columns: repeat(2, auto);
    }
    .poke-search
    {
        width: 90%;
    }
}
/* responsive tablet */
@media screen and (max-width: 1023px) and (min-width: 740px)
{
    .poke-list
    {
        display: grid;
        grid-template-columns: repeat(4, auto);
    }
}
</style>
