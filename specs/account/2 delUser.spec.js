
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
  test("Удаление пользователя прошло успешно, с авторизацией", async () => {
    const responseDelUser = await localRequest.account.delUser(baseUrl, user)
    const jsonResponseDelUser = await responseDelUser.text()

    expect(responseDelUser.status).toBe(204)
  })
})

describe("Негативные сценарии", () => {
  test("Удаление пользователя не прошло успешно, без создания токена", async () => {
    let user = { userCredentil: dynamicUserCredentil() }
    const responseCreateUser = await localRequest.account.createUser(baseUrl, user)
    const responseDelUser = await localRequest.account.delUser(baseUrl, user)
    const jsonResponseDelUser = await responseDelUser.json()

    expect(responseDelUser.status).toBe(200)
    expect(jsonResponseDelUser).toEqual(expectData.userIdNotCorrect)
  })
  test("Удаление несуществующего пользователя", async () => {
    let user = { userCredentil: dynamicUserCredentil() }
    const responseCreateUser = await localRequest.account.createUser(baseUrl, user)
    const responseGenerateToken = await localRequest.account.generateToken(baseUrl, user)
    const responseAuthorized = await localRequest.account.authorized(baseUrl, user)

    user.userId = 123144444

    const responseDelUser = await localRequest.account.delUser(baseUrl, user)
    const jsonResponseDelUser = await responseDelUser.json()

    expect(responseDelUser.status).toBe(200)
    expect(jsonResponseDelUser).toEqual(expectData.userIdNotCorrect)
  })
})
