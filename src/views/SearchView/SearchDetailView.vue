<template>
  <div class="search-details">
    <van-nav-bar
        left-text="返回搜索"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="search-sort">
      <div class="search-btn"
           :class="{active: option === 0}"
           @click="toggleFilter(0)"
      >
        <span :class="{showDown: classification[0].index !== 0}">{{ sortStr }}</span>
        <i :class="{showIcon: classification[0].index !== 0}"></i>
      </div>
      <div class="search-btn"
           :class="{active: option === 1}"
           @click="toggleFilter(1)"
      >
        <span :class="{showDown: classification[1].index !== 0}">{{ channelStr }}</span>
        <i :class="{showIcon: classification[1].index !== 0}"></i>
      </div>
      <div class="search-btn"
           :class="{active: option === 2}"
           @click="toggleFilter(2)"
      >
        <span :class="{filter: filterStr === '已筛选'}">{{ filterStr }}</span
        ><i :class="{showIcon: filterStr === '已筛选'}"></i>
      </div>
    </div>


    <div class="bookshop" @scroll="demo">
      <div class="show-window" @click="test" ref="show" v-show="option !== 3">
        <div class="sort" v-show="option === 0">
          <ul>
            <li v-for="(s, i) in sortArr" :key="s.value"
                :class="{choose: chooseFilter('sort',i)}"
                @click="chooseFilterType('sort',i,s.value)"
            >{{ s.name }}
            </li>
          </ul>
        </div>
        <div class="channel" v-show="option === 1">
          <ul>
            <li v-for="(c, i) in channelArr" :key="c.value"
                :class="{choose: chooseFilter('channel',i)}"
                @click="chooseFilterType('channel',i,c.value)"
            >{{ c.name }}
            </li>
          </ul>
        </div>
        <div class="filter" v-show="option === 2">
          <ul>
            <li v-for="f in filterArr" :key="f.filterType">
              <p>{{ f.typeName }}</p>
              <span v-for="(i, index) in f.fList" :key="i.value"
                    :class="{choose: chooseFilter(f.filterType,index)}"
                    @click="chooseFilterType(f.filterType,index,i.value)"
              >{{ i.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 展示区 -->
      <h2 class="bookshelf">书城</h2>
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoading"
      >
        <SearchDetailCard v-for="(b,i) in books" :item="b" :key="i"/>
      </van-list>
    </div>


  </div>
</template>

<script>
import {search} from "@/utils/searchSort";
import SearchDetailCard from "@/components/SearchComponent/SearchDetailCard";

export default {
  name: "SearchDetailView",
  components: {
    SearchDetailCard
  },
  data() {
    return {
      loading: false,
      finished: false,
      // 选择搜索的排序、频道、筛选的分类
      option: 3,
      // 排序分类数组
      sortArr: search[0].list,
      // 频道分类数组
      channelArr: search[1].list,
      // 筛选分类数组
      filterArr: search[2].list,
      // 搜索的定义
      classification: [
        {
          type: 'sort',
          value: 0,
          index: 0,
        },
        {
          type: 'channel',
          value: 0,
          index: 0,
        },
        {
          type: 'bookStatus',
          value: 0,
          index: 0,
        },
        {
          type: 'pay',
          value: 0,
          index: 0,
        },
        {
          type: 'wordCount',
          value: 0,
          index: 0,
        },
      ],
      // 搜索结果页数
      page: 1,
      // 存放展示出来的小说
      books: []
    }
  },
  computed: {
    keyword() {
      return this.$route.query.keyword
    },
    filterStr() {
      if (this.classification[2].index === 0 && this.classification[3].index === 0 && this.classification[4].index === 0) {
        return '筛选'
      }
      return '已筛选'
    },
    sortStr() {
      return this.sortArr[this.classification[0].index].name
    },
    channelStr() {
      return this.channelArr[this.classification[1].index].name
    },
    // 搜索结果的请求地址
    searchResult() {
      let result = this.searchDefault
      this.classification.forEach(item => {
        result += `&${item.type}=${item.value}`
      })
      return result
    },
    // 默认查询
    searchDefault() {
      return `https://apis.netstart.cn/yunyuedu/search/book.json?keyword=${this.keyword}`
    },
    // 触底加载
    searchPage() {
      return this.searchResult + `&page=${this.page}`
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toggleFilter(n) {
      if (this.option !== n) {
        this.option = n
      } else {
        this.option = 3
      }
    },
    chooseFilterType(type, index, value) {
      this.classification = this.classification.map(item => {
        if (item.type === type) {
          item.index = index;
          item.value = value;
        }
        return item
      })
    },
    chooseFilter(type, index) {
      for (let i = 0; i < this.classification.length; i++) {
        if (this.classification[i].type === type && this.classification[i].index === index) {
          return true
        }
      }
      return false
    },
    test(e) {
      if (e.target.className === 'show-window') {
        this.option = 3
      }
    },
    async getSearch(url) {
      let {data} = await this.$axios.get(url)
      this.books = data.data.books
    },
    demo(e) {
      this.$refs.show.style.top = e.target.scrollTop + 'px';
    },
    onLoading() {
      this.page++
      this.$axios.get(this.searchPage)
          .then(({data}) => {
            this.books = [...this.books, ...data.data.books]

            this.$nextTick(() => {
              this.loading = false
              if (!data.data.books) {
                this.finished = true
              }
            })
          })


    }
  },
  created() {
    this.getSearch(this.searchDefault);
  },
  watch: {
    classification() {
      this.page = 1
      this.getSearch(this.searchResult)
    },
  }
}
</script>

<style lang="scss" scoped>
.search-details {
  width: 100vw;
  height: 100vh;


  .search-sort {
    display: flex;
    justify-content: space-between;
    height: 4vh;

    .search-btn {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      background-color: #fdfdfe;

      .filter,
      .showDown {
        color: #e65436;
      }

      i {
        display: inline-block;
        width: 8.5px;
        height: 5px;
        margin-left: 10px;
        background-image: url(@/assets/image/search_icon/icon_filtrate_drop_down_unselect.png);
        background-size: cover;
      }

      .showIcon {
        background-image: url(@/assets/image/search_icon/icon_filtrate_drop_down_select.png);
      }

      &:nth-of-type(1)::before,
      &:nth-of-type(2)::before {
        display: inline-block;
        position: absolute;
        right: 0;
        height: 3vh;
        width: 0.1vw;
        background: #f0f0f0;
        content: '';
      }

      &.active {
        color: #ec6460;
        background-color: #f4f4f4;

        i {
          background-image: url(@/assets/image/search_icon/icon_filtrate_pack_up_select.png);
        }
      }
    }

  }

  .bookshop {
    position: relative;
    width: 100vw;
    height: 90.5vh;
    background-color: #f4f4f4;
    overflow: auto;

    .bookshelf {
      height: 4vh;
      line-height: 4vh;
      padding-left: 15px;
      color: #777777;
    }

    .show-window {
      position: absolute;
      left: 0;
      right: 0;
      height: 100%;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.3);

      .sort,
      .channel {
        background-color: #f3f3f3;

        li {
          display: flex;
          padding-left: 30px;
          align-items: center;
          height: 45px;
          border-bottom: 1px solid #f0e9e9;
        }

        .choose {
          color: #e65436;
        }
      }

      .filter {
        background-color: #f3f3f3;

        ul {
          padding-left: 30px;
          padding-bottom: 20px;

          li {
            border-bottom: 1px solid #f0e9e9;

            p {
              display: flex;
              align-items: center;
              height: 30px;
              color: #777;
            }

            span {
              display: inline-block;
              margin-top: 10px;
              margin-right: 20px;
              padding: 0 20px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              font-size: 15px;
              color: #CCC;
              border-radius: 8px;
              background-color: #fdfdfe;
            }
          }
        }

        .choose {
          color: #fdfdfe;
          background-color: #ec6460;
        }
      }
    }
  }
}
</style>