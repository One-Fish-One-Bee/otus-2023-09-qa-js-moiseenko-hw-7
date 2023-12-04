
import testConfig from "../../framework/config";
import expectData from "../../framework/expectData";
import { dynamicUserCredentil } from "../../framework/fixtures";
import { booksStore, constructor, localRequest, asd } from "../../framework/services";

describe("Позитивные сценарии", () => {
  test("Авторизация прошла успешно, после получения токена", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.account.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)
    user = await localRequest.account.createToken(user, testConfig.baseUrl, testConfig.endpointsAccount.generateToken, testConfig.methods.post)

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.authorized)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await booksStore.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toBe(true)
  })
})

describe("Негативные сценарии", () => {
  test("Запросить авторизацию, без получения токена", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.account.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.authorized)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await booksStore.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toBe(false)
  })
  test("Запросить авторизацию, c несуществующим пользователем", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.authorized)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await booksStore.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual(expectData.userNotFound)
  })
  test("Запросить авторизацию, c неправильным пароллем", async () => {
    let user = { userCredentil: dynamicUserCredentil() }

    user = await localRequest.account.createUser(user, testConfig.baseUrl, testConfig.endpointsAccount.user, testConfig.methods.post)
    user = await localRequest.account.createToken(user, testConfig.baseUrl, testConfig.endpointsAccount.generateToken, testConfig.methods.post)

    user.userCredentil.password = "123"

    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.authorized)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await booksStore.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual(expectData.userNotFound)
  })

})
