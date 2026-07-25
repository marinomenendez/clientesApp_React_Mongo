import { url } from "../config/mongo";
import { Client } from "../models/Client";

export class ClientService {    

    static api_url = url;

    static async getClients() {
        const res =
            await fetch( `${this.api_url}/clients`
                //
            );
        return await res.json();
    }

    static async getClientById(id: string) {
        console.log("ClientsService getClientById() : ");
        console.log(id);

        const res = await fetch( `${this.api_url}/clients/${ id }` );
        return await res.json();
    }

    static async newClient(client: Client) {
        console.log("ClientsService newClient() : ",client);

        const token = localStorage.getItem("token");

        const res =
            await fetch( `${this.api_url}/clients/new`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(client)
                }
            );
        return await res.json();
    }

    static async updateClient( id: string, client: Client ) {
        const token = localStorage.getItem("token");

        await fetch(
            `${this.api_url}/clients/update/${ id }`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(client)
            }
        );
    }

    static async deleteClient(id: string) {
        const token = localStorage.getItem("token");
        await fetch( `${this.api_url}/clients/delete/${ id }`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        );
    }

}