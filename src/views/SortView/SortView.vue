<template>
  <div class="classification">
    <div class="search-btn"></div>
    <van-tabs v-model="active" swipeable animated>
      <!-- 外层循环渲染频道 -->
      <van-tab v-for="node in allStoreArr" :key="node.channel" :title="node.name">
        <div class="class-content">
          <div class="sort-item">
            <!-- 内层循环渲染分类 -->
            <div class="sort-desc" v-for="(s,i) in node.cates"
                 :class="{'active': i === index}"
                 :key="s.name"
                 @click="getFindUrl(i,s.url)">
              {{ s.name }}
            </div>
          </div>
          <div class="sort-item-content">
            <!-- 筛选组件 -->
            <SortComponent :url="findUrl"/>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {mergedCategory} from "@/apis/sort";
import SortComponent from "@/components/SortComponent";

export default {
  name: "ClassificationView",
  components: {
    SortComponent
  },
  data() {
    return {
      // 存放所有频道和其分类的数据
      allStoreArr: [],
      // 头部的大标签所指页数
      active: 0,
      // 所选分类的下标
      index: 0,
      // 请求筛选项的url
      findUrl: '',
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
    getFindUrl(index, url) {
      this.index = index
      this.findUrl = url
    }
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

    .sort-item {
      padding: 10px 15px;
      width: 100vw;
      overflow: hidden;
      background-color: #f4f4f4;

      .sort-desc {
        display: inline-block;
        position: relative;
        height: 20px;
        line-height: 20px;
        margin: 10px 14px;
      }

      .sort-desc.active {
        color: #e65436;
      }

      .sort-desc.active::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 15px;
        height: 2.5px;
        border-radius: 999px;
        background-color: #e54d2e;
      }
    }
  }

  .search-btn {
    position: absolute;
    top: 4px;
    right: 10px;
    width: 36px;
    height: 36px;
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