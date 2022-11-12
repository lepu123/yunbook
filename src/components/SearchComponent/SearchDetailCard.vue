<template>
  <div class="detail" @click="gotoDetail">
    <img :src="item.cover" :alt="item.title">
    <div class="detail-wrap">
      <p class="title">{{ item.title }}</p>
      <p class="author-class">{{ item.author }}/{{ item.category }}</p>
      <p class="summary">{{ item.summary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchDetailCard",
  props: {
    item: Object
  },
  methods: {
    gotoDetail() {
      if (this.item.bookType !== 0) {
        this.$router.push(`/ListeningView/${this.item.bookId}`)
      } else {
        this.$router.push(`/detile/${this.item.bookId}/${this.item.title}`)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  padding: 15px;
  height: 20vh;

  img {
    display: block;
    height: 100%;
    box-shadow: 2px 2px rgba(184,180,184,.3);
  }

  .detail-wrap {
    position: relative;
    z-index: 0;
    flex: 1;
    height: 100%;
    padding-left: 25px;

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .author-class {
      color: #777777;
      font-size: 15px;
    }

    .summary {
      position: absolute;
      bottom: 0;
      height: 25%;
      font-size: 13px;
      overflow: hidden;
      line-height: 18px;
    }
  }
}
</style>