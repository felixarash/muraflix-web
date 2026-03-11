import { defineStore } from 'pinia'

export interface Track {
  id: string
  title: string
  artist: string
  description: string
  url: string
  cover: string
  duration: number
  publishedAt: string
}

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<Track | null>(null)
  const isPlaying = ref(false)
  const volume = ref(1)
  const currentTime = ref(0)
  const duration = ref(0)
  const queue = ref<Track[]>([])
  
  const play = (track: Track) => {
    if (currentTrack.value?.id === track.id) {
      togglePlay()
      return
    }
    currentTrack.value = track
    isPlaying.value = true
    // Reset progress when changing tracks
    currentTime.value = 0
  }

  const togglePlay = () => {
    isPlaying.value = !isPlaying.value
  }

  const setVolume = (vol: number) => {
    volume.value = Math.max(0, Math.min(1, vol))
  }

  const seek = (time: number) => {
    currentTime.value = time
  }

  const next = () => {
    // Implement next logic based on queue
    const index = queue.value.findIndex(t => t.id === currentTrack.value?.id)
    if (index !== -1 && index < queue.value.length - 1) {
      const nextTrack = queue.value[index + 1]
      if (nextTrack) {
        play(nextTrack)
      }
    }
  }

  const prev = () => {
    // Implement prev logic
    const index = queue.value.findIndex(t => t.id === currentTrack.value?.id)
    if (index > 0) {
      const prevTrack = queue.value[index - 1]
      if (prevTrack) {
        play(prevTrack)
      }
    }
  }

  const preloadNext = () => {
    const index = queue.value.findIndex(t => t.id === currentTrack.value?.id)
    if (index !== -1 && index < queue.value.length - 1) {
      const nextTrack = queue.value[index + 1]
      if (nextTrack) {
        const audio = new Audio()
        audio.src = nextTrack.url
        audio.preload = 'auto'
      }
    }
  }

  return {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    queue,
    play,
    togglePlay,
    setVolume,
    seek,
    next,
    prev,
    preloadNext
  }
})
