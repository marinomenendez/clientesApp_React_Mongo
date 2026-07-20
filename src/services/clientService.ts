
export class ClientService {    

    static async getClients() {
        const res =
            await fetch( "http://localhost:3000/clients"
                //${ API_URL } / clients
            );
        return await res.json();
    }

}