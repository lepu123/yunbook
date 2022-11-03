<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />

    <van-cell is-link @click="showPopup" v-if="$route.meta.showFree">
      <div class="newFree">
        <p>全场免费看5天</p>
      </div>
    </van-cell>
    <van-popup v-model="show">
      <img src="@/assets/image/get-free-read.png" style="width: 80vw" />
    </van-popup>

    <van-tabbar
      fixed
      z-index="100"
      active-color="#313131"
      inactive-color="#cecece"
      route
      v-if="$route.meta.showFree"
    >
      <van-tabbar-item to="/bookshelf">
        <span>书架</span>
        <template #icon="props">
          <van-image
            :src="
              props.active
                ? require('@/assets/image/home_tabbar/home_tabbar_icon_bookshelf_press.png')
                : require('@/assets/image/home_tabbar/home_tabbar_icon_bookshelf_normal.png')
            "
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/bookmallview">
        <span>书城</span>
        <template #icon="props">
          <van-image
            :src="
              props.active
                ? require('@/assets/image/home_tabbar/home_tabbar_icon_discover_press.png')
                : require('@/assets/image/home_tabbar/home_tabbar_icon_discover_normal.png')
            "
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/sort">
        <span>分类</span>
        <template #icon="props">
          <van-image
            :src="
              props.active
                ? require('@/assets/image/home_tabbar/home_tabbar_icon_sort_press.png')
                : require('@/assets/image/home_tabbar/home_tabbar_icon_sort_normal.png')
            "
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mime">
        <span>我的</span>
        <template #icon="props">
          <van-image
            :src="
              props.active
                ? require('@/assets/image/home_tabbar/home_tabbar_icon_mime_press.png')
                : require('@/assets/image/home_tabbar/home_tabbar_icon_mime_normal.png')
            "
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: null,
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },

  created() {
    this.$axios
      .get(
        "https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=13c58cc086f74e36978b4a7881b82517_4&content_uuid=e493c3edec6b4dfbaab05966b800d513_4"
      )
      .then(({ data }) => {
        this.content = data.data.content;
        // console.log(data.data);
      });
  },
};
</script>

<style lang="scss" scoped>
.newFree {
  position: fixed;
  bottom: 50px;
  right: 0;
  width: 50vw;
  height: 90px;
  background-image: url(@/assets/image/new_user_welfare_free_bg.9.png);
  background-size: 100% 100%;
  color: #fff;
  line-height: 100px;
  p {
    font-size: 15px;
    margin-left: 6vw;
  }
}
.van-popup--center {
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: transparent;
}
</style>
