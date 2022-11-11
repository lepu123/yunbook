<template>
  <div class="search-page">
    <!-- 头部文章搜索栏 -->
    <div class="header-bar">
      <div class="search-input">
        <i class="search-icon"></i>
        <input type="text" v-model.trim="keyword" @input="demo" @keyup.13="gotoSearchDetails" ref="search"
               class="input-bar"
               :placeholder="normalKeyword">
        <i class="input-delete" v-show="keywordIs" @click="keyword = ''"></i>
      </div>
      <span style="color: #777" @click="$router.go(-1)">取消</span>
    </div>
    <!-- 热门搜索栏 -->
    <div class="search-hop">
      <h2>热门搜索</h2>
      <div class="hot-search">
        <div v-for="(h,i) in hotCommend" class="hot-article" :key="h.id">
          <span class="hop-icon" :class="topNum(i)">{{ i + 1 }}</span>{{ h.name }}
        </div>
      </div>
    </div>
    <!-- 最近搜索 -->
    <div class="search-history">
      <h2><span class="search-name">最近搜索</span><i class="delete-icon" :class="{normal: searchHistory[0] !== undefined}" @click="deleteHistory"></i></h2>
      <div class="history-item">
        <div v-for="h in searchHistory" :key="h.keyword" class="history-desc" @click="gotoHistory(h)"><span><i></i>{{ h.keyword }}</span></div>
      </div>
    </div>
    <!-- 搜索推荐 -->
    <div class="search-recommends" v-show="keywordIs">
      <div class="search-goto" @click="gotoSearchDetails">
        <i class="search-goto-icon"></i>
        <span class="search-text">搜索“{{ keyword }}”</span>
        <i class="goto"></i>
      </div>
      <div class="search-commend" v-for="t in searchCommend" :key="t.id">
        <div class="search-normal" v-if="t.showDetail === undefined">
          <i class="search-goto-icon" :class="{'type': t.bookType !== '0'}"></i>
          <span class="commend-title">{{ t.text }}</span>
          <i class="goto"></i>
        </div>
        <div class="search-detail" v-else-if="t.showDetail !== undefined">
          <img :src="t.cover" :alt="t.text">
          <div class="detail-desc">
            <p class="title">{{ t.text }}</p>
            <p class="author">{{ t.author }}</p>
            <p class="details">{{ t.d }}</p>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from "lodash-es";
import {Dialog} from "vant";

export default {
  name: "SearchView",
  data() {
    return {
      // 热门搜索
      hotCommend: [],
      // 推荐搜索
      searchCommend: [],
      keyword: '',
      normalKeyword: '唐诗里的烟火人间',
      searchHistory: [],
    }
  },
  methods: {
    async getHotCommends() {
      let {data} = await this.$axios.get('https://apis.netstart.cn/yunyuedu/search/getHotWords');
      this.hotCommend = data.list
    },
    topNum(i) {
      switch (i) {
        case 0:
          return 'one';
        case 1:
          return 'two';
        case 2:
          return 'three';
        default:
          return 'other';
      }
    },
    deleteHistory() {
      if (this.searchHistory[0] !== undefined) {
        Dialog.confirm({
          message: '是否清空搜索历史',
        }).then(() => {
          this.searchHistory = []
          window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
          // on close
        }).catch(() => {
          // on cancel
        });
      }
    },
    gotoSearchDetails() {
      this.searchHistory = this.searchHistory.filter((item) => {
        return  item.keyword !== this.keyword
      })
      let obj = {
        path: '/searchDetail',
        keyword: this.keyword
      }
      this.searchHistory.unshift(obj)
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      this.$refs.search.blur();
      this.$router.push({
        path: '/searchDetail',
        query: {
          keyword: this.keyword
        }
      })

    },
    // 获取关键字的推荐搜索
    async getSearchCommend() {
      let {data} = await this.$axios.get(`https://apis.netstart.cn/yunyuedu/search/searchHint?search=${this.keyword}`);
      this.searchCommend = data.words.w
    },
    // 防抖只获取最后的关键字推荐
    demo() {
      if (this.keyword.trim() !== '') {
        this.getSearchCommend()
      }
    },
    getHistory() {
      if (window.localStorage.getItem('searchHistory')) {
        let str = window.localStorage.getItem('searchHistory')
        this.searchHistory = JSON.parse(str)
      }
    },
    gotoHistory({path, keyword}) {
      this.$router.push({path,query: {keyword}})
    }
  },
  computed: {
    keywordIs() {
      return this.keyword.trim() !== '';
    },
  },
  mounted() {
    this.$refs.search.focus()
  },
  created() {
    this.getHotCommends();
    this.getHistory();
    this.getSearchCommend = debounce(this.getSearchCommend)
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f7;

  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5%;
    padding: 5px 15px;
    background-color: #fdfdfe;

    .search-input {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 85%;
      height: 100%;
      border-radius: 999px;
      background-color: #efefef;
      overflow: hidden;

      .search-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 9px;
        background-image: url(@/assets/image/search_icon/icon_search_new.png);
        background-size: cover;
        background-position: center;
      }

      .input-bar {
        width: 88%;
        height: 80%;
        outline: none;
        border: none;
        background-color: transparent;
      }

      .input-delete {
        position: absolute;
        display: inline-block;
        top: 5px;
        right: 8px;
        width: 20px;
        height: 20px;
        background-image: url(@/assets/image/search_icon/searchbar_ic_close.png);
        background-size: cover;
        background-position: center;
      }
    }
  }

  .search-hop {
    width: 100vw;
    margin-top: 35px;

    h2 {
      padding-left: 15px;
      color: #777;
      margin-bottom: 20px;
    }

    .hot-search {
      display: flex;
      flex-wrap: wrap;
      padding: 0 35px;

      .hot-article {
        width: 50%;
        margin-bottom: 20px;

        .hop-icon {
          display: inline-block;
          margin-right: 10px;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          text-align: center;
          line-height: 18px;
          font-size: 14px;
          color: white;


          &.one {
            background-color: #e54d2e;
          }

          &.two {
            background-color: #fd7919;
          }

          &.three {
            background-color: #fdbe01;
          }
        }
      }
    }
  }

  .search-history {
    width: 100vw;
    margin-top: 35px;

    .history-item {
      padding: 0 15px;


      .history-desc {
        display: inline-block;
        border-radius: 999px;
        padding: 10px;
        margin-right: 15px;
        background-color: #efefef;

        span {
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            display: block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            background-image: url(@/assets/image/search_icon/icon_search.png);
            background-size: cover;
            background-position: center;
          }
        }

      }
    }

    h2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 15px;
      color: #777;
      margin-bottom: 20px;

      .search-name {
        display: inline-block;
        margin-top: 6px;
      }

      .delete-icon {
        display: inline-block;
        margin-right: 15px;
        width: 20px;
        height: 20px;
        background-image: url(@/assets/image/pic-icon/mynote_icon_delete.png);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;

        &.normal {
          background-image: url(@/assets/image/pic-icon/mynote_icon_delete_black.png);
        }
      }
    }
  }

  .search-recommends {
    position: absolute;
    top: 5vh;
    padding-left: 10px;
    width: 100vw;
    height: 95vh;
    overflow: auto;
    background-color: #f6f6f7;

    i {
      display: inline-block;
      background-size: cover;
      background-position: center;
    }

    .search-goto {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 46px;
      border-bottom: 1px solid #d4cdcd;

      .search-goto-icon {
        width: 16px;
        height: 16px;
        margin-right: 15px;
        background-image: url(@/assets/image/search_icon/search_lenovo_ic_search.png);
      }

      .goto {
        position: absolute;
        right: 10px;
        width: 8px;
        height: 14px;
        background-image: url(@/assets/image/search_icon/search_lenovo_ic_go.png);
      }
    }

    .search-commend {
      width: 100%;

      .search-normal {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 46px;
        border-bottom: 1px solid #d4cdcd;

        .search-goto-icon {
          width: 16px;
          height: 16px;
          margin-right: 15px;
          background-image: url(@/assets/image/search_icon/search_ic_associate_book.png);
        }

        .goto {
          position: absolute;
          right: 10px;
          width: 8px;
          height: 14px;
          background-image: url(@/assets/image/search_icon/search_lenovo_ic_go.png);
        }
      }
    }

    .search-detail {
      display: flex;
      padding: 15px 0;
      width: 100%;
      height: 92px;
      border-bottom: 1px solid #d4cdcd;


      img {
        display: inline-block;
        height: 100%;
        margin-right: 10px;
      }

      .detail-desc {
        flex: 1;


        .author {
          margin-top: 5px;
          font-size: 14px;
          color: #d4cdcd;
        }

        .details {
          height: 24px;
          margin-top: 5px;
          font-size: 12px;
          color: #d4cdcd;
          overflow: hidden;
        }
      }
    }
  }
}
</style>