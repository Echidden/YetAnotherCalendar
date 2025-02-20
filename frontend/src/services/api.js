import axios from 'axios';

// env variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `https://yetanothercalendar.ru`;


export function getTokenFromLocalStorage() {
    return localStorage.getItem('token')
}
export function getJWTTokenFromLocalStorage() {
    return localStorage.getItem('jwt-token')
}
export function getCalendarIdLocalStorage() {
    return localStorage.getItem('calendarId')
}
export function getPersonIdLocalStorage() {
    return localStorage.getItem('personId')
}

// login Netology
export async function loginNetology(username, password) {
    try {
        return await axios.post(`${BACKEND_URL}/api/netology/auth`, {username, password});
    } catch (e) {
        return e.response;
    }
}
// login Modeus
export async function loginModeus(username, password) {
    try {
        return await axios.post(`${BACKEND_URL}/api/modeus/auth/`, {username, password});
    } catch (e) {
        return e.response;
    }
}


// calendar_id
export async function getNetologyCourse(sessionToken) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/netology/course/`, {
            headers: {
                "_netology-on-rails_session": sessionToken, // Токен сессии передается в заголовке
                "Content-Type": "application/json"
            }
        });
        return response.data; // Возвращаем данные
    } catch (e) {
        return e.response;
    }
}


const apiRequest = async (endpoint, {calendarId, timeZone, attendeePersonId, timeMin, timeMax, sessionToken, jwtToken, lms_user}) => {
    const requestBody = {
        body: {
            timeMin: timeMin,
            timeMax: timeMax,
            size: 50,
            attendeePersonId: [attendeePersonId],
        },
        lms_user: lms_user || { id: 0, token: sessionToken, is_enabled: false },
    };

    try {
        const response = await axios.post(
            `${BACKEND_URL}${endpoint}?calendar_id=${calendarId}&time_zone=${timeZone}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    '_netology-on-rails_session': sessionToken,
                    'modeus-jwt-token': jwtToken
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Ошибка при получении данных:', error.response ? error.response.data : error.message);
        throw error; // Пробрасываем ошибку, если необходимо
    }
};

// Теперь используем apiRequest для реализации ваших функций
export const bulkEvents = (params) => {
    return apiRequest('/api/bulk/events/', params);
};

export const refreshBulkEvents = (params) => {
    return apiRequest('/api/bulk/refresh_events/', params);
};

export const exportICS = (params) => {
    return apiRequest('/api/bulk/export_ics/', params);
};





// // calendar
// export async function bulkEvents({calendarId, timeZone, attendeePersonId, timeMin, timeMax, sessionToken, lms_user })  {
//     // console.log('calendarId, timeZone, attendeePersonId, timeMin, timeMax, sessionToken', calendarId, timeZone, attendeePersonId, timeMin, timeMax, sessionToken)
//     // const calendarId = 45526; // Ваш ID календаря
//     // const timeZone = 'Europe/Moscow'; // Часовой пояс
//     // const attendeePersonId = '5a3d9024-d210-4bfb-a622-0a55ab5bac1a'; // Ваш ID участника
//
//     const requestBody = {
//         body: {
//             timeMin: timeMin,
//             timeMax: timeMax,
//             size: 50,
//             attendeePersonId: [attendeePersonId], // Обратите внимание на правильность имени свойства
//         },
//         lms_user: lms_user || { id: 0, token: sessionToken, is_enabled: false }, // Использовать переданный lms_user или значение по умолчанию
//
//     };
//
//     try {
//         const response = await axios.post(
//             `${BACKEND_URL}/api/bulk/events/?calendar_id=${calendarId}&time_zone=${timeZone}`,
//             requestBody,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     '_netology-on-rails_session': sessionToken,
//                 },
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error.response ? error.response.data : error.message);
//     }
// };
//
// // Refresh calendar
// export async function refreshBulkEvents({calendarId, timeZone, attendeePersonId, timeMin, timeMax, sessionToken, lms_user }) {
//     try {
//         const requestBody = {
//             body: {
//                 timeMin: timeMin,
//                 timeMax: timeMax,
//                 size: 50,
//                 attendeePersonId: [attendeePersonId], // Обратите внимание на правильность имени свойства
//             },
//             lms_user: lms_user || { id: 0, token: sessionToken, is_enabled: false }, // Использовать переданный lms_user или значение по умолчанию
//
//         };
//
//         const response = await axios.post(
//             `${BACKEND_URL}/api/bulk/refresh_events/?calendar_id=${calendarId}&time_zone=${timeZone}`,
//             requestBody,
//             {
//                 headers: {
//                     "_netology-on-rails_session": sessionToken, // Токен сессии
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         return response;
//     } catch (e) {
//         return e.response;
//     }
// }
//
// // export file
// export async function exportICS({calendarId, timeZone, attendeePersonId, timeMin, timeMax, sessionToken, lms_user }) {
//     try {
//         const requestBody = {
//             body: {
//                 timeMin: timeMin,
//                 timeMax: timeMax,
//                 size: 50,
//                 attendeePersonId: [attendeePersonId], // Обратите внимание на правильность имени свойства
//             },
//             lms_user: lms_user || { id: 0, token: sessionToken, is_enabled: false }, // Использовать переданный lms_user или значение по умолчанию
//
//         };
//
//         const response = await axios.post(
//             `${BACKEND_URL}/api/bulk/export_ics/?calendar_id=${calendarId}&time_zone=${timeZone}`,
//             requestBody,
//             {
//                 headers: {
//                     "_netology-on-rails_session": sessionToken,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         return response;
//     } catch (e) {
//         return e.response;
//     }
// }

