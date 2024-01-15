
import { config } from "../../framework/config.js"
import expectData from "../../framework/expectData.js"
import { dynamicUserCredentil } from "../../framework/fixtures.js"
import { localRequest } from "../../framework/services.js"
const baseUrl = config.baseUrl

describe("Позитивные сценарии", () => {
    let user = { userCredentil: dynamicUserCredentil() }
    test("Пользователь успешно создан", async () => {

        const responseCreateUser = await localRequest.account.createUser(baseUrl, user)
        const jsonResponseCreateUser = await responseCreateUser.json()

        expect(responseCreateUser.status).toBe(201)
        user.userId = jsonResponseCreateUser.userID
    })
    test("Токен успешно получен", async () => {

        const responseGenerateToken = await localRequest.account.generateToken(baseUrl, user)
        const jsonResponseGenerateToken = await responseGenerateToken.json()

        expect(responseGenerateToken.status).toBe(200)
        user.token = jsonResponseGenerateToken.token
    })
    test("Пользователь успешно авторизованн", async () => {

        const responseAuthorized = await localRequest.account.authorized(baseUrl, user)
        const jsonResponseAuthorized = await responseAuthorized.json()

        expect(responseAuthorized.status).toBe(200)
        expect(jsonResponseAuthorized).toBe(true)
    })
    test("Успешное получение списка книг", async () => {

        const responseGetBooks = await localRequest.booksStore.getBooks(baseUrl)
        const jsonResponseGetBooks = await responseGetBooks.json()

        expect(responseGetBooks.status).toBe(200)

        user.isbn = jsonResponseGetBooks.books[0].isbn
    })
    test("Успешное создание книги", async () => {

        const responseCreateBooks = await localRequest.booksStore.createBooks(baseUrl, user)
        const jsonResponseCreateBooks = await responseCreateBooks.json()

        expect(responseCreateBooks.status).toBe(201)
    })
    test("Успешное удаление книги", async () => {

        const responseDelBook = await localRequest.booksStore.delBook(baseUrl, user)
        const jsonResponseDelBook = await responseDelBook.text()

        expect(responseDelBook.status).toBe(204)
    })
})

