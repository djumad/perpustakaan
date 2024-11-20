<template>
    <div class="w-[80%] mx-auto mt-10">
      <h1 class="text-3xl font-bold text-center mb-8">Detail Buku</h1>
  
      <div
        v-if="buku"
        class="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start gap-6"
      >
        <!-- Gambar Buku -->
        <div class="w-full md:w-1/3">
          <img
            :src="pb.files.getUrl(buku, buku.foto_buku)"
            alt="Foto Buku"
            class="rounded-lg w-full h-auto object-cover shadow"
          />
        </div>
  
        <!-- Detail Buku -->
        <div class="w-full md:w-2/3">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ buku.nama_buku }}
          </h2>
          <div v-html="buku.deskripsi_buku" class="text-gray-600 leading-relaxed"></div>
        </div>
        <router-link
        to="/"
        class="block text-center mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Kembali
      </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import pb from "../lib/pb";
  
  const route = useRoute();
  const buku = ref(null);
  
  const getDetailBuku = async (id) => {
    try {
      const response = await pb.collection("buku").getOne(id);
      buku.value = response;
    } catch (error) {
      console.error("Gagal memuat detail buku:", error);
    }
  };
  
  onMounted(() => {
    const { id } = route.params;
    getDetailBuku(id);
  });
  </script>
  
  <style scoped>
  /* Responsif untuk kartu */
  @media (min-width: 768px) {
    .card {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
  }
  </style>
  