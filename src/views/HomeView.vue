<template>
  <div class="home">
    <div class="text">
      <div ref="content" class="content" v-html="content" ></div>
      <div class="content"  v-for="(r,i) in renderList" :key="i" v-show="i!=0">
      <div class="list" v-for="(p,i) in r" :key="i" v-show="i !=0">{{p}}</div>
    </div>
    </div>
    
    <button @click="PageList">1111111111111</button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: null,
      // itemList:[],
      index:0,
      nextIndex:0,
      arrNum:1,
      count:0,
      renderList:[]
    };
  },

  computed: {
    itemHeightList() {
      let p = document.querySelectorAll("p");
      let span = document.querySelector("span");
      let heightList = [];
      heightList.push(span.offsetHeight+6);
      p.forEach((i) => {
        heightList.push(i.offsetHeight);
      });
      return heightList;
    },

    itemTextList() {
      let p = document.querySelectorAll("p");
      let span = document.querySelector("span");
      let textList = [];
      textList.push(span.textContent);
      p.forEach((i) => {
        textList.push(i.textContent);
      });
      return textList;
    },

    viewHeight() {
      return this.$refs.content.offsetHeight;
    },
  },

  // updated(){

  // }

  methods: {
    PageList(){
      for(;;){
        for(let i= this.index;i<this.itemHeightList.length;i++){
          this.count +=this.itemHeightList[i]
          console.log(this.count,this.viewHeight*this.arrNum);
          if(this.count>=this.viewHeight*this.arrNum){
            this.nextIndex=i
           break
          }
        }
        
        if(this.index==this.nextIndex){
           this.renderList.push(this.itemTextList.slice(this.nextIndex,this.itemTextList.length));
           break
        }else{
          this.renderList.push(this.itemTextList.slice(this.index, this.nextIndex));
        }
         console.log(this.renderList);
        this.index=this.nextIndex
        this.arrNum=this.arrNum+1
      }
        console.log(this.renderList);
    },
    get() {
      //  console.log(this.itemHeightList);
      //  let p = document.querySelectorAll("p");
      // console.log(p[0].textContent);
    },
    getData() {
      this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=13c58cc086f74e36978b4a7881b82517_4&content_uuid=e493c3edec6b4dfbaab05966b800d513_4"
        )
        .then(({ data }) => {
          this.content = data.data.content;
          // console.log(data.data);
        });
    },
  },
  mounted() {
    this.getData();
    // this.PageList();
  },
};
</script>

<style lang="scss" >
h1 {
  span{
    font-weight:700;
    font-size: 24px;
  }
}
.home{
  width: 100vw;
  height: 100vh;
}
.text{
  width: 10000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.content {
  width: 100vw;
  height:100vh;
  overflow: hidden;
  p{
    padding: 20px 10px;
    // font-size: 21px;
    font-size: 12px;
  }
}

  .list{
    padding: 20px 10px;
    // font-size: 21px;
    font-size: 12px;
  }

</style>
