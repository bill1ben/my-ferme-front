<template>
  <div class="p-6 bg-white rounded-lg shadow-md mt-9">
    <h2 class="text-2xl font-bold mb-4 text-color-teal">Filtrer les résultats</h2>
    <form @submit.prevent="applyFilters" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
          <select 
            id="type" 
            v-model="filters.type" 
            @change="updateRaces" 
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choisir un type</option>
            <option v-for="(breeds, type) in typesAndBreeds" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div>
          <label for='breed' class="block text-sm font-medium text-gray-700">Race</label>
          <input 
            type="text" 
            id="breed" 
            v-model="filters.breed" 
            @input="filterRaces" 
            placeholder="Rechercher par breed" 
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
          <ul v-if="filteredRaces.length" class="mt-1 border border-gray-300 rounded-md max-h-40 overflow-y-auto">
            <li 
              v-for="(breed, index) in filteredRaces" 
              :key="index" 
              @click="selectRace(breed)" 
              class="cursor-pointer hover:bg-gray-200 p-2"
            >
              {{ breed }}
            </li>
          </ul>
        </div>

        <div>
          <label for="age[gte]" class="block text-sm font-medium text-gray-700">Âge minimum (en années)</label>
          <input 
            type="number" 
            id="age[gte]" 
            v-model="filters.age.gte" 
            min="0"
            placeholder="Âge minimum" 
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div>
          <label for="age[lte]" class="block text-sm font-medium text-gray-700">Âge maximum (en années)</label>
          <input 
            type="number" 
            id="age[lte]" 
            v-model="filters.age.lte" 
            min="0" 
            placeholder="Âge maximum" 
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div>
          <label for="priceTTC[gte]" class="block text-sm font-medium text-gray-700">Prix minimum (€)</label>
          <input 
            type="number" 
            id="priceTTC[gte]" 
            v-model="filters.priceTTC.gte" 
            min="0" 
            placeholder="Prix minimum" 
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div>
          <label for="priceTTC[lte]" class="block text-sm font-medium text-gray-700">Prix maximum (€)</label>
          <input 
            type="number" 
            id="priceTTC[lte]" 
            v-model="filters.priceTTC.lte" 
            min="0" 
            placeholder="Prix maximum" 
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
      </div>

      <div class="flex justify-end">
        <button 
          type="submit" 
          class="inline-flex items-center px-4 py-2 bg-color-teal text-white font-semibold rounded-md hover:bg-color-green focus:outline-none focus:ring-2 focus:ring-color-teal focus:ring-opacity-50"
        >
          Appliquer les filtres
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        type: '',
        breed: '',
        age: {
          gte: null,
          lte: null
        },
        priceTTC: {
          gte: null,
          lte: null
        }
      },
      typesAndBreeds: {
        'Bœuf': ['Charolais', 'Limousin', 'Salers', 'Aubrac'],
        'Vache': ['Holstein', 'Normande', 'Montbéliarde', 'Tarentaise'],
        'Mouton': ['Suffolk', 'Texel', 'Mérinos', 'Charmoise'],
        'Cheval': ['Pur-sang', 'Arabe', 'Quarter Horse', 'Appaloosa'],
        'Poule': ['Leghorn', 'Sussex', 'Marans', 'Poule Soie']
      },
      filteredRaces: [] 
    };
  },
  methods: {
  applyFilters() {
    const formattedFilters = {
      type: this.filters.type,
      breed: this.filters.breed,
      'age[gte]': this.filters.age.gte,
      'age[lte]': this.filters.age.lte,
      'priceTTC[gte]': this.filters.priceTTC.gte ? this.filters.priceTTC.gte * 100 : null,
      'priceTTC[lte]': this.filters.priceTTC.lte ? this.filters.priceTTC.lte * 100 : null
    };

    Object.keys(formattedFilters).forEach(key => {
      if (formattedFilters[key] === null || formattedFilters[key] === '') {
        delete formattedFilters[key];
      }
    });

    this.$emit('filter-applied', formattedFilters);
  },
    updateRaces() {
      this.filteredRaces = this.typesAndBreeds[this.filters.type] || [];
      this.filters.breed = '';
    },
    filterRaces() {
      const searchTerm = this.filters.breed.toLowerCase();
      this.filteredRaces = this.typesAndBreeds[this.filters.type]
        ? this.typesAndBreeds[this.filters.type].filter(breed => 
            breed.toLowerCase().includes(searchTerm)
          )
        : [];
    },
    selectRace(breed) {
      this.filters.breed = breed; 
      this.filteredRaces = [];
    }
  }
};
</script>
