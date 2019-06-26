import store from "@/store/index.js";
const openLoading = (target = true) => store.dispatch("setAxiosLoading", target)
const tip = (msg, fn = null) => store.dispatch("setTip", { msg, fn })

export { openLoading, tip }