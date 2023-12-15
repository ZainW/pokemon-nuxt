<script lang="ts" setup>
import { z } from 'zod'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const pokemonListSchema = z.array(z.object({
  name: z.string(),
  id: z.number(),
}))

const pokemonSchema = z.object({
  name: z.string(),
  id: z.number(),
})
type pokemonType = z.infer<typeof pokemonSchema>
const { data: pokemonList } = await useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0', {
  key: 'all-pokemon',
  transform: (data: any) => {
    const pokemonList = data.results.map((pokemon: pokemonType, index: number) => {
      return {
        name: pokemon.name,
        id: index + 1,
      }
    })
    return pokemonListSchema.parse(pokemonList)
  },
})

const openModal = ref(false)
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      openModal.value = !openModal.value
    },
  },
})

const router = useRouter()
const groups = computed(() => {
  if (pokemonList.value) {
    return pokemonList.value.map((pokemon: pokemonType) => {
      return {
        label: pokemon.name,
        id: pokemon.id,
      }
    })
  }
  return []
})

function navigateToPokemon(e: any) {
  router.push(`/pokemon/${e.id}`)
  openModal.value = false
}
</script>

<template>
  <UContainer class="transition-all">
    <div class="flex justify-end">
      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
        />

        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </div>
    <UModal :model-value="openModal">
      <UCommandPalette
        command-attribute="label"
        class="capitalize"
        :groups="[{
          key: 'pokemon',
          label: 'Pokemon',
          commands: groups,
        }]"
        :fuse="{
          fuseOptions: {
            ignoreLocation: true,
            includeMatches: true,
            threshold: 0.1,
            keys: ['name'],
          },
          resultLimit: 10,
        }"
        @update:model-value="$event => navigateToPokemon($event)"
      />
    </UModal>
    <slot />
  </UContainer>
</template>
