<template>
  <div id="banner">
    <div class="banner">
      <div class="banner-top">
        <span class="banner-top-left">
          <van-cell is-link @click="showPopup">
            <i ref="show">书架</i>
            <img
              src="@/assets/image/banner-images/book_toc_icon_arrow_down.png"
            />
          </van-cell>
        </span>
        <van-popup class="banner-link" v-model="bannerShow">
          <div class="banner-option">
            <span class="bubble"></span>
            <div class="banner-option-item" @click="changeShow">
              <img
                src="@/assets/image/banner-images/icon_bookcase_small.png"
              /><span ref="banner">书架</span>
            </div>
            <div class="banner-option-item" @click="changeShow">
              <img
                src="@/assets/image/banner-images/icon_bookcase_local_book.png"
              /><span ref="local">本地书</span>
            </div>
            <!-- <div>我的分组</div> -->
            <!-- <div>
            <img src=""><span>书架</span>
          </div> -->
          </div>
        </van-popup>

        <div class="banner-top-right">
          <!-- 搜索 -->
          <span
            ><img src="@/assets/image/banner-images/icon_search.png"
          /></span>
          <!-- 浏览记录 -->
          <span
            ><img src="@/assets/image/banner-images/book_shelf_history.png"
          /></span>
          <!-- 更多 -->

          <van-cell is-link @click="showMore">
            <span>
              <img src="@/assets/image/banner-images/icon_top_more.png" />
            </span>
          </van-cell>
          <van-popup class="more" v-model="moreShow">
            <div class="more-option">
              <span class="bubble"></span>
              <div class="more-option-item">
                <label class="submit-book">
                  <input type="file" accept="text/plain" @change="UpBook" />
                </label>
                <img src="@/assets/image/banner-images/ic_sub_menu_add.png" />
                <span>导入本机书籍</span>
              </div>
              <div class="more-option-item">
                <van-cell is-link @click="showBatch" class="batch"></van-cell>
                <img
                  src="@/assets/image/banner-images/icon_batch_management.png"
                />
                <span>批量管理</span>
              </div>
              <div class="more-option-item" @click="changeShow">
                <img
                  v-show="localShow == 0"
                  src="@/assets/image/banner-images/ic_sub_menu_list.png"
                />
                <img
                  v-show="localShow == 2"
                  src="@/assets/image/banner-images/ic_sub_menu_grid.png"
                />
                <span ref="lis">列表模式</span>
              </div>
              <div class="more-option-item">
                <img src="@/assets/image/banner-images/icon_wifi.png" />
                <span>WiFi传书</span>
              </div>
            </div>
          </van-popup>
        </div>
      </div>

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" head-height = 50>
        <template #pulling="props">
          <img
            class="doge"
            src="@/assets/image/banner-images/header_loading_book.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>

        <!-- 释放提示 -->
        <template #loosing>
          <img class="doge" src="@/assets/image/banner-images/header_loading.gif" />
        </template>

        <!-- 加载提示 -->
        <template #loading>
          <img class="doge" src="@/assets/image/banner-images/header_loading.gif" />
        </template>

        <div class="banner-body">
        <!-- <transition name="van-fade">
        <div class="box" v-if="isShow">
        <div class="banner-recommend " v-for="t in bannerArr" :key="t.p_id">
           <div class="banner-recommend-image">
            <img :src="t.cover">
           </div>
           <div class="banner-recommend-item">
            <div class="item-title">
              <span>{{t.title}}</span>
              <span>{{t.readInfo}} <img @click="recommendClose" src="@/assets/image/banner-images/bookshelf_banner_close.png"> </span>
            </div>
            <div class="item-body van-multi-ellipsis--l2">
              {{t.description}}
            </div>
           </div>
        </div>
        </div>
        </transition> -->
        <transition name="van-fade">
          <BannerBook
            v-if="localShow == 0"
            :recommendArr="recommendArr"
            :localShow="localShow"
          />

          <BannerBook
            v-if="localShow == 1"
            :recommendArr="localArr"
            :localShow="localShow"
          />

          <BannerBook
            v-if="localShow == 2"
            :recommendArr="recommendArr"
            :localShow="localShow"
          />
        </transition>
      </div>
      </van-pull-refresh>
      

      <van-popup
        v-model="batchShow"
        position="right"
        :style="{ height: '100%' }"
        class="batch-item"
      >
        <BatchCommpontent
          :recommendArr="recommendArr"
          :batchShow="batchShow"
          :delArr="delArr"
          @clockbatch="clockbatch"
          @delbook="delbook"
        />
      </van-popup>
    </div>

    <div class="dianzi"></div>
  </div>
</template>

<script>
import BannerBook from "@/components/BannerComponent/BannerBook.vue";
import BatchCommpontent from "@/components/BannerComponent/BatchCommpontent.vue";
export default {
  name: "BookShelfView",
  data() {
    return {
      recommendArr: [],
      bannerArr: [],
      localArr: [],
      delArr: [],
      localObj: {},
      localShow: 0,
      bannerShow: false,
      moreShow: false,
      batchShow: false,
      isShow: true,
      isLoading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("https://apis.netstart.cn/yunyuedu/shelf/info.json")
        .then(({ data }) => {
          console.log(data.data.list);
          this.recommendArr = data.data.list;
        });

      this.$axios
        .get("https://apis.netstart.cn/yunyuedu/shelf/banner.json")
        .then(({ data }) => {
          this.bannerArr = data.data.banners;
        });
    },
    showPopup() {
      setTimeout(() => {
        this.bannerShow = true;
      }, 100);
    },
    showMore() {
      setTimeout(() => {
        this.moreShow = true;
      }, 100);
    },
    showBatch() {
      this.batchShow = true;
      this.moreShow = false;
    },
    recommendClose() {
      this.isShow = false;
    },
    UpBook(e) {
      this.moreShow = false;
      console.log(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      let title = e.target.files[0].name.split(".txt");
      console.log(title[0]);
      // 文章内容
      reader.onload = () => {
        console.log(reader.result);
      };
      this.localObj = {
        recFlag: 1,
        title: title[0],
        bookType: 1,
        cover:
          "https://yuedust.yuedu.126.net/images/bookDefaultIcon.png?$IMG_V",
        author: "",
        mime: "application/prisbookcontainer",
        publishType: 1,
        isMag: 0,
        anchor: "",
        submime: "application/epub+zip",
        id: new Date().getTime(),
        type: "book",
        recordTime: new Date().getTime(),
        groupName: "",
        zoneType: 1,
        order: 0,
        groupId: "",
      };
      console.log(this.localObj);
      this.localArr = [this.localObj];
      this.recommendArr = [...this.localArr, ...this.recommendArr];
    },
    changeShow(e) {
      console.log(e.target.textContent);

      if (e.target.textContent == "书架") {
        this.localShow = 0;
        this.bannerShow = false;
        this.$refs.show.textContent = this.$refs.banner.textContent;
      }
      if (e.target.textContent == "本地书") {
        this.localShow = 1;
        this.bannerShow = false;
        this.$refs.show.textContent = this.$refs.local.textContent;
      }
      if (e.target.textContent == "列表模式") {
        this.localShow = 2;
        this.$refs.lis.textContent = "书封模式";
        this.moreShow = false;
      } else if (e.target.textContent == "书封模式") {
        this.localShow = 0;
        this.moreShow = false;
        this.$refs.lis.textContent = "列表模式";
      }
    },
    clockbatch(item) {
      this.batchShow = item;
    },
    delbook(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.recommendArr = this.recommendArr.filter(
          (item) => item.id != arr[i].id
        );

        for (let j = 0; j < this.localArr.length; j++) {
          this.localArr = this.localArr.filter((item) => {
            item.id != this.recommendArr[i].id;
          });
        }
      }
      console.log(this.recommendArr);
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
  components: {
    BannerBook,
    BatchCommpontent,
  },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100vw;
  min-height: 100vh;

  .doge {
    width: 50px;
    height: 30px;
    margin-top: 8px;
    border-radius: 4px;
  }

  .batch-item {
    width: 100vw;
    min-height: 100vh;
    overflow: auto;
  }

  .van-icon {
    display: none;
  }

  .van-icon:before {
    display: none;
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .box {
    width: 100%;
  }

  .banner-link {
    top: 88px;
    left: 88px;
    width: 150px;
    min-height: 100px;
    border-radius: 3px;
    background-color: transparent;

    .bubble {
      position: absolute;
      top: -10%;
      left: 10%;
      border: 5px solid #fff;
      border-top: 5px solid transparent;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
    .banner-option {
      position: absolute;
      top: 5px;
      width: 100%;
      min-height: 0px;
      border-radius: 3px;
      background-color: #fff;
      animation: move 0.2s linear;

      .banner-option-item {
        display: flex;
        margin-bottom: 10px;
        font-size: 13px;
        width: 100%;
        height: 35px;

        img {
          display: block;
          margin-top: 7.5px;
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }

        span {
          display: block;
          width: 100px;
          height: 35px;
          line-height: 40px;
          margin-left: 10px;
        }
      }
    }
  }

  .more {
    top: 133px;
    left: 79%;
    width: 150px;
    min-height: 200px;
    border-radius: 3px;
    background-color: transparent;

    .bubble {
      position: absolute;
      top: -5.3%;
      left: 88%;
      border: 5px solid #fff;
      border-top: 5px solid transparent;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
    .more-option {
      position: absolute;
      top: 5px;
      width: 100%;
      min-height: 0px;
      border-radius: 3px;
      background-color: #fff;
      animation: move-more 0.2s linear;

      .more-option-item {
        position: relative;
        display: flex;
        margin-bottom: 10px;
        font-size: 13px;
        width: 100%;
        height: 35px;

        .batch {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: transparent;
        }

        .submit-book {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0;

          input {
            width: 100%;
          }
        }

        img {
          display: block;
          margin-top: 7.5px;
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }

        span {
          display: block;
          width: 100px;
          height: 35px;
          line-height: 40px;
          margin-left: 10px;
        }
      }
    }
  }
}

.banner-top {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 39px;
  overflow: hidden;
  background-color: #fff;
  z-index: 999;

  .banner-top-left {
    float: left;
    display: block;
    font-size: 16px;
    line-height: 39px;

    img {
      display: inline-block;
      margin-bottom: 2px;
      margin-left: 5px;
      width: 5px;
      height: 5px;
    }
  }

  .banner-top-right {
    display: flex;
    float: right;

    .van-cell {
      padding: 0;
    }

    img {
      display: inline-block;
      margin: 8px 8px;
      width: 23px;
      height: 23px;
    }
  }
}

.banner-body {
  margin-top: 43px;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  min-height: 80vh;

  .banner-recommend {
    display: flex;
    margin: 10px auto;
    width: 93vw;
    height: 100px;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0px 3px 3px #888888;

    .banner-recommend-image {
      margin: 5px 5px;
      width: 20vw;
      height: 90px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .banner-recommend-item {
      margin: 5px 0;
      width: 100%;
      height: 90px;

      .item-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 20px;
        margin-bottom: 18px;

        span {
          display: block;
          margin-top: 8px;
          font-size: 14px;
        }

        :nth-child(1) {
          margin-left: 10px;
          font-weight: 700;
        }

        :nth-child(2) {
          margin-top: 5px;
          color: rgba(218, 73, 21, 0.906);

          img {
            width: 13px;
            height: 13px;
            margin-right: 5px;
          }
        }
      }

      .item-body {
        margin-left: 10px;
        margin-right: 5px;
        width: 90%;
        height: 26px;
        font-size: 13px;
        color: gray;
      }
    }
  }
}

@keyframes move {
  from {
    height: 0;
  }

  to {
    height: 90px;
  }
}

@keyframes move-more {
  from {
    height: 0;
  }

  to {
    height: 180px;
  }
}

.van-popup {
  overflow-y: initial;
}

.dianzi {
  width: 100vw;
  height: 50px;
}
</style>