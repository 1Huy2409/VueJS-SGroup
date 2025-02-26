<script setup>
import { getIDPokemon } from '@/utils/getID';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['pokemon']);
defineEmits(['select-pokemon']);

function pokemonClicked ()
{
    sessionStorage.setItem("clickedPokemon", JSON.stringify(props.pokemon));
    router.push('/' + props.pokemon.name);
}
let isLoading = ref(true);
function skeletonPokemon ()
{
    setTimeout(() => {
        isLoading.value = false;
    }, 500);
    sessionStorage.setItem(`loaded_${props.pokemon.name}`, "true");
}
onMounted(() => {
    if (sessionStorage.getItem(`loaded_${props.pokemon.name}`)) {
        isLoading.value = false;
    }
    else
    {
        skeletonPokemon();
    }
})
</script>
<template>
    <div class="poke-item" @click="pokemonClicked">
        <div class="item__id">#{{ getIDPokemon(props.pokemon.url) }}</div>
        <img src="../assets/img/placeholder-img.png" alt="image placeholder" v-if="isLoading" class="item__image">
        <img v-else class="item__image" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(props.pokemon.url)}.png`">
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