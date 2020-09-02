<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
             <nuxt-link to="/login">Have an account?</nuxt-link>
          </p>
          <form-component :callback="onSubmit" :message="message"></form-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from "@/components/formComponent";

export default {
  name: "RegisterPage",
  middleware:["notAuthenticated"],
  data() {
    return {
      user: {
        email: "234",
      },
      message: "Sign up",
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