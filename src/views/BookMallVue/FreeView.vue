<template>
  <div class="free">
    <img class="topImg" :src="imgUrl" />

    <WatchMoreComp :Arr="goodBooks" />
    <WatchMoreComp :Arr="guessYourLike" />
  </div>
</template>

<script>
import WatchMoreComp from "./WatchMoreComp.vue";
export default {
  props: {
    freeUrl: String,
  },
  data() {
    return {
      imgUrl: "",
      goodBooks: {},
      guessYourLike: {},
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${this.freeUrl}`)
        .then(({ data: { data } }) => {
          this.imgUrl = data.list[0].banners[0].cover;
          this.goodBooks = data.list[1];
          this.guessYourLike = data.list[2];
        });
    },
  },
  created() {
    this.getData();
  },
  components: {
    WatchMoreComp,
  },
};
</script>

<style lang="scss" scoped>
.topImg {
  width: 96vw;
  height: 200px;
  border-radius: 6px;
  margin-left: 2vw;
  margin-top: 8px;
}
</style>