<template>
    <div class="userList">
        <van-contact-card type="add" @click="onAdd" />
        <van-cell
            v-for="user in userList"
            :key="user.token"
            :title="user.username"
            :label="user.token"
            class="userCell"
            icon="user-circle-o"
            center
            is-link
            :to="{
                path: '/user/detail',
                query: {
                    id: user.id,
                    userName: user.username,
                    token: user.token,
                },
            }"
        >
        </van-cell>
    </div>
</template>

<script>
import axios from "axios";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ContactCard, Cell, Icon, Toast } from "vant";

export default defineComponent({
    components: {
        [ContactCard.name]: ContactCard,
        [Cell.name]: Cell,
        [Icon.name]: Icon,
        [Toast.name]: Toast,
    },
    setup() {
        onMounted(() => {
            fetchList();
        });

        const router = useRouter();
        const userList = ref([]);

        const fetchList = () => {
            Toast.loading({
                message: "加载中...",
                forbidClick: true,
            });
            axios
                .get("/getUserList")
                .then((res) => {
                    const data = res.data;
                    if (data.code == 200) {
                        userList.value = data.data;
                    } else {
                        Toast.fail("获取失败");
                    }
                })
                .finally(() => {
                    Toast.clear();
                });
        };
        const onAdd = () => {
            router.push({
                path: "/user/detail",
            });
        };

        return {
            userList,
            onAdd,
        };
    },
});
</script>

<style lang="less">
.userList {
    position: relative;
    background: #fff;

    &::before {
        content: "";
        position: absolute;
        top: -1rem;
        width: 100%;
        height: 1.5rem;
        border-radius: 1rem 1rem 0 0;
        background: inherit;
    }

    .userCell {
        .van-icon:first-child {
            font-size: 24px;
            margin-left: 8px;
            margin-right: 16px;
        }
    }
}
</style>
