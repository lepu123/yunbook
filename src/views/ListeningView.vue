<template>
  <div class="listening">
    <div class="zhao"></div>
    <div class="background-content-image">
      <img :src="lisArr.cover" />
    </div>

    <div class="top">
      <van-icon name="arrow-left" @click="goBack" />
      <span class="van-ellipsis">{{ lisArr.title }}</span>
      <van-cell title="..." @click="showShare = true" />
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
      <div class="img">
        <img :src="lisArr.cover" />
      </div>
    </div>

    <div class="text">
      <div class="text-top">
        <ul>
          <li>作者:{{ lisArr.author }}</li>

          <li>集数:{{ lisArr.articleCount }}集</li>
        </ul>
        <ul>
          <li>主播:{{ lisArr.anchor }}</li>
          <li>每集价格:{{ lisArr.price }}阅点</li>
        </ul>
      </div>

      <div class="book-jian">
        <p>书籍简介:</p>
        <p
          style="
            display: -webkit-box;

            -webkit-box-orient: vertical;

            -webkit-line-clamp: 4;

            overflow: hidden;
          "
        >
          {{ lisArr.description }}
        </p>
      </div>
    </div>

    <div class="play">
      <audio id="audio" :src="audioUrl" />
      <van-slider
        v-model="progressValue"
        @change="onChange"
        active-color="#ee0a24"
      />
      <div class="time">
        <span>{{ currentTimeStr }}</span>
        <span>{{ durationStr }}</span>
      </div>

      <div class="button">
        <van-cell is-link @click="showPopup">
          <img src="@/assets/mulu.svg" style="width: 5vw" />
        </van-cell>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '50%' }"
          closeable
          get-container="#app"
        >
          <div class="zhao"></div>
          <div class="background-content-image">
            <img :src="lisArr.cover" />
          </div>

          <div class="mulu-top">
            <div class="zhao"></div>
            <span>目录</span>
            <div class="xu" @click="changeOrder">
              {{ order }}
            </div>
          </div>
          <ul>
            <li
              v-for="(item, index) in catalogs"
              :key="item.articleUuid"
              :class="[index === bookNum ? 'hightLight' : '']"
              @click="changeBookNum(index)"
            >
              <img
                src="@/assets/image/audio_player_item_free.png"
                v-if="item.needPay == 0"
              />
              <img
                src="@/assets/image/audio_player_item_need_buy.png"
                v-if="item.needPay == 1"
              />
              {{ item.title }}
            </li>
          </ul>
        </van-popup>
        <img src="@/assets/prev.svg" @click="prevAudio" style="width: 8vw" />
        <img
          src="@/assets/play.svg"
          style="width: 12vw"
          @click="changePlayBu"
          v-if="!playBu"
        />
        <img
          src="@/assets/stop.svg"
          style="width: 12vw"
          @click="changePlayBu"
          v-if="playBu"
        />
        <img src="@/assets/next.svg" @click="nextAudio" style="width: 8vw" />
        <div class="setTime">
          <van-cell is-link @click="showTime">
            <img src="@/assets/setTime.svg" style="width: 7vw" />
          </van-cell>
          <van-popup
            v-model="showSetTime"
            position="bottom"
            :style="{ height: '40%' }"
            closeable
            close-icon-position="top-right"
          >
            <div class="time-top">
              <p>定时</p>
            </div>
            <ul>
              <li @click="setTimeOne">15分钟</li>
              <li @click="setTimeTwo">30分钟</li>
              <li @click="setTimeThree">60分钟</li>
              <li @click="setTimeFour">90分钟</li>
              <li @click="setTimeFive(duration)">播完当前章节后关闭</li>
              <li @click="setTimeFinish">停止倒计时</li>
            </ul>
          </van-popup>
          <van-count-down :time="time" v-if="showClock" />
        </div>
      </div>
    </div>

    <div class="foot">
      <div class="foot-btn">
        <ul>
          <li @click="addBook">
            <img
              src="@/assets/addBook.svg"
              style="width: 5vw; padding-top: 7px"
            />
            <p>加入书架</p>
          </li>
          <li>
            <img src="@/assets/downLoad.svg" style="width: 7vw" />
            <p>批量下载</p>
          </li>
          <li>
            <van-badge :content="lisArr.commentCount" color="transparent">
              <van-icon name="comment-o" />
            </van-badge>
            <p>评论</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      lisArr: {},
      value: 0,
      playBu: false,
      audioUrl: "",
      duration: 1000,
      currentTime: 0,
      bookNum: 0,
      show: false,
      catalogs: [],
      order: "正序",
      time: 0,
      showSetTime: false,
      showClock: false,
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(
          `https://apis.netstart.cn/yunyuedu/ting/source.json?sourceUuid=${this.lisId}`
        )
        .then(({ data: { data } }) => {
          this.lisArr = data.sources[0];
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    onChange(value) {
      let audio = document.getElementById("audio");
      this.currentTime = (value / 100) * this.duration;
      audio.currentTime = this.currentTime;
    },
    changePlayBu() {
      this.playBu = !this.playBu;
      let audio = document.getElementById("audio");
      this.duration = audio.duration;
      this.currentTime = audio.currentTime;

      if (this.playBu) {
        audio.play();
        setInterval(() => {
          this.currentTime = audio.currentTime;
        }, 1000);
      } else {
        audio.pause();
        clearInterval();
      }
    },
    getAudio() {
      this.$axios.get("/听书音频.json").then(({ data: { data } }) => {
        this.audioUrl = data.urls[0].downloadUrl;
      });
    },
    nextAudio() {
      this.bookNum++;
      this.playBu = false;
      this.$axios.get("/听书音频.json").then(({ data: { data } }) => {
        this.audioUrl = data.urls[this.bookNum].downloadUrl;
      });
    },
    prevAudio() {
      if (this.bookNum == 0) {
        Toast("别点辣！要被榨干了辣！");
      } else {
        this.bookNum--;
        this.playBu = false;
        this.$axios.get("/听书音频.json").then(({ data: { data } }) => {
          this.audioUrl = data.urls[this.bookNum].downloadUrl;
        });
      }
    },
    showPopup() {
      this.show = true;
      this.$axios
        .get(
          `https://apis.netstart.cn/yunyuedu/ting/catalog.json?sourceUuid=${this.lisId}`
        )
        .then(({ data: { data } }) => {
          this.catalogs = data.catalogs;
        });
    },

    changeOrder() {
      if (this.order == "正序") {
        this.order = "倒序";
        this.$axios
          .get(
            `https://apis.netstart.cn/yunyuedu/ting/catalog.json?sourceUuid=${this.lisId}`
          )
          .then(({ data: { data } }) => {
            this.catalogs = data.catalogs;
            this.catalogs = this.catalogs.reverse();
          });
      } else if (this.order == "倒序") {
        this.order = "正序";
        this.$axios
          .get(
            `https://apis.netstart.cn/yunyuedu/ting/catalog.json?sourceUuid=${this.lisId}`
          )
          .then(({ data: { data } }) => {
            this.catalogs = data.catalogs;
          });
      }
    },

    changeBookNum(num) {
      this.bookNum = num;
      this.$axios.get("/听书音频.json").then(({ data: { data } }) => {
        this.audioUrl = data.urls[this.bookNum].downloadUrl;
      });
    },

    showTime() {
      this.showSetTime = true;
    },
    setTimeOne() {
      this.time = 15 * 60 * 1000;
      this.showClock = true;
    },

    setTimeTwo() {
      this.time = 30 * 60 * 1000;
      this.showClock = true;
    },

    setTimeThree() {
      this.time = 60 * 60 * 1000;
      this.showClock = true;
    },

    setTimeFour() {
      this.time = 90 * 60 * 1000;
      this.showClock = true;
    },

    setTimeFive(duration) {
      this.time = duration;
    },

    setTimeFinish() {
      this.time = 0;
      this.showClock = false;
    },

    addBook() {
      
      let listeningBook = localStorage.listeningBook
        ? JSON.parse(localStorage.listeningBook)
        : [];

      let resultsto = listeningBook.find((c) => c == this.lisId);

      if (!resultsto) {
        localStorage.listeningBook = JSON.stringify([...listeningBook,this.lisId]);

      Toast.success('成功加入书架');
      }

      else if(resultsto) {
        localStorage.listeningBook = JSON.stringify(listeningBook.filter(item => item !== this.lisId))
        Toast('已从书架移除');
      }
    },
  },

  computed: {
    lisId() {
      return this.$route.params.id;
    },
    currentTimeStr() {
      let m = Math.floor(this.currentTime / 60);
      let s = Math.floor(this.currentTime % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    },
    durationStr() {
      let m = Math.floor(this.duration / 60);
      let s = Math.floor(this.duration % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    },
    progressValue: {
      get() {
        return (this.currentTime / this.duration) * 100;
      },
      set(value) {
        let audio = document.getElementById("audio");
        this.currentTime = (value / 100) * this.duration;
        audio.currentTime = this.currentTime;
      },
    },
  },

  created() {
    this.getData();
    this.getAudio();
  },
};
</script>

<style lang="scss" scoped>
.listening {
  .background-content-image {
    position: absolute;
    /* 重点，不能让背景大过于展示的图片 */
    z-index: -2;
    width: 100vw;
    height: 100vh;
    filter: blur(58px); //重点：使用的是 filter 来实现的
    img {
      width: 100vw;
      height: 90vh;
    }
  }
  .zhao {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(30px);
  }
}
.top {
  width: 99vw;
  font-size: 22px;
  padding-top: 20px;
  color: #fff;
  span {
    display: inline-block;
    width: 40vw;
  }

  .van-icon-arrow-left:before {
    content: "\e668";
    margin-left: 5vw;
  }

  .van-cell {
    position: absolute;
    top: 0;
    right: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 10%;
    color: #fff;
    line-height: 18px;
    background-color: transparent;

    .van-cell__title {
      span {
        margin-left: 0;
        font-size: 28px;
      }
    }
  }
  span {
    margin-left: 27vw;
  }

  .img {
    margin-left: 31vw;
    margin-top: 40px;
    img {
      width: 136px;
      height: 191px;
    }
  }
}

.text {
  margin-left: 20px;
  .text-top {
    display: flex;
    justify-content: space-between;
    margin-top: 45px;
    width: 80vw;

    ul {
      display: block;
      width: 35vw;

      li {
        margin-bottom: 14px;
        color: #fff;
      }
    }
  }

  .book-jian {
    margin-top: 3px;
    color: rgb(192, 186, 186, 0.8);
    line-height: 22px;
    font-size: 13px;
  }
}

.play {
  margin-left: 5vw;
  margin-top: 120px;
  color: #fff;
  .van-slider {
    position: relative;
    width: 100%;
    height: 2px;
    background-color: #ebedf0;
    border-radius: 999px;
    cursor: pointer;
    width: 90vw;
  }
  .time {
    width: 90vw;
    display: flex;
    justify-content: space-between;
    margin-top: 9px;
  }

  .button {
    width: 80vw;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-left: 5vw;
  }
  .van-cell {
    position: relative;
    width: 40px;
    color: #fff;
    background-color: transparent;
    .van-icon-arrow:before {
      content: none;
    }
  }
  .van-cell::after {
    position: absolute;
    box-sizing: border-box;
    content: none;
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid red;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .van-cell[data-v-198a0236] {
    .van-cell__value[data-v-198a0236] {
      position: relative;
      overflow: visible;
      color: #969799;
      text-align: right;
      vertical-align: middle;
      word-wrap: break-word;
    }
  }
}

.foot {
  margin-top: 50px;
  border-top: 1px solid rgb(175, 169, 169);
  .foot-btn {
    color: rgb(200, 190, 190);
    width: 80vw;
    margin-left: 10vw;
    margin-top: 15px;
    ul {
      display: flex;
      justify-content: space-between;
      line-height: 20px;
      li {
        text-align: center;
        width: 20vw;
        p {
          font-size: 13px;
        }
      }
    }
    .van-icon-comment-o:before {
      content: "\e698";
      color: #fff;
      font-size: 23px;
      padding-top: 5px;
    }
  }
}

.van-popup[data-v-198a0236] {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: rgba(59, 57, 57, 0.6);
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-overflow-scrolling: touch;
  .background-content-image {
    position: absolute;
    /* 重点，不能让背景大过于展示的图片 */
    z-index: -2;
    width: 100vw;
    height: 100%;
    filter: blur(50px); //重点：使用的是 filter 来实现的
    img {
      width: 100vw;
      height: 100%;
    }
  }
  .zhao {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(100px);
  }
  ul[data-v-198a0236] {
    margin: 0;
    margin-top: 60px;
    padding: 0;
    list-style: none;
    color: #fff;

    li {
      border-top: 1px solid #eee;
      height: 45px;
      line-height: 45px;
      img {
        width: 30px;
        height: 18px;
        margin-left: 10px;
        margin-right: 5px;
      }
    }
  }
  .mulu-top {
    height: 60px;
    color: #ccc;
    display: flex;
    position: fixed;
    .zhao {
      position: absolute;
      z-index: -1;
      width: 100vw;
      height: 60px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(100px);
    }
    span {
      font-size: 20px;
      line-height: 60px;
      display: inline-block;
      margin-left: 15px;
    }
    .xu {
      width: 60px;
      height: 30px;
      border-radius: 999px;
      border: 1px solid #ccc;
      line-height: 30px;
      text-align: center;
      margin-top: 15px;
      margin-left: 30px;
    }
  }
}

.van-share-sheet__options {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 16px 0 6px 0px;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
}

.hightLight {
  color: rgb(248, 53, 53);
}

.time-top {
  p {
    font-size: 20px;
    position: fixed;
    margin: 15px 0 0 15px;
  }
}

.van-count-down {
  color: #fff;
  font-size: 14px;
  line-height: 20px;
}
</style>