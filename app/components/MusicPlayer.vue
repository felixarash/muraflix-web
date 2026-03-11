<script setup lang="ts">
import { usePlayerStore } from '~/stores/player'
import { formatTime } from '~/utils/format'

const playerStore = usePlayerStore()
const audioRef = ref<HTMLAudioElement | null>(null)

// Sync audio element with store
onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = playerStore.volume
  }
})

const isDragging = ref(false)
const isFullScreen = ref(false)
const activeTab = ref<'lyrics' | 'queue'>('queue')

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
}

const toggleTab = (tab: 'lyrics' | 'queue') => {
  activeTab.value = tab
}

const hasPreloaded = ref(false)

// Update progress
const onTimeUpdate = () => {
  if (audioRef.value && !isDragging.value) {
    playerStore.currentTime = audioRef.value.currentTime
    
    // Preload next track near end
    if (!hasPreloaded.value && playerStore.duration > 0 && playerStore.currentTime / playerStore.duration > 0.8) {
      playerStore.preloadNext()
      hasPreloaded.value = true
    }
  }
}

// Reset preload flag on track change
watch(() => playerStore.currentTrack?.id, () => {
  hasPreloaded.value = false
})

// Update duration
const onLoadedMetadata = () => {
  if (audioRef.value) {
    playerStore.duration = audioRef.value.duration
    // Auto play if store says so (e.g. when changing tracks)
    if (playerStore.isPlaying) {
      audioRef.value.play()
    }
  }
}

// Handle track end
const onEnded = () => {
  playerStore.next()
}

// Watch for play/pause changes in store
watch(() => playerStore.isPlaying, (isPlaying) => {
  if (audioRef.value) {
    if (isPlaying) {
      audioRef.value.play()
    } else {
      audioRef.value.pause()
    }
  }
})

// Watch for volume changes
watch(() => playerStore.volume, (volume) => {
  if (audioRef.value) {
    audioRef.value.volume = volume
  }
})

// Seek function
const onSeek = () => {
  isDragging.value = false
  if (audioRef.value) {
    audioRef.value.currentTime = playerStore.currentTime
  }
}

// Watch for external seek (if we add other controls later)
watch(() => playerStore.currentTime, (time) => {
  if (audioRef.value && !isDragging.value && Math.abs(audioRef.value.currentTime - time) > 1) {
    audioRef.value.currentTime = time
  }
})

const onDragStart = () => {
  isDragging.value = true
}

const togglePlay = () => {
  playerStore.togglePlay()
}

const next = () => {
  playerStore.next()
}

const prev = () => {
  playerStore.prev()
}

const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})

const downloadTrack = () => {
  if (playerStore.currentTrack) {
    const link = document.createElement('a')
    link.href = playerStore.currentTrack.url
    link.download = `${playerStore.currentTrack.title}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>

<template>
  <div v-if="playerStore.currentTrack && isClient">
    <audio
      ref="audioRef"
      :src="playerStore.currentTrack.url"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
      class="hidden"
    />

    <!-- Mini Player Bar -->
    <div 
      class="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-2 md:p-4 z-50 transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0 pointer-events-none translate-y-full': isFullScreen }"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        <!-- Track Info -->
        <div 
          class="flex items-center gap-3 md:gap-4 flex-1 md:w-1/3 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
          @click="toggleFullScreen"
        >
          <div class="relative group flex-shrink-0">
            <img 
              :src="playerStore.currentTrack.cover" 
              alt="Cover" 
              class="w-10 h-10 md:w-14 h-14 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-gray-800"
            />
            <div class="absolute inset-0 bg-black/10 rounded-lg"></div>
          </div>
          <div class="flex flex-col overflow-hidden">
            <h3 class="text-white text-sm md:text-base font-semibold truncate">{{ playerStore.currentTrack.title }}</h3>
            <p class="text-gray-400 text-xs md:text-sm truncate">{{ playerStore.currentTrack.artist }}</p>
          </div>
        </div>

        <!-- Controls (Desktop) -->
        <div class="hidden md:flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div class="flex items-center gap-6">
            <UButton
              icon="i-lucide-skip-back"
              color="neutral"
              variant="ghost"
              size="lg"
              @click.stop="prev"
              class="hover:text-white transition-colors"
            />
            
            <button
              class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-500 flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95 flex-shrink-0"
              @click.stop="togglePlay"
            >
              <UIcon 
                :name="playerStore.isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" 
                class="w-5 h-5 md:w-6 md:h-6 text-gray-950" 
                :class="{ 'ml-0.5': !playerStore.isPlaying }"
              />
            </button>

            <UButton
              icon="i-lucide-skip-forward"
              color="neutral"
              variant="ghost"
              size="lg"
              @click.stop="next"
              class="hover:text-white transition-colors"
            />
          </div>
          
          <div class="w-full flex items-center gap-3 text-xs text-gray-400 font-mono">
            <span>{{ formatTime(playerStore.currentTime) }}</span>
            <USlider
              v-model="playerStore.currentTime"
              :min="0"
              :max="playerStore.duration || 100"
              size="sm"
              color="primary"
              @change="onSeek"
              class="flex-1"
              :disabled="isFullScreen"
            />
            <span>{{ formatTime(playerStore.duration) }}</span>
          </div>
        </div>

        <!-- Controls (Mobile) -->
        <div class="flex md:hidden items-center gap-2">
          <UButton
            :icon="playerStore.isPlaying ? 'i-lucide-pause' : 'i-lucide-play'"
            color="neutral"
            variant="ghost"
            size="lg"
            @click.stop="togglePlay"
          />
          <UButton
            icon="i-lucide-maximize-2"
            color="neutral"
            variant="ghost"
            size="lg"
            @click.stop="toggleFullScreen"
          />
        </div>

        <!-- Volume & Extras (Desktop) -->
        <div class="hidden md:flex items-center justify-end gap-3 w-1/3 min-w-[200px]">
          <UButton
            icon="i-lucide-maximize-2"
            color="neutral"
            variant="ghost"
            size="sm"
            @click.stop="toggleFullScreen"
            title="Expand Player"
            class="hover:text-white transition-colors"
          />
          
          <UButton
            icon="i-lucide-download"
            color="neutral"
            variant="ghost"
            size="sm"
            @click.stop="downloadTrack"
            title="Download"
          />
          
          <div class="flex items-center gap-2 w-32">
            <button
              type="button"
              class="focus:outline-none"
              @click.stop="playerStore.volume = playerStore.volume === 0 ? 1 : 0"
            >
              <UIcon 
                :name="playerStore.volume === 0 ? 'i-lucide-volume-x' : 'i-lucide-volume-2'" 
                class="w-5 h-5 text-gray-400 hover:text-white transition-colors" 
              />
            </button>
            <USlider
              v-model="playerStore.volume"
              :min="0"
              :max="1"
              :step="0.01"
              size="xs"
              color="neutral"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Full Screen Mode Overlay -->
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-400 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div 
        v-if="isFullScreen" 
        class="fixed inset-0 bg-gray-950 z-[999] flex flex-col overflow-hidden"
      >
        <!-- Dynamic Background -->
        <div 
          class="absolute inset-0 opacity-40 blur-[150px] pointer-events-none scale-150 transition-all duration-1000"
          :style="{ backgroundImage: `url(${playerStore.currentTrack.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        ></div>
        
        <!-- Main Overlay Content -->
        <div class="relative z-10 h-full flex flex-col p-6 md:p-12 md:pb-16 max-w-5xl mx-auto w-full">
          <!-- Top Bar -->
          <div class="flex items-center justify-between mb-8 md:mb-12 flex-shrink-0">
            <UButton
              icon="i-lucide-chevron-down"
              color="neutral"
              variant="ghost"
              size="xl"
              @click="toggleFullScreen"
              class="hover:bg-white/10 rounded-full"
            />
            <div class="flex flex-col items-center">
              <span class="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500">Playing from your library</span>
              <span class="text-xs md:text-sm font-bold text-white truncate max-w-[200px] md:max-w-none">{{ playerStore.currentTrack.title }}</span>
            </div>
            <UButton
              icon="i-lucide-more-horizontal"
              color="neutral"
              variant="ghost"
              size="xl"
              class="hover:bg-white/10 rounded-full"
            />
          </div>

          <!-- Main Content Section -->
          <div class="flex-1 flex flex-col md:flex-row gap-8 md:gap-16 min-h-0 items-center md:items-start">
            <!-- Left: Cover Art (Responsive) -->
            <div class="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 md:gap-8 flex-shrink-0">
              <div class="relative group aspect-square w-full max-w-[240px] md:max-w-md lg:max-w-lg">
                <img 
                  :src="playerStore.currentTrack.cover" 
                  class="w-full h-full object-cover rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              
              <!-- Desktop Track Info (Optional, since it's also at the bottom) -->
              <div class="hidden md:flex flex-col items-center text-center">
                <h2 class="text-3xl lg:text-5xl font-black text-white leading-tight truncate max-w-md">{{ playerStore.currentTrack.title }}</h2>
                <p class="text-xl lg:text-2xl text-primary-400 font-medium">{{ playerStore.currentTrack.artist }}</p>
              </div>
            </div>

            <!-- Right: Lyrics Section -->
            <div class="flex-1 overflow-y-auto custom-scrollbar py-4 md:py-8 flex flex-col gap-6 md:gap-10 min-h-0 w-full text-center md:text-left pr-4">
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">I used to be so afraid of the dark</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">Now I see the stars from the park</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white transition-all duration-500 cursor-default leading-tight text-white">Walking down the neon streets tonight</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">Feeling every beat, feeling so right</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">The city light is glowing in my eyes</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">I'm reaching for the rhythm in the skies</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">Everything is clear, everything is bright</p>
              <!-- More lyrics to ensure scrolling is testable -->
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">The night is young and so are we</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">Lost in the melody, wild and free</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">No more shadows, no more fear</p>
              <p class="text-2xl md:text-4xl lg:text-5xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight">Just the music, loud and clear</p>
            </div>
          </div>

          <!-- Bottom Controls Area -->
          <div class="w-full space-y-6 md:space-y-8 mt-auto pt-6 flex-shrink-0">
            <!-- Track Info Mini (Visible on mobile/tablet) -->
            <div class="flex md:hidden items-center justify-between gap-4">
              <div class="flex flex-col min-w-0">
                <h2 class="text-xl md:text-3xl font-black text-white truncate">{{ playerStore.currentTrack.title }}</h2>
                <p class="text-base md:text-xl text-primary-400 font-medium">{{ playerStore.currentTrack.artist }}</p>
              </div>
              <UButton
                icon="i-lucide-heart"
                color="neutral"
                variant="ghost"
                size="xl"
                class="text-gray-400 hover:text-primary-500"
              />
            </div>

            <!-- Progress Bar -->
            <div class="space-y-2 md:space-y-3">
              <USlider
                v-model="playerStore.currentTime"
                :min="0"
                :max="playerStore.duration || 100"
                size="md"
                color="primary"
                @change="onSeek"
                class="w-full"
              />
              <div class="flex items-center justify-between text-[10px] md:text-sm font-mono text-gray-500">
                <span>{{ formatTime(playerStore.currentTime) }}</span>
                <span>{{ formatTime(playerStore.duration) }}</span>
              </div>
            </div>
            
            <!-- Main Controls -->
            <div class="flex items-center justify-between md:justify-center md:gap-16 pt-2">
              <UButton
                icon="i-lucide-shuffle"
                color="neutral"
                variant="ghost"
                size="xl"
                class="text-gray-500 hover:text-white transition-colors"
              />
              <div class="flex items-center gap-8 md:gap-16">
                <UButton
                  icon="i-lucide-skip-back"
                  color="neutral"
                  variant="ghost"
                  size="xl"
                  @click="prev"
                  class="scale-125 md:scale-[1.8] hover:text-white transition-all"
                />
                
                <button
                  class="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-white/20 hover:scale-105 transition-all group active:scale-95 flex-shrink-0"
                  @click="togglePlay"
                >
                  <UIcon 
                    :name="playerStore.isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" 
                    class="w-8 h-8 md:w-12 md:h-12 text-black" 
                    :class="{ 'ml-1': !playerStore.isPlaying }"
                  />
                </button>

                <UButton
                  icon="i-lucide-skip-forward"
                  color="neutral"
                  variant="ghost"
                  size="xl"
                  @click="next"
                  class="scale-125 md:scale-[1.8] hover:text-white transition-all"
                />
              </div>
              <UButton
                icon="i-lucide-repeat"
                color="neutral"
                variant="ghost"
                size="xl"
                class="text-gray-500 hover:text-white transition-colors"
              />
            </div>

            <!-- Bottom Bar (Devices/Share) -->
            <div class="flex items-center justify-between pt-6 border-t border-white/5">
              <UButton icon="i-lucide-laptop-2" color="neutral" variant="ghost" size="lg" class="text-gray-500 hover:text-white" />
              <div class="flex items-center gap-8">
                <UButton icon="i-lucide-share-2" color="neutral" variant="ghost" size="lg" class="text-gray-500 hover:text-white" />
                <UButton icon="i-lucide-list-music" color="neutral" variant="ghost" size="lg" class="text-gray-500 hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Ensure smooth scrolling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  scroll-behavior: smooth;
}
</style>
