<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <van-tabbar fixed z-index="999" active-color="#313131" inactive-color="#cecece" route>
      <van-tabbar-item  to="/bookshelf">
        <span>书架</span>
        <template #icon="props">
          <van-image
              :src="props.active ? require('@/assets/image/home_tabbar/home_tabbar_icon_bookshelf_press.png') : require('@/assets/image/home_tabbar/home_tabbar_icon_bookshelf_normal.png')"  />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/bookmallview">
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
  data(){
    return{
      content:null
    }
  },
  created(){
    this.$axios
    .get('https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=13c58cc086f74e36978b4a7881b82517_4&content_uuid=e493c3edec6b4dfbaab05966b800d513_4')
    .then(({data})=>{
      this.content=data.data.content
      console.log(data.data);
    })
  }
}
</script>

<style lang="scss">
.more-list {
  li {
    display: flex;
    width: 90vw;
    margin-left: 5vw;
    margin-top: 15px;
    img {
      height: 150px;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }

    div {
      margin-left: 10px;
    }

    div :nth-child(1) {
      font-size: 18px;
      font-weight: 700;
    }

    div :nth-child(2) {
      font-size: 13px;
      color: rgb(152, 141, 141);
      margin-top: 10px;
    }
    div :nth-child(3) {
      color: rgb(152, 141, 141);
      font-size: 15px;
      margin-top: 15px;
      line-height: 25px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

</style>
