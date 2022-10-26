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
      <van-tab title="免费">免费</van-tab>
      <van-tab title="男生">男生</van-tab>
      <van-tab title="女生">女生</van-tab>
      <van-tab title="出版">出版</van-tab>
      <van-tab title="听书">听书</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import SelectedView from "./SelectedView.vue";
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
      mBu: false,
      bgShow:false,
    };
  },
  components: {
    SelectedView,
  },
  methods: {
    replaceSex() {
      
      if (this.mBu == true) {
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
            // console.log(this.selectedUrl,'女');
          });
      } else {
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
            // console.log(this.selectedUrl,'男');
          });
      }
      this.$refs.child.getData();
      this.toSex();
    },

    toSex() {
      this.boxBu = true;
      this.bgShow = true
      if (this.wBu == true) {
        this.womanBu = true;
        setTimeout(() => {
          this.womanBu = false;
          this.boxBu = false;
          this.bgShow = false;
        }, 1000);
      } else {
        this.manBu = true;
        setTimeout(() => {
          this.manBu = false;
          this.boxBu = false;
          this.bgShow = false;
        }, 1000);
      }
    },
  },

  created() {
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
    content: '\e710';
    margin: 10px;
}
  
}

</style>