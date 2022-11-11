<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannersArr" :key="index">
        <img :src="item.cover" />
      </van-swipe-item>
    </van-swipe>

    <div class="short-cut">
      <ul>
        <li
          v-for="item in shortCutArr"
          :key="item.msgId"
          @click="getNavData(item.url)"
        >
          <van-cell is-link @click="showPopup(item.name, item.url)">
            <img :src="item.cover" />
            <p>{{ item.name }}</p>
          </van-cell>
        </li>
      </ul>
      <van-popup
        v-model="show"
        get-container="#app"
        closeable
        close-icon="arrow-left"
        close-icon-position="top-left"
        position="right"
        :style="{ height: '100%', width: '100%' }"
      >
        <van-tabs v-model="active">
          <van-tab v-for="n in navList" :key="n.name" :title="n.name">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item
                v-for="s in n.subNavis"
                :key="s.name"
                :title="s.name"
                @click="getPaiData(s.naviInfos[0].url)"
              />
            </van-sidebar>
            <ul class="pai-list">
              <li
                v-for="(item, index) in paiArr"
                :key="item.id"
                @click="changeBook(item.id,item.title,item.bookType,item.author)"
              >
                <div>
                  <img
                    :src="item.cover"
                    style="
                      border-radius: 8px;
                      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
                    "
                  />
                </div>
                <div style="margin-left: 8px; margin-top: 3px; width: 60vw">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 14px;
                      width: 50vw;
                    "
                  >
                    <span
                      style="
                        font-size: 18px;
                        width: 30vw;
                        display: block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                    >
                      {{ item.title }}
                    </span>
                    <img
                      src="@/assets/image/ranking_top1.png"
                      v-show="index == 0"
                      style="width: 50px; height: 20px"
                    />
                    <img
                      src="@/assets/image/ranking_top2.png"
                      v-show="index == 1"
                      style="width: 50px; height: 20px"
                    />
                    <img
                      src="@/assets/image/ranking_top3.png"
                      v-show="index == 2"
                      style="width: 50px; height: 20px"
                    />
                  </div>

                  <p style="font-size: 15px; color: #ccc">
                    {{ item.recomContent }}
                  </p>
                  <p style="font-size: 15px; color: #ccc">
                    {{ item.author }} | {{ item.category }}
                  </p>
                </div>
              </li>
            </ul>
          </van-tab>
        </van-tabs>
      </van-popup>

      <van-popup
        v-model="showTwo"
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
          完本畅读
        </div>
        <ul class="more-list">
          <router-link
            v-for="(c, index) in wanArr"
            :key="index"
            :to="`/detile/${c.id}/${c.title}`"
            tag="li"
            style="
              display: flex;
              width: 90vw;
              margin-left: 5vw;
              margin-top: 15px;
            "
          >
            <img
              :src="c.cover"
              style="
                height: 150px;
                border-radius: 8px;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
              "
            />
            <div style="margin-left: 10px">
              <p style="font-size: 18px; font-weight: 700">{{ c.title }}</p>
              <p
                style="
                  font-size: 13px;
                  color: rgb(152, 141, 141);
                  margin-top: 10px;
                "
              >
                {{ c.author }}/{{ c.category }}
              </p>
              <p
                style="
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
                "
              >
                {{ c.content }}
              </p>
            </div>
          </router-link>
        </ul>
      </van-popup>
    </div>

    <div class="week-hot">
      <p
        style="
          font-size: 20px;
          font-weight: 700;
          margin-left: 5vw;
          padding-top: 8px;
        "
      >
        <!-- 本周强推 -->
        {{ weekHotArr.name }}
      </p>
      <ul>
        <router-link
          v-for="(item, index) in weekHotArr.list"
          :key="item.id"
          :to="`/detile/${item.id}/${item.title}`"
          tag="li"
        >
          <img :src="item.cover" />
          <div>
            <p class="week-title">{{ item.title }}</p>
            <p class="week-author">
              {{ item.author }}
              <span v-show="index == 0">/{{ item.category }}</span>
            </p>
            <p v-show="index == 0" class="content">{{ item.content }}</p>
          </div>
        </router-link>
      </ul>
    </div>

    <WatchMoreComp :Arr="everybodyArr" />

    <WatchMoreComp :Arr="yunGirlArr" />

    <WatchMoreComp :Arr="modernArr" />

    <WatchMoreComp :Arr="ancientArr" />

    <WatchMoreComp :Arr="newBookArr" />
  </div>
</template>

<script>
import WatchMoreComp from "./WatchMoreComp.vue";
import { mapMutations } from "vuex";
export default {
  props: {
    selectedUrl: String,
  },
  data() {
    return {
      bannersArr: [],
      shortCutArr: [],
      weekHotArr: {},
      everybodyArr: {},
      yunGirlArr: {},
      modernArr: {},
      ancientArr: {},
      newBookArr: {},
      show: false,
      showTwo: false,
      navList: [],
      active: 0,
      activeKey: 0,
      paiArr: [],
      wanArr: [],
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${this.selectedUrl}`)
        .then(({ data: { data } }) => {
          this.bannersArr = data.list[0].banners;
          this.shortCutArr = data.list[1].shortCut;
          this.weekHotArr = data.list[2];
          this.everybodyArr = data.list[3];
          this.yunGirlArr = data.list[4];
          this.modernArr = data.list[5];
          this.ancientArr = data.list[6];
          this.newBookArr = data.list[7];
        });
    },

    getNavData(url) {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${url}`)
        .then(({ data: { data } }) => {
          this.navList = data.list;
        });
    },
    getPaiData(url) {
      this.$axios
        .get(`https://apis.netstart.cn/yunyuedu${url}`)
        .then(({ data }) => {
          this.paiArr = data.list;
        });
    },
    showPopup(pName, wUrl) {
      if (
        pName == "排行" ||
        pName == "人气" ||
        pName == "完结" ||
        pName == "奇文" ||
        pName == "精品"
      ) {
        this.show = true;
      } else {
        this.show = false;
      }

      if (pName == "完本") {
        this.showTwo = true;
        this.$axios
          .get(`https://apis.netstart.cn/yunyuedu${wUrl}`)
          .then(({ data: { data } }) => {
            this.wanArr = data.books;
          });
      }
    },

    changeBook(id,title,type,author) {
      this.getHistory({id,title,author,type}) 
      if (type == 0) {
        this.$router.push(`/detile/${id}/${title}`);
      } else {
        this.$router.push(`/ListeningView/${id}`);
      }
    },
    ...mapMutations(["getHistory","empty"]),
  },

  created() {
    this.getData();
  },
  components: {
    WatchMoreComp,
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

.short-cut {
  .van-icon-arrow:before {
    content: "";
  }
  .van-cell__value--alone {
    color: #323233;
    text-align: center;
  }
  ul {
    width: 80vw;
    margin-left: 1vw;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  img {
    height: 42px;
    width: 42px;
  }
}

.van-sidebar {
  width: 80px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  float: left;
}
.van-sidebar-item {
  margin-top: 15px;
  background-color: #fff;
}

.pai-list {
  display: block;
  float: left;
  border-left: 1px solid #ccc;
  min-height: 100vh;
  width: 70vw;
  li {
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    p {
      margin-bottom: 14px;

      width: 150px;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    img {
      height: 110px;
      width: 80px;
    }
  }
}

.week-hot {
  width: 98vw;
  margin-left: 1vw;
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
  ul {
    width: 98vw;
    margin-left: 1vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 23vw;
      margin-top: 20px;
      img {
        width: 100%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
      }

      p {
        margin-top: 5px;
      }
      .week-author {
        font-size: 13px;
        color: rgb(196, 181, 181);
      }
    }
    li:nth-child(1) {
      width: 100%;
      height: 140px;
      display: flex;
      img {
        width: 28%;
      }
      div {
        margin-left: 15px;
      }
      .week-title {
        font-size: 18px;
        font-weight: 600;
      }
      .week-author {
        color: rgb(152, 141, 141);
        font-size: 15px;
        margin-top: 10px;
      }
      .content {
        color: rgb(152, 141, 141);
        font-size: 15px;
        margin-top: 15px;
        line-height: 25px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.everybody-reading {
  width: 98vw;
  margin-left: 1vw;
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
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
    div {
      width: 14px;
      height: 14px;
      font-size: 14px;
      margin-left: 5px;
      text-align: center;
      line-height: 16px;
      border: 2px solid rgb(152, 141, 141);
      border-radius: 999px;
    }
  }
}
</style>