<template>
  <div class="everybody-reading">
    <p
      style="
        font-size: 20px;
        font-weight: 600;
        margin-left: 5vw;
        padding-top: 8px;
      "
    >
      <!-- 大家都在读 -->
      {{ Arr.name }}
    </p>

    <ul>
      <li v-for="item in Arr.list" :key="item.id">
        <img :src="item.cover" />
        <div>
          <p>{{ item.title }}</p>
          <p>{{ item.author }}/{{ item.category }}</p>
          <p>{{ item.content }}</p>
        </div>
      </li>
    </ul>

    <div @click="getEverybodyMore(Arr.more.url)" class="more" v-show="Arr.more">
      <van-cell is-link @click="showPopup">查看更多</van-cell>
      <!-- <div class="right">&gt;</div> -->

      <van-popup
        v-model="show"
        get-container="#app"
        closeable
        close-icon="arrow-left"
        close-icon-position="top-left"
        position="right"
        :style="{ height: '100%' }"
      >
        <div
          style="
            height: 50px;
            width: 100vw;
            font-size: 20px;
            text-align: center;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            color: rgb(139, 127, 127);
          "
        >
          {{ Arr.name }}
        </div>
        <ul class="more-list">
          <li v-for="(c, index) in everybodyMoreList" :key="index">
            <img :src="c.cover" />
            <div>
              <p>{{ c.title }}</p>
              <p>{{ c.author }}/{{ c.category }}</p>
              <p>{{ c.content }}</p>
            </div>
          </li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Arr: Object,
  },
  data() {
    return {
      everybodyMoreList: [],
      show: false,
    };
  },
  methods: {
    getEverybodyMore(url) {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${url}`)
        .then(({ data: { data } }) => {
          this.everybodyMoreList = data.books;
          // console.log(this.everybodyMoreList, 123);
        });
    },
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.everybody-reading {
  width: 98vw;
  margin-left: 1vw;
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
  img {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

  ul {
    li {
      display: flex;
      margin: 10px;
      img {
        height: 120px;
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

  .more {
    display: flex;
    color: rgb(152, 141, 141);
    width: 30vw;
    margin: 20px 38%;
    font-size: 17px;
    line-height: 20px;
  }
}
</style>