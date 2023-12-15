<script lang="ts" setup>
import { z } from 'zod'

const router = useRouter()

const pokemonSchema = z.array(z.object({
  name: z.string(),
  id: z.number(),
}))
const { data: pokemons } = await useFetch('https://pokeapi.co/api/v2/pokemon?limit=1011&offset=0', {
  key: 'all-pokemon',
  transform: (data: any) => {
    const pokemonList = data.results.map((pokemon: any, index: number) => {
      return {
        name: pokemon.name,
        id: index + 1,
      }
    })
    return pokemonSchema.parse(pokemonList)
  },
})

async function navigateToPokemon(id: number) {
  await router.push(`/pokemon/${id}`)
}
</script>

<template>
  <div v-if="pokemons" id="cards" class="grid lg:grid-cols-7 xs:grid-cols-2 sm:grid-cols-3 sm:gap-2 gap-4">
    <UCard v-for="pokemon in pokemons" :key="pokemon.id" class="flex justify-center align-center card hover:z-10 hover:scale-125 transition-all hover:shadow-xl" @click="navigateToPokemon(pokemon.id)">
      <span class="capitalize">{{ pokemon.name }} </span>
      <NuxtImg :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" :height="80" :width="80" />
    </UCard>
  </div>
</template>

<style>
#cards:hover > .card:not(:hover) {
  opacity: 0.5;
}
.cards:hover > .card:hover {
  transform: scale(1.15);
}
</style>
