
import { config } from "../../framework/config.js"
import { dynamicUserCredentil } from "../../framework/fixtures.js"
import expectData from "../../framework/expectData.js";
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
    test("Успешное получение книги", async () => {

        const responseGetBook = await localRequest.booksStore.getBook(baseUrl, user.isbn)
        const jsonResponseGetBook = await responseGetBook.json()

        expect(responseGetBook.status).toBe(200)
    })
})

describe("Негативный сценарии", () => {
    test("Запросить не существующую книгу", async () => {
        let user = { userCredentil: dynamicUserCredentil() }

        const responseCreateUser = await localRequest.account.createUser(baseUrl, user)

        const responseGenerateToken = await localRequest.account.generateToken(baseUrl, user)
        const jsonResponseGenerateToken = await responseGenerateToken.json()
        user.token = jsonResponseGenerateToken.token

        const responseAuthorized = await localRequest.account.authorized(baseUrl, user)

        user.isbn = "123144444"

        const responseGetBook = await localRequest.booksStore.getBook(baseUrl, user.isbn)
        const jsonResponseGetBook = await responseGetBook.json()

        console.log(jsonResponseGetBook)

        expect(responseGetBook.status).toBe(400)
        expect(jsonResponseGetBook).toEqual(expectData.isdbnNotFound)
    })
})