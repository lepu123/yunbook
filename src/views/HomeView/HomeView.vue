<template>
  <div class="home">
    主页
<!--    <div class="text">-->
<!--      <div-->
<!--        ref="content"-->
<!--        class="content"-->
<!--        v-html="content"-->
<!--        @click="PageList"-->
<!--      ></div>-->
<!--      <div-->
<!--        class="content"-->
<!--        v-for="(r, i) in renderList"-->
<!--        :key="i"-->
<!--        v-show="i != 0"-->
<!--      >-->
<!--        <div class="list" v-for="(p, i) in r" :key="i" v-show="i != 0">-->
<!--          {{ p }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <!-- <button @click="PageList">1111111111111</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: null,
      // itemList:[],
      index: 0,
      nextIndex: 0,
      arrNum: 1,
      count: 0,
      renderList: [],
      str5: [],
      fontSize: 12,
      heightList: [],
      textList: [],
    };
  },

  computed: {
    viewHeight() {
      return this.$refs.content.offsetHeight;
    },
    viewWidth() {
      return this.$refs.content.offsetWidth;
    },
  },

  methods: {
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
      this.str5.forEach((i) => {
        this.heightList.push({
          width: i.length * this.fontSize,
          height:
            Math.ceil((i.length * this.fontSize) / this.viewWidth) *
            this.fontSize,
        });
        this.textList.push(i);
      });
    },

    PageList() {
      for (;;) {
        for (let i = this.index; i < this.heightList.length; i++) {
          this.count += this.heightList[i].height + 40;
          if (this.count >= this.viewHeight * this.arrNum) {
            this.nextIndex = i;
            break;
          }
        }

        if (this.index == this.nextIndex) {
          this.renderList.push(
            this.textList.slice(this.nextIndex, this.textList.length)
          );
          break;
        } else {
          this.renderList.push(this.textList.slice(this.index, this.nextIndex));
        }
        //  console.log(this.renderList);
        this.index = this.nextIndex;
        this.arrNum = this.arrNum + 1;
      }
    },
    get() {
      console.log(1);
    },
    getData() {
      this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=13c58cc086f74e36978b4a7881b82517_4&content_uuid=e493c3edec6b4dfbaab05966b800d513_4"
        )
        .then(({ data }) => {
          this.content = data.data.content;
          this.replaceText();
          this.PageList();
          console.log(this.renderList);
        });
    },
  },
  created() {},
  mounted() {
    // this.getData();

  },
};
</script>

<style lang="scss" >
h1 {
  span {
    font-weight: 700;
    font-size: 24px;
  }
}
.home {
  width: 100vw;
  height: 100vh;
}
.text {
  width: 10000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.content {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  p {
    padding: 20px 10px;
    // font-size: 21px;
    font-size: 12px;
  }
}

.list {
  padding: 20px 10px;
  // font-size: 21px;
  font-size: 12px;
}
</style>
