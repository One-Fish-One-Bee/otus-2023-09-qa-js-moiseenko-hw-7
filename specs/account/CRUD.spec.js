
import { config } from "../../framework/config.js"
import { dynamicUserCredentil } from "../../framework/fixtures"
import expectData from "../../framework/expectData.js";
import { localRequest } from "../../framework/services"
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
  test("Успешное удаление пользователя", async () => {

    const responseDelUser = await localRequest.account.delUser(baseUrl, user)
    const jsonResponseDelUser = await responseDelUser.text()

    expect(responseDelUser.status).toBe(204)
  })
  test("По удалённому пользователю нет информации", async () => {

    const responseGetUser = await localRequest.account.getUser(baseUrl, user)
    const jsonResponseGetUser = await responseGetUser.json()

    console.log(jsonResponseGetUser)

    expect(responseGetUser.status).toBe(401)
    expect(jsonResponseGetUser).toEqual(expectData.userNotFound)
  })

})
