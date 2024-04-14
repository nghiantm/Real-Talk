import { myAxios, pyAxios } from "./myAxios";

export const getProfile = (email) => {
    return myAxios.get(`/api/profiles?email=${email}`)
        .then((res) => {
            return res.data.result
        })
        .catch((err) => {
            throw err;
        })
}

export const postProfile = (body) => {
    return myAxios.post(`/api/profiles`, body)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw err;
        })
}

export const getChat = (email) => {
    return myAxios.get(`/api/chats?email=${email}`)
        .then((res) => {
            return res.data.result
        })
        .catch((err) => {
            throw err;
        })
}

export const postChat = (body) => {
    return myAxios.post(`/api/chats`, body)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}


/*
    Param: messages = [
        { role: "xxx", content: "xxx"},
        ...
    ]
*/
export const generateResponse = (body) => {
    return pyAxios.post(`/generate_response`, body)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}

export const assessLevel = (text) => {
    const body = {
        text: [
            text
        ]
    }
    return pyAxios.post(`/predict_prof`, body)
        .then((res) => {
            console.log(res);
            return res.data.prediction[0]
        })
        .catch((err) => {
            throw err;
        })
}

export const addLevel = (email, value) => {
    const body = {
        "email": email,
        "value": value
    }
    return myAxios.post(`/api/levels`, body)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw err;
        })
}

export const getLevel = (email) => {
    return myAxios.get(`/api/levels/${email}`)
        .then((res) => {
            console.log(res);
            return res.data.average;
        })
        .catch((err) => {
            throw err;
        })
}