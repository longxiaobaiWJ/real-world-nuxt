## 1. RealWorld链接

github：https://github.com/gothinkster/realworld
模板：https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md
api：https://github.com/gothinkster/realworld/tree/master/api
site：https://demo.realworld.io/
A free CDN for Open Source：https://www.jsdelivr.com/



## 2. package

```shell
npm install dayjs --save
npm install cookieparser --save
npm install js-cookie --save
npm install markdown-it --save
```



## 3. 错误处理

- javascript 图片报错 怎么使用默认图片

```javascript
<img :src="article.author.image" @error="callbackRender">

methods:{
    callbackRender($event) {
        $event.target.src = this.defaultSrc;
    },
}
```

- form-onsubmit与keyup.enter冲突

```html
<!-- form-onsubmit与keyup.enter冲突，即点击enter键自动提交表单数据；form-onsubmit与keyup.enter冲突，即点击enter键自动提交表单数据 -->
<!-- 如果希望阻止这一默认行为，可以在 <form> 标签上添加 @submit.prevent -->

<form @submit.prevent>
     <button type="button" @click="onSubmit">Publish Article</button>
</form>
```

- 错误请求地址

```javascript
http://localhost:3000/article/vue-directive-4yx8m0
http://localhost:3000/profile/sameeragg@gmail.com

// 在相应的.vue页面组件文件里配置validate配置项
validate({ params }) {
    // 拦截处理
},

/**
 * 方法一:
 * 通过try-catch处理请求,将请求错误转换到页面级可控处理
 */
async asyncData({ store, params, query, redirect, error }) {
   try {
      const [articles_code, tags_code] = await Promise.all([
        fnCallback({
          limit,
          offset,
          tag,
        }),
        getTags(),
      ]);
      const { articles = [], articlesCount = 0 } = articles_code;
      const { tags = [] } = tags_code;

      return {
        ...dataBack,
        articles,
        articlesCount,
        tags: tags.filter((vals) => !/\u200c/.test(vals)),
      };
    } catch (err) {
      /**
       * 通过try-catch处理请求
       * 将请求错误转换到页面级可控处理
       * 处理方式有3种:
       * redirect: 重定向相应页面
       * error: 向项目配置的404页面抛出指定的相应错误与信息
       * return: 返回合并默认的兜底数据
       */
      error({
        statusCode: 502,
        message: "This is Server Errors",
      });
    } 
}    


// 上述方式在使用Promise.all时某一个请求错误时，会影响所有接口:
// 解决一: 将数据请求分开处理，分别使用try-catch处理
// 解决二: Promise.allSettled合并数据请求，通过单独处理某些数据请求的错误逻辑，不过Promise.allSettled，目前兼容性不太好，在node环境中是undefined，深坑啊
// 不兼容代码示例:
const allSettledCallback = await Promise.allSettled([
    fnCallback({
        limit,
        offset,
        tag,
    }),
    getTags(),
]);
const [articles_code, tags_code] = compatibleWith(allSettledCallback);
```

## 4. 发布部署

参考链接: http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html

实际操作: https://github.com/longxiaobaiWJ/real-world-nuxt

### 1.发布配置

```javascript
//nuxt.config.js
server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
}
```



### 2.本地构建

```shell
nuxt build
nuxt start
```



### 3.发送压缩包到服务器

```javascript
//打包发送到服务器的需压缩文件、目录
/.nuxt、/static、/nuxt.config.js、/package.json、/package-lock.json
```



### 4.启动方式

```shell
#启动方式:node、pm2
npm install

npm install pm2 -g

https://www.jianshu.com/p/e15fd72727fe

#使用示例:
pm2 start npm -- start #该方式在实际操作中，并未监听端口，故浏览器无法访问；可尝试pm2 delete name，删除后重新启动
#pm2 start --name nuxt npm -- start# 重命名

pm2 start start-app-pm2.json
#start-app-pm2.json
{
    "apps": [{
        "name": "real-world-nuxt",
        "script": "npm",
        "args": "start"
    }]
}

#检测是否成功，查看是否监听配置端口
netstat -ntlp
```



### 5.创建自动部署

自动化部署工具：Jenkins、Github actions等

测试项目：https://github.com/longxiaobaiWJ/real_world_nuxt.git

#### 测试流程：

1. 生成token

   > https://github.com/settings/apps  
   >
   > Personal access tokens 
   >
   > Generate new token 
   >
   > 选择repo配置项
   >
   > 38fe4b88b4c550b12a66bef440715e4b2b65132b

2. 配置secrets配置项

   > https://github.com/longxiaobaiWJ/real_world_nuxt/settings/secrets
   >
   > New secret => 38fe4b88b4c550b12a66bef440715e4b2b65132b

3. 编写main.yaml

   > https://gist.github.com/lipengzhou/b92f80142afa37aea397da47366bd872
   >
   > real_world_nuxt\.git\workflows\main.yml

4. pm2.config.json

   ```json
   {
       "apps": [{
           "name": "real-world-nuxt",
           "script": "npm",
           "args": "start"
       }]
   }
   ```

   

5. 配置服务器信息，根据main.yml配置信息准备



### 6.触发自动部署

```shell
git tag v0.x.x
git tag #查看tag
git push origin v0.x.x
```

​      

## 5. 问题处理

1. gist.github.com 无法访问解决办法

   ```shell
   windows下 打开C:\Windows\System32\drivers\etc\hosts文件   
   
   # 编辑器打开，在最后行添加192.30.253.118 gist.github.com
   ```

   

2. 如果想在nuxt中直接使用其他文件的路径，比如下面的components，我们需要在nuxt.config.js进行配置即可

   ```javascript
   // 示例代码
   import SiteHeader from 'components/site/SiteHeader.vue'
   
   //nuxt.config.js
   build: {
       extend(config, ctx) {
           // Run ESLint on save
           if (ctx.isDev && ctx.isClient) {
               config.module.rules.push()
           }
           config.resolve.alias['components'] = path.resolve(__dirname, 'components')
       }
   }
   ```
   
3. improve-your-developer-experience-with-nuxt-components

   Nuxt团队引入了**[@ nuxt / components](https://www.npmjs.com/package/@nuxt/components)**模块，目的是使Nuxt开发更快，并使您作为开发人员更加高效。

   ```javascript
   // 简而言之，该模块自动扫描，导入和注册在~/components目录中找到的Vue组件，因此，当我们在页面，布局甚至组件内部使用它们时，我们不必编写import语句。
   // 从Nuxt v2.13开始，默认情况下，当您创建新的Nuxt项目时，此模块将可用。但是，您仍然需要使用components: truein 激活它nuxt.config.js.
   
   // For nuxt v2.13+
   export default {
     components: true
   }
   
   // https://zh.nuxtjs.org/blog/improve-your-developer-experience-with-nuxt-components/
   ```

4. 上线发布

   ```javascript
   // nuxt.config.js
   module.exports = {
       router: {
           base: '/nuxt/', // 适应于nginx配置，或其他需要
           linkActiveClass: 'active',
           extendRoutes(routes, resolve) {
   
           }
       }
   }
   
   // 配置base后，其他静态资源，如页面通过link标签引用css资源，可能出现资源找不到的问题，注意测试解决
   ```

   



