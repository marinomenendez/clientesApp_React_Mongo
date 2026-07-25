

//export class AuthService {

import { url } from "../config/mongo";

    const API_URL = url;

    export const login = async ( email: string, password: string ) => {

        const response =
            await fetch(
                `${API_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:
                        JSON.stringify({ email, password })
                }
            );
        return response.json();
    };


//}