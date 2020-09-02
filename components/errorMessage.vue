<template>
  <ul class="error-messages-wrapper">
    <div class="error-messages" v-for="(values, field) in errors" :key="field">
      <li v-for="(message,index) in values" :key="index">{{field}} {{message}}</li>
    </div>
  </ul>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>