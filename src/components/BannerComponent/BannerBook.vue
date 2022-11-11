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
        
      >
        <div v-if="item.bookType != 2" @click="bookClick(item.id,item.title,item.author,item.bookType)">
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
        
        <van-cell @click="groupPopup(i)">
        <div v-if="item.bookType == 2">
          <div class="group-book">
            <div class="group-img" v-for="t in item.groupBook" :key="t.id">
              <img :src="t.cover" />
            </div>
          </div>
          <div class="book-title van-multi-ellipsis--l2">
            {{ item.groupName }}
          </div>
          <div class="book-chapter">共{{ item.groupBook.length }}本</div>
        </div>
        </van-cell>
      </div>
    </div>

    <div
      v-show="recommendArr.length != 0 && localShow == 2"
      class="banner-show"
    >
        <div
          class="lis-book"
          v-for="(item,index) in recommendArr"
          :key="item.id"
        >
         <div v-if="item.bookType != 2" class="lis-box" @click="bookClick(item.id,item.title,item.author,item.bookType)">
          <div class="lis-img">
            <img :src="item.cover" />
          </div>
          <div class="lis-item">
            <div class="lis-title van-multi-ellipsis--l2">{{ item.title }}</div>
            <div class="lis-author">{{ item.author }}</div>
            <div class="lis-author">看屁</div>
          </div>
        </div>

        <div v-if="item.bookType == 2" class="lis-box">
          <van-cell @click="groupPopup(index)">
          <div class="lis-group" >
            <div class="lis-group-images" v-for="t in item.groupBook" :key="t.id">
              <img :src="t.cover" />
            </div>
          </div>
          <div class="lis-item">
            <div class="lis-title van-multi-ellipsis--l2"> {{ item.groupName }}</div>
            <div class="lis-author">共{{ item.groupBook.length }}本</div>
          </div>
          </van-cell>
        </div>
      </div>
      
    </div>
    <van-popup 
    v-model="groupShow" 
    :style="{ height: '100%' ,width: '100%'}"
    >
    <div class="group-item" v-for="item in groupArr" :key="item.id">
       <div class="group-title">{{item.groupName}}</div>
       <div class="group-book-item" v-for="t in item.groupBook" :key='t.id' @click="bookClick(t.id,t.title,t.author,t.bookType)">
          <div class="group-book-box">
              <div class="group-book-img">
                <img :src="t.cover">
              </div>
              <div class="group-book-information">
                <div class="group-book-title">{{t.title}}</div>
                <div class="group-book-author">{{t.author}}</div>
                <div class="group-book-progress">未听</div>
              </div>
          </div>
       </div>
       <div class="close" ><i @click="groupShow=false">X</i></div>
    </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    recommendArr: Array,
    localShow: Number,
  },
  data() {
    return {
      bookId: "",
      title: "",
      author: "",
      bookType: "",
      groupArr: [],
      groupShow: false,
    };
  },
  computed: {
    ...mapState(["historyArr", "isExit"]),
  },
  methods: {
    bookClick(bookid,booktitle,bookauthor,Type) {
      // this.bookId = this.recommendArr[id].id;
      // this.title = this.recommendArr[id].title;
      // this.author = this.recommendArr[id].author;
      // this.bookType = this.recommendArr[id].bookType;
      this.getHistory({
        id: bookid,
        title: booktitle,
        author: bookauthor,
        booktype: Type,
      });
      if (Type == 0) {
        this.$router.push(`/detile/${bookid}/${booktitle}`);
      } else {
        this.$router.push(`/ListeningView/${bookid}`);
      }
    },
    groupPopup(index) {
      this.groupArr = [this.recommendArr[index]]
      console.log(this.groupArr);
      this.groupShow = true
    },
    ...mapMutations(["getHistory"]),
  },
};
</script>

<style lang="scss" scoped>
.banner-box {
  width: 100vw;
  min-height: 100vh;
}

.group-item {
  width: 100vw;
  height: 100vh;
  overflow: auto;

  .group-title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 25px;
    text-align: center;
  }

  .group-book-item {
    width: 100vw;
    height: 150px;

    .group-book-box {
      display: flex;
      margin: 20px auto 0;
      width: 90%;
      height: 100%;

      .group-book-img {
        width: 27vw;
        height: 100%;
        border-radius: 5px;
        box-shadow: 3px 3px 10px #888888;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .group-book-information {
        width: 63vw;
        height: 100%;
        margin-left: 10px;
      }

      .group-book-title {
        width: 63vw;
        height: 50%;
        font-size: 20px;
      }

      .group-book-author {
        width: 63vw;
        height: 25%;
        font-size: 14px;
        color: gray;
      }

      .group-book-progress {
        width: 63vw;
        height: 25%;
        font-size: 14px;
      }
    }
  }

  .close {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 45px;
    font-size: 20px;
    text-align: center;
    line-height: 45px;
  }
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

  .lis-box {
    display: flex;
    width: 100%;
    height: 100%;

    .van-cell {
      padding: 0 0;
    }

    .van-cell__value {
      display: flex;
    }
  }

  .lis-img {
    width: 27vw;
    height: 100%;
    border-radius: 5px;
    box-shadow: 3px 3px 10px #888888;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .lis-group {
    display: flex;
    flex-wrap: wrap;
    width: 27vw;
    height: 100%;
    border-radius: 5px;
    box-shadow: 3px 3px 10px #888888;
    overflow: hidden;
    background-color: rgba(128, 128, 128, 0.1);

    .lis-group-images {
      width: 9vw;
      height: 55px;
      margin: 10px 2vw;

      img {
        width: 100%;
        height: 100%;
      }
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
      height: 20px;
      font-size: 13px;
      color: gray;
    }
  }
}

.banner-book {
  width: 26.5vw;
  height: 200px;
  margin: 10px 3.4vw;
  
  .van-cell {
  padding: 0 0;
  }

  .book-image {
    position: relative;
    width: 100%;
    height: 140px;
    border-radius: 4px;
    overflow: hidden;

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

  .group-book {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 140px;
    border-radius: 4px;
    background-color: rgba(128, 128, 128, 0.1);
    overflow: hidden;

    .group-img {
      width: 9vw;
      margin: 9px 2vw;
      height: 54px;

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