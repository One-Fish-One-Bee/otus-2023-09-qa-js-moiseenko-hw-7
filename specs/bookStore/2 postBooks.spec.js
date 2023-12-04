
import testConfig from "../../framework/config";
import expectData from "../../framework/expectData";
import { dynamicUserCredentil } from "../../framework/fixtures";
import { booksStore, constructor, localRequest, asd } from "../../framework/services";

describe("Позитивные сценарии", () => {
    jest.setTimeout(60000);
    test("Книга успешно добавлена", async () => {
        let user = { userCredentil: dynamicUserCredentil() }
        console.log("User создан:", user)
        user = await localRequest.account.createUser(user)
        console.log("Пользователь создан:", user)
        user = await localRequest.account.createToken(user)
        console.log("Пользователь получил токен:", user)
        user = await localRequest.account.createAuth(user)
        console.log("Пользователь успешно авторизовался:", user)
        /*
                user = await localRequest.account.delUser(user)
                console.log("Пользователь успешно удалён:", user)
        */
        user = await localRequest.booksStore.getBooks(user)
        console.log("Успешное получение списка книг", user)

        user = await localRequest.booksStore.addBooks(user)
        console.log("Успешное добавление книги", user)

    })
})
