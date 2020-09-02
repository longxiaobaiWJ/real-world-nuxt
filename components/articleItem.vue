<template>
  <div class="article-preview-master">
    <div class="article-preview" v-for="article in articles" :key="article.slug">
      <div class="article-meta">
        <nuxt-link
          :to="{
            name: 'profile-username',
            params:{username:article.author.username}
         }"
        >
          <img :src="article.author.image" @error="callbackDefault" />
        </nuxt-link>
        <div class="info">
          <nuxt-link
            :to="{
            	name: 'profile-username',
							params:{username:article.author.username}
            }"
            class="author"
          >{{article.author.username}}</nuxt-link>
          <span class="date">{{article.updatedAt | date('MMM DD,YYYY')}}</span>
        </div>
        <button
          @click="toggleIsFavorited(article)"
          :class="[article.favorited ? 'btn-primary':'btn-outline-primary']"
          class="btn btn-sm pull-xs-right"
        >
          <i class="ion-heart"></i>
          {{article.favoritesCount}}
        </button>
      </div>
      <nuxt-link
        :to="{
					name:'article-slug',
					params:{slug:article.slug}
				}"
        class="preview-link"
      >
        <h1>{{article.title}}</h1>
        <p>{{article.description}}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li
            class="tag-default tag-pill tag-outline"
            v-for="tag in article.tagList"
            :key="tag"
          >{{tag}}</li>
        </ul>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { addFavoriteArticle, delFavoriteArticle } from "@/api/article";

export default {
  name: "ArticleItem",
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      defaultSrc:
        "https://s0.lgstatic.com/i/image2/M01/83/6D/CgoB5luFXbWAQobXAAGQvN27Fjg588.jpg",
    };
  },
  methods: {
    toggleIsFavorited(article) {
      const { favorited, slug } = article;
      const callback = favorited ? delFavoriteArticle : addFavoriteArticle;
      callback(slug).then((res) => {
        if (res.article) {
          const { favorited, favoritesCount } = res.article;
          article.favorited = favorited;
          article.favoritesCount = favoritesCount;
        }
      });
    },
    callbackDefault($event) {
      $event.target.src = this.defaultSrc;
    },
  },
};
</script>

<style>
</style>