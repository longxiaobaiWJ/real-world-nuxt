(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{174:function(e,t,r){"use strict";r(14);var n=r(173),o=r.n(n).a.create({baseURL:"https://conduit.productionready.io"});o.interceptors.response.use((function(e){return e.data}),(function(e){return Promise.reject(e.response.data)}));var l=o,c=function(e){return l.post("/api/users/login",{user:e})},m=function(e){return l.post("/api/users/register",{user:e})},d={name:"FormComponent",props:{callback:{type:Function,default:function(){}},message:{type:String,default:"Sign in"},register:{type:Boolean,default:!0}},data:function(){return{user:{username:"longxiaobai",email:"longxiaobai@163.com",password:"longxiaobai"},errors:{}}},mounted:function(){},methods:{onSubmit:function(){var e=this;(this.register?m:c)(this.user).then((function(t){console.log(t),e.$router.push("/")})).catch((function(t){e.errors=t.errors}))}}},f=r(20),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"form-component"},[e._l(e.errors,(function(t,n){return r("ul",{key:n,staticClass:"error-messages"},e._l(t,(function(t,o){return r("li",{key:o},[e._v(e._s(n)+" "+e._s(t))])})),0)})),e._v(" "),r("form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[e.register?r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control form-control-lg",attrs:{required:"",type:"text",placeholder:"Your Name"},domProps:{value:e.user.username},on:{input:function(t){t.target.composing||e.$set(e.user,"username",t.target.value)}}})]):e._e(),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],staticClass:"form-control form-control-lg",attrs:{required:"",type:"email",placeholder:"Email"},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||e.$set(e.user,"email",t.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control form-control-lg",attrs:{required:"",minlength:"8",type:"password",placeholder:"Password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),r("button",{staticClass:"btn btn-lg btn-primary pull-xs-right"},[e._v(e._s(e.message))])])],2)}),[],!1,null,null,null);t.a=component.exports},178:function(e,t,r){"use strict";r.r(t);var n={name:"RegisterPage",data:function(){return{user:{email:"234"},message:"Sign up"}},components:{FormComponent:r(174).a},methods:{onSubmit:function(e){console.log(e)}}},o=r(20),component=Object(o.a)(n,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"auth-page"},[t("div",{staticClass:"container page"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6 offset-md-3 col-xs-12"},[t("h1",{staticClass:"text-xs-center"},[this._v("Sign up")]),this._v(" "),this._m(0),this._v(" "),t("form-component",{attrs:{callback:this.onSubmit,message:this.message}})],1)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"text-xs-center"},[t("a",{attrs:{href:""}},[this._v("Have an account?")])])}],!1,null,null,null);t.default=component.exports}}]);