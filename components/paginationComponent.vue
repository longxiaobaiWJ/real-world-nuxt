<template>
  <div>
    <ul class="pagination">
      <li v-for="item in pages" :key="item" class="page-item" :class="{'active': item == current}">
        <nuxt-link
          class="page-link"
          :to="{
            path: route,
            query: {
                page: item,
                ...options
            }
        }"
        >{{item}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    current: {
      type: Number | String,
      default: 1,
    },
    total: {
      type: Number | String,
      default: 1,
    },
    options: {
      type: Object,
      default: {},
    },
    route: {
      type: String,
      default: "/",
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    pages(newVal) {
      return Math.min(Math.min(Math.ceil(this.total / this.limit), 18));
    },
  },
};
</script>

<style>
</style>