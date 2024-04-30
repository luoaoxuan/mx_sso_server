import axios from "axios";

const request=axios.create({
    timeout:8000
})


// 响应拦截器
request.interceptors.response.use(res => {
    return res.data
})

export default request