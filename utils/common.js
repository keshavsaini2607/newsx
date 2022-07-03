export const errorHandler = (data, res, statusCode = 400) => {
    res.status(statusCode).json({
        error: true,
        message: data,
    })
}

export const responseHandler = (data, res, statusCode = 200) => {
    res.status(statusCode).json({
        error: false,
        body: data,
    })
}

export const validateFields = (fields) => {
    for(let key in fields) {
        if(fields[key].trim() === "") {
            throw `${key} is required`
        }
    }
}