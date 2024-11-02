<template>
  <div
    class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
  >
    <!-- Loader affiché pendant le chargement des photos -->
    <div v-if="isLoading" class="flex items-center justify-center h-48">
      <div class="loader"></div>
    </div>

    <img
      v-if="mainPhoto"
      :src="URL + mainPhoto.path"
      alt="Photo principale de l'animal"
      class="w-full h-48 object-cover"
    />

    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800">{{ animal.name }}</h3>
      <p class="text-gray-600">Âge: {{ animal.age }} ans</p>
      <p class="text-gray-600">Type: {{ animal.type }}</p>
      <p class="text-gray-600">Race: {{ animal.breed }}</p>
      <p class="text-lg font-bold text-gray-900 mt-2">
        Prix: {{ formatPrice(animal.priceTTC) }} €
      </p>

      <button
        @click="$emit('show-details', animal, photos.sort((a, b) => a.position - b.position))"
        class="mt-4 px-4 py-2 bg-color-teal text-white rounded hover:bg-color-green"
      >
        Détails
      </button>
    </div>

    <div class="flex justify-between p-4">
      <div v-for="(photo, index) in detailPhotos" :key="index" class="w-1/3">
        <img
          :src="URL + photo.path"
          alt="Photo de détail"
          class="w-full h-24 object-cover rounded-md shadow-md p-1"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { URL } from '../config.js'
import { ref } from 'vue'
const showModal = ref(false)
</script>

<script>
import { MediaService } from '../services/MediaService'

export default {
  props: {
    animal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photos: [],
      sortPhotos: [],
      isLoading: true, // État de chargement
    }
  },
  computed: {
    mainPhoto() {
      return this.photos.length > 0 ? this.photos[0] : null
    },
    detailPhotos() {
      return this.photos.slice(1, 4)
    },
  },
  methods: {
    formatPrice(priceInCents) {
      return (priceInCents / 100).toFixed(2)
    },
  },
  async created() {
    try {
      this.photos = await MediaService.fetchMedia(this.animal.medias)
    } catch (error) {
      console.error('Erreur lors du chargement des médias:', error)
    } finally {
      this.isLoading = false
    }
  },
}
</script>

<style scoped>
.loader {
  border: 4px solid #6a9c89;
  border-top: 4px solid #16423c;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
