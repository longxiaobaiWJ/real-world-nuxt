<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <error-message :errors="errors"></error-message>
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="article.title"
                  type="text"
                  placeholder="Article Title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="article.description"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  v-model="articleTag"
                  type="text"
                  placeholder="Enter tags"
                  @keyup.enter="addTag"
                >
                <div class="tag-list">
                  <span class="tag-default tag-pill" v-for="tag in article.tagList" :key="tag">
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{tag}}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateArticle, createArticle, getArticleSingle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "EditorPage",
  middleware: ["authenticated"],
  components: {
    ErrorMessage,
  },
  data() {
    return {
      article: {
        slug: "",
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      articleTag: "",
      errors: {},
    };
  },
  async asyncData({ store, env, params, query }) {
    if (params.slug) {
      const { article } = await getArticleSingle(params.slug);
      return { article };
    } else {
      return {};
    }
  },
  methods: {
    onSubmit() {
      const callback = this.article.slug ? updateArticle : createArticle;
      callback(this.article)
        .then((res) => {
          if (res.article) {
            this.$router.push({
              name: "article-slug",
              params: { slug: res.article.slug },
            });
          }
        })
        .catch(({ errors }) => {
          this.errors = errors;
        });
    },
    addTag() {
      if (!this.article.tagList.includes(this.articleTag)) {
        this.article.tagList.push(this.articleTag);
        this.articleTag = "";
      }
    },
    removeTag(tag) {
      this.article.tagList = this.article.tagList.filter(
        (vals) => vals !== tag
      );
    },
  },
};
</script>

<style>
.tag-list {
  margin-top: 4px;
}
</style>