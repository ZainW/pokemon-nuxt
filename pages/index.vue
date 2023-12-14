<script lang="ts" setup>
import { z } from 'zod'
const pokemonSchema = z.object({
  name: z.string(),
  sprites: z.object({ front_default: z.string() }),
})
const route = useRoute()
const id = route.params.id || 2
const { data: pokemon } = await useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
  key: `pokemon-${id}`,
  transform: (data: any) => pokemonSchema.parse(data),
})
</script>

<template>
  <div v-if="pokemon">
    <UCard>
      Name: {{ pokemon.name }}
      <NuxtImg :src="pokemon.sprites.front_default" />
    </UCard>
  </div>
</template>
