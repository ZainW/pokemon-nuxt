// https://nuxt.com/docs/api/configuration/nuxt-config
const pokemonArray = []

for (let i = 1; i <= 1011; i++)
  pokemonArray.push(`/pokemon/${i}`)

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image'],
  typescript: {
    typeCheck: true,
    shim: false,
  },
  routeRules: {
    '/': { isr: true },
    '/pokemon/**': { isr: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: pokemonArray,
    },
  },
  image: {
    domains: ['raw.githubusercontent.com']
  }
})
