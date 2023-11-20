
// в файл подтягиваем настройки окружения, динамические данные, набор функций и ождиемые данные
import testConfig from "../../framework/config";
import { dynamicUserCredentil } from "../../framework/fixtures";
import { account, constructor } from "../../framework/services";
import expectData from "../../framework/expectData";



describe("Функциональное тестирование API по циклу CRUD", () => {
  let user = { userCredentil: dynamicUserCredentil() }
  test("Пользователь успешно создан", async () => {
    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await account.request(url, options)
    const data = await response.json()
    user.userId = data.userID

    expect(response.status).toBe(201)
    expect(user.userCredentil.userName).toBe(data.username)
  })
  test("Токен успешно получен", async () => {
    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.generateToken)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await account.request(url, options)
    const data = await response.json()
    user.token = data.token

    expect(response.status).toBe(200)
    expect(data.status).toBe("Success")
    expect(data.result).toBe("User authorized successfully.")
  })
  test("Авторизация прошла успешно", async () => {
    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.authorized)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await account.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toBe(true)
  })
  test("Успешное получение информации о пользователе ", async () => {
    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.get, headers)
    const response = await account.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.username).toBe(user.userCredentil.userName)
    expect(data.userId).toBe(user.userId)
  })
  test("Успешное удаление пользователя ", async () => {
    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.user, `/${user.userId}`)
    const headers = constructor.createHeaders(user.token)
    const options = constructor.createOptions(testConfig.methods.del, headers)
    const response = await account.request(url, options)

    expect(response.status).toBe(204)
  })
  test("Пользователь не существует", async () => {
    const url = constructor.createUrl(testConfig.baseUrl, testConfig.endpointsAccount.authorized)
    const headers = constructor.createHeaders()
    const options = constructor.createOptions(testConfig.methods.post, headers, user.userCredentil)
    const response = await account.request(url, options)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(expectData.userNotFound).toEqual(data)
  })
})