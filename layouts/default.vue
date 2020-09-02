<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" :to="{name:'index',query:{page:1}}">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name:'index',query:{page:1}}" exact>Home</nuxt-link>
          </li>
          <template v-if="auth">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{path:`/profile/${auth.username}`}">
                <img class="user-pic" :src="auth.image">
                {{auth.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt/>
    <footer>
      <div class="container">
        <nuxt-link class="logo-font" :to="{path:'/',query:{page:1}}">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoyoutDefault",
  computed: {
    ...mapState(["auth"]),
  },
  mounted() {
    // console.log(this.auth);
  },
};
</script>

<style>
</style>