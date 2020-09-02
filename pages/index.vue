<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="auth">
                <nuxt-link
                  exact
                  :to="{
                    name:'index',
                    query:{
                      page:1,
                      feed: 'your_feed'
                    }
                  }"
                  class="nav-link"
                  :class="{
                    active: feed
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  :to="{
                    name:'index',
                    query:{
                      page:1
                    }
                  }"
                  class="nav-link"
                  :class="{
                    active: !tag && !feed
                  }"
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  exact
                  :to="{
                    name:'index',
                    query:{
                      page:1,
                      tag
                    }
                  }"
                  :class="{
                    active: tag
                  }"
                  class="nav-link"
                >#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>
          <article-item :articles="articles"></article-item>
          <pagination-component
            :current="page"
            :total="articlesCount"
            :options="{
              tag,
              feed
            }"
          ></pagination-component>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                class="tag-pill tag-default"
                :to="{
                  name:'index',
                  query:{
                    page:1,
                    tag: tag,
                  }
                }"
              >{{tag}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticles, feedArticles } from "@/api/article";
import { getTags } from "@/api/tag";
import PaginationComponent from "../components/paginationComponent";
import ArticleItem from "../components/articleItem";
import { compatibleWith } from "@/utils/wrapper.js";

export default {
  scrollToTop: false,
  name: "HomePage",
  components: {
    PaginationComponent,
    ArticleItem,
  },
  data() {
    return {
      pages: 1,
      current: 1,
      feed: "",
      tag: "",
      limit: 10,
      page: 1,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  watchQuery: ["page", "limit", "tag", "feed"],
  async asyncData({ store, params, query, redirect, error }) {
    const { limit = 10, page = 1, tag = "", feed = "" } = query;
    const offset = (page - 1) * limit;
    const fnCallback = feed ? feedArticles : getArticles;
    const dataBack = { limit, page, tag, feed };

    try {
      const allSettledCallback = await Promise.all([
        fnCallback({
          limit,
          offset,
          tag,
        }),
        getTags(),
      ]);

      const [articles_code = {}, tags_code = {}] = allSettledCallback;
      const { tags = [] } = tags_code;
      const { articles = [], articlesCount = 0 } = articles_code;

      return {
        ...dataBack,
        articles,
        articlesCount,
        tags: tags.filter((vals) => !/\u200c/.test(vals)).splice(0, 15),
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
  },
  mounted() {},
};
</script>

<style>
</style>
