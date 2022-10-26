<template>
  <div class="detile">
    <div class="detile-item">
        <div class="cover"><img :src="dataList.cover" alt=""></div>
        <div class="author">{{dataList.author}}</div>
        <div class="summary">{{dataList.summary}}</div>
        <button @click="go">立刻试读</button>

    </div>
    <router-view :pageNum='pagecount' :choseList='choseList' @nextPage='nextPage' @returnPage='returnPage' @goChose='nextPage'/>
  </div>
</template>

<script>
export default {
  name: "DetileView",
  data() {
    return {
      dataList: {},
      cataList:[],
      choseList:[],
      pagecount:0
    };
  },
  methods: {
    nextPage(){
        let page= JSON.parse(sessionStorage.getItem("page"))
        this.$router.push(`/reading/${this.cataList[page].text}`)
    },
    returnPage(){
          let page= JSON.parse(sessionStorage.getItem("page"))
        this.$router.push(`/reading/${this.cataList[page].text}`)
    },
    go(){
         sessionStorage.setItem('page',0)
         sessionStorage.setItem('new',this.cataList.length)
        this.$router.push(`/reading/${this.cataList[0].text}`)
    },
    getDetileData() {
      this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/book/getsub.json?id=13c58cc086f74e36978b4a7881b82517_4&title=女掌事"
        )
        .then(({data}) => {
            let datamode=data.feed.entry
            this.dataList={
                cover:datamode.link[1].href,
                author:datamode.author.name,
                summary:datamode.summary,
            }
          console.log(data.feed.entry);
        });
    },
    getListData(){
         this.$axios
        .get(
          "https://apis.netstart.cn/yunyuedu/book/catalog.json?tocId=13c58cc086f74e36978b4a7881b82517_4"
        )
        .then(({data}) => {
          
          let listmode=data.ncx.navMap.navPoint

          for(let i=0;i<listmode.length;i++){
            let catamode= listmode[i].navPoint
            let str=listmode[i].navLabel.replace(',','')
            this.choseList.push({label:str,itemList:[]})
            for(let x=0;x<catamode.length;x++){
                this.cataList.push({text:catamode[x].id,vip:catamode[x].vip})
                  let str1=catamode[x].navLabel.replace(',','')
                 this.choseList[i].itemList.push({text:str1,vip:catamode[x].vip})
            }
          }

          console.log( this.choseList);


        });
    }
  },
  created() {
    this.getDetileData();
    this.getListData()
  },
};
</script>

<style lang="scss" scoped>
.detile{
    width: 100vw;
    height: 100vh;
    .detile-item{
        width: 100%;
        height: 100%;
    }
}
    .cover {
        width: 100px;
        height: 100px;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>