<template>
  <div id="app">
    
    <router-view />
  </div>
</template>

<script>

export default {};
</script>

<style lang="scss">
.more-list {
  li {
    display: flex;
    width: 90vw;
    margin-left: 5vw;
    margin-top: 15px;
    img {
      height: 150px;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
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

</style>
