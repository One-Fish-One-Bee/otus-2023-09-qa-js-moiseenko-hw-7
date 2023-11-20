
// создаем окружение
const testConfig = {
    baseUrl: "https://bookstore.demoqa.com",
    methods: {
        get: "get",
        post: "post",
        put: "put",
        del: "delete"
    },
    endpointsAccount: {
        user: "/Account/v1/User",
        authorized: "/Account/v1/Authorized",
        generateToken: "/Account/v1/GenerateToken"
    }
}

export default testConfig;
