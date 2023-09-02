// axios 公共配置
// 基地址
axios.defaults.baseURL = "http://geek.itheima.net"

// 请求拦截器
axios.interceptors.request.use(config => {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = `Bearer ${token}`)
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    // Do something before response is sent
    const result = response.data
    return result;
}, error => {
    // Do something with response error
    // console.dir(error);
    if (error?.response?.status === 401) {
        alert('验证身份失败，请重新登录')
        localStorage.clear()
        location.href = '../login/index.html'

    }
    return Promise.reject(error);
});