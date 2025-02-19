<script setup>
import { ref } from 'vue';
import { getIDPokemon } from '@/utils/getID';
import { fetchPromise } from '@/utils';
defineEmits(['back-dashboard']);
const props = defineProps(['pokemon']);
let dataPromise = ref(null);
let dataEvolution = ref({});
let currentDirect = ref({});
const linkDesc = `https://pokeapi.co/api/v2/pokemon-species/${props.pokemon.name}`;
async function fetchAPI ()
{
    if (props.pokemon) {
        dataPromise.value = await fetchPromise(props.pokemon.url);
        const descData = await fetchPromise(linkDesc);
        dataPromise.value.flavor_text = descData.flavor_text_entries[1].flavor_text;
        dataEvolution.value = await fetchPromise(descData.evolution_chain.url);
    }
}
fetchAPI();
let pokemonArray = ref([]);
let tmpDirect = {};
async function getEvolutionChain ()
{
    await fetchAPI();
    currentDirect.value = dataEvolution.value.chain;
    do {
        pokemonArray.value.push(currentDirect.value.species);
        tmpDirect = currentDirect.value;
        if (currentDirect.value.evolves_to.length != 0) {
            currentDirect.value = currentDirect.value.evolves_to[0];
        }
    }
    while (tmpDirect.evolves_to.length != 0);
}
getEvolutionChain();
console.log(pokemonArray.value);
</script>
<template>
    <div>
        <button @click="$emit('back-dashboard')" class="button-back">Back</button>
        <div class="poke-item-detail">
            <img class="item__image detail" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(props.pokemon.url)}.png`">
            <div class="flex-types">
                <div class="type-item" v-for="item in props.pokemon.types" :key="item" :class="item">
                    {{ item }}
                </div>
            </div>
            <h3 class="item__name detail">{{props.pokemon.name}}</h3>
        </div>
        <div class="description">
            <p>{{ dataPromise.flavor_text }}</p>
        </div>
        <div class="information">
            <div class="size">
                <div class="height">
                    <p>Height</p>
                    <span>{{ dataPromise.height }}</span>
                </div>
                <div class="weight">
                    <p>Weight</p>
                    <span>{{ dataPromise.weight }}</span>
                </div>
            </div>
            <div class="abilities">
                <div class="ability-iem" v-for="ability in dataPromise.abilities" :key="ability">
                    {{ ability.ability.name }}
                </div>
            </div>
            <div class="stats">
                <div class="stat-item" v-for="stat in dataPromise.stats" :key="stat">
                    <span>{{ stat.stat.name }}</span>
                    <span>{{ stat.base_stat }}</span>
                </div>
            </div>
            <div class="evolution">
                <div class="evolution-item" v-for="(evoItem, index) in pokemonArray" :key="evoItem">
                    <div v-show="index != 0">Mui Ten</div>
                    <span class="evoItem-name">{{ evoItem.name }}</span>
                    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(evoItem.url)}.png`" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.button-back
{
    position: fixed;
    top: 50px;
    left: 70px;
}
.poke-item-detail
{
    height: auto;
    margin-inline: auto;
    width: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item__image.detail
{
    width: 200px;
    height: 200px;
}
.item__name.detail
{
    font-size: 24px;
}
.evolution
{
    color: red;
    font-weight: 400;
    display: flex;
    gap: 30px;
}
</style>