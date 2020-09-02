<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-meta :article="article"></article-meta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline"
              v-for="tag in article.tagList"
              :key="tag"
            >{{tag}}</li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>
      <div class="row">
        <article-comments :comments="comments" :slug="slug" @deleteCb="deleteCb"></article-comments>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleSingle } from "@/api/article";
import { getCommentArticle } from "@/api/comment";
import MarkdownIt from "markdown-it";
import ArticleMeta from "../../components/ArticleMeta";
import ArticleComments from "../../components/articleComments";

export default {
  name: "ArticlePage",
  data() {
    return {
      slug: 45,
    };
  },
  validate({ params }) {
    return params.slug;
  },
  components: {
    ArticleMeta,
    ArticleComments,
  },
  async asyncData({ store, params, query }) {
    const { slug } = params;
    const [article_code, comments_code] = await Promise.all([
      getArticleSingle(slug),
      getCommentArticle(slug),
    ]);
    const { article } = article_code;
    const { comments } = comments_code;
    article.body = new MarkdownIt({ html: true }).render(article.body);

    return {
      slug,
      article,
      comments,
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  methods: {
    deleteCb(comment_id) {
      this.comments = this.comments.filter((vals) => vals.id !== comment_id);
    },
  },
};
</script>

<style>
</style>