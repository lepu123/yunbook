<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannersArr" :key="index">
        <img :src="item.cover" />
      </van-swipe-item>
    </van-swipe>

    <div class="short-cut">
      <ul>
        <li v-for="item in shortCutArr" :key="item.msgId" @click="getNavData(item.url)">
          <img :src="item.cover" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <div class="week-hot">
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-left: 5vw;
          padding-top: 8px;
        "
      >
        <!-- 本周强推 -->
        {{ weekHotArr.name }}
      </p>
      <ul>
        <li v-for="(item, index) in weekHotArr.list" :key="item.id">
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

    <WatchMoreComp :Arr="everybodyArr" />

    <WatchMoreComp :Arr="yunGirlArr" />

    <WatchMoreComp :Arr="modernArr" />

    <WatchMoreComp :Arr="ancientArr" />

    <WatchMoreComp :Arr="newBookArr" />

    <div class="foot">
      <p>我是有底线哒╮(￣▽￣")╭</p>
    </div>
  </div>
</template>

<script>
import WatchMoreComp from "./WatchMoreComp.vue";
export default {
  props: {
    selectedUrl:String,
  },
  data() {
    return {
      bannersArr: [],
      shortCutArr: [],
      weekHotArr: {},
      everybodyArr: {},
      yunGirlArr: {},
      modernArr: {},
      ancientArr: {},
      newBookArr: {},

      //   everybodyMoreList: [],
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(
          `https://apis.netstart.cn/yunyuedu${this.selectedUrl}`
        )
        .then(({ data: { data } }) => {
          this.bannersArr = data.list[0].banners;
          this.shortCutArr = data.list[1].shortCut;
          this.weekHotArr = data.list[2];
          this.everybodyArr = data.list[3];
          this.yunGirlArr = data.list[4];
          this.modernArr = data.list[5];
          this.ancientArr = data.list[6];
          this.newBookArr = data.list[7];
        });
    },

    getNavData(url) {
      this.$axios
        .get(
          `https://apis.netstart.cn/yunyuedu${url}`
        )
        .then(({ data: { data } }) => {
          console.log(data);
        });
    },
    showPopup() {
      this.show = true;
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

.everybody-reading {
  width: 98vw;
  margin-left: 1vw;
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
  ul {
    li {
      display: flex;
      margin: 10px;
      img {
        height: 120px;
      }

      div {
        margin-left: 10px;
      }

      div :nth-child(1) {
        font-size: 18px;
        font-weight: 700;
      }

      div :nth-child(2) {
        font-size: 13px;
        color: rgb(152, 141, 141);
        margin-top: 10px;
      }
      div :nth-child(3) {
        color: rgb(152, 141, 141);
        font-size: 15px;
        margin-top: 15px;
        line-height: 25px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .more {
    display: flex;
    color: rgb(152, 141, 141);
    width: 30vw;
    margin: 20px 38%;
    font-size: 17px;
    line-height: 20px;
    div {
      width: 14px;
      height: 14px;
      font-size: 14px;
      margin-left: 5px;
      text-align: center;
      line-height: 16px;
      border: 2px solid rgb(152, 141, 141);
      border-radius: 999px;
    }
  }
}

.foot {
  width: 100vw;
  height: 50px;
  background-color: #eee;
  text-align: center;
  line-height: 50px;
  p {
    font-size: 14px;
  }
}
</style>