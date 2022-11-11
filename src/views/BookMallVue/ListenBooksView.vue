<template>
  <div class="listenbook">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannersArr" :key="index">
        <img :src="item.cover" @click="swipeToBook(item.id)" />
      </van-swipe-item>
    </van-swipe>

    <div class="everybody-reading">
      <p
        style="
          font-size: 20px;
          font-weight: 600;
          margin-left: 5vw;
          padding-top: 18px;
        "
      >
        {{ hotListenArr.name }}
      </p>

      <ul>
        <router-link
          tag="li"
          :to="'/ListeningView/' + item.id"
          v-for="item in hotListenArr.list"
          :key="item.id"
        >
          <img :src="item.cover" />
          <div>
            <p>{{ item.title }}</p>
            <p>{{ item.author }}/{{ item.category }}</p>
            <p>{{ item.content }}</p>
          </div>
        </router-link>
      </ul>
    </div>

    <img class="midImg" :src="imgOne" />

    <div class="newbooks">
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-left: 5vw;
          padding-top: 8px;
        "
      >
        {{ girlsSelect.name }}
      </p>
      <ul>
        <router-link
          tag="li"
          :to="'/ListeningView/' + item.id"
          v-for="item in girlsSelect.list"
          :key="item.id"
        >
          <img :src="item.cover" />
          <p
            style="
              font-size: 15px;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            "
          >
            {{ item.title }}
          </p>
          <p
            style="
              font-size: 13px;
              color: rgb(196, 181, 181);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            {{ item.author }}
          </p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listenBooksUrl: String,
  },
  components: {},
  data() {
    return {
      bannersArr: [],
      hotListenArr: {},
      imgOne: "",
      girlsSelect: {},
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${this.listenBooksUrl}`)
        .then(({ data: { data } }) => {
          this.bannersArr = data.list[0].banners;
          this.hotListenArr = data.list[1];
          this.imgOne = data.list[2].cover;
          this.girlsSelect = data.list[3];
        });
    },
    swipeToBook(id) {
      this.$router.push(`/ListeningView/${id}`);
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.my-swipe .van-swipe-item {
  margin-top: 10px;
  img {
    width: 96vw;
    height: 200px;
    border-radius: 6px;
    margin-left: 2vw;
  }
}
.midImg {
  width: 96vw;
  border-radius: 10px;
  margin-left: 2vw;
  height: 140px;
  margin-top: 15px;
  margin-bottom: 10px;
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
      margin-top: 15px;
      img {
        height: 120px;
        width: 86px;
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
}

.newbooks {
  width: 98vw;
  margin-left: 1vw;
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
  ul {
    width: 96vw;
    margin-left: 1vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 21vw;
      margin-top: 20px;
      padding-bottom: 15px;
      img {
        width: 100%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
      }
      p {
        margin-top: 5px;
      }
    }
  }
}
</style>