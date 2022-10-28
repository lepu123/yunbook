<template>
  <div id="banner">
    <div class="banner">
      <div class="banner-top">
        <span class="banner-top-left">
          <van-cell is-link @click="showPopup">
            书架
            <img
              src="@/assets/image/banner-images/book_toc_icon_arrow_down.png"
            />
          </van-cell>
        </span>
        <van-popup class="banner-link" v-model="bannerShow">
          <div class="banner-option">
            <span class="bubble"></span>
            <div class="banner-option-item">
              <img
                src="@/assets/image/banner-images/icon_bookcase_small.png"
              /><span>书架</span>
            </div>
            <div class="banner-option-item">
              <img
                src="@/assets/image/banner-images/icon_bookcase_local_book.png"
              /><span>本地书</span>
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
                <img src="@/assets/image/banner-images/ic_sub_menu_add.png" />
                <span>导入本机书籍</span>
              </div>
              <div class="more-option-item">
                <img
                  src="@/assets/image/banner-images/icon_batch_management.png"
                />
                <span>批量管理</span>
              </div>
              <div class="more-option-item">
                <img src="@/assets/image/banner-images/ic_sub_menu_list.png" />
                <span>列表模式</span>
              </div>
              <div class="more-option-item">
                <img src="@/assets/image/banner-images/icon_wifi.png" />
                <span>WiFi传书</span>
              </div>
            </div>
          </van-popup>
        </div>
      </div>

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
        
        
        <div class="banner-book" v-for="(item,i) in recommendArr" :key="item.id" @click="bookClick(i)">
          <div class="book-image">
            <img :src="item.cover" />
            <span class="book-play" v-if="item.bookType == 21">
              <img
                src="@/assets/image/banner-images/icon_play_normal_black.png"
              />
            </span>
          </div>
          <div class="book-title van-multi-ellipsis--l2">
            {{ item.title }}
          </div>
          <div class="book-chapter">看屁啊</div>
        </div>

      </div>
    </div>

    <div class="dianzi"></div>
  </div>
</template>

<script>
export default {
  name: "BookShelfView",
  data() {
    return {
      recommendArr: [],
      bannerArr: [],
      bannerShow: false,
      moreShow: false,
      isShow: true,
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
          console.log(data.data.banners);
          this.bannerArr = data.data.banners;
        });
    },
    showPopup() {
      setTimeout(() => {
        this.bannerShow = true
      },100)
    },
    showMore() {
      setTimeout(() => {
        this.moreShow = true;       
      },100)
    },
    recommendClose() {
      this.isShow = false;
    },
    bookClick(id) {
      console.log(id);
    }
  },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100vw;
  min-height: 100vh;

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
      animation: move .2s linear;

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
    left: 290px;
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
      animation: move-more .2s linear;

      .more-option-item {
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
  min-height: 100vh;

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

  .banner-book {
    width: 26.5vw;
    height: 200px;
    margin: 10px 3.4vw;

    .book-image {
      position: relative;
      width: 100%;
      height: 140px;

      img {
        width: 100%;
        height: 100%;
      }

      .book-play {
        display: block;
        position: absolute;
        bottom: 5px;
        left: 3px;
        width: 15px;
        height: 15px;
        border-radius: 999px;
        background-color: #fff;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .book-title {
      margin-top: 5px;
      width: 100%;
      height: 30px;
      font-size: 13px;
    }

    .book-chapter {
      width: 100%;
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      color: #888;
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



.dianzi {
  width: 100vw;
  height: 50px;
}
</style>