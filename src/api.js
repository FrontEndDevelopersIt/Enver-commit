import axios from 'axios'

function postData(url, params, /*defaultUrl*/) {
    let msg = 'kaka';
    axios.post(url, params).then(response =>{
        switch (response.status){
            case(201) :
                msg = 'Success';
                break;
            case(401) :
                msg = 'Wrong password';
                break;
            case(403) :
                msg = 'Account was not activated';
                break;
            case(404) :
                msg = 'Wrong email';
                break;
            case(422) :
                msg = 'Invalid user data';
                break;
            case(500) :
                msg = 'Undeclared error';
                break;
            default:
                msg = 'Something wrong';
        }
        if(response.status === 201)
        {
            if(response.data.data.token !== null || response.data.data.token !== undefined) {
                localStorage.setItem('JWT', response.data.data.token);
            }
           /* location.href = defaultUrl;*/
        }
    }).catch(error =>{

    });
    return msg;
}

function getData(url, params, defaultUrl){
    let msg = '';
    axios.get(url, params).then(response=>{
        switch(response.status){
            case(200) :
                msg = 'Success';
                break;
            case(202) :
                msg = 'Password reset link sent';
                break;
            case(400) :
                msg = 'Bad request';
                break;
            case(401) :
                msg = 'Token expired or blacklisted';
                break;
            case(404) :
                msg = 'Not found';
                break;
            case(422) :
                msg = 'Invalid user data';
                break;
            default:
                msg = 'Something wrong';
        }
        if(response.status >=200 && response.status <= 202)
        {
            location.href = defaultUrl;
        }
    }).catch(error=>{

    }
    );
    return msg;
}

/**
 * @return {string}
 */
function PatchData(url, params,defaultUrl){
    let msg = '';
    axios.patch(url,params).then(response=>
    {
        switch (response.status) {
            case(204) :
                msg = 'Success';
                break;
            case(400) :
                msg = 'Provided data is invalid and can not be used (validator error) / Token absent or invalid';
                break;
            case(401) :
                msg = 'Token expired or blacklisted';
                break;
            default: msg = 'Something wrong';
        }
        if(response.status >=200 && response.status <= 204)
        {
            location.href = defaultUrl;
        }
    }).catch(error =>
    {

    });
    return msg;
}

/**
 * @return {string}
 */
function DeleteData(url, params) {
    let msg = '';
    axios.delete(url,params).then(response=>
    {
        switch (response.status) {
            case(204) :
                msg = 'Success';
                break;
            case(404) :
                msg = 'Not Found';
                break;
            default:
                msg = 'Something wrong';
        }
    }).catch(error =>
    {

    });
    return msg;
}

export  default {
    postData,
    getData,
    PatchData,
    DeleteData
}