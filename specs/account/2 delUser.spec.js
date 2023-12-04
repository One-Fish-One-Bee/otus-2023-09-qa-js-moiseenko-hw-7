
import testConfig from "../../framework/config";
import expectData from "../../framework/expectData";
import { dynamicUserCredentil } from "../../framework/fixtures";
import { booksStore, constructor, localRequest, asd } from "../../framework/services";

describe("Позитивные сценарии", () => {
  test("Удаление пользователя прошло успешно, с авторизацией", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.account.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)
    user = await localRequest.account.createToken(user, testConfig.baseUrl, testConfig.endpointsAccount.generateToken, testConfig.methods.post)
    user = await localRequest.account.createAuth(user, testConfig.baseUrl, testConfig.endpointsAccount.authorized, testConfig.methods.post)

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.del, headers)
    const response = await booksStore.request(url, options)
    const data = await response.text()

    expect(response.status).toBe(204)
  })
})

describe("Негативные сценарии", () => {
  test("Удаление пользователя не прошло успешно, без создания токена", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.account.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.del, headers)
    const response = await booksStore.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data).toEqual(expectData.userNotAuthorized)
  })
  test("Удаление несуществующего пользователя", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.account.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)
    user = await localRequest.account.createToken(user, testConfig.baseUrl, testConfig.endpointsAccount.generateToken, testConfig.methods.post)
    user = await localRequest.account.createAuth(user, testConfig.baseUrl, testConfig.endpointsAccount.authorized, testConfig.methods.post)

    user.userId = 123144444

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.del, headers)
    const response = await booksStore.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual(expectData.userIdNotCorrect)
  })
})
