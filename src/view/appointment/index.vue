<template>
    <banner />
    <van-form class="appointmentForm" @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="date"
                is-link
                readonly
                name="date"
                label="预约日期"
                placeholder="点击选择预约日期"
                @click="showCalendar = true"
            />
            <van-field
                v-model="areaText"
                is-link
                readonly
                name="area"
                label="预约场地"
                placeholder="点击选择预约场地"
                @click="showAreaPicker = true"
            />
            <van-field
                v-model="time"
                is-link
                readonly
                name="time"
                label="预约时段"
                placeholder="点击选择预约时段"
                @click="showTimePicker = true"
            />
            <van-field
                v-model="userText"
                is-link
                readonly
                name="user"
                label="预约人"
                placeholder="点击选择预约人"
                @click="showUserPicker = true"
            />
        </van-cell-group>
        <div style="margin: 32px">
            <van-button
                round
                block
                type="primary"
                native-type="submit"
                @click="onSumbit"
            >
                提交
            </van-button>
        </div>
    </van-form>
    <van-calendar v-model:show="showCalendar" @confirm="onSelectDate" />
    <van-popup v-model:show="showAreaPicker" position="bottom">
        <van-picker
            :columns="areaColumns"
            @confirm="onSelectArea"
            @cancel="showAreaPicker = false"
        />
    </van-popup>
    <van-popup
        v-model:show="showTimePicker"
        :close-on-click-overlay="false"
        position="bottom"
    >
        <div class="btnBox">
            <span @click="showTimePicker = false">取消</span>
            <span @click="onConfirmTime">确认</span>
        </div>
        <div class="checkboxGroupBox">
            <van-checkbox-group
                v-model="timeChecked"
                :max="4"
                direction="horizontal"
            >
                <van-checkbox v-for="item in 15" :name="item + 6" :key="item">
                    {{ `${item + 6}:00-${item + 7}:00` }}
                </van-checkbox>
            </van-checkbox-group>
        </div>
    </van-popup>
    <van-popup v-model:show="showUserPicker" position="bottom">
        <van-picker
            :columns="userList"
            :columns-field-names="customFieldName"
            @confirm="onSelectUser"
            @cancel="showUserPicker = false"
        />
    </van-popup>
</template>

<script>
import axios from "axios";
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    Form,
    Field,
    CellGroup,
    Calendar,
    Popup,
    Picker,
    CheckboxGroup,
    Checkbox,
    Button,
    Toast,
} from "vant";
import Banner from "../../components/banner.vue";

export default defineComponent({
    components: {
        [Form.name]: Form,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Calendar.name]: Calendar,
        [Popup.name]: Popup,
        [Picker.name]: Picker,
        [CheckboxGroup.name]: CheckboxGroup,
        [Checkbox.name]: Checkbox,
        [Button.name]: Button,
        Banner,
    },
    setup() {
        onMounted(() => {
            axios.get("/getUserList").then((res) => {
                if (res.data.code === 200) {
                    userList.value = res.data.data;
                }
            });
        });

        const router = useRouter();
        const form = reactive({
            date: "",
            areaText: "",
            area: "",
            time: "",
            userText: "",
            user: "",
        });
        const areaColumns = [
            {
                text: "A区",
                id: "1",
            },
            {
                text: "C区",
                id: "4",
            },
        ];
        const timeChecked = ref([]);
        const userList = ref([]);
        const customFieldName = {
            text: "username",
        };

        const showCalendar = ref(false);
        const showAreaPicker = ref(false);
        const showTimePicker = ref(false);
        const showUserPicker = ref(false);
        const onSelectDate = (date) => {
            form.date = `${date.getFullYear()}/${
                date.getMonth() + 1
            }/${date.getDate()}`;
            showCalendar.value = false;
        };
        const onSelectArea = (value) => {
            form.areaText = value.text;
            form.area = value.id;
            showAreaPicker.value = false;
        };
        const onConfirmTime = () => {
            form.time = timeChecked.value.join(",");
            showTimePicker.value = false;
        };
        const onSelectUser = (value) => {
            form.userText = value.username;
            form.user = value.token;
            showUserPicker.value = false;
        };
        const onSumbit = () => {
            Toast.loading("提交中...");
            axios
                .post("/addAppointment", {
                    date: form.date,
                    area: form.area,
                    time: form.time,
                    user: form.user,
                })
                .then((res) => {
                    Toast.clear();
                    if (res.data.code == 200) {
                        Toast.success("提交成功");
                        router.push("home");
                    } else {
                        Toast.fail(res.data.msg);
                    }
                });
        };

        return {
            ...toRefs(form),
            areaColumns,
            timeChecked,
            userList,
            customFieldName,
            showCalendar,
            showAreaPicker,
            showTimePicker,
            showUserPicker,
            onSelectDate,
            onSelectArea,
            onConfirmTime,
            onSelectUser,
            onSumbit,
        };
    },
});
</script>

<style lang="less">
.appointmentForm {
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

.btnBox {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;

    > span:first-child {
        color: var(--van-picker-cancel-action-color);
    }

    > span:last-child {
        color: var(--van-picker-confirm-action-color);
    }
}

.checkboxGroupBox {
    padding: 1rem;

    .van-checkbox {
        width: calc(50% - 1rem);
        margin: 0 1rem 1rem 0;
    }
}
</style>
