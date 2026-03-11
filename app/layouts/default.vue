<script setup lang="ts">
const searchQuery = useState('searchQuery', () => '')
const isMobileMenuOpen = ref(false)
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-950 text-white overflow-hidden font-sans selection:bg-primary-500/30">
    <!-- Header -->
    <header class="h-16 border-b border-gray-800/50 flex items-center justify-between px-4 md:px-6 z-20 bg-gray-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-950/50">
      <div class="flex items-center gap-3">
        <UButton 
          icon="i-lucide-menu" 
          color="neutral" 
          variant="ghost" 
          class="md:hidden" 
          @click="isMobileMenuOpen = true"
        />
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
          <UIcon name="i-lucide-music" class="text-white w-5 h-5" />
        </div>
        <h1 class="hidden md:block text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Muraflix</h1>
      </div>
      
      <div class="flex-1 max-w-xl mx-4 md:mx-12">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UIcon name="i-lucide-search" class="text-gray-500 group-focus-within:text-primary-400 transition-colors" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for artists, songs, or albums..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-full leading-5 bg-gray-900/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 sm:text-sm transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      <div class="flex items-center gap-3 md:gap-4">
        <UButton icon="i-lucide-bell" color="neutral" variant="ghost" class="text-gray-400 hover:text-white" />
        <UAvatar 
          src="https://avatars.githubusercontent.com/u/739984?v=4" 
          alt="User" 
          size="sm" 
          class="ring-2 ring-gray-800 transition-transform hover:scale-105 cursor-pointer"
        />
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden relative">
      <!-- Sidebar -->
      <aside class="w-64 border-r border-gray-800/50 bg-gray-950/30 hidden md:flex flex-col p-4 gap-1 z-10">
        <div class="space-y-1">
          <UButton to="/" icon="i-lucide-home" variant="ghost" color="neutral" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all">Home</UButton>
          <UButton to="/browse" icon="i-lucide-compass" variant="ghost" color="neutral" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all">Browse</UButton>
          <UButton to="/library" icon="i-lucide-library" variant="ghost" color="neutral" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all">Your Library</UButton>
        </div>
        
        <div class="mt-8">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Playlists</h3>
          <div class="space-y-1">
            <UButton variant="ghost" color="neutral" icon="i-lucide-plus-square" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all">Create Playlist</UButton>
            <UButton variant="ghost" color="neutral" icon="i-lucide-heart" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all">Liked Songs</UButton>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto scroll-smooth relative">
        <div class="absolute inset-0 bg-gradient-to-b from-primary-900/10 to-transparent pointer-events-none h-96"></div>
        <div class="relative z-10 p-6 pb-32 min-h-full">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile Menu -->
    <USlideover v-model="isMobileMenuOpen" side="left" class="md:hidden">
      <div class="p-4 flex-1 bg-gray-950 border-r border-gray-800 h-full">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <UIcon name="i-lucide-music" class="text-white w-5 h-5" />
          </div>
          <h1 class="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Muraflix</h1>
          <UButton icon="i-lucide-x" color="neutral" variant="ghost" class="ml-auto" @click="isMobileMenuOpen = false" />
        </div>
        
        <nav class="space-y-1">
          <UButton to="/" icon="i-lucide-home" variant="ghost" color="neutral" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all" @click="isMobileMenuOpen = false">Home</UButton>
          <UButton to="/browse" icon="i-lucide-compass" variant="ghost" color="neutral" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all" @click="isMobileMenuOpen = false">Browse</UButton>
          <UButton to="/library" icon="i-lucide-library" variant="ghost" color="neutral" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all" @click="isMobileMenuOpen = false">Your Library</UButton>
        </nav>
        
        <div class="mt-8">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Playlists</h3>
          <div class="space-y-1">
            <UButton variant="ghost" color="neutral" icon="i-lucide-plus-square" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all">Create Playlist</UButton>
            <UButton variant="ghost" color="neutral" icon="i-lucide-heart" class="justify-start w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all">Liked Songs</UButton>
          </div>
        </div>
      </div>
    </USlideover>

    <!-- Player -->
    <MusicPlayer />
  </div>
</template>

<style>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>
