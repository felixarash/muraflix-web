<script setup lang="ts">
import { usePlayerStore, type Track } from '~/stores/player'

const props = defineProps<{
  track: Track
}>()

const playerStore = usePlayerStore()

const play = () => {
  playerStore.play(props.track)
}

const isCurrentTrack = computed(() => playerStore.currentTrack?.id === props.track.id)
const isPlaying = computed(() => isCurrentTrack.value && playerStore.isPlaying)
</script>

<template>
  <div 
    class="group relative bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm border border-white/5 hover:border-white/10 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10"
    @click="play"
  >
    <!-- Cover Image -->
    <div class="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
      <img 
        :src="track.cover" 
        :alt="track.title" 
        loading="lazy"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
      <!-- Play Overlay -->
      <div 
        class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
        :class="{ 'opacity-100 bg-black/60': isCurrentTrack }"
      >
        <div
          class="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center shadow-xl shadow-primary-500/40 scale-0 group-hover:scale-100 transition-transform duration-300"
          :class="{ 'scale-100': isCurrentTrack }"
        >
          <UIcon 
            :name="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" 
            class="w-6 h-6 text-gray-950" 
            :class="{ 'ml-0.5': !isPlaying }"
          />
        </div>
      </div>
      
      <!-- Playing Animation -->
      <div v-if="isPlaying" class="absolute bottom-2 right-2 flex gap-1 items-end h-4">
        <span class="w-1 bg-primary-400 animate-music-bar-1 h-2 rounded-full"></span>
        <span class="w-1 bg-primary-400 animate-music-bar-2 h-4 rounded-full"></span>
        <span class="w-1 bg-primary-400 animate-music-bar-3 h-3 rounded-full"></span>
      </div>
    </div>

    <!-- Track Info -->
    <div class="space-y-1 relative z-10">
      <h3 class="font-bold text-white truncate group-hover:text-primary-400 transition-colors">{{ track.title }}</h3>
      <p class="text-sm text-gray-400 truncate hover:text-gray-300 transition-colors">{{ track.artist }}</p>
      <div class="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium">
        <span>{{ new Date(track.publishedAt).getFullYear() }}</span>
        <span class="bg-gray-800/50 px-2 py-0.5 rounded-full border border-white/5">{{ Math.floor(track.duration / 60) }}:{{ (track.duration % 60).toString().padStart(2, '0') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes music-bar {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}

.animate-music-bar-1 { animation: music-bar 0.8s ease-in-out infinite; }
.animate-music-bar-2 { animation: music-bar 0.6s ease-in-out infinite 0.1s; }
.animate-music-bar-3 { animation: music-bar 1.0s ease-in-out infinite 0.2s; }
</style>
