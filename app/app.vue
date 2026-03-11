<script setup lang="ts">
useHead({
  title: 'Muraflix - Modern Music Player',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'A fast, modern music player better than Spotify.' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <UApp>
    <ClientOnly>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ClientOnly>
  </UApp>
</template>
