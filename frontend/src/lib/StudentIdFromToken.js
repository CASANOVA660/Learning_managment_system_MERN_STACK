import { base64UrlDecode } from '../helpers/base64Helper';


const getStudentIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    try {
        const [, payloadBase64] = token.split('.');
        const payloadJson = base64UrlDecode(payloadBase64);
        const payload = JSON.parse(payloadJson);
        return payload.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token format');
    }
};

export default getStudentIdFromToken;