import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("date", (value, format ="YYYY-MM-DD") => {
    return dayjs(value).format(format);
})