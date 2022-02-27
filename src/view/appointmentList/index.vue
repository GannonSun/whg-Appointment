<template>
    <banner />
    <van-swipe-cell v-for="item in appointmentList" :key="item.id">
        <van-cell
            :border="false"
            :title="`${item.date} ${areaMap[item.area]} ${item.time}`"
            :label="`预约人：${item.userName}`"
        >
            <template #right-icon>
                <span
                    :class="{
                        'c-error': item.status == '0',
                        'c-success': item.status == '1',
                    }"
                >
                    {{ ["已过期", "未预约"][item.status * 1] }}
                </span>
            </template>
        </van-cell>
        <template v-if="item.status == '1'" #right>
            <van-button
                class="delete-button"
                square
                type="danger"
                text="取消预约"
                @click="onCancelAppointment(item.id)"
            />
        </template>
    </van-swipe-cell>
</template>

<script>
import axios from "axios";
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { SwipeCell, Cell, Button, Toast } from "vant";
import Banner from "../../components/banner.vue";

export default defineComponent({
    components: {
        [SwipeCell.name]: SwipeCell,
        [Cell.name]: Cell,
        [Button.name]: Button,
        Banner,
    },
    setup() {
        onMounted(() => {
            fetchList();
        });

        const areaMap = {
            1: "A区",
            4: "C区",
            5: "乒乓球区",
        };
        const appointmentList = ref([]);

        const fetchList = () => {
            axios
                .get("http://118.25.4.192:7001/getAppointmentList")
                .then((res) => {
                    console.log(res);
                    appointmentList.value = res.data;
                });
        };
        const onCancelAppointment = (id) => {
            Toast.loading("取消中...");
            axios
                .get(`http://118.25.4.192:7001/cancelAppointment?id=${id}`)
                .then((res) => {
                    Toast.clear();
                    if (res.data.code == 200) {
                        Toast.success("取消成功");
                        fetchList();
                    }
                });
        };

        return {
            areaMap,
            appointmentList,
            onCancelAppointment,
        };
    },
});
</script>

<style lang="less">
.c-error {
    color: red;
}
.c-success {
    color: #3eaf7c;
}
.delete-button {
    height: 100%;
}
</style>
