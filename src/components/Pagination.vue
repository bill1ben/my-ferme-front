<template>
  <div class="flex justify-center mt-4">


    <!-- Bouton "<-" pour aller à la page précédente -->
    <button
      class="px-4 py-2 mx-1 text-white bg-color-green rounded hover:bg-color-teal"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      &lt;-
    </button>

    <button
      class="px-4 py-2 mx-1 text-white bg-color-green rounded hover:bg-color-teal"
      v-if="currentPage >= 4" 
      @click="goToPage(1)"
      :disabled="currentPage === 1"
    >
      1
    </button>

    <!-- Afficher les pages dynamiques -->
    <template v-for="page in paginatedPages" :key="page">
      <button
        v-if="page !== '...'" 
        class="px-4 py-2 mx-1 text-white bg-color-green rounded hover:bg-color-teal"
        @click="goToPage(page)"
        :disabled="page === currentPage"
      >
        {{ page }}
      </button>
      <span v-else class="px-4 py-2 mx-1">...</span>
    </template>

    <!-- Bouton pour la dernière page affichant le numéro de la dernière page -->
    <button
      v-if="!paginatedPages.includes(totalPages)"
      class="px-4 py-2 mx-1 text-white bg-color-green rounded hover:bg-color-teal"
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages"
    >
      {{ totalPages }}
    </button>

    <!-- Bouton "->" pour aller à la page suivante -->
    <button
      class="px-4 py-2 mx-1 text-white bg-color-green rounded hover:bg-color-teal"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      -&gt; 
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits();

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

// Computed property to generate pages
const paginatedPages = computed(() => {
  const pages = [];
  const maxDisplayedPages = 5; // Nombre maximal de pages à afficher
  let startPage, endPage;

  if (totalPages.value <= maxDisplayedPages) {
    startPage = 1;
    endPage = totalPages.value;
  } else {
    if (props.currentPage <= 3) {
      startPage = 1;
      endPage = 3; // Affiche les 4 premières pages
    } else if (props.currentPage + 2 >= totalPages.value) {
      startPage = totalPages.value - 3;
      endPage = totalPages.value; // Affiche les 4 dernières pages
    } else {
      startPage = props.currentPage - 2;
      endPage = props.currentPage + 2; // Centre la page actuelle
    }
  }

  // Ajouter les numéros de pages au tableau
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Ajouter des ellipses 
  if (startPage > 1) {
    pages.unshift('...');
  }
  if (endPage < totalPages.value) {
    pages.push('...');
  }

  return pages;
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('change-page', page);
  }
}
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
