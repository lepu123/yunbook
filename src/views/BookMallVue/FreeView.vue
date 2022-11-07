<template>
  <div class="free">
    <img class="topImg" :src="imgUrl" v-if="!showBu" @click="swipeToBook(item.id,item.title)"/>

    <WatchMoreComp :Arr="goodBooks" />
    <WatchMoreComp :Arr="guessYourLike" v-if="showBu"/>
  </div>
</template>

<script>
import WatchMoreComp from "./WatchMoreComp.vue";
export default {
  props: {
    freeUrl: String,
    sexNum: Number,
  },
  data() {
    return {
      imgUrl: "",
      goodBooks: {},
      guessYourLike: {},
      showBu:true,
    };
  },
  methods: {
    getData() {
      if (this.sexNum == 1) {
        this.$axios
          .get(`https://apis.netstart.cn/yunyuedu${this.freeUrl}`)
          .then(({ data: { data } }) => {
            
            this.goodBooks = data.list[0];
            this.guessYourLike = data.list[1];
          });

          this.showBu = true
      } else {
        this.$axios
          .get(`https://apis.netstart.cn/yunyuedu${this.freeUrl}`)
          .then(({ data: { data } }) => {
            this.imgUrl = data.list[0].banners[0].cover;
            this.goodBooks = data.list[1];
          });
          
          this.showBu = false
      }
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
.topImg {
  width: 96vw;
  height: 200px;
  border-radius: 6px;
  margin-left: 2vw;
  margin-top: 8px;
}
</style>