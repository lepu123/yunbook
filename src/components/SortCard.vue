<template>
  <div class="article-item" @click="gotoDetail">
    <div class="item-img">
      <img :src="articleObj.cover" :alt="articleObj.title">
      <i class="play-icon" v-if="channel === 'ting'"></i>
    </div>
    <div class="item-desc">
      <p class="art-title">{{ articleObj.title }}</p>
      <p class="art-author">{{ articleObj.author }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "sortCard",
  props: {
    articleObj: Object,
    channel: String,
  },
  methods: {
    gotoDetail() {
      if (this.channel !== 'ting') {
        this.$router.push(`/detile/${this.articleObj.id}/${this.articleObj.title}`)
      } else if (this.channel === 'ting') {
        this.$router.push(`/ListeningView/${this.articleObj.id}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 25px;
  width: 27.5%;
  height: 32%;
  box-shadow: 2px 2px 2px rgba(172, 160, 160, 0.5);

  .item-img {
    position: relative;
    width: 100%;
    height: 70%;

    .play-icon {
      position: absolute;
      display: inline-block;
      left: 5px;
      bottom: 5px;
      width: 20px;
      height: 20px;
      background-image: url(@/assets/image/search_icon/icon_play_bookstore_small.png);
      background-size: cover;
      background-position: center;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .item-desc {
    width: 100%;
    height: 30%;


    .art-title {
      width: 100%;
      margin-top: 10px;
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .art-author {
      font-size: 15px;
      color: #999;
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      width: 90%;
    }
  }
}
</style>