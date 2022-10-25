<template>
  <div class="home" ref="home">
    <div
      class="text"
      ref="text"
      :style="{ width: `calc((100%)*${renderList.length})` }"
    >
      <div
        class="content"
        :class="{ silde: silde == true, fade: fade == true }"
        ref="content"
        v-for="(r, i) in renderList"
        :key="r.id"
        @click="get(i, $event)"
      >
        <div class="list" v-for="(p, j) in r.text" :key="j">
          <div class="item" v-if="p != ''">{{ p }}</div>
        </div>
      </div>

      <van-cell is-link @click="showPopup">展示弹出层</van-cell>
      <van-popup v-model="showPop" position="left" :style="{ height: '100%' }">
        <div class="chose" v-for="(l, i) in choseList" :key="i">
          <div class="label">{{ l.label }}</div>
          <div class="choseItem" v-for="(t, n) in l.itemList" :key="n">
            <div class="item-mulu" @click.prevent="choseToRead(i, n)">{{ t.text }}</div>
          </div>
        </div>
      </van-popup>

      <div class="control">
        <div class="show" @click="show = !show">设置</div>
        <div class="change" v-show="show">
          <div class="silde" @click="black">滑动</div>
          <div
            class="fade"
            @click="
              fade = true;
              silde = false;
            "
          >
            无
          </div>
        </div>
      </div>
    </div>

    <!-- <button @click="PageList">1111111111111</button> -->
  </div>
</template>

<script>
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
      fontSize: 12,
      heightList: [],
      textList: [],
      padtop: 40,
      silde: false,
      show: false,
      fade: true,
      filter: 0,
      timer: null,
      showPop: false,
    };
  },

  props: {
    pageNum: Number,
    choseList: Array,
  },

  computed: {
    viewHeight() {
      return document.body.offsetHeight;
    },
    viewWidth() {
      return document.body.offsetWidth;
    },
    textId() {
      return this.$route.params.id;
    },
  },

  methods: {
    choseToRead(i, n) {
      let pageChose=0
      if (i == 0) {
        pageChose = n;
      } else {
        for (let x = 0; x < i; x++) {
          pageChose+= this.choseList[x].itemList.length;
          // console.log(pageChose,i,n,x);
        }
        pageChose+=n
      }
      // console.log(pageChose);
      sessionStorage.setItem("page", pageChose);
      this.$emit('goChose',pageChose)
      this.$router.go(0);
    },
    showPopup() {
      this.showPop = true;
    },
    black() {
      for (let x = 0; x < this.$refs.content.length; x++) {
        this.$refs.content[x].style.color = "black";

        this.silde = true;
        this.fade = false;
      }
    },
    get(i, e) {
      let page = JSON.parse(sessionStorage.getItem("page"));
      let newpage = JSON.parse(sessionStorage.getItem("new"));
      if (this.silde == true) {
        if (e.offsetX > this.viewWidth / 2) {
          let x = 100 * (i + 1);
          if (i >= this.renderList.length - 1) {
            let gopage = page + 1;
            if (gopage >= newpage) {
              alert("结尾");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("nextPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.transform = `translateX(-${x}%)`;
            this.$refs.content[i + 1].style.transform = `translateX(-${x}%)`;
          }
        } else {
          let x = 100 * (i - 1);
          if (i == 0) {
            let gopage = page - 1;
            if (gopage < 0) {
              alert("开头");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("returnPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.transform = `translateX(-${x}%)`;
            this.$refs.content[i - 1].style.transform = `translateX(-${x}%)`;
          }
        }
      }
      if (this.fade == true) {
        if (e.offsetX > this.viewWidth / 2) {
          let x = 100 * (i + 1);
          if (i >= this.renderList.length - 1) {
            let gopage = page + 1;
            if (gopage >= newpage) {
              alert("结尾");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("nextPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.color = `transparent`;
            this.$refs.content[i + 1].style.color = `transparent`;
            this.timer = setTimeout(() => {
              this.$refs.content[i].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i + 1].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i + 1].style.color = `black`;
            }, 500);
            // this.$refs.content[i + 1].style.opacity = `1`;
          }
        } else {
          let x = 100 * (i - 1);
          if (i == 0) {
            let gopage = page - 1;
            if (gopage < 0) {
              alert("开头");
            } else {
              sessionStorage.setItem("page", gopage);
              this.$emit("returnPage");
              this.$router.go(0);
            }
          } else {
            this.$refs.content[i].style.color = `transparent`;
            this.$refs.content[i - 1].style.color = `transparent`;
            this.timer = setTimeout(() => {
              this.$refs.content[i].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i - 1].style.transform = `translateX(-${x}%)`;
              this.$refs.content[i - 1].style.color = `black`;
            }, 500);
          }
        }
      }
    },
    replaceText() {
      let str = this.content.replace(
        /<div class="g-book"><div class="m-mb"><div class="m-content">/g,
        ""
      );
      let str1 = str.replace(/<h1><span>/g, "<p>");
      let str2 = str1.replace(/<\/span><\/h1>/g, "</p>");
      let str3 = str2.replace(/<p>/g, "");
      let str4 = str3.replace(
        /<div id="book-bottom"><\/div><\/div><\/div><\/div>/g,
        ""
      );
      this.str5 = str4.split("</p>");
      // console.log(this.str5);
      this.str5.forEach((i, x) => {
        if (i != "") {
          this.heightList.push({
            width: i.length * this.fontSize,
            height:
              x == 0
                ? Math.ceil((i.length * this.fontSize) / this.viewWidth) *
                  this.fontSize *
                  2
                : Math.ceil((i.length * this.fontSize) / this.viewWidth) *
                  this.fontSize,
          });
          this.textList.push(i);
        }
      });
    },

    PageList() {
      for (;;) {
        for (let i = this.index; i < this.heightList.length; i++) {
          this.count += this.heightList[i].height + this.padtop;
          if (this.count >= this.viewHeight * this.arrNum) {
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

    getData() {
      this.$axios
        .get(
          `https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=13c58cc086f74e36978b4a7881b82517_4&content_uuid=${this.textId}`
        )
        .then(({ data }) => {
          this.content = data.data.content;
          this.replaceText();
          this.PageList();
          // console.log(this.renderList);
          // console.log(this.pageNum);
          // console.log(this.heightList,this.viewWidth);
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
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
  background-color: #fff;
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
    &.silde {
      transition: all 0.3s linear;
    }
    &.fade {
      transition: color 0.5s linear;
    }
    .item {
      padding: 20px 10px;
    }
    &:nth-child(1) {
      .list {
        &:nth-child(1) {
          font-size: 24px;
          font-weight: 700;
        }
      }
    }
  }

  .move {
    position: absolute;
    left: 0;
  }

  // .fade-enter,
  // .fade-leave-to {
  //   opacity: 0;
  // }
  // .fade-enter-to,
  // .fade-leave {
  //   opacity: 1;
  // }

  // .fade-enter-active,
  // .fade-leave-active {
  //   transition: all 0.3s;
  // }
  .control {
    position: absolute;
    bottom: 0;
  }

  .van-cell--clickable {
    width: 150px;
    position: absolute;
    bottom: 0;
    left: 400px;
  }

  .chose {
    .item-mulu {
      height: 40px;
      line-height: 40px;
      margin-top: 20px;
      border: 1px solid black;
    }
  }
}
</style>
