<template>
  <div>
    <div class="msg">
      <van-icon name="envelop-o" size="30" color="#888" />
    </div>
    <div class="login">
      <div class="head">
        <img src="@/assets/image/login.jpg" />
      </div>
      <div
        style="
          font-size: 25px;
          font-weight: 700;
          margin-left: 15px;
          margin-top: 27px;
        "
      >
        点击登录
      </div>
    </div>
    <div class="money">
      <div class="left">
        <p>余额</p>
        <p>充值送红包</p>
        <div class="btn">充值</div>
      </div>
      <div class="right">
        <p>签到</p>
        <p>做任务领红包</p>
        <div class="btn-two">签到</div>
      </div>
    </div>

    <div class="list">
      <ul>
        <li>
          <van-cell is-link @click="showPopup">
            <van-icon name="records" size="25" color="#888" />
            <span>笔记</span>
          </van-cell>
        </li>
        <li>
          <van-cell is-link @click="showPopup">
            <van-icon name="shopping-cart-o" size="25" color="#888" />
            <span>已购和上传</span>
          </van-cell>
        </li>
        <li>
          <van-cell is-link @click="showPopup">
            <van-icon name="service-o" size="25" color="#888" />
            <span>在线客服</span>
          </van-cell>
        </li>
        <li style="margin-left: 15px">
          <van-icon name="eye-o" size="25" color="#888" />
          <span>夜间模式</span>
          <van-switch
            v-model="checked"
            active-color="#ee0a24"
            inactive-color="#dcdee0"
          />
        </li>
        <li>
          <van-cell is-link @click="showPopup">
            <van-icon name="gem-o" size="25" color="#888" />
            <span>积分商城</span>
          </van-cell>
        </li>
        <li>
          <van-cell is-link @click="showPopup">
            <van-icon name="setting-o" size="25" color="#888" />
            <span>设置</span>
          </van-cell>
        </li>
      </ul>
      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '100%' }"
        closeable
        close-icon-position="top-left"
        get-container="#app"
      >
        <div style="width: 100vw">什么都没有哦</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      checked: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.msg {
  width: 100vw;
  height: 50px;
  position: relative;
  .van-icon {
    position: absolute;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    right: 25px;
    top: 10px;
  }
}

.login {
  display: flex;
  margin-left: 8vw;
  .head {
    border-radius: 50%;
    width: 20vw;
    height: 20vw;
    overflow: hidden;
    img {
      width: 20vw;
    }
  }
}

.money {
  display: flex;
  width: 90vw;
  height: 120px;
  margin-left: 5vw;
  margin-top: 30px;
  box-shadow: 0px 2px 6px rgba(182, 175, 175, 0.3);
  .left {
    width: 45vw;
    border-right: 1px solid #ccc;
    text-align: center;
    margin-top: 20px;
    p {
      margin-bottom: 8px;
    }
    :nth-child(1) {
      font-size: 20px;
      font-weight: 700;
    }
    :nth-child(2) {
      font-size: 15px;
      color: #888;
    }
    .btn {
      width: 65px;
      height: 30px;
      margin: 0 auto;
      border-radius: 999px;
      background-color: rgb(250, 82, 82);
      font-size: 14px;
      line-height: 30px;
      color: #fff;
    }
  }

  .right {
    width: 45vw;
    text-align: center;
    margin-top: 20px;
    p {
      margin-bottom: 8px;
    }
    :nth-child(1) {
      font-size: 20px;
      font-weight: 700;
    }
    :nth-child(2) {
      font-size: 15px;
      color: #888;
    }
    .btn-two {
      width: 65px;
      height: 30px;
      margin: 0 auto;
      border-radius: 999px;
      font-size: 14px;
      line-height: 30px;
      border: 1px solid rgb(250, 82, 82);
      color: rgb(250, 82, 82);
    }
  }
}

.list {
  ul {
    margin-left: 10px;
    margin-top: 30px;
  }
  li {
    height: 65px;
    color: #888;
    font-size: 16px;
    position: relative;
    .van-switch {
      position: absolute;
      right: 5px;
      display: inline-block;
      box-sizing: content-box;
      width: 2em;
      height: 1em;
      font-size: 30px;
      background-color: #fff;
      border: 1pxsolidrgba (0, 0, 0, 0.1);
      border-radius: 1em;
      cursor: pointer;
      -webkit-transition: background-color 0.3s;
      transition: background-color 0.3s;
    }
    .van-cell__value--alone {
      color: #888;
      text-align: left;
      font-size: 16px;
    }
    span {
      margin-left: 10px;
    }
  }
}
</style>