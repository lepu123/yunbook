<template>
  <div class="newbooks">
    <p
      style="
        font-size: 20px;
        font-weight: 700;
        margin-left: 5vw;
        padding-top: 8px;
      "
    >
      {{ Arr.name }}
    </p>
    <ul>
      <router-link 
      v-for="item in Arr.list" 
      :key="item.id"
      :to="`/detile/${item.id}/${item.title}`" 
      tag="li">

        <img :src="item.cover" />
        <p
          style="
            font-size: 15px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          "
        >
          {{ item.title }}
        </p>
        <p
          style="
            font-size: 13px;
            color: rgb(196, 181, 181);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          "
        >
          {{ item.author }}
        </p>

      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Arr: Object,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.newbooks {
  width: 98vw;
  margin-left: 1vw;
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
}

ul {
  width: 96vw;
  margin-left: 1vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 21vw;
    margin-top: 20px;
    padding-bottom: 15px;
    img {
      width: 100%;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }
    p {
      margin-top: 5px;
    }
  }
}
</style>