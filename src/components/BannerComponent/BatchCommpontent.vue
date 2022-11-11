<template>
  <div id="batch">
    <div class="batch-top">
      <div 
      @click="checkAll" 
      :class="result.length == recommendArr.length && result.length != 0 ? 'all-choice' : 'choice' "
      ref="allChoice"
      >
        全选({{result.length}})
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
               <div class="batch-img" v-if="item.bookType != 2">
                  <img :src="item.cover">
                </div> 
               <div class="batch-book" v-if="item.bookType != 2">
                   <div class="custom-title van-ellipsis">{{item.title}}</div>
                   <div class="batch-author">{{item.author}}</div>
                   <div class="batch-author">看屁</div>
               </div>

               <div class="group-book" v-if="item.bookType == 2">
                  <div class="group-img" v-for="(t,k) in item.groupBook" :key="t.id">
                    <img :src="t.cover" v-if="k <= 3">
                  </div>
                </div> 
               <div class="batch-book" v-if="item.bookType == 2">
                   <div class="custom-title van-ellipsis">{{item.title}}</div>
                   <div class="batch-author">共{{ item.groupBook.length }}本</div>
               </div> 
            </template>


            <template #right-icon >
              <van-checkbox  :name="item" ref="checkboxes" checked-color="#ee0a24"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div class="dianzi"></div>
    </div>

    <div class="batch-tabbar">
      <div
      :class="this.result.length != 0 ? 'hidden' : 'cover'  "
      ref="cover">
      </div>
      <div @click="del" class="del">删除</div>
      <van-cell @click="groupPopup" class="grouping">
        分组
      </van-cell>
    </div>
    <van-popup 
    v-model="groupShow"
    closeable
    close-icon-position="top-right"
    position="bottom"
    :style="{ height: '50%' }"
    round
    >
    <div class="book-group">
        <div class="box"></div>
        <div class="remove-group">
          <img src="@/assets/image/banner-images/icon_bookcase.png">
          <span @click="removeGroup">移出分组</span> 
        </div>
        <div class="new-group" v-for="t in groupArr" :key='t.id'>
             <img src="@/assets/image/banner-images/subs_group_icon_normal.png">
             <span>{{t.groupName}}</span>
        </div>
    </div>
    <div class="create-group">
      <van-cell @click="createPopup">
        <span>+ 新建分组,1-12字符</span>
      </van-cell>
    </div>
    </van-popup>

    <van-popup v-model="create" round>
      <div class="group-name">
          <div class="group-title">编辑分组名</div>
          <div class="group-input">
            <input type="text" placeholder="请输入1-12个字符" ref="input" @input="getValue">
            </div>
          <div class="group-btn">
            <div class="group-cover" v-show="isValue"></div>
            <span @click="create = false">取消</span>
            <span @click="grouping">保存</span>
          </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    recommendArr: Array,
    batchShow: Boolean
  },
  data() {
    return {
      result: [],
      delArr: [],
      groupArr: [],
      groupShow: false,
      create: false,
      isValue: true
    };
  },
  watch: {
    'result.length'(val) {
      console.log(this.recommendArr,'!!!');
      console.log(this.result);
      console.log(val);
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
      console.log(this.recommendArr,'!!!');
      console.log(this.result,'单选');
      console.log(index);
      // this.result = [this.recommendArr[index],...this.result]
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
    },
    groupPopup() {
      this.groupShow = true;
    },
    createPopup() {
      this.create = true;
      this.groupShow = false;
    },
    getValue() {
      if (this.$refs.input.value == '') {
        this.isValue = true
      } else {
        this.isValue = false
      }
      console.log(this.$refs.input.value,'值');
      console.log(this.result);
    },
    grouping() {
      console.log(this.result);
      let groupObj = {
        id: new Date().getTime(),
        bookType: 2,
        groupName: this.$refs.input.value,
        groupBook: this.result,
      };
      this.$emit("changeGroup", {arr:this.result,obj:groupObj});
      this.result = []
      this.groupArr = [...this.groupArr,groupObj]
      this.isValue = true
      this.create = false
      this.$emit("clockbatch", false);
    },
    removeGroup() {

    }
  },
};
</script>

<style lang="scss" scoped>
#batch {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

.box {
  width: 100%;
  height: 45px;
}

.create-group {
  left: 20vw;
  bottom: 20px;
  position: absolute;
  width: 60vw;
  height: 50px;
  background-color: rgba(128, 128, 128, 0.37);

  .van-cell {
    padding: 0;
    background-color: '';
  }

  span {
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #888;
  }
}

.group-name {
  width: 75vw;
  height: 180px;

  .group-title {
    width: 100%;
    height: 50px;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
  }

  .group-input {
    width: 100%;
    height: 100px;

    input {
      margin-top: 20px;  
      margin-left: 2.9vw;
      border: 1px solid rgba(128, 128, 128, .5);
      width: 90%;
      height: 25px;
    }
  }

  .group-btn {
    position: relative;
    width: 100%;
    height: 30px;

    .group-cover {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
      opacity: 0.5;
      background-color: #fff;
      z-index: 999;
    }

    span {
      display: inline-block;
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: 30px;
    }
  }
}

.book-group {
 width: 100%;
 height: 75%;
 overflow: auto;

  .remove-group {
  width: 100%;
  height: 50px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  img {
    margin: 10px 10px;
    vertical-align:middle;
    width: 30px;
    height: 30px;
  }

  span {
    display: inline-block;
    line-height: 30px;
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
}

.new-group {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;

  img {
    margin: 10px 10px;
    vertical-align:middle;
    width: 30px;
    height: 30px;
  }

  span {
    display: inline-block;
    line-height: 30px;
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
}
}



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
  height: 100vh;
  overflow: auto;

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

  .group-book {
    display: flex;
    flex-wrap: wrap;
    width: 100px;
    height: 100%;
    border-radius: 5px;
    box-shadow: 3px 3px 10px #888888;
    overflow: hidden;
    background-color: rgba(128, 128, 128, 0.2);

    .group-img {
      margin-left: 10px;
      margin-top: 10px;
      width: 35px;
      height: 40%;
      overflow: hidden;

      img {
        width:100%;
        height: 100%;
    }
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

  .van-cell {
    padding: 0 0;
  }

  .del {
    border-right: 1px solid #eee;
    color: red;
  }

  .grouping {
    height: 100%;
    font-size: 16px;
    color: gray;
  }
}

.dianzi {
  width: 100vw;
  height: 80px;
}
}
</style>