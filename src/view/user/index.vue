<template>
    <banner />
    <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";
import Banner from "../../components/banner.vue";

export default defineComponent({
    components: {
        Banner,
    },
});
</script>

<style lang="less"></style>
