<template>
  <div class="home" ref="home" @mousewheel="watcht">
    <van-popup class="top-control" v-model="showAll" position="top" :overlay="false">
      <van-icon name="arrow-left" @click="routeback" />
      <div class="label" @click="catchThis">
        <van-icon name="label-o" v-show="this.catchFlag == false" />
        <van-icon name="label" v-show="this.catchFlag == true" />
      </div>
    </van-popup>

    <div class="text" ref="text" :style="{
      width: `calc((100%)*${renderList.length})`,
    }">
      <div class="content" :class="{ silde: silde == true, fade: fade == true }" :style="{ fontSize: fontChange }"
        ref="content" v-for="(r, i) in renderList" :key="r.id" @click="get(i, $event)">
        <van-skeleton title :row="3" :loading="loading">
          <div class="list" v-for="(p, j) in r.text" :key="j">
            <div class="item" v-if="p != ''">{{ p }}</div>
          </div>
          <div class="count" v-show="scoll != true">
            {{ i + 1 + "/" + renderList.length }}
          </div>
        </van-skeleton>
      </div>

      <van-popup v-model="showAll" position="bottom" :overlay="false">
        <!-- <div class="value">{{ value + "%" + changeValuePage }}</div> -->
        <div class="currentPage">{{ changeValuePage }}</div>
        <div class="progress">
          <div class="btnPre" @click="prevPage">
            <van-icon name="arrow-left" />
          </div>
          <van-slider v-model="value" @change="pageOnChange" @input="pageValueChange(value)" active-color="red" />
          <div class="btnNext" @click="nextPage">
            <van-icon name="arrow" />
          </div>
        </div>

        <div class="bottom-control">
          <van-cell is-link @click="showPopup">
            <van-icon name="orders-o" />目录
          </van-cell>
          <div class="show" @click="show = !show">
            <van-icon name="setting-o" /><span>设置</span>
          </div>
          <div class="night" @click="changeNight">
            <van-icon name="closed-eye" v-show="night == false" />
            <van-icon name="eye-o" v-show="night == true" /><span>{{ nightText }}</span>
          </div>
          <div class="more">
            <van-icon name="ellipsis" /><span>更多</span>
          </div>
        </div>

        <van-popup v-model="labelCover" class="labelshow" closeable :style="{ height: '100%', width: '100%' }"
          position="left">
          <div class="label-this" @click="labelToroute(labelShow.bookRouter)">
            {{ labelShow.name }}
          </div>
        </van-popup>
        <van-popup v-model="showPop" class="mulu" position="left" :style="{ height: '100%' }">
          <div class="mulu-item" v-show="muluFlag == false">
            <div class="middle">
              <div class="cover" @click="routeback">
                <img :src="cover" alt="" />
              </div>

              <div class="desc">
                <div class="title">{{ title }}</div>
                <div class="author" :style="{ color: '#888', fontStze: '14' }">
                  {{ author }}
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="total">{{ "共" + lastPage + "章" }}</div>
              <div class="reverse" @click="reverseed">
                {{ order }}
                <div class="tranThree" :class="{ rotate: reverse == true }"></div>
              </div>
            </div>
            <div class="chose" v-for="(l, i) in choseList" :key="i">
              <div class="label" v-if="l.label" @click="labelGo(i, l.label)">
                {{ l.label }}
              </div>
              <div class="choseItem" v-for="(t, n) in l.itemList" :key="n">
                <div class="item-mulu" @click.prevent="choseToRead(i, n)">
                  {{ t.text }}
                  <div class="lock" v-if="t.vip == 1">
                    <van-icon name="bag-o" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="shuqian-item" v-show="muluFlag == true">
            <div class="titl">书签</div>
            <div class="shuqian" v-for="(s, i) in shuqianList" :key="i" @click="catchGo(s.page)">
              {{ s.name }}
            </div>
          </div>
        </van-popup>

        <van-popup v-model="showPop" position="left" :overlay="false" class="chose-change">
          <div class="chose-item">
            <div class="chose-mulu" @click="muluFlag = false">目录</div>
            <div class="chose-shuqian" @click="showShuqian">书签</div>
          </div>
        </van-popup>

        <van-popup class="setting" v-model="show" position="bottom" :overlay="false">
          <div class="title-list">
            <span class="title">字号</span>
            <div class="title">主题</div>
            <span class="title">翻页</span>
          </div>
          <div class="change">
            <div class="font-change">
              <van-slider class="font" v-model="fontSize" @change="textOnChange" :step="20" />
            </div>
            <div class="color-change" @click="changeColor($event)">
              <div class="colorBoxYrgb(203, 212, 209)" :style="{
                backgroundColor: 'rgb(203, 212, 209)',
                width: '80px',
                height: '50px',
              }"></div>
              <div class="colorBoxYrgb(207, 207, 182)" :style="{
                backgroundColor: 'rgb(207, 207, 182)',
                width: '80px',
                height: '50px',
              }"></div>
              <div class="colorBoxYrgb(142, 190, 158)" :style="{
                backgroundColor: 'rgb(142, 190, 158)',
                width: '80px',
                height: '50px',
              }"></div>
              <div class="colorBoxYrgb(53, 57, 56)" :style="{
                backgroundColor: 'rgb(53, 57, 56)',
                width: '80px',
                height: '50px',
              }"></div>
            </div>
            <div class="read-change">
              <div class="silde" :class="{ active: silde == true }" @click="black">
                滑动
              </div>
              <div class="fade" :class="{ active: fade == true }" @click="faded">
                无
              </div>
              <div class="scoll" :class="{ active: scoll == true }" @click="scolld">
                卷轴
              </div>
            </div>
          </div>
        </van-popup>
      </van-popup>
    </div>

    <!-- <button @click="PageList">1111111111111</button> -->
  </div>
</template>

<script>
// import $ from "jquery";
// import {turn} from '../utils/turn.js'
export default {
  data() {
    return {
      content: null,
      index: 0,
      nextIndex: 0,
      arrNum: 1,
      count: 0,
      renderList: [],
      str5: [],
      fontSize: 20,
      heightList: [],
      textList: [],
      padtop: 55,
      silde: false,
      show: false,
      fade: true,
      filter: 0,
      timer: null,
      showPop: false,
      scoll: false,
      scrollTop: 0,
      scollShowPage: 0,
      value: 1,
      changeValuePage: null,
      showAll: false,
      reverse: false,
      order: "倒序",
      nightText: "夜间",
      night: false,
      muluFlag: false,
      shuqianList: [],
      catchFlag: false,
      labelShow: {},
      labelCover: false,
      loading: true,
    };
  },

  props: {
    pageNum: Number,
    choseList: Array,
    nameList: Array,
    cover: String,
    author: String,
    title: String,
    lastPage: String,
  },

  computed: {
    //字体大小
    fontChange() {
      return JSON.parse(sessionStorage.getItem("fontsize")) + "px";
    },
    viewHeight() {
      return document.body.offsetHeight;
    },
    viewWidth() {
      return document.body.offsetWidth;
    },
    textId() {
      let tid = this.$route.params.id;
      tid = tid.replace(".html", "");
      return tid;
    },
    bookId() {
      return this.$route.params.bookid;
    },
    bookTitle() {
      return this.$route.params.title;
    },
  },

  methods: {
    //展示书签页
    showShuqian() {
      this.muluFlag = true;
      this.shuqianList = [];
      let catchList = localStorage.catchList
        ? JSON.parse(localStorage.catchList)
        : [];
      for (let i = 0; i < catchList.length; i++) {
        if (catchList[i].bookId == this.bookId) {
          // console.log(1);
          this.shuqianList.push(catchList[i]);
        }
      }
      // console.log(this.shuqianList);
    },
    //跳转至第一页
    labelToroute(route) {
      sessionStorage.setItem("page", route);
      this.$emit("goPage", route);
      this.$router.go(0);
    },
    //点击总章节名出现跳转
    labelGo(i, name) {
      // console.log(this.choseList[i].itemList[0]);
      let labelToRoute = 0;
      if (i == 0) {
        labelToRoute = 0;
      } else {
        for (let x = 0; x < i; x++) {
          labelToRoute += this.choseList[x].itemList.length;
        }
        labelToRoute += 1;
      }

      this.labelShow = {
        name: name,
        bookRouter: labelToRoute,
        vip: this.choseList[i].itemList[0].vip,
      };
      this.labelCover = true;
      this.showPop = false;
    },
    //初始化字体颜色
    changeInitCr() {
      let nightFlag = JSON.parse(sessionStorage.getItem("night"));
      let fontColor = null;

      if (nightFlag == 1) {
        fontColor = "#fff";
      } else {
        let backgroundColor = sessionStorage.backgroundColor
          ? JSON.parse(sessionStorage.backgroundColor)
          : {};
        fontColor = backgroundColor.fontColor;
      }

      this.$refs.text.style.color = fontColor;
    },
    //进入页面初始化背景颜色
    changeInitBcg() {
      let nightFlag = JSON.parse(sessionStorage.getItem("night"));
      let color = null;
      if (nightFlag == 1) {
        color = "rgb(53, 57, 56)";
        this.nightText = "日间";
        this.night = true;
      } else {
        // console.log(1);
        let backgroundColor = sessionStorage.backgroundColor
          ? JSON.parse(sessionStorage.backgroundColor)
          : {};
        color = backgroundColor.color;
      }
      this.$refs.text.style.backgroundColor = color;
    },
    //点击收藏进入对应章节
    catchGo(page) {
      sessionStorage.setItem("page", page);
      this.$emit("goPage", page);
      this.$router.go(0);
    },
    //进入页面更新收藏状态
    catchChange() {
      let catchList = localStorage.catchList
        ? JSON.parse(localStorage.catchList)
        : [];
      this.shuqianList.push(...catchList);
      let result = catchList.find((c) => c.link == this.textId);
      if (!result) {
        this.catchFlag = false;
      } else {
        this.catchFlag = true;
      }
      //  console.log(this.shuqianList);
    },
    //点击收藏
    catchThis() {
      // this.catchFlag = !this.catchFlag;
      let textNum = JSON.parse(sessionStorage.getItem("page"));
      // console.log(this.textId);
      let catchList = localStorage.catchList
        ? JSON.parse(localStorage.catchList)
        : [];
      let result = catchList.find((c) => c.link == this.textId);
      // console.log(result);
      if (!result) {
        localStorage.catchList = JSON.stringify([
          ...catchList,
          {
            bookId: this.bookId,
            name: this.nameList[textNum],
            link: this.textId,
            time: new Date().getTime(),
            page: textNum,
          },
        ]);
        this.catchFlag = true;
      } else {
        let newlist = catchList.filter((c) => c.link != this.textId);
        localStorage.catchList = JSON.stringify(newlist);
        this.catchFlag = false;
        this.shuqianList = this.shuqianList.filter(
          (c) => c.link != this.textId
        );
      }
      // console.log(this.shuqianList);
    },
    //点击返回
    routeback() {
      this.$router.push(`/detile/${this.bookId}/${this.bookTitle}`);
    },
    //点击切换日/夜间模式
    changeNight() {
      this.night = !this.night;
      console.log(this.night);
      let color = null;
      let fontColor = null;
      let backgroundColor = sessionStorage.backgroundColor
        ? JSON.parse(sessionStorage.backgroundColor)
        : {};
      color = backgroundColor.color;
      fontColor = backgroundColor.fontColor;
      if (this.night == true) {
        this.nightText = "日间";
        sessionStorage.setItem("night", 1);

        for (let x = 0; x < this.$refs.content.length; x++) {
          this.$refs.content[x].style.color = "#fff";
          this.$refs.content[x].style.backgroundColor = "rgb(53, 57, 56)";
        }
        sessionStorage.backgroundColor = JSON.stringify({
          color: "rgb(53, 57, 56)",
          fontColor: "#fff"
        });
      } else {
        this.nightText = "夜间";
        sessionStorage.setItem("night", 0);
        // this.$refs.text.style.color = "black";
        if (color == "rgb(53, 57, 56)") {

          for (let x = 0; x < this.$refs.content.length; x++) {
            this.$refs.content[x].style.color = "black";
            this.$refs.content[x].style.backgroundColor = "rgb(203, 212, 209)";
          }
          sessionStorage.backgroundColor = JSON.stringify({
            color: "rgb(203, 212, 209)",
            fontColor: "black",
          });
        } else {
          for (let x = 0; x < this.$refs.content.length; x++) {
            this.$refs.content[x].style.backgroundColor = color;
            this.$refs.content[x].style.color = fontColor
          }

        }
      }
    },
    //点击修改主题颜色
    changeColor(e) {
      if (e.target.className.split("Y")[0] == "colorBox") {
        for (let i = 0; i < this.$refs.content.length; i++) {
          this.$refs.content[i].style.backgroundColor =
            e.target.className.split("Y")[1];
          this.$refs.content[i].style.color =
            e.target.className.split("Y")[1] == "rgb(53, 57, 56)"
              ? "#fff"
              : "black";
        }
        // console.log( this.$refs.text.style.backgroundColor);
        // console.log(this.bcg,color);
        if (e.target.className.split("Y")[1] == "rgb(53, 57, 56)") {
          this.night = true;
          this.nightText = "日间";
          sessionStorage.setItem("night", 1);
        } else {
          this.night = false;
          this.nightText = "夜间";
          sessionStorage.setItem("night", 0);
        }
        sessionStorage.backgroundColor = JSON.stringify({
          color: e.target.className.split("Y")[1],
          fontColor:
            e.target.className.split("Y")[1] == "rgb(53, 57, 56)"
              ? "#fff"
              : "black",
        });
      }
    },
    //点击倒顺序
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
    //修改当前章节名称
    pageValueChange(value) {
      let pageCount = JSON.parse(sessionStorage.getItem("new"));
      let getValue = Math.round((value * pageCount) / 100);
      if (getValue > 0) {
        this.changeValuePage = this.nameList[getValue - 1];
      } else {
        this.changeValuePage = this.nameList[getValue];
      }

      //  console.log(this.nameList[getValue-1],this.nameList,getValue);
    },
    //刷新修改字体
    textOnChange(fontSize) {
      if (fontSize <= 20) {
        for (let x = 0; x < this.$refs.content.length; x++) {
          this.$refs.content[x].style.fontSize = `12px`;
          sessionStorage.setItem("fontsize", 12);
          this.$router.go(0);
        }
        // console.log(1);
      }
      if (20 < fontSize && fontSize <= 40) {
        for (let x = 0; x < this.$refs.content.length; x++) {
          this.$refs.content[x].style.fontSize = `14px`;
          sessionStorage.setItem("fontsize", 14);
          this.$router.go(0);
        }
        // console.log(2);
      }
      if (40 < fontSize && fontSize <= 60) {
        for (let x = 0; x < this.$refs.content.length; x++) {
          this.$refs.content[x].style.fontSize = `16px`;
          sessionStorage.setItem("fontsize", 16);
          this.$router.go(0);
        }
        // console.log(3);
      }
      if (60 < fontSize && fontSize <= 80) {
        for (let x = 0; x < this.$refs.content.length; x++) {
          this.$refs.content[x].style.fontSize = `18px`;
          sessionStorage.setItem("fontsize", 18);
          this.$router.go(0);
        }
        // console.log(4);
      }
      if (80 < fontSize && fontSize <= 100) {
        for (let x = 0; x < this.$refs.content.length; x++) {
          this.$refs.content[x].style.fontSize = `20px`;
          sessionStorage.setItem("fontsize", 20);
          this.$router.go(0);
        }
        // console.log(5);
      }
    },
    //点击加载上一章
    prevPage() {
      let page = JSON.parse(sessionStorage.getItem("page"));
      if (page <= 0) {
        this.$toast("到开头了");
      } else {
        sessionStorage.setItem("page", page - 1);
        this.$emit("goPage");
        this.$router.go(0);
      }
    },
    //点击加载下一章
    nextPage() {
      let page = JSON.parse(sessionStorage.getItem("page"));
      let pageCount = JSON.parse(sessionStorage.getItem("new"));
      if (page == pageCount) {
        this.$toast("到结尾了");
      } else {
        sessionStorage.setItem("page", page + 1);
        this.$emit("goPage");
        this.$router.go(0);
      }
    },
    //进入页面修改章节进度滑块的值
    getPagevalue() {
      let value = JSON.parse(sessionStorage.getItem("page"));
      let pageCount = JSON.parse(sessionStorage.getItem("new"));
      let getValue = (value * 100) / pageCount;
      getValue = Math.round(getValue);
      this.value = getValue;
      this.changeValuePage = this.nameList[value];
      // console.log(this.changeValuePage, value, this.nameList[value]);
    },
    //进入页面修改字体滑块的值
    getTextvalue() {
      let value = JSON.parse(sessionStorage.getItem("fontsize"));
      if (!value) {
        this.fontSize = 20;
      } else {
        let getValue = (value - 12 + 2) * 10;
        this.fontSize = getValue;
      }

      // console.log(this.fontSize, getValue);
    },
    //滑动滑块以跳至指定章节
    pageOnChange(value) {
      let pageCount = JSON.parse(sessionStorage.getItem("new"));
      let changeValue = Math.round((value * pageCount) / 100);
      sessionStorage.setItem("page", changeValue);
      this.$emit("goPage");
      this.$router.go(0);
    },
    //点击目录跳至指定章节
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
        sessionStorage.setItem("page", pageChose);
        this.$emit("goPage", pageChose);
        this.$router.go(0);
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
        sessionStorage.setItem("page", pageChange - 1);
        this.$emit("goPage");
        this.$router.go(0);
      }
    },
    //点击显示目录
    showPopup() {
      this.showPop = true;
      this.muluFlag = false;
    },
    //鼠标滚动监听滚动条顶部距离
    watcht() {
      this.scrollTop = this.$refs.home.scrollTop;
    },
    //点击切换淡入淡出
    faded() {
      this.$refs.home.style.overflow = "hidden";
      this.$refs.text.style.display = "flex";
      this.silde = false;
      this.fade = true;
      this.scoll = false;
      let fontColor = null
      let backgroundColor = sessionStorage.backgroundColor
        ? JSON.parse(sessionStorage.backgroundColor)
        : 'px';
      if (backgroundColor == 'px') {
        fontColor = 'black'
      } else {
        fontColor = backgroundColor.fontColor;
      }
      for (let x = 0; x < this.$refs.content.length; x++) {
        this.$refs.content[x].style.color = fontColor;
      }

      if (this.scrollTop != 0) {
        let showPage = Math.round(this.scrollTop / this.viewHeight);
        this.scollShowPage = showPage;
        this.$refs.content[showPage].style.transform = `translateX(-${showPage * 100
          }%)`;
        let zeroFilter = showPage == 0 ? 0 : showPage - 1;
        this.$refs.content[zeroFilter].style.transform = `translateX(-${showPage * 100
          }%)`;
        for (let x = showPage - 2; x >= 0; x--) {
          if (x > 0) {
            this.$refs.content[x].style.transform = `translateX(-${(x + 1) * 100
              }%)`;
          } else {
            this.$refs.content[x].style.transform = `translateX(-${100}%)`;
          }
        }
      }
    },
    //点击切换卷轴模式
    scolld() {
      this.silde = false;
      this.fade = false;
      this.scoll = true;
      this.$refs.home.style.overflowY = "auto";
      this.$refs.text.style.display = "block";
      let fontColor = null
      let backgroundColor = sessionStorage.backgroundColor
        ? JSON.parse(sessionStorage.backgroundColor)
        : 'px';
      if (backgroundColor == 'px') {
        fontColor = 'black'
      } else {
        fontColor = backgroundColor.fontColor;
      }
      // console.log("sct" + this.scollShowPage);


      if (this.scollShowPage <= 1) {
        this.$refs.home.scrollTop = this.scollShowPage * this.viewHeight;
      } else {
        // console.log(131);
        this.$refs.home.scrollTop = this.scollShowPage * this.viewHeight;
      }

      for (let x = 0; x < this.$refs.content.length; x++) {
        this.$refs.content[x].style.color = fontColor;
        this.$refs.content[x].style.transform = `translateX(0)`;
      }
    },
    //点击切换滑动模式
    black() {
      this.$refs.home.style.overflow = "hidden";
      this.$refs.text.style.display = "flex";
      let fontColor = null
      let backgroundColor = sessionStorage.backgroundColor
        ? JSON.parse(sessionStorage.backgroundColor)
        : 'px';
      if (backgroundColor == 'px') {
        fontColor = 'black'
      } else {
        fontColor = backgroundColor.fontColor;
      }
      for (let x = 0; x < this.$refs.content.length; x++) {
        this.$refs.content[x].style.color = fontColor;
      }
      this.scoll = false;
      this.silde = true;
      this.fade = false;
      if (this.scrollTop != 0) {
        let showPage = Math.round(this.scrollTop / this.viewHeight);
        // console.log(showPage);
        this.scollShowPage = showPage;

        this.$refs.content[showPage].style.transform = `translateX(-${showPage * 100
          }%)`;
        let zeroFilter = showPage == 0 ? 0 : showPage - 1;
        this.$refs.content[zeroFilter].style.transform = `translateX(-${showPage * 100
          }%)`;
        for (let x = showPage - 2; x >= 0; x--) {
          if (x > 0) {
            this.$refs.content[x].style.transform = `translateX(-${(x + 1) * 100
              }%)`;
          } else {
            this.$refs.content[x].style.transform = `translateX(-${100}%)`;
          }
        }
      }
    },
    //点击切换下一页/章与上一页/章
    get(i, e) {
      this.show = false;

      let page = JSON.parse(sessionStorage.getItem("page"));
      let newpage = JSON.parse(sessionStorage.getItem("new"));
      // console.log(e.offsetX, this.viewWidth / 2);
      // //滑动判断
      let fontColor = null
      let backgroundColor = sessionStorage.backgroundColor
        ? JSON.parse(sessionStorage.backgroundColor)
        : 'px';
      if (backgroundColor == 'px') {
        fontColor = 'black'
      } else {
        fontColor = backgroundColor.fontColor;
      }

      if (this.silde == true) {
        if (e.offsetX > this.viewWidth / 2 + 120) {
          let x = 100 * (i + 1);
          this.showAll = false;
          this.scollShowPage = i + 1;
          // console.log('ri' + this.scollShowPage);
          if (i >= this.renderList.length - 1) {
            let gopage = page + 1;
            if (gopage >= newpage) {
              this.$toast("到结尾了");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("goPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.transform = `translateX(-${x}%)`;
            this.$refs.content[i + 1].style.transform = `translateX(-${x}%)`;
          }
        } else if (e.offsetX < this.viewWidth / 2 - 120) {
          this.showAll = false;
          let x = 100 * (i - 1);
          this.scollShowPage = i - 1;
          //  console.log('li' + this.scollShowPage);
          if (i == 0) {
            let gopage = page - 1;
            if (gopage < 0) {
              this.$toast("到开头了");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("goPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.transform = `translateX(-${x}%)`;
            this.$refs.content[i - 1].style.transform = `translateX(-${x}%)`;
          }
        } else if (
          e.offsetX > this.viewWidth / 2 - 120 &&
          e.offsetX < this.viewWidth / 2 + 120
        ) {
          this.showAll = !this.showAll;
        }
      }
      //淡入淡出判断
      if (this.fade == true) {
        if (e.offsetX > this.viewWidth / 2 + 120) {
          this.showAll = false;
          this.scollShowPage = i + 1;
          let x = 100 * (i + 1);
          if (i >= this.renderList.length - 1) {
            let gopage = page + 1;
            if (gopage >= newpage) {
              this.$toast("到结尾了");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("goPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.color = `transparent`;
            this.$refs.content[i + 1].style.color = `transparent`;
            this.timer = setTimeout(() => {
              this.$refs.content[i].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i + 1].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i + 1].style.color = fontColor;
            }, 500);
          }
        } else if (e.offsetX < this.viewWidth / 2 - 120) {
          this.showAll = false;
          let x = 100 * (i - 1);
          this.scollShowPage = i - 1;
          if (i == 0) {
            let gopage = page - 1;
            if (gopage < 0) {
              this.$toast("到开头了");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("goPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.color = `transparent`;
            this.$refs.content[i - 1].style.color = `transparent`;
            this.timer = setTimeout(() => {
              this.$refs.content[i].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i - 1].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i - 1].style.color = fontColor;
            }, 500);
          }
        } else if (
          e.offsetX > this.viewWidth / 2 - 120 &&
          e.offsetX < this.viewWidth / 2 + 120
        ) {
          this.showAll = !this.showAll;
        }
      }
      //滚动判断
      if (this.scoll == true) {
        this.showAll = !this.showAll;
      }
    },
    //替换字符串并生成原始文本数组对象
    replaceText(replacesize) {
      let str2 = this.content.replace(/(<([^>]+)>)/gi, "</p>");
      let str3 = str2.replace(/\n/gi, "");
      let str4 = str3.replace(/\t/gi, "");
      this.str5 = str4.split("</p>");
      // console.log(this.str5);
      this.str5.forEach((i, x) => {
        if (i != "") {
          this.heightList.push({
            width: i.length * replacesize,
            height:
              x == 0
                ? Math.ceil((i.length * replacesize) / this.viewWidth) *
                replacesize *
                2
                : Math.ceil((i.length * replacesize) / this.viewWidth) *
                replacesize,
          });
          this.textList.push(i);
        }
      });
      // console.log(this.heightList);
    },
    //将原始文本数组替换为自动排版数组
    PageList() {
      for (; ;) {
        for (let i = this.index; i < this.heightList.length; i++) {
          this.count += this.heightList[i].height + this.padtop;
          if (this.count > this.viewHeight * this.arrNum) {
            // console.log(this.count,this.heightList[i].height + this.padtop);
            this.nextIndex = i;
            break;
          }
        }

        if (this.index == this.nextIndex) {
          this.renderList.push({
            id: new Date().getTime() * Math.random(),
            text: this.textList.slice(this.nextIndex, this.textList.length),
          });
          break;
        } else {
          this.renderList.push({
            id: new Date().getTime() * Math.random(),
            text: this.textList.slice(this.index, this.nextIndex),
          });
        }
        // console.log(this.renderList);
        this.index = this.nextIndex;
        this.arrNum = this.arrNum + 1;
      }
    },
    //网络请求与相关页面设置
    getData() {
      this.$axios
        .get(
          `https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${this.bookId}&content_uuid=${this.textId}`
          // "/content.json"
          // 'https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=dddfca325d0e40169a2f6144441186e4_4&content_uuid=6a658dc7a86f41dda2364ddddce68f2c_4'
        )
        .then(({ data }) => {
          // console.log(data);
          // console.log( this.$route);
          this.loading = false;
          this.content = data.data.content;
          let fontsize = JSON.parse(sessionStorage.getItem("fontsize"));
          if (!fontsize) {
            this.replaceText(12);
          } else {
            this.replaceText(fontsize);
          }
          // console.log(data);
          this.PageList();
          this.getPagevalue();
          this.getTextvalue();
          this.catchChange();
          this.changeInitBcg();
          this.changeInitCr();
        });
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" >
.home {
  width: 100%;
  height: 100%;
  position: fixed;
  // position: a;
  top: 0;
  overflow: hidden;
  // overflow: auto;

  background-color: rgb(203, 208, 212);
  z-index: 999;

  .top-control {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    position: fixed;
    top: 0;
    height: 80px;
    font-size: 23px;

    // line-height: 40px;
    .van-icon {
      position: relative;
      top: 10px;
    }

    .label {
      margin-right: 20px;
    }
  }
}

.text {
  height: 100vh;
  // ;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 12px;

  .content {
    width: 100vw;
    height: 100vh;
    // transform: translateX(-10%);
    overflow: hidden;
    position: relative;

    &.silde {
      transition: all 0.3s linear;
    }

    &.fade {
      transition: color 0.5s linear;
    }

    .item {
      padding: 15px 10px;
      text-indent: 25px;
      line-height: 1.2;
    }

    &:nth-child(1) {
      .list {
        &:nth-child(1) {
          font-size: 24px;
          font-weight: 700;
          padding-right: 30px;
          text-align: center;
        }
      }
    }

    .count {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 20px;
    }
  }

  .van-popup {
    position: fixed;
    height: 200px;
    bottom: 0;
    color: #777;

    .van-cell__value--alone {
      color: #777;
      position: absolute;
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
    }

    .bottom-control {
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 0;

      .van-cell {
        flex: 1;

        .van-icon-arrow:before {
          content: "";
        }
      }

      div {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        vertical-align: bottom;
        flex: 1;
        padding: 10px 16px;
        font-size: 14px;
      }

      span {
        display: inline-block;
        width: 99px;
        height: 24px;
        margin-top: 5px;
        padding-left: 5px;
      }
    }

    .currentPage {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
    }

    .progress {
      display: flex;
      position: absolute;
      top: 30%;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 5%;

      .van-slider {
        position: relative;
        flex: 1;
        top: 50%;
        padding-left: 5px;
      }

      .btnPre {
        width: 60px;
        text-align: center;
        font-size: 18px;
        padding-right: 10px;
      }

      .btnNext {
        width: 60px;
        text-align: center;
        font-size: 18px;
        padding-left: 10px;
      }
    }

    .setting {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 18px;
      width: 100vw;

      .title-list {
        flex: 0 0 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .change {
        flex: 0 0 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .read-change,
        .color-change {
          display: flex;
          justify-content: space-around;
        }

        .read-change {
          height: 40px;
          border-right: 10px;
          // border-right: 1px solid grey;

          div {
            flex: 1;
            text-align: center;
            line-height: 40px;
            border: 1px solid grey;
            border-radius: 20px;

            &.active {
              border: 3px solid grey;
              color: white;
              background-color: rgb(59, 57, 57);
            }
          }
        }

        .font {
          width: 90%;
        }
      }
    }

    .mulu {
      padding: 20px 20px;
      width: 80%;
      font-size: 16px;

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
        padding-top: 20px;
        padding-bottom: 20px;

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

      .shuqian-item {
        .titl {
          width: 100%;
          border-bottom: 1px solid rgb(156, 144, 144, 0.3);
          text-align: center;
          padding-bottom: 10px;
          font-size: 20px;
          color: black;
        }

        .shuqian {
          height: 70px;
          border-bottom: 1px solid #777;
          line-height: 70px;
          padding-bottom: 8px;
        }
      }
    }
  }

  .chose-change {
    position: absolute;
    bottom: -100px;
    height: 100px;
    background-color: rgb(75, 66, 66);
    border-radius: 10px;
    width: 10%;

    .chose-item {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 18px;
      text-align: center;
      color: aliceblue;
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
      color: #999;
      display: flex;
      justify-content: space-between;
    }
  }

  .label-this {
    width: 100%;
    height: 80px;
    font-size: 20px;
    color: black;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    // border: 1px solid black;
    line-height: 80px;
    text-align: center;
    background: rgb(45, 143, 224);
  }
}

@keyframes flip-to-left {
  from {
    transform: rotateY(0);
  }

  to {
    transform: rotateY(-180deg);
  }
}
</style>
