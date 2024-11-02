<template>
  <div class="relative w-full h-screen">
    <img
      :src="MEDIA_URL + '/Accueil/Accueil.jpg'"
      alt="Accueil"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div
      class="absolute bottom-8 right-8 bg-opacity-40 bg-black text-white p-6 rounded-lg max-w-6xl"
    >
      <h1 class="text-5xl font-bold mb-2">Bienvenue à la Ferme</h1>
      <p class="text-4xl">Découvrez nos animaux et produits locaux</p>
    </div>
  </div>

  <div id="mainPage" class="container mx-auto px-9">
    <Filters @filter-applied="applyFilters" />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-4">
      <AnimalCard
        v-for="animal in animals"
        :key="animal.id"
        :animal="animal"
        @show-details="openAnimalDetails"
      />
    </div>

    <div class="mt-8 mb-8 w-full flex justify-center">
      <Pagination
        :currentPage="currentPage"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @change-page="changePage"
      />
    </div>
  </div>

  <AnimalDetails
    :animal="animalModal"
    :animalModalPhotos="animalModalPhotos"
    :showModal="showModal"
    @close="showModal = false"
  />
</template>

<script setup>
import { MEDIA_URL } from '../config.js'
</script>

<script>
import AnimalCard from './../components/AnimalCard.vue'
import Filters from './../components/Filters.vue'
import Pagination from './../components/Pagination.vue'
import AnimalDetails from './../components/AnimalDetails.vue'

import { API_URL } from '../config.js'
import { ref } from 'vue'

const showModal = ref(false)
const animalModal = ref(null)
const animalModalPhotos = ref([])

export default {
  data() {
    return {
      animals: [],
      selectedAnimal: null,
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      filters: {},
    }
  },
  components: {
    AnimalCard,
    Filters,
    Pagination,
  },
  methods: {
    async fetchAnimals(filters = {}) {
      const query = new URLSearchParams({
        ...this.filters,
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      }).toString()
      const response = await fetch(`${API_URL}/animals?${query}`)
      if (!response.ok) {
        console.error(
          'Erreur lors de la récupération des datas:',
          response.statusText,
        )
        return
      }
      const data = await response.json()
      this.animals = data['hydra:member']
      this.totalItems = data['hydra:totalItems']
    },
    applyFilters(filters) {
      this.filters = filters
      this.currentPage = 1
      this.fetchAnimals()
    },
    changePage(page) {
      this.currentPage = page
      this.fetchAnimals()
    },
    openAnimalDetails(animal, photos) {
      animalModal.value = animal
      animalModalPhotos.value = photos
      showModal.value = true
    },
  },
  created() {
    this.fetchAnimals()
  },
}
</script>
