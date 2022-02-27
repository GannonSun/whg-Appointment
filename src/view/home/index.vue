<template>
    <div class="homeWrap">
        <!-- <div class="banner">
            <p>欢迎使用</p>
            <p>福州工人文化宫场地预约平台</p>
        </div> -->
        <banner />
        <div class="menuWrap">
            <van-cell
                v-for="item in menuList"
                :key="item.name"
                :title="item.name"
                center
                is-link
                :to="item.to"
            >
                <template #title>
                    <p class="menuTitle">
                        <van-icon :name="item.icon" size="24" color="red" />
                        <span style="margin-left: 8px">{{ item.name }}</span>
                    </p>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { Icon, Cell } from "vant";
import Banner from "../../components/banner.vue";

export default defineComponent({
    components: {
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        Banner,
    },
    setup() {
        const router = useRouter();
        const menuList = reactive([
            {
                name: "前往预约",
                icon: "phone-o",
                to: "appointment",
                onclick: () => {
                    router.push("appointment");
                },
            },
            {
                name: "预约记录",
                icon: "todo-list-o",
                to: "appointmentList",
                onclick: () => {
                    router.push("appointmentList");
                },
            },
        ]);

        return {
            menuList,
        };
    },
});
</script>

<style lang="less">
.homeWrap {
    .menuWrap {
        position: relative;
        height: 75vh;
        background: #fff;

        &::before {
            content: "";
            position: absolute;
            top: -1rem;
            width: 100%;
            height: 1rem;
            border-radius: 1rem 1rem 0 0;
            background: inherit;
        }

        .menuTitle {
            display: flex;
            align-items: center;
            margin: 0.5rem 0;
            color: #6b6b6b;
        }
    }
}
</style>
