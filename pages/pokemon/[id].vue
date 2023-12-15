<script lang="ts" setup>
import { z } from 'zod'

const pokemonSchema = z.object({
  name: z.string(),
  sprites: z.object({ front_default: z.string() }),
})
const route = useRoute()
const id = route.params.id
const { data: pokemon } = await useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
  key: `pokemon-${id}`,
  transform: (data: any) => pokemonSchema.parse(data),
})
</script>

<template>
  <div v-if="pokemon">
    <UCard>
      Name: <span class="capitalize">{{ pokemon.name }}</span>
      <NuxtImg style="image-rendering: pixelated;" :height="500" :width="500" :src="pokemon.sprites.front_default" />
    </UCard>
  </div>
</template>
