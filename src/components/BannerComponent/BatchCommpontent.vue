<template>
  <div>
    <div class="batch-top">
      <div 
      @click="checkAll" 
      :class="this.result.length == this.recommendArr.length && this.result.length != 0 ? 'all-choice' : 'choice' "
      ref="allChoice"
      >
        全选({{this.result.length}})
    </div>
      <div>批量管理</div>
      <div @click="clockbatch">完成</div>
    </div>

    <div class="batch-body">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in recommendArr"
            clickable
            :key="item.id"
            @click="toggle(index)"
          >
            <template #title>
               <div class="batch-img">
                  <img :src="item.cover">
                </div> 
               <div class="batch-book">
                   <div class="custom-title">{{item.title}}</div>
                   <div class="batch-author">{{item.author}}</div>
                   <div class="batch-author">看屁</div>
               </div> 
            </template>

            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" checked-color="#ee0a24"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>

    <div class="batch-tabbar">
      <div
      :class="this.result.length != 0 ? 'hidden' : 'cover'  "
      ref="cover">
      </div>
      <div @click="del">删除</div>
      <div>分组</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendArr: Array,
    batchShow: Boolean,
  },
  data() {
    return {
      result: [],
      delArr: []
    };
  },
  watch: {
    'result.length'(val) {
        if (val == this.recommendArr.length) {
            this.$refs.allChoice.textContent = `取消全选(${this.result.length})`
        }else  {
            this.$refs.allChoice.textContent = `全选(${this.result.length})`
        }
        
    }
  },
  methods: {
    clockbatch() {
      this.result = []
      this.delArr = [] 
      this.$emit("clockbatch", false);
    },
    toggle(index) {
      if (this.$refs.checkboxes[index].checked) {
          this.delArr = this.delArr.filter((item) => item.id != this.recommendArr[index].id)
      }else {
          this.$refs.checkboxes[index].toggle();
          if (this.delArr.indexOf(index) == -1) {
            this.delArr = [...this.delArr,this.recommendArr[index]] 
          }
      }  
    },
    checkAll() {
      if (this.isALL) {
        this.$refs.checkboxGroup.toggleAll();
        this.isALL = false;
        this.delArr = []
      }else {
        this.$refs.checkboxGroup.toggleAll(true);
        this.isALL = true;
        this.delArr = this.recommendArr
        console.log(this.delArr);
      }
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    del() {
       console.log(this.delArr);
       this.$emit("delbook", this.delArr);
       this.result = []
    }
  },
};
</script>

<style lang="scss" scoped>

.batch-top {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 35px;
  background-color: #fff;
  z-index: 999;

  div {
    width: 20vw;
    height: 100%;
    line-height: 35px;
    text-align: center;
  }

  .choice {
    font-size: 13px;
    color: gray;
  }

  .all-choice {
    font-size: 13px;
    color: red;
  }

  :nth-child(2) {
    color: #555;
  }

  :nth-child(3) {
    font-size: 13px;
    color: gray;
  }
}

.batch-body {
  width: 100vw;
  min-height: 88vh;

  .van-cell__title{
    display: flex;
  }

  .batch-img {
    width: 100px;
    height: 100%;
    border-radius: 5px;
    box-shadow: 3px 3px 10px #888888;
    overflow: hidden;

    img {
        width:100%;
        height: 100%;
    }
  }


  .batch-book {
    margin-left: 15px;
    width: 65%;
    height: 100%;

      .custom-title {
        width: 100%;
        height: 100px;
        font-size: 20px;
      }

      .batch-author {
        font-size: 13px;
        color: gray;
      }
  }
}

.batch-tabbar {
  display: flex;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
  width: 100vw;
  height: 45px;
  background-color: #fff;
  z-index: 888;

  div {
    width: 50vw;
    text-align: center;
    line-height: 45px;
  }

  .cover {
    border-top: 1px solid #eee;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: #fff;
    z-index: 999;
  }

  .hidden {
    display: none;
  }

  :nth-child(2) {
    border-right: 1px solid #eee;
    color: red;
  }

  :nth-child(3) {
    color: gray;
  }
}
</style>