<template>
  <div class="top">
    <div class="top-one">
      <div class="gender" @click="replaceSex">
        <img src="@/assets/male.png" v-show="mBu" />
        <img src="@/assets/female.png" v-show="wBu" />
        <van-overlay :show="bgShow" />
      </div>
      <div class="search">
        <input type="text" placeholder="唐诗里的烟火人间" />
        <van-icon name="search" />
      </div>
    </div>

    <div class="box" v-show="boxBu">
      <img src="@/assets/gender_to_woman.gif" v-show="womanBu" />
      <img src="@/assets/gender_to_man.gif" v-show="manBu" />
    </div>

    <van-tabs
      v-model="active"
      sticky
      animated
      line-width="20px"
      line-height="2px"
    >
      <van-tab title="精选"
        ><SelectedView :selectedUrl="selectedUrl" ref="child"
      /></van-tab>
      <van-tab title="免费">
        <FreeView :freeUrl="freeUrl" ref="free" />
      </van-tab>
      <van-tab title="男生">
        <BoyView :boyUrl="boyUrl" ref="boy" />
      </van-tab>
      <van-tab title="女生">
        <GirlView :girlUrl="girlUrl" ref="girl" />
      </van-tab>
      <van-tab title="出版">
        <PublishView :publishUrl="publishUrl" ref="publish" />
      </van-tab>
      <van-tab title="听书">
        <ListenBooksView :listenBooksUrl="listenBooksUrl" ref="listen"/>
      </van-tab>
    </van-tabs>
    <div class="foot">
      <p>我是有底线哒╮(￣▽￣")╭</p>
    </div>
    <div class="dianzi"></div>
  </div>
</template>

<script>
import SelectedView from "./SelectedView.vue";
import FreeView from "./FreeView.vue";
import BoyView from "./BoyView.vue";
import GirlView from "./GirlView.vue";
import PublishView from "./PublishView.vue";
import ListenBooksView from "./ListenBooksView.vue";

export default {
  data() {
    return {
      active: 0,
      sexNum: 1,
      selectedUrl:
        "/store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4",
      boxBu: false,
      womanBu: false,
      wBu: false,
      manBu: false,
      mBu: true,
      bgShow: false,
      freeUrl:
        "/store/show.json?type=free&uuid=ea81f0be96a74d4fa7c674b9252a9ef4",
      boyUrl:
        "/store/show.json?type=male&uuid=ca03da7b64ca443ab25ec3b662fa91e2",
      girlUrl:
        "/store/show.json?type=femail&uuid=017de2274aa5400e9dabe30f173e98d9",
      publishUrl:
        "/store/show.json?type=publish&uuid=b5648dd3c4f24d9796f590cd81ca076e",
      listenBooksUrl:
      "/store/show.json?type=audio&uuid=b67282bb443845fabe5b543795a27618",

    };
  },
  components: {
    SelectedView,
    FreeView,
    BoyView,
    GirlView,
    PublishView,
    ListenBooksView
  },
  methods: {
    replaceSex() {
      if (this.sexNum == 2) {
        this.mBu = false;
        this.wBu = true;
        this.sexNum = 1;
        this.$axios
          .get(
            `https://apis.netstart.cn/yunyuedu/store/navi.json?gender=${this.sexNum}`
          )
          .then(({ data: { data } }) => {
            // 精选页面的url
            this.selectedUrl = data.navi[0].url;
            this.freeUrl = data.navi[1].url;
            this.boyUrl = data.navi[2].url;
            this.girlUrl = data.navi[3].url;
            this.publishUrl = data.navi[4].url;
            this.listenBooksUrl = data.navi[5].url;
            // console.log(this.listenBooksUrl,'女');
          });
      } else if (this.sexNum == 1) {
        this.mBu = true;
        this.wBu = false;
        this.sexNum = 2;

        this.$axios
          .get(
            `https://apis.netstart.cn/yunyuedu/store/navi.json?gender=${this.sexNum}`
          )
          .then(({ data: { data } }) => {
            // 精选页面的url
            this.selectedUrl = data.navi[0].url;
            this.freeUrl = data.navi[1].url;
            this.boyUrl = data.navi[2].url;
            this.girlUrl = data.navi[3].url;
            this.publishUrl = data.navi[4].url;
            this.listenBooksUrl = data.navi[5].url;
            // console.log(this.listenBooksUrl,'男');
          });
      }

        this.$refs.child.getData();
        // this.$refs.free.getData();

      this.toSex();
    },

    toSex() {
      this.boxBu = true;
      this.bgShow = true;
      if (this.sexNum == 1) {
        this.womanBu = true;
        setTimeout(() => {
          this.womanBu = false;
          this.boxBu = false;
          this.bgShow = false;
        }, 1000);
      } else if (this.sexNum == 2) {
        this.manBu = true;
        setTimeout(() => {
          this.manBu = false;
          this.boxBu = false;
          this.bgShow = false;
        }, 1000);
      }
    },
  },

  beforeMount() {
    this.replaceSex();
  },
};
</script>


<style lang="scss" scoped>
.van-tab--active {
  font-size: 20px;
  font-weight: bolder;
}

.top {
  position: relative;
  .box {
    position: absolute;
    background-color: #fff;
    z-index: 999;
    width: 50%;
    top: 25vh;
    left: 25%;
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.top-one {
  display: flex;
}
.gender {
  width: 35px;
  height: 35px;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 2px 2px 10px rgba(135, 132, 132, 0.4);
  margin: 10px;
  margin-top: 15px;
  img {
    width: 20px;
    height: 20px;
    margin: 7px;
  }
}

.search {
  width: 80vw;
  height: 35px;
  border-radius: 999px;
  box-shadow: 1px 1px 8px rgba(135, 132, 132, 0.4);
  margin-top: 15px;
  margin-left: 5px;
  display: flex;
  justify-content: space-between;
  input {
    width: 50vw;
    height: 35px;
    border-radius: 999px;
    margin-left: 20px;
    border: none;
  }

  .van-icon-search:before {
    content: "\e710";
    margin: 10px;
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
.dianzi {
  height: 50px;
}
</style>