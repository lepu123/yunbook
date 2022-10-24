<template>
  <div id="app">
    <router-view/>
    <van-tabbar fixed z-index="999" active-color="#313131" inactive-color="#cecece" route>
      <van-tabbar-item  to="/bookshelf">
        <span>书架</span>
        <template #icon="props">
          <van-image
              :src="props.active ? require('@/assets/image/home_tabbar/home_tabbar_icon_bookshelf_press.png') : require('@/assets/image/home_tabbar/home_tabbar_icon_bookshelf_normal.png')"  />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home">
        <span>书城</span>
        <template #icon="props">
          <van-image :src="props.active ? require('@/assets/image/home_tabbar/home_tabbar_icon_discover_press.png') : require('@/assets/image/home_tabbar/home_tabbar_icon_discover_normal.png')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/sort">
        <span>分类</span>
        <template #icon="props">
          <van-image :src="props.active ? require('@/assets/image/home_tabbar/home_tabbar_icon_sort_press.png') : require('@/assets/image/home_tabbar/home_tabbar_icon_sort_normal.png')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mime">
        <span>我的</span>
        <template #icon="props">
          <van-image :src="props.active ? require('@/assets/image/home_tabbar/home_tabbar_icon_mime_press.png') : require('@/assets/image/home_tabbar/home_tabbar_icon_mime_normal.png')" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8vh;
  z-index: 999;
  background-color: pink;
}

</style>
