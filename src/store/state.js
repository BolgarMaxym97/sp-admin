import Cookies from "js-cookie";

export default {
    token: Cookies.get("token") || "",
    user: localStorage.getItem("user")  ? JSON.parse(localStorage.getItem("user")) : {},
    customers: [],
};