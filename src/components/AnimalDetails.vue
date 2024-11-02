<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-600 hover:text-color-teal text-3xl" 
        aria-label="Fermer"
      >
        &times;
      </button>

      <h2 class="text-2xl font-bold">{{ animal.name }}</h2>
      <p><strong>Description:</strong> {{ animal.description }}</p>
      <p><strong>Âge:</strong> {{ animal.age }} ans</p>
      <p><strong>Type:</strong> {{ animal.type }}</p>
      <p><strong>Race:</strong> {{ animal.breed }}</p>
      <p class="text-lg font-bold">
        Prix: {{ formatPrice(animal.priceTTC) }} €
      </p>

      <div class="flex justify-between p-4">
        <div v-for="(photo, index) in animalModalPhotos" :key="index" class="w-full">
          <img
            :src="URL + photo.path"
            alt="Photo de détail"
            class="p-10"
          />
        </div>
      </div>

      <a
        href="tel:07 77 77 77 77"
        class="block mt-4 mx-auto w-11/12 px-4 py-2 bg-color-teal text-white rounded hover:bg-color-green text-center"
      >
        Appeler +33 7 77 77 77 77
      </a>
    </div>
  </div>
</template>

<script setup>
import { URL } from '../config.js' 

defineProps({
  animal: {
    type: Object,
    required: false,
  },
  showModal: {
    type: Boolean,
    required: true,
  },
  animalModalPhotos: {
    type: Object,
    required: false,
  },
})

function formatPrice(priceInCents) {
  return (priceInCents / 100).toFixed(2)
}
</script>

<script>

export default {
  props: {
    animal: {
      type: Object,
      required: false,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      photos: [],
    }
  },
  methods: {
    formatPrice(priceInCents) {
      return (priceInCents / 100).toFixed(2)
    },
  },
}
</script>
