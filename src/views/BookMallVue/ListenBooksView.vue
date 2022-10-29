<template>
  <div class="listenbook">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannersArr" :key="index">
        <img :src="item.cover" />
      </van-swipe-item>
    </van-swipe>

    <WatchMoreComp :Arr="hotListenArr" />

    <img class="midImg" :src="imgOne" />

    <NewBooksComp :Arr="girlsSelect" />
  </div>
</template>

<script>
import WatchMoreComp from "./WatchMoreComp.vue";
import NewBooksComp from "./NewBooksComp.vue";
export default {
  props: {
    listenBooksUrl: String,
  },
  components: {
    WatchMoreComp,
    NewBooksComp,
  },
  data() {
    return {
      bannersArr: [],
      hotListenArr: {},
      imgOne: "",
      girlsSelect: {},
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${this.listenBooksUrl}`)
        .then(({ data: { data } }) => {
          this.bannersArr = data.list[0].banners;
          this.hotListenArr = data.list[1];
          this.imgOne = data.list[2].cover;
          this.girlsSelect = data.list[3];
          console.log(data, "xx");
        });
    },
  },

  created() {
    this.getData()
  }
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
.midImg {
  width: 96vw;
  border-radius: 10px;
  margin-left: 2vw;
  height: 140px;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>