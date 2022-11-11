<template>
  <div id="history">
    <div class="history-top">
      <van-icon @click="clockHistory" name="arrow-left" />
      <span>阅读历史</span>
      <span @click="empty">清空</span>
    </div>
    <div class="history-body" >
      <div class="history-null" v-show="historyArr.length == 0">
        <img src="@/assets/image/banner-images/home_null_data_icon.png" />
        <p>没有任何内容哦</p>
      </div>

      <div v-show="historyArr.length != 0">
        <div class="history-item" v-for="item in historyArr" :key="item.id" @click="go(item.id,item.title,item.bookType,item.author)">
          <div class="history-title">
              <img
                v-if="item.bookType == 21"
                src="@/assets/image/banner-images/audio_player_history.png"
              />
            <span>
              {{ item.title }}
            </span>
          </div>
          <div class="history-other">
            <span class="history-author">{{ item.author }}</span>
            <span v-show="(new Date().getTime() - item.time) / 1000 < 60" class="history-time">
              {{ Math.floor((new Date().getTime() - item.time) / 1000) + "秒前" }}
            </span>
            <span v-show="(new Date().getTime() - item.time) / 1000 >= 60" class="history-time">
              今天{{
                 new Date(item.time).getHours() +":" + new Date(item.time).getMinutes()
                 }}
            </span>
            <span v-show="(new Date().getTime() - item.time) / 1000 / 60 / 60 >= 24" class="history-time">
              {{
                new Date(item.time).getMonth() +1+"月"+new Date(item.time).getDate() +"日  " + new Date(item.time).getHours()  +":" +new Date(item.time).getMinutes()
              }}
            </span>
          </div>
        </div>
    </div>
    </div>

    
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    historyShow: Boolean,
    istop: Boolean
  },
  data() {
    return {};
  },
  
  computed: {
    ...mapState(["historyArr"]),
  },
  methods: {
    clockHistory() {
      this.$emit("clockhistory", false);
      this.$router.go(-1)
    },
    go(id,title,bookType,author) {
      this.getHistory({id,title,author,bookType})
      console.log(bookType);  
      if (bookType == 0) {
        this.$router.push(`/detile/${id}/${title}`);
      } else {
        this.$router.push(`/ListeningView/${id}`);
      }
    },
    empty() {
       this.empty()
    }, 
    ...mapMutations(["getHistory","empty"]),
  },
};
</script>

<style lang="scss" scoped>
#history {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}

.history-top {
  position: fixed;
  top: 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 39px;
  line-height: 39px;
  background-color: #fff;
  z-index: 999;

  i {
    display: inline-block;
    width: 10vw;
    text-align: center;
    line-height: 39px;
  }

  :nth-child(2) {
    font-weight: 700;
  }

  :nth-child(3) {
    display: inline-block;
    width: 13vw;
    text-align: center;
    font-size: 13px;
  }
}

.history-body {
  margin-top: 39px;
  width: 100vw;
  min-height: 90vh;

  .history-null {
    width: 100vw;
    min-height: 90vh;
    overflow: hidden;

    img {
      margin: 50% auto 20px;
      display: block;
      width: 150px;
      height: 150px;
    }

    p {
      font-size: 18px;
      text-align: center;
      color: rgba(128, 128, 128, 0.4);
    }
  }

  .history-item {
    width: 100vw;
    height: 80px;

    .history-title {
        display: flex;
        padding-top: 10px;
        padding-left: 10px;
        width: 100vw;
        height: 40px;
       

        img {
            display: inline-block;
            margin: 5px 0;
            width: 20px;
            height: 20px;
        }

        span {
            display: inline-block;
            width: 300px;
            height: 30px;
            line-height: 30px;
        }
    }

    .history-other {
       display: flex;
       justify-content: space-between;
       padding-left: 10px;
       width: 100vw;
       height: 30px;
        
       .history-author {
        width: 200px;
        height: 100%;
        line-height: 30px;
        font-size: 13px;
        color: gray;
       }

       .history-time {
        width: 80px;
        height: 100%;
        line-height: 30px;
        font-size: 13px;
        color: gray;
       }
    }
  }
}
</style>