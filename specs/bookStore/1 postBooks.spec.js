
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
    test("Успешный запрос информации о пользователе", async () => {

        const responseGetUser = await localRequest.account.getUser(baseUrl, user)
        const jsonResponseGetUser = await responseGetUser.json()

        expect(responseGetUser.status).toBe(200)
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
})

describe("Негативные сценарии", () => {
    test("Добавить книгу с несуществующим isbn", async () => {

        let user = { userCredentil: dynamicUserCredentil() }

        const responseCreateUser = await localRequest.account.createUser(baseUrl, user)
        const jsonResponseCreateUser = await responseCreateUser.json()

        user.userId = jsonResponseCreateUser.userID

        const responseGenerateToken = await localRequest.account.generateToken(baseUrl, user)
        const jsonResponseGenerateToken = await responseGenerateToken.json()

        user.token = jsonResponseGenerateToken.token

        const responseAuthorized = await localRequest.account.authorized(baseUrl, user)

        user.isbn = "9781593277573"

        const responseCreateBooks = await localRequest.booksStore.createBooks(baseUrl, user)
        const jsonResponseCreateBooks = await responseCreateBooks.json()

        expect(responseCreateBooks.status).toBe(400)
        expect(jsonResponseCreateBooks).toEqual(expectData.isdbnNotFound)

    })
    test("Добавить книгу с несуществующим userId", async () => {

        let user = { userCredentil: dynamicUserCredentil() }

        const responseCreateUser = await localRequest.account.createUser(baseUrl, user)
        const jsonResponseCreateUser = await responseCreateUser.json()

        user.userId = jsonResponseCreateUser.userID

        const responseGenerateToken = await localRequest.account.generateToken(baseUrl, user)
        const jsonResponseGenerateToken = await responseGenerateToken.json()

        user.token = jsonResponseGenerateToken.token

        const responseAuthorized = await localRequest.account.authorized(baseUrl, user)

        const responseGetBooks = await localRequest.booksStore.getBooks(baseUrl)
        const jsonResponseGetBooks = await responseGetBooks.json()

        user.isbn = jsonResponseGetBooks.books[0].isbn

        user.userId = "9781593277573"

        const responseCreateBooks = await localRequest.booksStore.createBooks(baseUrl, user)
        const jsonResponseCreateBooks = await responseCreateBooks.json()

        expect(responseCreateBooks.status).toBe(401)
        expect(jsonResponseCreateBooks).toEqual(expectData.userIdNotCorrect)

    })
})