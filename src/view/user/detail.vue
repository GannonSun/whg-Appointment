<template>
    <div class="userForm">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="username"
                    name="username"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="token"
                    name="token"
                    label="token"
                    placeholder="token"
                    :rules="[{ required: true, message: '请填写token' }]"
                />
            </van-cell-group>
            <div style="margin: 16px; margin-top: 32px">
                <van-button round block type="primary" native-type="submit">
                    保存
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Form, Field, Button, Toast } from "vant";

export default defineComponent({
    components: {
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
        [Toast.name]: Toast,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const userParam = route.query;

        const userid = ref(userParam.id || "");
        const username = ref(userParam.userName || "");
        const token = ref(userParam.token || "");
        const onSubmit = (values) => {
            console.log("submit", values);
            if (userid.value) {
                // 编辑用户
                axios
                    .post("/editUser", {
                        id: userid.value,
                        ...values,
                    })
                    .then((res) => {
                        if (res.data.code === 200) {
                            Toast.success({
                                message: "保存成功",
                                onClose: () => {
                                    router.back();
                                },
                            });
                        } else {
                            Toast.fail(res.data.msg);
                        }
                    });
            } else {
                // 新增用户
                axios.post("/addUser", values).then((res) => {
                    if (res.data.code === 200) {
                        Toast.success({
                            message: "新增成功",
                            onClose: () => {
                                router.back();
                            },
                        });
                    } else {
                        Toast.fail(res.data.msg);
                    }
                });
            }
        };

        return {
            username,
            token,
            onSubmit,
        };
    },
});
</script>

<style lang="less">
.userForm {
    position: relative;
    background: #fff;
    padding-top: 1rem;
    height: 70vh;

    &::before {
        content: "";
        position: absolute;
        top: -1rem;
        width: 100%;
        height: 1.5rem;
        border-radius: 1rem 1rem 0 0;
        background: inherit;
    }
}
</style>
