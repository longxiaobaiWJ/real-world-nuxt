import Vue from "vue";

Vue.directive('toggle', {
    bind: function (el, binding, vnode, oldVnode) {
        el.addEventListener("click", () => {
            console.log(binding.value);
        })
    }
});