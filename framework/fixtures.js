
// в файл подтягиваем библиотеку faket, для генерации динамических данных
import { faker } from '@faker-js/faker';

// в файле создаём объект dynamicUserCredentil, для создания рандомной почты и пароля
export const dynamicUserCredentil = () => {
    return {
        userName: faker.internet.email(),
        password: "1aAz-^37skcu!"
        /*faker.internet.password({ length: 16, pattern: /[A-Za-z0-9!#@$]/ })*/
    }
}

export const existingUser = () => {
    return {
        userName: 'test',
        password: faker.internet.password({ length: 16, pattern: /[A-Z]/ })
    }
}
