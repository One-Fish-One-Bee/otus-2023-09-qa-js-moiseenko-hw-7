
// создаем окружение
const testConfig = {
    baseUrl: "https://bookstore.demoqa.com",
    endpointsAccount: {
        user: "/Account/v1/User/",
        authorized: "/Account/v1/Authorized",
        generateToken: "/Account/v1/GenerateToken"
    },
    endpointsBookStore: {
        book: "/BookStore/v1/Book",
        books: "/BookStore/v1/Books",
    }
}

export default testConfig;
