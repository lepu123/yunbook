<template>
  <div class="classification">
    <div class="search-btn"></div>
    <van-tabs v-model="active" swipeable animated>
      <!-- 外层循环渲染频道 -->
      <van-tab v-for="(node,i) in allStoreArr" :key="node.channel" :title="node.name">
        <div class="class-content">
          <!-- 内层循环渲染分类 -->
          <!-- 分类插件区分开来这里之前出了bug，修复了 -->
          <SortItem :category="node.cates" :isShort="i > 1"/>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {mergedCategory} from "@/apis/sort";
import SortItem from "@/components/SortItem";

export default {
  name: "ClassificationView",
  components: {
    SortItem,
  },
  data() {
    return {
      // 存放所有频道和其分类的数据
      allStoreArr: [],
      // 头部的大标签所指页数
      active: 0,
      // 是否加载动画
    };
  },
  created() {
    // 生命周期开始时请求
    this.getAllStoreAndFind();
  },
  methods: {
    async getAllStoreAndFind() {
      let {data} = await this.$axios.get(mergedCategory);
      this.allStoreArr = data;
    },
  },

}
</script>

<style lang="scss" scoped>
.classification {
  position: relative;
  width: 100vw;
  height: 94vh;

  .class-content {
    width: 100vw;
    height: 50vh;
    background-color: #fdfdfe;
    overflow: auto;


  }

  .search-btn {
    position: absolute;
    top: 7px;
    right: 10px;
    width: 28px;
    height: 28px;
    z-index: 900;
    background-image: url(@/assets/image/search_icon/icon_search.png);
    background-size: cover;
    background-position: center;
  }

  :deep(.van-tabs__line) {
    display: none;
  }

  :deep(.van-tabs__wrap) {
    position: relative;
    background-color: #fff;
  }

  :deep(.van-tabs__nav) {
    width: 53%;
    padding-left: 15px;
  }

  :deep(.class-content) {
    width: 100vw;
    height: 88.7vh;
  }

  :deep(.van-tab.van-tab--active) {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>