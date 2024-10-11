<script lang='ts'>
import { defineComponent } from 'vue'
import CategoryCard from '@/components/category/CategoryCard.vue'
import CategorySkeleton from '@/components/category/CategorySkeleton.vue'
import type { Category } from '@/types'

export default defineComponent({
  components: {
    CategoryCard,
    CategorySkeleton
  },
  inject: ['serviceProvider'],
  data() {
    return {
      loading: false,
      categories: [] as Array<Category>
    }
  },
  methods: {
    async fetchCategories() {
      try {
        this.loading = true
        this.categories = await this.serviceProvider.getCategoriesService().get({ limit: 8, offset: 0 })
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchCategories()
  }
})
</script>

<template>
  <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
    <template v-if='!loading'>
      <CategoryCard
        v-for='category in categories'
        :key='category.id'
        :item='category'
      />
    </template>
    <template v-else>
      <CategorySkeleton v-for='index in 4' :key='index' />
    </template>
  </div>
</template>