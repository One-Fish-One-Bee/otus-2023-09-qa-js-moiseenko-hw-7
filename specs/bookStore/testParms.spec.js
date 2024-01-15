
import { config } from "../../framework/config.js"
import { localRequest } from "../../framework/services.js"

localRequest.baseUrl = config.baseUrl
describe("Параметизированный тест", () => {
    test.each([
        {
            isbn: 9781449325862,
            expected: 200,
            fields: ["isbn", "title", "subTitle", "author", "publish_date", "publisher", "pages", "description", "website"]
        },
        {
            isbn: 9781449325863,
            expected: 400,
            fields: ["code", "message"]
        },
        {
            isbn: null,
            expected: 400,
            fields: ["code", "message"]
        }
    ])('getBook($isbn) return $expected', async ({ isbn, expected, fields }) => {
        const response = await localRequest.booksStore.getBook(isbn)
        expect(response.status).toBe(expected)

        const jsonResponse = await response.json()
        expect(Object.keys(jsonResponse)).toEqual(fields)
    })
})

/*
import { config } from "../../framework/config.js"
import { localRequest } from "../../framework/services.js"
const baseUrl = config.baseUrl

describe("Параметизированный тест", () => {
    test.each`
        isbn                | expected  | fields
        ${9781449325862}    | ${200}    | ${["isbn", "title", "subTitle", "author", "publish_date", "publisher", "pages", "description", "website"]}
        ${9781449325863}    | ${400}    | ${["code", "message"]}
        ${9781449325863}    | ${400}    | ${["code", "message"]}
    `('getBook($isbn) return $expected', async ({ isbn, expected, fields }) => {
        const response = await localRequest.booksStore.getBook(baseUrl, isbn)
        expect(response.status).toBe(expected)

        const jsonResponse = await response.json()
        expect(Object.keys(jsonResponse)).toEqual(fields)
    })
})
*/
