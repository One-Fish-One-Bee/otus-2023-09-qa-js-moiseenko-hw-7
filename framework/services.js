
// создаём объект account
export const account = {
    async request(url, options) {
        const response = await fetch(url, options)
        return response
    }
}

export const localRequest = {
    async createUser(user, baseUrl, endpointsAccount, method) {
        let params = constructor.createParams(user.userCredentil, baseUrl, endpointsAccount, method)
        const response = await account.request(params.url, params.options)
        const data = await response.json()
        user.userId = data.userID
        return user
    },
    async createToken(user, baseUrl, endpointsAccount, method) {
        let params = constructor.createParams(user.userCredentil, baseUrl, endpointsAccount, method)
        const response = await account.request(params.url, params.options)
        const data = await response.json()
        user.token = data.token
        return user
    },
    async createAuth(user, baseUrl, endpointsAccount, method) {
        let params = constructor.createParams(user.userCredentil, baseUrl, endpointsAccount, method)
        const response = await account.request(params.url, params.options)
        const data = await response.json()
        user.auth = data
        return user
    },/*
    async getUser(){}
    */
    async delUser(user, baseUrl, endpointsAccount, method) {
        let params = constructor.createParams(user.userCredentil, baseUrl, endpointsAccount, method)
        const response = await account.request(params.url, params.options)
        const data = await response.json()
        user.userId = data.userID
        return user
    }
}

// создаём объект constructor
export const constructor = {
    createUrl(baseUrl, endpoint, params = null) {
        let url
        switch (params) {
            case null:
                url = `${baseUrl}${endpoint}`
                break;
            default:
                url = `${baseUrl}${endpoint}${params}`
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
        }
        return options
    },
    createParams(userCredentil, baseUrl, endpointsAccount, method) {
        const url = constructor.createUrl(baseUrl, endpointsAccount)
        const headers = constructor.createHeaders()
        const options = constructor.createOptions(method, headers, userCredentil)
        return {
            url: url,
            options: options
        }
    },
    createObjectUser(userCredentil, userId) {
        return {
            userCredentil: userCredentil,
            userId: userId
        }
    }
}