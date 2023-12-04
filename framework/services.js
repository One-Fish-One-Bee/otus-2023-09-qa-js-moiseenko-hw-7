import testConfig from "../framework/config";

export const booksStore = {
    async request(url, options) {
        const response = await fetch(url, options)
        return response
    }
}

export const localRequest = {
    account: {
        async createUser(body) {
            const params = constructor.createParams(null, "post", testConfig.baseUrl, testConfig.endpointsAccount.user, null, body.userCredentil)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.userId = data.userID
            return body
        },
        async createToken(body) {
            let params = constructor.createParams(null, "post", testConfig.baseUrl, testConfig.endpointsAccount.generateToken, null, body.userCredentil)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.token = data.token
            return body
        },
        async createAuth(body) {
            let params = constructor.createParams(null, "post", testConfig.baseUrl, testConfig.endpointsAccount.authorized, null, body.userCredentil)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.auth = data
            return body
        },
        async delUser(body) {
            let params = constructor.createParams(body.token, "delete", testConfig.baseUrl, testConfig.endpointsAccount.user, body.userId, null)
            const response = await booksStore.request(params.url, params.options)
            body.statusDelete = response.status
            return body
        }
    },
    booksStore: {
        async getBooks(body) {
            let params = constructor.createParams(null, "get", testConfig.baseUrl, testConfig.endpointsBookStore.books, null, null)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.books = data.books[0]
            return body
        },
        async addBooks(body) {
            let body2 = {
                "userId": body.userId,
                "collectionOfIsbns": [
                    {
                        "isbn": body.books.isbn
                    }
                ]
            }
            let params = constructor.createParams(body.token, "post", testConfig.baseUrl, testConfig.endpointsBookStore.books, null, body2)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.isbn = data.isbn
            return body
        },
        async updateBooks(baseUrl, endpoint, method, body) {
            let params = constructor.createParams(baseUrl, endpoint, method, body.userCredentil)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.isbn = data.books[0].isbn
            return body
        },
        async getBook(baseUrl, endpoint, method, body) {
            let params = constructor.createParams(baseUrl, endpoint, method, body.userCredentil)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.book = data.book
            return body
        },
        async delBook(baseUrl, endpoint, method, body) {
            let params = constructor.createParams(baseUrl, endpoint, method, body.userCredentil)
            const response = await booksStore.request(params.url, params.options)
            const data = await response.json()
            body.message = data.message
            return body
        }
    }
}

// создаём объект constructor
export const constructor = {
    createUrl(baseUrl, endpoint, additionalPath = null) {
        let url
        switch (additionalPath) {
            case null:
                url = `${baseUrl}${endpoint}`
                break;
            default:
                url = `${baseUrl}${endpoint}${additionalPath}`
                break;
        }
        return url
    },
    createHeaders(authorization = null) {
        let headers
        switch (authorization) {
            case null:
                headers = {
                    'Content-Type': 'application/json'
                }
                break;
            default:
                headers = {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${authorization}`
                }
                break;
        }
        return headers
    },
    createOptions(method, headers, body = null) {
        let options
        switch (body) {
            case null:
                options = {
                    method: method,
                    headers: headers,
                }
                break;
            default:
                options = {
                    method: method,
                    headers: headers,
                    body: JSON.stringify(body)
                }
                break;
        }
        return options
    },
    createParams(authorization = null, method, baseUrl, endpoint, additionalPath = null, body = null) {
        let options
        let url = constructor.createUrl(baseUrl, endpoint, additionalPath)
        let headers = constructor.createHeaders(authorization)
        switch (body) {
            case null:
                options = constructor.createOptions(method, headers)
                break;
            default:
                options = constructor.createOptions(method, headers, body)
                break;
        }
        return {
            url: url,
            options: options
        }
    }
}