
export const localRequest = {
    baseUrl: '',
    account: {
        async createUser(baseUrl, body) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json"
            });
            try {
                const response = await fetch(`${baseUrl}/Account/v1/User`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body.userCredentil)
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async generateToken(baseUrl, body) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json"
            });
            try {
                const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body.userCredentil)
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async authorized(baseUrl, body) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`
            });
            try {
                const response = await fetch(`${baseUrl}/Account/v1/Authorized`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body.userCredentil)
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async getUser(baseUrl, body) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`
            });
            try {
                const response = await fetch(`${baseUrl}/Account/v1/User/${body.userId}`, {
                    method: "GET",
                    headers: myHeaders
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async delUser(baseUrl, body) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`
            });
            try {
                const response = await fetch(`${baseUrl}/Account/v1/User/${body.userId}`, {
                    method: "DELETE",
                    headers: myHeaders
                });
                /*console.log("Успех, статус код:", JSON.stringify(response.status))*/
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        }
    },
    booksStore: {
        async getBooks(baseUrl) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json"
            });
            try {
                const response = await fetch(`${baseUrl}/BookStore/v1/Books`, {
                    method: "GET",
                    headers: myHeaders
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async createBooks(baseUrl, body) {
            const myHeaders = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`
            });
            const myBody = {
                "userId": body.userId,
                "collectionOfIsbns": [
                    {
                        "isbn": body.isbn
                    }
                ]
            }
            try {
                const response = await fetch(`${baseUrl}/BookStore/v1/Books`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(myBody)
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async updateBooks(baseUrl, body) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`
            });
            const myBody = {
                "userId": body.userId,
                "isbn": body.isbn2
            }
            try {
                const response = await fetch(`${baseUrl}/BookStore/v1/Books/${body.isbn}`, {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(myBody)
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async getBook(isbn) {
            const myHeaders = new Headers({
                "accept": "application/json",
                "Content-Type": "application/json"
            });
            try {
                const url = `${localRequest.baseUrl}/BookStore/v1/Book?ISBN=${isbn}`
                const response = await fetch(url, {
                    method: "GET",
                    headers: myHeaders
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async delBook(baseUrl, body) {
            const myHeaders = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`
            });
            let myBody = {
                "userId": body.userId,
                "isbn": body.isbn
            }
            if (Object.keys(body).includes('isbn2')) {
                myBody = {
                    "userId": body.userId,
                    "isbn": body.isbn2
                }
            }
            try {
                const response = await fetch(`${baseUrl}/BookStore/v1/Book`, {
                    method: "DELETE",
                    headers: myHeaders,
                    body: JSON.stringify(myBody)
                });
                console.log("Успех, статус код:", JSON.stringify(response.status))
                return response
            } catch (error) {
                console.log("Ошибка:", error)
            }
        },
        async paramsDelBook(baseUrl, body) {
            const myHeaders = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`
            });
            let myBody = {
                "userId": body.userId,
                "isbn": body.isbn
            }
            if (Object.keys(body).includes('isbn2')) {
                myBody = {
                    "userId": body.userId,
                    "isbn": body.isbn2
                }
            }

            const response = await fetch(`${baseUrl}/BookStore/v1/Book`, {
                method: "DELETE",
                headers: myHeaders,
                body: JSON.stringify(myBody)
            });

            return JSON.stringify(response.status)
        }
    }
}
