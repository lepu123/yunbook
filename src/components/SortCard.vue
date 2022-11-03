<template>
  <div class="article-item">
    <div class="item-img">
      <img :src="articleObj.cover" :alt="articleObj.title">
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
    articleObj: Object
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
  box-shadow: 1px 1px 2px rgba(172, 160, 160, 0.99);

  .item-img {
    width: 100%;
    height: 70%;

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
    }
  }
}
</style>