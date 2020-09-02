<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p v-html="profile.bio"></p>
            <nuxt-link
              v-if="auth && auth.username === profile.username"
              ui-sref="app.setting"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i>Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              @click="toggleFollow(profile)"
              class="btn btn-sm action-btn"
              :class="[profile.following ? 'btn-secondary':'btn-outline-secondary']"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{profile.following ? 'Unfollow': 'Follow'}} {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  :to="{ path: `${username}`}"
                  class="nav-link"
                  exact
                  :class="{active: !feed}"
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{path: `${username}`, query:{feed :'favorites'}}"
                  class="nav-link"
                  exact
                  :class="{active: feed}"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>
          <article-item :articles="articles"></article-item>
          <pagination-component
            :route="`/profile/${username}`"
            :current="page"
            :total="articlesCount"
            :limit="5"
            :options="{
              feed
            }"
          ></pagination-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { obtainProfile, followUser, unFollowUser } from "@/api/auth";
import ArticleItem from "~/components/articleItem";
import { getArticles, feedArticles } from "@/api/article";
import PaginationComponent from "~/components/paginationComponent";

export default {
  name: "ProfileIdPage",
  components: {
    ArticleItem,
    PaginationComponent,
  },
  computed: {
    ...mapState(["auth"]),
  },
  watchQuery: ["feed", "page"],
  validate({ params }) {
    if (params.username.includes("@")) {
      return false;
    } else {
      return params.username;
    }
  },
  async asyncData({ params, store, query, error }) {
    const { feed, page = 1 } = query;
    const { username } = params;
    let profile = {};
    const initState = store.state.profile;

    try {
      if (initState && initState.username === username) {
        profile = store.state.profile;
      } else {
        const obtain = await obtainProfile(username);
        if (obtain) {
          profile = obtain.profile || {};
          store.commit("setProfile", obtain.profile);
        }
      }

      const viewQuery = { limit: 5, offset: 0 };
      if (feed) {
        viewQuery.favorited = username;
      } else {
        viewQuery.author = username;
      }

      const { articles, articlesCount } = await getArticles(viewQuery);
      return {
        username,
        feed,
        profile,
        articles,
        page,
        articlesCount,
      };
    } catch (err) {
      error({
        statusCode: 502,
        message: "后台数据查询出错",
      });
    }
  },
  methods: {
    toggleFollow(profile) {
      const callback = profile.following ? unFollowUser : followUser;
      callback(profile.username)
        .then((res) => {
          if (res.profile) {
            this.profile = res.profile;
            this.$store.commit("setProfile", res.profile);
          }
        })
        .catch(({ response }) => {
          alert(response.status);
        });
    },
  },
};
</script>

<style>
</style>