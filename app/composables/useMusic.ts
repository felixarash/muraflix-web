export const useMusic = () => {
  const tracks = ref([
    {
      id: 'mujhy-uski-yaad',
      title: 'Mujhy Uski Yaad Na Bhoolay',
      artist: 'Suno AI',
      description: 'Writer & Artist: Fozan Ahmed. A soulful melody about memories that never fade.',
      url: 'https://dwwvsq0bzwbxuz8x.public.blob.vercel-storage.com/Mujhe%20Uski%20Yaad%20Na%20Bhoolay.mp3-slowedandreverbstudio.wav',
      cover: 'https://dwwvsq0bzwbxuz8x.public.blob.vercel-storage.com/Gemini_Generated_Image_2n0wix2n0wix2n0w.png',
      duration: 240,
      publishedAt: '2025-04-14'
    },
    {
      id: 'echoes-in-the-hall',
      title: 'Echoes in the Hall of Us',
      artist: 'Ambient Soundscape',
      description: 'An atmospheric journey through echoing halls and deep reflections.',
      url: 'https://dwwvsq0bzwbxuz8x.public.blob.vercel-storage.com/Echoes_in_the_Hall_of_Us.mp4',
      cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop',
      duration: 215,
      publishedAt: '2026-03-11'
    },
    {
      id: 'sutoor-al-layl',
      title: 'Sutoor al-Layl (سطور الليل)',
      artist: 'Arabic Poetry AI',
      description: 'A beautiful poetic composition titled "Lines of the Night".',
      url: 'https://dwwvsq0bzwbxuz8x.public.blob.vercel-storage.com/%D8%B3%D8%B7%D9%88%D8%B1_%D8%A7%D9%84%D9%84%D9%8A%D9%84.mp4',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
      duration: 190,
      publishedAt: '2026-03-11'
    },
    {
      id: '1',
      title: 'Neon Nights',
      artist: 'Synthwave Boy',
      description: 'A retro-futuristic journey through neon-lit streets.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop',
      duration: 245,
      publishedAt: '2023-10-15'
    },
    {
      id: '2',
      title: 'Ocean Breeze',
      artist: 'Chill Vibes',
      description: 'Relaxing sounds of the ocean mixed with soft piano.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      duration: 180,
      publishedAt: '2023-11-02'
    },
    {
      id: '3',
      title: 'Urban Jungle',
      artist: 'Beat Master',
      description: 'High energy beats for the city life.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      cover: 'https://images.unsplash.com/photo-1449824913929-2b6a3e8471c6?q=80&w=2070&auto=format&fit=crop',
      duration: 210,
      publishedAt: '2023-09-20'
    },
     {
      id: '4',
      title: 'Mountain Echoes',
      artist: 'Nature Sounds',
      description: 'Echoes from the high peaks.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
      duration: 300,
      publishedAt: '2023-12-01'
    },
    {
      id: '5',
      title: 'Cyberpunk City',
      artist: 'Future Sound',
      description: 'Dark and gritty cyberpunk atmosphere.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      cover: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1974&auto=format&fit=crop',
      duration: 260,
      publishedAt: '2024-01-10'
    },
    {
      id: '6',
      title: 'Lo-Fi Study',
      artist: 'Chillhop',
      description: 'Perfect background music for studying.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      cover: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop',
      duration: 195,
      publishedAt: '2024-02-14'
    }
  ])

  return {
    tracks
  }
}
