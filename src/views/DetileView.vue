<template>
  <div class="detile" ref="detile">
    <div class="detile-item">
      <div class="top">
        <div class="cover"><img :src="dataList.cover" alt="" /></div>
        <div class="message">
          <div class="title">{{ dataList.title }}</div>

          <div class="category">
            {{ dataList.category }}
            <div class="ge">|</div>
            <div class="author">{{ dataList.author }}</div>
          </div>
          <div class="value">
            <van-icon v-for="(s, i) in startList" :key="i" name="star" />
          </div>
          <div class="word">
            {{ dataList.words }}
            <div class="click">{{ dataList.clicks }}</div>
          </div>
          <div class="price">{{ dataList.wprice }}</div>
        </div>
      </div>
      <div class="summary">{{ dataList.summary }}</div>
      <div class="type">作品类型：{{ dataList.type }}</div>
      <van-cell class="mulu" is-link @click="showPopup">
        <div class="mulu-item">
          <div class="endWatch">
            <van-icon name="coupon-o" />
            <div class="end" v-if="dataList.stateMode == 0">
              共{{ dataList.lastPage }}章
            </div>
          </div>

          <div class="endShow" v-if="dataList.stateMode == 0">已完结</div>
        </div>
      </van-cell>
      <van-popup
        v-model="show"
        :style="{ width: '100%', height: '100%' }"
        closeable
        position="right"
        class="mulu-show"
      >
        <div class="middle">
          <div class="cover"><img :src="dataList.cover" alt="" /></div>

          <div class="desc">
            <div class="title">{{ dataList.title }}</div>
            <div class="author">{{ dataList.author }}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="total">{{ "共" + dataList.lastPage + "章" }}</div>
          <div class="reverse" @click="reverseed">
            {{ order }}
            <div class="tranThree" :class="{ rotate: reverse == true }"></div>
          </div>
        </div>

        <div class="chose" v-for="(l, i) in choseList" :key="i">
          <div class="label" v-if="l.label">{{ l.label }}</div>
          <div class="choseItem" v-for="(t, n) in l.itemList" :key="n">
            <div class="item-mulu" @click.prevent="choseToRead(i, n)">
              {{ t.text }}
            </div>
          </div>
        </div>
      </van-popup>
      <button @click="go">立刻试读</button>
    </div>

    <router-view
      :pageNum="pagecount"
      :choseList="choseList"
      :nameList="nameList"
      :cover="dataList.cover"
      :author="dataList.author"
      :title="dataList.title"
      :lastPage="dataList.lastPage"
      @goPage="goPage"
    />

    <div class="fan-item" @click="fanShow = true">
      <div class="user">
        <div class="user-img" v-for="f in fanList" :key="f.userId">
          <img :src="f.imageUrl" alt="" />
        </div>
      </div>

      <div class="das">打赏一下</div>
    </div>

    <van-popup
      v-model="fanShow"
      :style="{ width: '100%', height: '100%' }"
      class="fanbang-show"
      position="right"
    >
      <div class="fan-top">
        <div class="return" @click="fanShow = false">
          <van-icon
            name="arrow-left"
            :style="{ color: '#777', fontSize: '25px', paddingRight: '20px' }"
          />
        </div>
        <div class="bang" :style="{ fontSize: '27px', paddingLeft: '20px' }">
          粉丝榜
        </div>
        <div
          class="chenghao"
          @click="descShow = true"
          :style="{ color: '#777' }"
        >
          粉丝称号
        </div>
      </div>
      <div class="fanbangAll" ref="fanbangAll" @scroll="fanbangLoad($event)">
        <div class="fanbang" v-for="(b, i) in fanBangList" :key="i">
          <div class="fan-user">
            <div class="index">{{ i + 1 }}</div>
            <div class="fan-img"><img :src="b.imageUrl" alt="" /></div>
            <div class="fan-name">{{ b.nickName }}</div>
          </div>
          <div class="fan-desc">
            <div class="fan-title">{{ b.fansTitle }}</div>
            <div class="fan-score">{{ b.scoreValue }}</div>
          </div>
        </div>
        <div class="load">
          <van-loading v-show="loadShow" size="54px" />
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="descShow"
      :style="{ width: '100%', height: '100%' }"
      class="desc-show"
      closeable
      position="right"
    >
      <div class="desc-img">
        <img
          src="https://easyreadfs.nosdn.127.net/fle/a0df1d4009c7a2ec5fee/1572312391130/dashang.jpg"
        />
      </div>
    </van-popup>

    <div class="comment-item">
      <div
        class="comment"
        v-for="c in commentList"
        :key="c.userId"
        :class="{ hasreplay: c.replyCount != 0 || c.select != '' }"
      >
        <div class="top">
          <div class="img"><img :src="c.cover" alt="" /></div>
          <div class="com-top">
            <div class="top-like">
              <div class="author">{{ c.author }}</div>
              <div class="level">{{ c.level }}</div>
              <div class="like">{{ c.likes }}<van-icon name="good-job-o" /></div>
            </div>
            <div class="top-time">
              <div class="ground">
                <div class="grade" v-for="(s, i) in c.grade" :key="i">
                  <van-icon name="star" />
                </div>
              </div>

              <div class="time">{{ c.time }}</div>
            </div>
          </div>
        </div>

        <div class="user-com">
          {{ c.comment }}
        </div>
        <div class="select" v-if="c.select != ''">
          {{ c.select }}
        </div>
        <div class="replyList" v-if="c.replyCount != 0">
          <div class="reply-item" v-for="r in c.replyList" :key="r.commentId">
            <div class="toauthor">
              {{ r.nickName }}
              <div class="todesc">回复</div>
              {{ r.toNickName }}
              <div class="rep-comment">: {{ r.comment }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  name: "DetileView",
  data() {
    return {
      dataList: {},
      cataList: [],
      choseList: [],
      pagecount: 0,
      nameList: [],
      startList: [],
      show: false,
      commentList: [],
      fanList: [],
      fanBangList: [],
      reverse: false,
      order: "降序",
      time: 0,
      fanShow: false,
      addFan: 1,
      timer: null,
      loadShow: false,
      descShow: false,
      bookId: '',
      bookTitle: '',
    };
  },
  methods: {
    //反转目录顺序
    reverseed() {
      this.reverse = !this.reverse;
      if (this.reverse == true) {
        this.order = "升序";
      } else {
        this.order = "降序";
      }

      let reArray = this.choseList;
      reArray = reArray.reverse();
      for (let i = 0; i < reArray.length; i++) {
        let newb = reArray[i].itemList;
        newb = newb.reverse();
      }
    },
    //点击目录跳转
    choseToRead(i, n) {
      if (this.reverse == false) {
        let pageChose = 0;
        if (i == 0) {
          pageChose = n;
        } else {
          for (let x = 0; x < i; x++) {
            pageChose += this.choseList[x].itemList.length;
            // console.log(pageChose,i,n,x);
          }
          pageChose += n;
        }
        // console.log(pageChose);
        this.show = false;
        sessionStorage.setItem("page", pageChose);
        this.goPage();
        // this.$router.go(1);
      } else {
        let lastpage = JSON.parse(sessionStorage.getItem("new"));
        let pageChange = 0;
        if (i == 0) {
          pageChange = lastpage - n;
        } else {
          for (let x = 0; x < i; x++) {
            pageChange += this.choseList[x].itemList.length;
            // console.log(pageChose,i,n,x);
          }
          pageChange = lastpage - (pageChange + n);
        }
        this.show = false;
        sessionStorage.setItem("page", pageChange - 1);
        this.goPage();
        // this.$router.go(0);
      }
    },
    //显示目录
    showPopup() {
      this.show = true;
    },
    //子组件请求跳转
    goPage() {
      let page = JSON.parse(sessionStorage.getItem("page"));
      this.$router.push(`/detile/reading/${this.cataList[page].text}`);
    },
    //立刻试读跳转
    go() {
      sessionStorage.setItem("page", 0);
      sessionStorage.setItem("new", this.cataList.length);
      this.$router.push(`/detile/reading/${this.cataList[0].text}`);
    },
    //获得小说详情页数据
    getDetileData() {
      this.$axios
        .get(
          `https://apis.netstart.cn/yunyuedu/book/getsub.json?id=${this.bookId}&title=${this.bookTitle}`
        )
        .then(({ data }) => {
          let datamode = data.feed.entry;
          this.dataList = {
            title: datamode.title,
            cover: datamode.link[1].href,
            author: datamode.author.name,
            summary: datamode.summary,
            lastPage: datamode["pris:book"].totalArticleCount[0],
            category: datamode["pris:book"].category,
            type: datamode["pris:book"].paydesc,
            state: datamode["pris:book"].state == 1 ? "连载中" : "完结",
            stateMode: datamode["pris:book"].state,
            words: Math.round(datamode["pris:book"].words / 10000) + "万字",
            wprice: datamode["pris:book"].wprice + "阅点/千字",
            // value: datamode["pris:ranking"].value,
            //<van-icon name="star"/>
            clicks: datamode["pris:subscribe"].clicksCount + "点击",
          };
          // console.log(data.feed.entry);
          for (let i = 0; i < datamode["pris:ranking"].value; i++) {
            this.startList.push('<van-icon name="star"/>');
          }
          // console.log(this.startList);
        });
    },
    //获得打赏列表数据
    getFanData() {
      this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/book/present/simple.json?id=13c58cc086f74e36978b4a7881b82517_4"
        )
        .then(({ data }) => {
          this.fanList = data.list;
          // console.log(this.fanList);
        });
    },
    //出来评分函数
    listvalue(v) {
      let sList = [];
      for (let i = 0; i < v; i++) {
        sList.push('<van-icon name="star"/>');
      }
      return sList;
    },
    //获得评论列表数据
    // 'https://apis.netstart.cn/yunyuedu/sns/comment/get.json?type=3&id=13c58cc086f74e36978b4a7881b82517_4&page=1'
    getCommentData() {
      this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId=13c58cc086f74e36978b4a7881b82517_4"
        )
        .then(({ data }) => {
          let comment = data.all.list;
          for (let i = 0; i < comment.length; i++) {
            let time = new Date(parseInt(comment[i].time));
            let month=parseInt(time.getMonth() + 1)<10 ? '0'+parseInt(time.getMonth() + 1) : parseInt(time.getMonth() + 1)
            let day=time.getDate()<10 ? '0'+time.getDate() : time.getDate()
            time =
              time.getFullYear() +
              "年" +
              month
               +
              "月" +
              day
               +
              "日";
            this.commentList.push({
              cover: comment[i].avatar,
              userId: comment[i].userId,
              author: comment[i].nickName,
              likes: comment[i].likes,
              grade: this.listvalue(comment[i].grade),
              time,
              comment: comment[i].comment,
              select: comment[i].select,
              replyCount: comment[i].replyCount,
              replyList: comment[i].replyList,
              level: "LV." + comment[i].userLevel,
            });

            // console.log(comment);
          }

          console.log(comment);
        });
    },
    //获得小说阅读数据
    getListData() {
      this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/book/catalog.json?tocId=13c58cc086f74e36978b4a7881b82517_4"
        )
        .then(({ data }) => {
          let listmode = data.ncx.navMap.navPoint;

          // console.log(listmode);

          for (let i = 0; i < listmode.length; i++) {
            if (listmode[i].navPoint) {
              let catamode = listmode[i].navPoint || "";
              let str = listmode[i].navLabel.replace(",", "");
              this.choseList.push({ label: str, itemList: [] });
              for (let x = 0; x < catamode.length; x++) {
                this.cataList.push({
                  text: catamode[x].id,
                  vip: catamode[x].vip,
                });
                let str1 = catamode[x].navLabel.replace(",", "");
                this.choseList[i].itemList.push({
                  text: str1,
                  vip: catamode[x].vip,
                });
                this.nameList.push(str1);
              }
            } else {
              console.log(1);
            }
          }
          // console.log(this.choseList);
        });
    },
    //获取粉丝榜数据
    getFanListData() {
      // https://apis.netstart.cn/yunyuedu/book/present/fans.json?id=13c58cc086f74e36978b4a7881b82517_4&rankType=0&offset=0
      this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/book/present/fans.json?id=13c58cc086f74e36978b4a7881b82517_4&rankType=0&offset=0"
        )
        .then(({ data: { list } }) => {
          this.fanBangList = list;
          // console.log(list);
        });
    },
    getId() {
      let {id,title} = this.$route.params;
      this.bookId = id
      this.bookTitle = title
    },
    //滚动加载数据
    fanbangLoad: debounce(function (e) {
      let countNum = 20 * this.addFan;
      let countScoll = Math.round(e.target.scrollTop + e.target.clientHeight);
      console.log(countScoll, e.target.scrollHeight);
      if (countScoll >= e.target.scrollHeight) {
        this.loadShow = true;
        clearTimeout(this.timer);
        this.timer = null;
        // console.log(1);
        this.$axios
          .get(
            `https://apis.netstart.cn/yunyuedu/book/present/fans.json?id=13c58cc086f74e36978b4a7881b82517_4&rankType=0&offset=${countNum}`
          )
          .then(({ data: { list } }) => {
            // console.log(list);
            if (list.length != 0) {
              this.timer = setTimeout(() => {
                this.loadShow = false;
                this.fanBangList.push(...list);
                this.addFan += 1;
                console.log(list, this.fanBangList);
              }, 500);
            } else {
              // console.log(1);
              this.loadShow = false;
              this.$toast("已经到底啦");
            }
          });
      }
    }, 500),
  },
  created() {
    this.getId();
    this.getDetileData();
    this.getListData();
    this.getCommentData();
    this.getFanData();
    this.getFanListData();
  },
};
</script>

<style lang="scss" scoped>
.detile {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .van-icon-star:before {
    color: rgb(233, 162, 29);
  }
  // padding: 20px;
  .detile-item {
    width: 100%;
    height: 60vh;
    padding: 20px 10px;

    .top {
      display: flex;
      font-size: 12px;
      .cover {
        width: 80px;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .message {
        padding-left: 20px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        color: #777;
        .title {
          font-size: 16px;
          color: black;
        }
        .category {
          display: flex;
          justify-content: flex-start;
          text-align: left;

          div {
            padding-left: 6px;
          }

          .author {
            color: rgb(55, 170, 220);
          }
        }

        .value {
          display: flex;
        }

        .word {
          width: 140px;
          display: flex;
        }
        .click {
          padding-left: 20px;
        }
      }
    }

    .summary {
      text-align: left;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
      line-height: 1.7;
    }
    .van-icon-arrow:before {
      padding-top: 40px;
    }
    .mulu-item {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgb(185, 180, 180, 0.3);
      padding-top: 10px;
      margin-top: 30px;

      .van-icon-coupon-o:before {
        line-height: 25px;
        padding-right: 15px;
        font-size: 20px;
      }

      .endWatch {
        display: flex;
      }

      .endShow {
        color: rgb(190, 102, 102);
        margin-right: 10px;
      }
    }
    .type {
      margin-top: 30px;
      font-size: 14px;
      color: #777;
    }
    .mulu-show {
      padding: 20px 10px;
      .middle {
        display: flex;
        .cover {
          width: 100px;
          height: 120px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          height: 80px;
          padding-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .title {
            font-size: 18px;
            color: black;
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 70px;
        line-height: 30px;
        // padding-top: 20px;
        // padding-bottom: 20px;
        padding: 20px;

        .reverse {
          position: relative;
        }

        .tranThree {
          position: absolute;
          // padding-left: 4px;
          right: -15px;
          top: 45%;
          // transform: translateY(50%);
          bottom: 0;
          width: 0;
          height: 0;
          border: grey;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          border-top: 8px solid grey;
          transition: all linear 0.4s;

          &.rotate {
            transform: rotate(180deg);
          }
        }
      }

      .chose {
        .label {
          margin-bottom: 20px;
          color: black;
          font-size: 18px;
        }
        .item-mulu {
          height: 80px;
          line-height: 40px;
          padding: 20px 10px 20px 40px;
          border-top: 1px dashed #777;
        }
      }
    }
  }

  .fan-item {
    width: 92vw;
    height: 80px;
    line-height: 95px;
    margin: 0 20px 0;
    border: 1px solid black;
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    // position: relative;
    // top: -20px;

    .user {
      display: flex;
      padding-left: 20px;
      .user-img {
        width: 30px;
        height: 30px;
        border-radius: 999px;

        img {
          height: 100%;
          width: 100%;
          border-radius: 999px;
        }
      }
    }
    .das {
      font-size: 20px;
      color: #777;
      line-height: 80px;
      padding-right: 50px;
    }
  }
  .fanbang-show {
    padding-top: 80px;
    .fan-top {
      position: fixed;
      top: 0;
      height: 80px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      line-height: 80px;
    }
  }
  .van-icon-cross:before {
    content: 0;
  }
  .fanbangAll {
    height: 100%;
    width: 100%;
    overflow: auto;
    // position: absolute;
    // top: 80px;
    .fanbang {
      display: flex;
      justify-content: space-between;
      height: 80px;
      border: 1px solid black;
      padding: 20px 20px 20px 10px;
      line-height: 40px;
      .fan-user {
        display: flex;
        justify-content: flex-start;
        width: 250px;
        .fan-img {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 3px solid #777;
          img {
            height: 100%;
            width: 100%;
            border-radius: 999px;
          }
        }
      }
      .fan-desc {
        display: flex;
        justify-content: space-around;
        width: 150px;
      }
    }
    .load {
      width: 100%;
      height: 60px;

      .van-loading {
        width: 70px;
        height: 60px;
        margin: 0 auto;
      }
    }
  }
  .desc-img {
    width: 100vw;
    // height: 100vh;
    img {
      width: 100%;
      // height: 100%;
    }
  }

  .comment-item {
    .comment {
      width: 100vw;
      height: 150px;
      border: 1px solid black;
      font-size: 15px;
      &.hasreplay {
        height: 200px;
      }
      .top {
        display: flex;
      }
      .img {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 999px;
        }
      }
      .com-top {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .top-like {
          display: flex;

          .author{
            color: rgb(15, 148, 179);
          }
          .level{
            padding: 2px;
            border-radius: 4px;
            color: red;
            font-size: 8px;
            border: 1px solid red;
          }

          .like{
            font-size: 15px;
            color: #777;
          }
        }

        .ground {
          display: flex;
        }

        .top-time {
          display: flex;
          font-size: 14px;
          .time{
            padding-left: 10px;
            color: #777;
            line-height: 15px;
          }
        }
      }

      .replyList {
        .toauthor {
          display: flex;
          color: #777;

          .todesc {
            padding: 0 10px;
            color: black;
          }

          .rep-comment{
            color: black;
          }
        }
      }
    }
  }
}
</style>