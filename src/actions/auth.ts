"use server"

import axios from "axios"

export interface GoogleAuthProps {
    credential: string
    clientId: string
}

export const googleAuthAction = async (credentialResponse: GoogleAuthProps): Promise<any> => {
    const response = await axios.post("http://localhost:8000/api/v1/auth/google", 
        {
            credential: credentialResponse.credential,
            clientId: credentialResponse.clientId,
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    return response.data;
}