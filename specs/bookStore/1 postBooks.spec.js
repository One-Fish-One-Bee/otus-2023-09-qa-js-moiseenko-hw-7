
import testConfig from "../../framework/config";
import expectData from "../../framework/expectData";
import { dynamicUserCredentil } from "../../framework/fixtures";
import { booksStore, constructor, localRequest, asd } from "../../framework/services";

describe("Позитивные сценарии", () => {
    beforeAll
    test("Книга успешно добавлена", async () => {
        let user = { userCredentil: dynamicUserCredentil() }
        console.log("User создан:", user)

        user = await localRequest.account.createUser(user)
        console.log("Пользователь создан:", user)
        user = await localRequest.account.createToken(testConfig.baseUrl, testConfig.endpointsAccount.generateToken, testConfig.methods.post, user)
        console.log("Получен токен:", user)
        user = await localRequest.account.createAuth(testConfig.baseUrl, testConfig.endpointsAccount.authorized, testConfig.methods.post, user)
        console.log("Пользователь атворизован:", user)
        user = await localRequest.booksStore.getBooks(testConfig.baseUrl, testConfig.endpointsBookStore.books, testConfig.methods.get, user)
        console.log("Получена книга:", user)

        const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsBookStore.books)
        const headers = constructor.createHeaders(user.token)

        let body = {
            userId: user.userId,
            collectionOfIsbns: [
                {
                    isbn: user.books.isbn
                }
            ]
        }

        const options = constructor.createOptions(testConfig.methods.post, headers, body)
        const response = await booksStore.request(url, options)
        const data = await response.json()
        console.log(data)

        expect(response.status).toBe(200)
        expect(data).toBe(true)
    })
})



"string" = "Привет Татьяна!"
Number = 1 
Object = {} = {
    asda: 1,
    asdsa: "123123".
} = { asdasd, asdasd, 1, true}
list = [] = [{}, ...] = [ asdasd, asdasd, 1, true], [{asdasd, asdasd, 1, true}, ...]
bolean = true / false 

