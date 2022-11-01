<template>
  <div class="sort-find">
    <div class="find-top">
      <div class="top-item" v-for="t in findTop" :key="t.type">
        <span class="top-desc" :class="{'choose': i === topIndex}" v-for="(cat,i) in t.catArray"
              @click="chooseSort(i, cat.value)"
              :key="cat.value">
          <i class="line-icon" v-show="i !== 0"></i>{{ cat.name }}
        </span>
      </div>
      <i class="find-icon" :class="{'show': show}" @click="findToggle()"></i>
    </div>

    <div class="find-other" v-show="find">
      <CollapseTransition>
        <div class="find-other-show" ref="child" v-if="show">
          <div class="other-item" v-for="(f, n) in find" :key="f.type">
          <span class="other-desc"
                v-for="(cat, i) in f.catArray"
                :key="cat.value"
                @click="findIndex = findIndex.map((item,index) => {
                    if (index === n) {
                      item.index = i;
                      item.value = cat.value;
                    }
                    return item
                })"
                :class="{'choose': i === findIndex[n].index}">
            <i class="dian-icon" v-show="anyMore(i)"></i> {{ cat.name }}
          </span>
          </div>
        </div>
      </CollapseTransition>
      <div class="article-wrap" :class="{'shorter': isShort}">
        <sort-card v-for="a in article" :key="a.id" :articleObj="a"/>
      </div>
    </div>
  </div>
</template>

<script>
import CollapseTransition from "@/utils/collapse-transition";
import SortCard from "@/components/SortCard";

export default {
  name: "sortComponent",
  components: {
    CollapseTransition: CollapseTransition,
    SortCard,
  },
  data() {
    return {
      // 其余筛选项
      find: [],
      // 固定放在头部的筛选项
      findTop: [],
      // 筛选框显示
      show: false,
      // 筛选大类
      findIndex: [],
      // 一直展示的类
      topIndex: 0,
      //  &wordCount=0&pay=0&bookStatus=0&sort=1
      sort: 1,
      // 保存下拉刷新的请求即翻页请求
      pageUrl: '',
      // 渲染筛选文章数据
      article: [],
    }
  },
  props: {
    url: String,
    isShort: Boolean,
  },
  methods: {
    async getFindData() {
      // 让筛选回归初始不显示状态
      this.show = false;
      if (this.url) {
        let {data} = await this.$axios.get(this.findUrl);

        this.find = data.categories.filter(t => !t.isTop);
        this.findTop = data.categories.filter(t => t.isTop);
        this.$nextTick(() => {
          this.findIndex = this.find.map(item => {
            return {
              type: item.type,
              value: 0,
              index: 0,
            }
          });
          this.topIndex = 0;
          this.sort = 1;
        })
      }
    },
    findToggle() {
      this.show = !this.show
    },
    anyMore(i) {
      switch (i) {
        case 0:
          return false;
        case 4:
          return false;
        case 8:
          return false;
        case 12:
          return false;
        case 16:
          return false;
        default:
          return true;
      }
    },
    async getFindArticleData() {
      console.log(this.findArticleUrl);
      let {data} = await this.$axios.get(this.findArticleUrl);
      console.log(data)
      this.article = data.list
    },
    chooseSort(i, val) {
      if (this.sort !== val && this.topIndex !== i) {
        this.sort = val;
        this.topIndex = i;
      }
    }
  },
  computed: {
    findUrl() {
      return `https://apis.netstart.cn/yunyuedu${this.url}`
    },
    findArticleUrl() {
      let cat_id = new RegExp("(?<=catId\\=)\\d+");
      const catId = this.url.match(cat_id)[0];
      let urlStr = `https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=${catId}&sort=${this.sort}`
      this.findIndex.forEach((item) => {
        urlStr = urlStr + `&${item.type}=${item.value}`;
      })
      return urlStr;
    }
  },
  watch: {
    findUrl() {
      this.getFindData();
    },
    findArticleUrl() {
      this.getFindArticleData();
    }
  },
  created() {
    this.getFindData();
  }

}
</script>

<style lang="scss" scoped>
.find-top {
  position: relative;
  width: 100%;
  height: 5vh;

  .find-icon {
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);
    width: 48px;
    height: 21px;
    background-image: url("@/assets/image/book_category/book_category_fliter_expand.png");
    background-size: cover;
    background-position: center;
  }

  .find-icon.show {
    background-image: url("@/assets/image/book_category/book_category_fliter_collapse.png");
  }

  .top-item {
    display: inline-block;
    margin-top: 13px;

    .top-desc {
      position: relative;
      display: inline-block;
      font-size: 16px;
      text-align: center;
      margin: 0 10px;

      .line-icon {
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 2px;
        height: 13px;
        background-color: #c5c5c5;
      }

      &.choose {
        color: #e65436;
      }
    }
  }
}

.find-other {

  .other-item {
    margin-top: 5px;

    .other-desc {
      position: relative;
      display: inline-block;
      line-height: 32px;
      font-size: 16px;
      text-align: center;
      margin: 0 10px;
      color: #999;

      .dian-icon {
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 3px;
        height: 3px;
        border-radius: 999px;
        background-color: #999;
      }

      &.choose {
        color: #e65436;
      }
    }
  }

  .article-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 71.5vh;
    overflow: auto;
  }

  .article-wrap.shorter {
    height: 67vh;
  }
}

</style>