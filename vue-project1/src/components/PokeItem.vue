<script setup>
import { getIDPokemon } from '@/utils/getID';
defineProps({
    pokemon: Object
});
</script>
<template>
    <div class="poke-item">
        <div class="item__id">#{{ getIDPokemon(pokemon.url) }}</div>
        <img class="item__image" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(pokemon.url)}.png`">
        <h3 class="item__name">{{pokemon.name}}</h3>
        <div class="flex-types">
        </div>
    </div>
</template>