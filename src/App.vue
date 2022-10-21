<template>
  <div id="app">

      <router-link to="/">Home</router-link>

    <div class="div" v-html="content"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      content:null
    }
  },
  created(){
    this.$axios
    .get('https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=13c58cc086f74e36978b4a7881b82517_4&content_uuid=e493c3edec6b4dfbaab05966b800d513_4')
    .then(({data})=>{
      this.content=data.data.content
      console.log(data.data);
    })
  }
}
</script>

<style>

</style>
