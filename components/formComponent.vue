<template>
  <div class="form-component">
    <error-message :errors="errors"></error-message>

    <form @submit.prevent="onSubmit">
      <fieldset class="form-group" v-if="register">
        <input
          class="form-control form-control-lg"
          v-model="user.username"
          required
          type="text"
          placeholder="Your Name"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          v-model="user.email"
          required
          type="email"
          placeholder="Email"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          v-model="user.password"
          required
          minlength="8"
          type="password"
          placeholder="Password"
        />
      </fieldset>
      <button class="btn btn-lg btn-primary pull-xs-right">{{message}}</button>
    </form>
  </div>
</template>

<script>
import { login, register } from "@/api/auth";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "FormComponent",
  props: {
    callback: {
      type: Function,
      default: () => {},
    },
    message: {
      type: String,
      default: "Sign in",
    },
    register: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      user: {
        username: "longxiaobai",
        email: "longxiaobai@163.com",
        password: "longxiaobai",
      },
      errors: {},
    };
  },
  components: {
    ErrorMessage,
  },
  methods: {
    onSubmit() {
      const callback = this.register ? register : login;
      callback(this.user)
        .then((res) => {
          if (res.user) {
            this.$store.commit("setAuth", res.user);
            this.$router.push({ path: "/", query: { page: 1 } });
          }
        })
        .catch((error) => {
          this.errors = error.errors;
        });
    },
  },
};
</script>

<style>
</style>