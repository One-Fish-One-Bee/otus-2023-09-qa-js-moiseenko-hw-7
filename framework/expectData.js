
const expectData = {
    incorrectPpassword: {
        code: '1300',
        message: "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    },
    userNotFound: {
        code: '1207',
        message: 'User not found!'
    },
    userNotAuthorized: {
        code: '1200',
        message: 'User not authorized!'
    },
    userIdNotCorrect: {
        code: '1207',
        message: 'User Id not correct!'
    },
    userInfo: {
        userId: 'f26ae0f3-5b84-48e5-b8e2-790708e8d9d0',
        username: 'Aleen_Donnelly@hotmail.com',
        books: []
    },
    isdbnNotFound: {
        code: '1205',
        message: 'ISBN supplied is not available in Books Collection!'
    },
    isbnConflict: {
        code: '1206',
        message: "ISBN supplied is not available in User's Collection!"
    }
}

export default expectData;