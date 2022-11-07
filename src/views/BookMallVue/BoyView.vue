<template>
  <div class="boy">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannersArr" :key="index">
        <img :src="item.cover" @click="swipeToBook(item.id,item.title)" />
      </van-swipe-item>
    </van-swipe>

    <WatchMoreComp :Arr="heavyRecommendation" />
    <WatchMoreComp :Arr="weekHot" />
    <WatchMoreComp :Arr="readerLike" />
    <WatchMoreComp :Arr="niceRecommendation" />
  </div>
</template>

<script>
import WatchMoreComp from "./WatchMoreComp.vue";
export default {
  props: {
    boyUrl: String,
  },
  data() {
    return {
      bannersArr: [],
      heavyRecommendation:{},
      weekHot:{},
      readerLike:{},
      niceRecommendation:{},
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${this.boyUrl}`)
        .then(({ data: { data } }) => {
          this.bannersArr = data.list[0].banners;
          this.heavyRecommendation = data.list[1];
          this.weekHot = data.list[2];
          this.readerLike = data.list[3];
          this.niceRecommendation = data.list[4];
        });
    },
        swipeToBook(id,title) {
      this.$router.push(`/detile/${id}/${title}`);
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
* {
  margin: 0;
  padding: 0;
}
.my-swipe .van-swipe-item {
  margin-top: 10px;
  img {
    width: 96vw;
    height: 200px;
    border-radius: 6px;
    margin-left: 2vw;
  }
}
</style>