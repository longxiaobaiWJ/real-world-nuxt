<template>
  <div class="error-page">
    <div class="error-wrapper">
      <h2 class="error-h" v-if="error.statusCode == 404">404，页面不存在</h2>
      <h2 class="error-h" v-else>500，{{error.message ||'服务器错误'}}</h2>
      <nuxt-link class="home-page-back" :to="{name:'index',query:{page:1}}">返回首页</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: ["error"],
  mounted() {
    console.log(this.error);
  },
};
</script>

<style scope>
.error-page {
  display: flex;
  justify-content: center;
}
.error-wrapper {
  margin: 60px 0;
  text-align: center;
}
.error-h {
  margin-bottom: 2rem;
}
.home-page-back {
  font-size: 23px;
  text-align: center;
}
</style>