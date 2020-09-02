<template>
  <div class="col-xs-12 col-md-8 offset-md-2">
    <form v-if="auth" class="card comment-form" @submit.prevent="PostComment">
      <div class="card-block">
        <textarea
          v-model="commentViewMessage"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="auth.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <p v-else style="display: inherit;">
      <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>or
      <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>to add comments on this article.
    </p>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{path:`/profile/${comment.author.username}`}">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>&nbsp;
        <nuxt-link
          class="comment-author"
          :to="{path:`/profile/${comment.author.username}`}"
        >{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.updatedAt | date('MMM DD,YYYY')}}</span>
        <span class="mod-options" v-show="auth && comment.author.username === auth.username">
          <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { createCommentArticle, delCommentArticle } from "@/api/comment";
import { mapState } from "vuex";

export default {
  name: "ArticleComments",
  props: {
    comments: {
      type: Array,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commentViewMessage: "",
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    PostComment() {
      if (this.commentViewMessage) {
        createCommentArticle(this.slug, {
          comment: {
            body: this.commentViewMessage,
          },
        }).then((res) => {
          if (res.comment) {
            this.comments.unshift(res.comment);
            this.commentViewMessage = "";
          }
        });
      }
    },
    deleteComment(comment_id) {
      if (comment_id) {
        delCommentArticle({
          slug: this.slug,
          id: comment_id,
        }).then((res) => {
          this.$emit("deleteCb", comment_id);
        });
      }
    },
  },
};
</script>

<style>
</style>