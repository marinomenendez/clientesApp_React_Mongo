import { Client } from "../models/Client";

export class ClientService {    

    static api_url = "http://localhost:3000/clients";

    static async getClients() {
        const res =
            await fetch( this.api_url
                //${ API_URL } / clients
            );
        return await res.json();
    }

    static async getClientById(id: string) {
        console.log("ClientsService getClientById() : ");
        console.log(id);

        const res = await fetch( "http://localhost:3000/client/"+id );
        return await res.json();
    }

    static async newClient(client: Client) {
        console.log("ClientsService newClient() : ");
        console.log(client);

        const res =
            await fetch( this.api_url+"/new",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(client)
                }
            );
        return await res.json();
    }

    static async updateClient( id: string, client: Client ) {
        await fetch(
            `${this.api_url}/${ id }`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            }
        );
    }

    static async deleteClient(id: string) {
        await fetch( `${this.api_url}/delete/${ id }`,
        {
            method: 'DELETE'
        }
        );
    }

}