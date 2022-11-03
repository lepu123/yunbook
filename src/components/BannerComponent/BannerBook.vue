<template>
  <div class="banner-box">
    <div
      v-show="recommendArr.length == 0 && localShow != 1"
      class="banner-null"
    >
      <div class="banner-null-img">
        <img src="@/assets/image/banner-images/book_shelf_no_data_pic.png" />
        <div class="banner-null-title">
          <p>你的书架空空如也</p>
        </div>
        <van-button
          class="banner-null-button"
          round
          color="#FF0000"
          type="primary"
          to="/bookmallview"
          >去选书</van-button
        >
      </div>
    </div>

    <div v-show="recommendArr.length == 0 && localShow == 1" class="local-null">
      <div class="local-add"></div>
      <div class="local-null-item">
        <img src="@/assets/image/banner-images/home_null_data_icon.png" />
        <p>还没有本地书哦</p>
      </div>
    </div>

    
      <div
        v-show="recommendArr.length != 0 && localShow != 2"
        class="banner-show"
      >
        <div
          class="banner-book"
          v-for="(item, i) in recommendArr"
          :key="item.id"
          @click="bookClick(i)"
        >
          <div class="book-image">
            <img :src="item.cover" />
            <span class="book-play" v-if="item.bookType == 21">
              <img
                src="@/assets/image/banner-images/icon_play_normal_black.png"
              />
            </span>
          </div>
          <div class="book-title van-multi-ellipsis--l2">
            {{ item.title }}
          </div>
          <div class="book-chapter">看屁啊</div>
        </div>
      </div>

      <div
        v-show="recommendArr.length != 0 && localShow == 2"
        class="banner-show"
        @click="bookClick(i)"
      >
        <div class="lis-book" v-for="item in recommendArr" :key="item.id">
          <div class="lis-img">
            <img :src="item.cover" />
          </div>
          <div class="lis-item">
            <div class="lis-title van-multi-ellipsis--l2">{{ item.title }}</div>
            <div class="lis-author">{{ item.author }}</div>
            <div class="lis-author">看屁</div>
          </div>
        </div>
      </div>
   
  </div>
</template>

<script>
export default {
  props: {
    recommendArr: Array,
    localShow: Number,
  },
  data() {
    return {
      bookId: "",
      title: "",
      // path: `/reading/${this.bookId}`
    };
  },
  methods: {
    bookClick(id) {
      this.bookId = this.recommendArr[id].id;
      this.title = this.recommendArr[id].title;
      console.log(this.recommendArr[id].bookType == 0);
      if (this.recommendArr[id].bookType == 0) {
        this.$router.push(`/detile/${this.bookId}/${this.title}`);
      } else {
        this.$router.push(`/ListeningView/${this.bookId}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-box {
  width: 100vw;
  min-height: 100vh;
}

.banner-null {
  width: 100%;
  height: 100vh;

  .banner-null-img {
    margin: 26vh auto 0px;
    width: 60%;
    height: 25vh;

    img {
      width: 100%;
      height: 100%;
    }

    .banner-null-title {
      margin-top: 10px;
      text-align: center;
      font-size: 13px;
      color: gray;
    }
  }

  .van-button {
    height: 30px;
  }

  .banner-null-button {
    display: block;
    margin: 15px auto 0;
  }
}

.local-null {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(@/assets/image/banner-images/book_page_bg.png);
  overflow: hidden;

  .local-add {
    position: absolute;
    top: 0;
    left: 65%;
    width: 35%;
    height: 50px;
    background-image: url(@/assets/image/banner-images/bookshelf_none_add.png);
    background-repeat: no-repeat;
    background-size: contain;
  }

  .local-null-item {
    margin: 30vh auto 0px;
    width: 150px;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
    }

    p {
      display: block;
      margin-top: 10px;
      text-align: center;
      font-size: 13px;
      color: gray;
    }
  }
}

.banner-show {
  display: flex;
  flex-wrap: wrap;
}

.lis-book {
  display: flex;
  margin: 10px 0 10px 10px;
  width: 100%;
  height: 150px;

  .lis-img {
    width: 15vh;
    height: 100%;
    border-radius: 5px;
    box-shadow: 3px 3px 10px #888888;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .lis-item {
    margin-left: 15px;
    width: 70%;
    height: 100%;

    .lis-title {
      width: 100%;
      height: 110px;
      font-size: 20px;
    }

    .lis-author {
      font-size: 13px;
      color: gray;
    }
  }
}

.banner-book {
  width: 26.5vw;
  height: 200px;
  margin: 10px 3.4vw;

  .book-image {
    position: relative;
    width: 100%;
    height: 140px;

    img {
      width: 100%;
      height: 100%;
    }

    .book-play {
      display: block;
      position: absolute;
      bottom: 5px;
      left: 3px;
      width: 15px;
      height: 15px;
      border-radius: 999px;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .book-title {
    margin-top: 5px;
    width: 100%;
    height: 30px;
    font-size: 13px;
  }

  .book-chapter {
    width: 100%;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    color: #888;
  }
}
</style>