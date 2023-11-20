
import testConfig from "../../framework/config";
import expectData from "../../framework/expectData";
import { dynamicUserCredentil } from "../../framework/fixtures";
import { account, constructor, localRequest, asd } from "../../framework/services";

describe("Позитивные сценарии", () => {
  test("Успешное получаение информации о пользователе, с авторизацией", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)
    user = await localRequest.createToken(user, testConfig.baseUrl, testConfig.endpointsAccount.generateToken, testConfig.methods.post)
    user = await localRequest.createAuth(user, testConfig.baseUrl, testConfig.endpointsAccount.authorized, testConfig.methods.post)

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.get, headers)
    const response = await account.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.username).toBe(user.userCredentil.userName)
    expect(data.userId).toBe(user.userId)
  })
})

describe("Негативные сценарии", () => {
  test("Пользователь запрашивает данные по пользователю, без авторизации и генерации токена", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)
     
    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.get, headers)
    const response = await account.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data).toEqual(expectData.userNotAuthorized)
  })
  test("Запрос не существующего пользователя", async () => {
    let user = { userCredentil: dynamicUserCredentil() }
    user = await localRequest.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)
    user = await localRequest.createToken(user, testConfig.baseUrl, testConfig.endpointsAccount.generateToken, testConfig.methods.post)
    user = await localRequest.createAuth(user, testConfig.baseUrl, testConfig.endpointsAccount.authorized, testConfig.methods.post)

    user.userId = 123144444

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.del, headers)
    const response = await account.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual(expectData.userIdNotCorrect)
  })
})
