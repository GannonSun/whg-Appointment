module.exports = {
    devServer: {
        proxy: {
            //匹配规则
            "/api": {
                //要访问的跨域的域名
                target: "http://118.25.4.192:7001", //线上环境
                // target: "http://localhost:7001", //本地环境
                changOrigin: true, //开启代理
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};
