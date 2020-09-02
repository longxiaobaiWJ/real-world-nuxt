<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Have an account?</nuxt-link>
          </p>
          <form-component :register="register" :callback="onSubmit" :message="message"></form-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from "~/components/formComponent";

export default {
  name: "LoginPage",
  middleware: ["notAuthenticated"],
  data() {
    return {
      user: {
        email: "234",
      },
      message: "Sign in",
      register: false,
    };
  },
  components: {
    FormComponent,
  },
  methods: {
    onSubmit(payload) {
      console.log(payload);
    },
  },
};
</script>

<style>
</style>