<template>
  <div class="sort-find">
    <div class="find-top">
      <div class="top-item" v-for="t in findTop" :key="t.type">
        <span class="top-desc" v-for="(cat,i) in t.catArray" :key="cat.value">
          <i class="line-icon" v-show="i !== 0">|</i>{{ cat.name }}
        </span>
      </div>
      <i class="find-icon" :class="{'show': show}" @click="findToggle()"></i>
    </div>

    <div class="find-other">
      <CollapseTransition>
        <div class="find-other-show" ref="child" v-if="show">
          <div class="other-item" v-for="f in find" :key="f.type">
          <span class="other-desc" v-for="(cat,i) in f.catArray" :key="cat.value">
            <i class="line-icon" v-show="i !== 0">·</i>{{ cat.name }}
          </span>
          </div>
        </div>
      </CollapseTransition>
      <div class="article-wrap">
        我是一个粉刷匠
      </div>
    </div>

  </div>
</template>

<script>
import CollapseTransition from "@/utils/collapse-transition";

export default {
  name: "sortComponent",
  components: {
    CollapseTransition: CollapseTransition
  },
  data() {
    return {
      // 其余筛选项
      find: [],
      // 固定放在头部的筛选项
      findTop: [],
      // 筛选框显示
      show: false
    }
  },
  props: {
    url: String,
  },
  methods: {
    async getFindData() {
      // 让筛选回归初始不显示状态
      this.show = false;
      if (this.url) {
        let {data} = await this.$axios.get(this.findUrl)
        this.find = data.categories.filter(t => !t.isTop);
        this.findTop = data.categories.filter(t => t.isTop);
      }
    },
    findToggle() {
      this.show = !this.show
    }
  },
  computed: {
    findUrl() {
      return `https://apis.netstart.cn/yunyuedu${this.url}`
    }
  },
  watch: {
    findUrl() {
      this.getFindData();
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
}

.find-other {
  background-color: #e54d2e;


  .find-other-show {
    background-color: white;
  }

  .article-wrap {
    height: 300px;
  }
}

.test-enter,
.test-leave-to {
  opacity: 0;
  height: 0;
}

.test-enter-active {
  transition: all .3s ease;
  height: 70px;
}

.test-enter-to,
.test-leave {
  opacity: 100;
}
</style>