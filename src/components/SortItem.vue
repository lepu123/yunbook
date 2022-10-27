<template>
  <!-- 内层循环渲染分类 -->
  <div class="sort-content">
    <div class="sort-item">
      <div class="sort-desc" v-for="(g,i) in category"
           :class="{'active': i === index}"
           :key="g.name"
           @click="getFindUrl(i)">
        {{ g.name }}
      </div>
    </div>
    <div class="sort-item-content">
      <!-- 筛选组件 -->
      <SortComponent :url="category[index].url" :isShort="isShort"/>
    </div>
  </div>

</template>

<script>
import SortComponent from '@/components/SortComponent'

export default {
  name: "SortItem",
  components: {
    SortComponent
  },
  data() {
    return {
      // 所选分类的下标
      index: 0,
    }
  },
  props: {
    category: Array,
    isShort: Boolean,
  },
  methods: {
    getFindUrl(index) {
      this.index = index
    }
  }

}
</script>

<style lang="scss" scoped>
.sort-item {
  padding: 10px;
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

.sort-item-content {
  padding: 0 15px;
}
</style>