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
        tag="li"
      >
        <img :src="item.cover" />
        <div>
          <p style="font-weight: 600">
            {{ item.title }}
          </p>

          <p style="font-size: 13px; color: rgb(196, 181, 181)">
            {{ item.category }}
          </p>
          <p style="font-size: 13px; color: rgb(196, 181, 181)">
            <van-icon name="eye-o" />
            {{ (item.clickCount / 10000).toFixed(1) }} 万
          </p>
        </div>
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
  margin-left: 2vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 15px;
  li {
    display: flex;
    width: 48%;
    margin-top: 10px;
    img {
      width: 21vw;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }
    div {
      margin-left: 8px;
      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>