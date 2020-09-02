# real-world-nuxt
通过Nuxt.js开发项目，生成发布；通过Github actions完成自动化部署；

## 1. RealWorld链接

https://github.com/gothinkster/realworld
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
<!-- form-onsubmit与keyup.enter冲突，即点击enter键自动提交表单数据></--form-onsubmit与keyup.enter冲突，即点击enter键自动提交表单数据 -->

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
1. 发布配置

   ```javascript
   //nuxt.config.js
   server: {
       port: 3000, // default: 3000
       host: '0.0.0.0', // default: localhost,
   }
   ```

   

2. 本地构建

   ```shell
   nuxt build
   nuxt start
   ```

   

3. 发送压缩包到服务器

   ```javascript
   //打包发送到服务器的需压缩文件、目录
   /.nuxt、/static、/nuxt.config.js、/package.json、/package-lock.json
   ```

   


3. 启动方式

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

     

4. 

     自动化部署工具：Jenkins、Github actions等

     测试项目：https://github.com/longxiaobaiWJ/real_world_nuxt.git

     测试流程：

     + 生成token

       https://github.com/settings/apps  

       Personal access tokens 

       Generate new token 

       选择repo配置项

       38fe4b88b4c550b12a66bef440715e4b2b65132b

     + 配置secrets配置项

       https://github.com/longxiaobaiWJ/real_world_nuxt/settings/secrets

     + main.yaml

       https://gist.github.com/lipengzhou/b92f80142afa37aea397da47366bd872

       real_world_nuxt\.git\workflows\main.yml

     + pm2.config.json
     + 配置服务器信息，根据main.yml配置信息准备


​       
