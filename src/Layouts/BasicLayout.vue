<template>
  <div class="basic-layout">
    <Menu />

    <div class="ui container">
      <slot />
    </div>
  </div>
  <Cart />
</template>

<script>
import Cart from "../components/Cart/Cart";
import Menu from "../components/Menu";
export default {
  name: "BasicLayout",

  components: {
    Menu,
    Cart,
  },
};
</script>
