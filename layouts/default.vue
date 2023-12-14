<script lang="ts" setup>
import { z } from 'zod'

const { data: pokemon } = await useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0', {
  key: 'all-pokemon',
})

const schema = z.object({
  results: z.array(z.object({ name: z.string(), id: z.number().optional() })),
})

const pokemonList = schema.parse(pokemon.value).results
const router = useRouter()
const groups = computed(() => {
  return pokemonList.map((pokemon, index: number) => {
    return {
      label: pokemon.name,
      id: index + 1,
      command: async () => await router.push({ path: `/pokemon/${pokemon.name}` }),
    }
  })
})
</script>

<template>
  <div>
    <UModal :model-value="true">


    <UCommandPalette
      command-attribute="label"
      @update:model-value="router.push(`/pokemon/${$event.id}`)"
      :groups="[{
        key: 'pokemon',
        label: 'Pokemon',
        commands: groups,
      }]"
      :fuse="{
        fuseOptions: {
          ignoreLocation: true,
          includeMatches: true,
          threshold: 0,
          keys: ['name'],
        },
        resultLimit: 10,
      }"
    />
  </UModal>
    <slot />
  </div>
</template>
