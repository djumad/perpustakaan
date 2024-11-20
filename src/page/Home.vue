<template>
    <div class="w-[90%] md:w-[70%] mx-auto mt-10">
      <h1 class="text-3xl font-bold text-center mb-6">BUKU PADA PERPUSTAKAAN</h1>
  
      <!-- Input Pencarian -->
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Cari buku..."
        class="border rounded-lg px-4 py-2 mb-6 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      <!-- Daftar Buku -->
      <div v-if="filteredBuku.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="item in filteredBuku"
          :key="item.id"
          class="card cursor-pointer transition-transform transform hover:scale-105"
          @click="goToDetail(item.id)"
        >
          <img
            :src="pb.files.getUrl(item, item.foto_buku)"
            alt="Foto Buku"
            class="w-full h-48 object-cover rounded-lg shadow-lg"
          />
          <h2 class="text-lg font-semibold mt-2 text-gray-800">{{ item.nama_buku }}</h2>
        </div>
      </div>
  
      <p v-else class="text-center text-gray-500">Tidak ada buku tersedia.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import pb from "../lib/pb";
  import { useRouter } from "vue-router"; // Import Vue Router
  
  const buku = ref([]);
  const searchTerm = ref("");
  const router = useRouter(); // Gunakan router untuk navigasi
  
  // Fungsi untuk mendapatkan data buku
  const getBuku = async () => {
    try {
      const response = await pb.collection("buku").getList(1, 50);
      buku.value = response.items;
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    }
  };
  
  // Fungsi sequential search untuk memfilter buku
  const sequentialSearch = (items, keyword) => {
    const result = [];
    const lowerKeyword = keyword.toLowerCase(); // Case-insensitive
    for (const item of items) {
      if (item.nama_buku.toLowerCase().includes(lowerKeyword)) {
        result.push(item);
      }
    }
    return result;
  };
  
  // Navigasi ke halaman detail
  const goToDetail = (id) => {
    router.push(`/detail/${id}`); // Navigasi ke rute detail
  };
  
  // Filter buku berdasarkan input pencarian
  const filteredBuku = computed(() => {
    return sequentialSearch(buku.value, searchTerm.value);
  });
  
  // Panggil fungsi untuk mendapatkan data buku saat komponen dimuat
  onMounted(() => {
    getBuku();
  });
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 0.75rem;
    background: #fff;
    transition: transform 0.2s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  