<template>
  <BasicLayout>
    <h2>Estamos en {{ category }}</h2>
    <div class="ui grid">
      <div
        class="sixten wide mobile eigth wide tablet four wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProductsCategory } from "../api/product";
import BasicLayout from "../Layouts/BasicLayout";
import Product from "../components/Product";

export default {
  name: "Category",

  components: {
    BasicLayout,
    Product,
  },

  watch: {
    $route(to, from) {
      this.getProducts(to.params.category);
      this.category = to.params.category;
    },
  },

  setup() {
    const { params } = useRoute();
    let products = ref(null);
    let category = params.category;

    onMounted(async () => {
      getProducts(params.category);
    });

    const getProducts = async (catgorySlug) => {
      const response = await getProductsCategory(catgorySlug);
      products.value = response;
    };

    return {
      getProducts,
      products,
      category,
    };
  },
};
</script>

<style></style>
