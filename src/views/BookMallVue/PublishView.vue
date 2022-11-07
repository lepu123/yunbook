<template>
  <div class="publish">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannersArr" :key="index">
        <img :src="item.cover" @click="swipeToBook(item.id, item.title)" />
      </van-swipe-item>
    </van-swipe>

    <div class="short-cut">
      <ul>
        <li
          v-for="item in shortCutArr"
          :key="item.msgId"
          @click="getNavData(item.url)"
        >
          <img :src="item.cover" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <NewBooksComp :Arr="reasoningArr" />
    <WatchMoreComp :Arr="niceBooks" />

    <img class="midImg" :src="imgOne" />
    <NewBooksComp :Arr="historyArr" />

    <div class="week-hot">
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-left: 5vw;
          padding-top: 8px;
        "
      >
        {{ motivationArr.name }}
      </p>
      <ul>
        <li v-for="(item, index) in motivationArr.list" :key="item.id">
          <img :src="item.cover" />
          <div>
            <p class="week-title">{{ item.title }}</p>
            <p class="week-author">
              {{ item.author }}
              <span v-show="index == 0">/{{ item.category }}</span>
            </p>
            <p v-show="index == 0" class="content">{{ item.content }}</p>
          </div>
        </li>
      </ul>
    </div>

    <NewBooksComp :Arr="sayLoveArr" />

    <WatchMoreComp :Arr="packArr" />
    <WatchMoreComp :Arr="niceLifeArr" />
    <WatchMoreComp :Arr="chargingArr" />

    <img class="midImg" :src="imgTwo" />
  </div>
</template>

<script>
import NewBooksComp from "./NewBooksComp.vue";
import WatchMoreComp from "./WatchMoreComp.vue";
export default {
  props: {
    publishUrl: String,
  },
  data() {
    return {
      bannersArr: [],
      shortCutArr: [],
      reasoningArr: {},
      niceBooks: {},
      imgOne: "",
      historyArr: {},
      motivationArr: {},
      sayLoveArr: {},
      packArr: {},
      niceLifeArr: {},
      chargingArr: {},
      imgTwo: "",
    };
  },

  components: {
    NewBooksComp,
    WatchMoreComp,
  },
  methods: {
    getData() {
      this.$axios
        .get("/出版页面.json")
        .then(({ data: { data } }) => {
          this.bannersArr = data.list[0].banners;
          this.shortCutArr = data.list[1].shortCut;
          this.reasoningArr = data.list[2];
          this.niceBooks = data.list[3];
          this.imgOne = data.list[4].cover;
          this.historyArr = data.list[5];
          this.motivationArr = data.list[6];
          this.sayLoveArr = data.list[7];
          this.packArr = data.list[8];
          this.niceLifeArr = data.list[9];
          this.chargingArr = data.list[10];
          this.imgTwo = data.list[11].cover;
        });
    },
    getNavData(url) {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${url}`)
        .then(({ data: { data } }) => {
          console.log(data);
        });
    },
    swipeToBook(id, title) {
      this.$router.push(`/detile/${id}/${title}`);
    },
  },

  created() {
    this.getData();
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

.short-cut {
  ul {
    width: 80vw;
    margin-left: 10vw;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  img {
    height: 42px;
    width: 42px;
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

.week-hot {
  width: 98vw;
  margin-left: 1vw;
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
  ul {
    width: 98vw;
    margin-left: 1vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 23vw;
      margin-top: 20px;
      img {
        width: 100%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
      }

      p {
        margin-top: 5px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .week-author {
        font-size: 13px;
        color: rgb(196, 181, 181);
      }
    }
    li:nth-child(1) {
      width: 100%;
      height: 140px;
      display: flex;
      img {
        width: 28%;
      }
      div {
        margin-left: 15px;
      }
      .week-title {
        font-size: 18px;
        font-weight: 600;
      }
      .week-author {
        color: rgb(152, 141, 141);
        font-size: 15px;
        margin-top: 10px;
      }
      .content {
        color: rgb(152, 141, 141);
        font-size: 15px;
        margin-top: 15px;
        line-height: 25px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>