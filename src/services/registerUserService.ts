    
    const API_URL = 'http://localhost:3000';

    export const registerNewUser = async ( email: string, password: string, role: string ) => {

        const response =
            await fetch(
                `${API_URL}/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:
                        JSON.stringify({ email, password, role })
                }
            );
        return response.json();
    };