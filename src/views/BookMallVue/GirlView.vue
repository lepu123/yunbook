<template>
  <div class="girl">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannersArr" :key="index">
        <img :src="item.cover" @click="swipeToBook(item.id,item.title)" />
      </van-swipe-item>
    </van-swipe>

    <WatchMoreComp :Arr="heavyRecommendation" />
    <WatchMoreComp :Arr="weekHot" />
    <WatchMoreComp :Arr="readerLike" />
    <NewBooksComp :Arr="newBook" />
    <NewBooksComp :Arr="ipArr" />
    <SayLoveComp :Arr="nowSayLove" />
    <SayLoveComp :Arr="oldSayLove" />
  </div>
</template>

<script>
import WatchMoreComp from "./WatchMoreComp.vue";
import NewBooksComp from "./NewBooksComp.vue";
import SayLoveComp from "./SayLoveComp.vue";
export default {
  props: {
    girlUrl: String,
  },
  data() {
    return {
      bannersArr: [],
      heavyRecommendation:{},
      weekHot:{},
      readerLike:{},
      niceRecommendation:{},
      newBook:{},
      ipArr:{},
      nowSayLove:{},
      oldSayLove:{},
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${this.girlUrl}`)
        .then(({ data: { data } }) => {
          this.bannersArr = data.list[0].banners;
          this.heavyRecommendation = data.list[1];
          this.weekHot = data.list[2];
          this.readerLike = data.list[3];
          this.newBook = data.list[4];
          this.ipArr = data.list[5];
          this.nowSayLove = data.list[6];
          this.oldSayLove = data.list[7];
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
    NewBooksComp,
    SayLoveComp,
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