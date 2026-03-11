<script setup lang="ts">
import { useMusic } from '~/composables/useMusic'
import { computed, onMounted } from 'vue'

const { tracks } = useMusic()
const playerStore = usePlayerStore()

// Initialize queue in store
onMounted(() => {
  playerStore.queue = tracks.value
})

const searchQuery = useState('searchQuery', () => '')

const filteredTracks = computed(() => {
  if (!searchQuery.value) return tracks.value
  
  const query = searchQuery.value.toLowerCase()
  return tracks.value.filter(track => 
    track.title.toLowerCase().includes(query) || 
    track.artist.toLowerCase().includes(query) ||
    track.description.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="space-y-8">
    <!-- Hero Section (only visible when not searching) -->
    <div v-if="!searchQuery" class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 to-primary-900 p-8 md:p-12 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-200 text-sm font-medium border border-white/10 backdrop-blur-sm">
          <UIcon name="i-lucide-sparkles" />
          <span>New Release</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
          Feel the <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Rhythm</span>
        </h1>
        <p class="text-lg text-primary-100/80 leading-relaxed max-w-xl">
          Experience music like never before with Muraflix. High-quality audio, immersive visuals, and a library that grows with you.
        </p>
        <div class="flex gap-4 pt-4">
          <UButton 
            size="xl" 
            color="neutral" 
            variant="solid" 
            label="Play Now" 
            icon="i-lucide-play" 
            class="rounded-full hover:scale-105 transition-transform shadow-xl shadow-white/10 text-primary-900 font-bold"
          />
          <UButton 
            size="xl" 
            color="neutral" 
            variant="ghost" 
            label="Explore" 
            class="rounded-full hover:bg-white/10 text-white border border-white/20"
          />
        </div>
      </div>
      
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- Music Grid -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white flex items-center gap-2">
          <UIcon name="i-lucide-list-music" class="text-primary-500" />
          {{ searchQuery ? 'Search Results' : 'Trending Now' }}
        </h2>
        <div class="text-sm text-gray-500">
          {{ filteredTracks.length }} tracks found
        </div>
      </div>
      
      <div v-if="filteredTracks.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <MusicCard 
          v-for="track in filteredTracks" 
          :key="track.id" 
          :track="track" 
        />
      </div>
      
      <div v-else class="text-center py-20 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
        <UIcon name="i-lucide-music-2" class="w-16 h-16 text-gray-700 mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-400">No music found</h3>
        <p class="text-gray-600 mt-2">Try searching for something else.</p>
      </div>
    </div>
  </div>
</template>
