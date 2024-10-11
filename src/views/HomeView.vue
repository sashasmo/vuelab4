<script setup lang='ts'>

import { inject, onMounted, ref } from 'vue'
import type { Category } from '@/types'
import CategoryWrapper from '@/components/category/CategoryWrapper.vue'
import TestCategoryWrapper from '@/components/category/TestCategoryWrapper.vue'

const serviceProvider = inject('serviceProvider')

const categories = ref<Category[]>([])
const loading = ref<boolean>(false)
const fetchCategories = async () => {
  try {
    loading.value = true
    categories.value = await serviceProvider.getCategoriesService().get({ limit: 8, offset: 0 })
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <main class='container mx-auto'>
    <h1 class='text-center font-semibold p-8' v-mtooltip="{ content: 'Title', trigger: 'click', delay: 500 }">
      Using composition API
    </h1>
    <CategoryWrapper :items='categories' :loading='loading' />
    <h1 class='text-center font-semibold p-8' v-mtooltip="{
        html: true,
        content: '<div class=text-red-500>This is a test tooltip</div>',
        trigger: 'hover', delay: 0
    }">
      Using options API
    </h1>
    <TestCategoryWrapper />
  </main>
</template>
