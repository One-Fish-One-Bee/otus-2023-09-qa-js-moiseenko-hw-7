
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
  test("Успешное получаение информации о пользователе, с авторизацией", async () => {
    const responseGetUser = await localRequest.account.getUser(baseUrl, user)
    const jsonResponseGetUser = await responseGetUser.json()

    expect(responseGetUser.status).toBe(200)
    expect(jsonResponseGetUser.username).toBe(user.userCredentil.userName)
    expect(jsonResponseGetUser.userId).toBe(user.userId)
  })
})

describe("Негативные сценарии", () => {
  test("Пользователь запрашивает данные по пользователю, без авторизации и генерации токена", async () => {
    let user = { userCredentil: dynamicUserCredentil() }
    const responseCreateUser = await localRequest.account.createUser(baseUrl, user)

    const responseGetUser = await localRequest.account.getUser(baseUrl, user)
    const jsonResponseGetUser = await responseGetUser.json()

    expect(responseGetUser.status).toBe(401)
    expect(jsonResponseGetUser).toEqual(expectData.userNotFound)
  })
  test("Запрос не существующего пользователя", async () => {
    let user = { userCredentil: dynamicUserCredentil() }
    const responseCreateUser = await localRequest.account.createUser(baseUrl, user)

    const responseGenerateToken = await localRequest.account.generateToken(baseUrl, user)
    const jsonResponseGenerateToken = await responseGenerateToken.json()
    user.token = jsonResponseGenerateToken.token

    const responseAuthorized = await localRequest.account.authorized(baseUrl, user)

    user.userId = 123144444

    const responseGetUser = await localRequest.account.getUser(baseUrl, user)
    const jsonResponseGetUser = await responseGetUser.json()

    expect(responseGetUser.status).toBe(401)
    expect(jsonResponseGetUser).toEqual(expectData.userNotFound)
  })
})
