<script setup>
import { getIDPokemon } from '@/utils/getID';
// import pokeType from './pokeType.vue';
const props = defineProps(['pokemon'])
defineEmits(['select-pokemon']);
</script>
<template>
    <div class="poke-item" @click="$emit('select-pokemon', pokemon)">
        <div class="item__id">#{{ getIDPokemon(props.pokemon.url) }}</div>
        <img class="item__image" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(props.pokemon.url)}.png`">
        <h3 class="item__name">{{props.pokemon.name}}</h3>
        <div class="flex-types">
            <div class="type-item" v-for="item in props.pokemon.types" :key="item" :class="item">
                {{ item }}
            </div>
        </div>
    </div>
</template>
<style>
a {
    text-decoration: none;
    color: black;
}
</style>