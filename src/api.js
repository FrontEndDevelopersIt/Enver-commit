// return {
//     post,
//     get,
//     put,
//     delete
// };
// const ERROR = 'error'
// function post(url, params) {
//     axios.post(url, params)
//         .then(response => {
//             if (response.data.error) {
//                 reject(error)
//             }
//         }).catch(error => {
//         notificationService.pushNotification({
//             type: ERROR,
//             text: error.message,
//             timeout: 100
//         })
//     })
// }
import axios from 'axios'

function postData(url, params) {
    let msg = '';
    axios.post(url, params).then(response =>{
            console.log(response);
        }).catch(error =>{
        }
    );
    return msg;
}

function getData(url, params)
{
//    let msg = '';
    axios.get(url, params).then(response=>{

    }).catch(error=>{

    }
    );
}

export  default {
    postData,
    getData
}