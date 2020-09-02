<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile-username',
        params:{
          username: article.author.username
        }
      }"
    >
      <img :src="article.author.image" @error="callbackDefault" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{path:`/profile/${article.author.username}`}"
        class="author"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.updatedAt | date('MMM DD,YYYY')}}</span>
    </div>
    <div class="button-wrapper" v-if="auth && article.author.username == auth.username">
      <nuxt-link class="btn btn-outline-secondary btn-sm" :to="`/editor/${article.slug}`">
        <i class="ion-edit ion-right"></i>Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm abs-left" @click="deleteArticle(article.slug)">
        <i class="ion-trash-a ion-right"></i>Delete Article
      </button>
    </div>
    <div class="button-wrapper" v-else>
      <button
        class="btn btn-sm"
        @click="toggleFollow(article.author)"
        :class="[article.author.following? 'btn-secondary':'btn-outline-secondary']"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{article.author.following ? 'Unfollow' : 'Follow'}} {{article.author.username}}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm"
        @click="toggleIsFavorited(article)"
        :class="[article.favorited? 'btn-primary':'btn-outline-primary']"
      >
        <i class="ion-heart"></i>
        &nbsp;
        {{article.favorited ? 'Unfavorite' : 'Favorite'}} Article
        <span
          class="counter"
        >({{article.favoritesCount}})</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticle } from "@/api/article";
import { followUser, unFollowUser } from "@/api/auth";
import { addFavoriteArticle, delFavoriteArticle } from "@/api/article";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultSrc:
        "https://s0.lgstatic.com/i/image2/M01/83/6D/CgoB5luFXbWAQobXAAGQvN27Fjg588.jpg",
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    toggleFollow(author) {
      const callback = author.following ? unFollowUser : followUser;
      callback(author.username)
        .then((res) => {
          if (res.profile) {
            author.following = res.profile.following;
          }
        })
        .catch(({ response }) => {
          alert(response.status);
        });
    },
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
    deleteArticle(slug = "") {
      deleteArticle(slug).then((res) => {
        this.$router.push({ path: "/", query: { page: 1 } });
      });
    },
    callbackDefault($event) {
      $event.target.src = this.defaultSrc;
    },
  },
};
</script>

<style>
.button-wrapper {
  display: inline-flex;
}
.abs-left {
  margin-left: 6px;
}
.ion-right {
  margin-right: 4px;
}
</style>