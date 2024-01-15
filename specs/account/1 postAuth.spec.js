
import { config } from "../../framework/config.js"
import { dynamicUserCredentil, dontExistingUser } from "../../framework/fixtures.js"
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
})

describe("Негативные сценарии", () => {
  test("Запросить авторизацию, без получения токена", async () => {
    let user = { userCredentil: dynamicUserCredentil() }
    const responseCreateUser = await localRequest.account.createUser(baseUrl, user)

    const responseAuthorized = await localRequest.account.authorized(baseUrl, user)
    const jsonResponseAuthorized = await responseAuthorized.json()

    expect(responseAuthorized.status).toBe(200)
    expect(jsonResponseAuthorized).toBe(false)
  })
  test("Запросить авторизацию, c несуществующим пользователем", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    const responseAuthorized = await localRequest.account.authorized(baseUrl, user)
    const jsonResponseAuthorized = await responseAuthorized.json()

    expect(responseAuthorized.status).toBe(404)
    expect(jsonResponseAuthorized).toEqual(expectData.userNotFound)
  })

  test("Запросить авторизацию, c неправильным пароллем", async () => {
    let user = { userCredentil: dynamicUserCredentil() }
    const responseCreateUser = await localRequest.account.createUser(baseUrl, user)
    const responseGenerateToken = await localRequest.account.generateToken(baseUrl, user)
    const jsonResponseGenerateToken = await responseGenerateToken.json()
    user.token = jsonResponseGenerateToken.token

    user.userCredentil.password = "123"

    const responseAuthorized = await localRequest.account.authorized(baseUrl, user)
    const jsonResponseAuthorized = await responseAuthorized.json()

    expect(responseAuthorized.status).toBe(404)
    expect(jsonResponseAuthorized).toEqual(expectData.userNotFound)
  })
})
