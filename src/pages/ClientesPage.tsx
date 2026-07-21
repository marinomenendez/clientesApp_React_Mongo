import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { Client } from "../models/Client";
import { ClientService } from "../services/clientService";
import { Link } from "react-router-dom";

export default function ClientesPage() {    

    const [clients, setClients] = useState<Client[]>([]);

    const loadClients = async () => {
        const data = await ClientService.getClients();
        setClients(data);
    };

    useIonViewWillEnter(() => {
        loadClients();
    }, []);

  async function borrarCliente(arg0: string) {
    console.log("borrarCliente() con id " + arg0);
    confirm(
      "¿Estás seguro de que deseas eliminar el cliente con ID " + arg0 + "?",
    ) && (await ClientService.deleteClient(arg0));

    //setShowToast(true);
    //setMensajeToast("Cliente eliminado correctamente");

    loadClients(); // Recargar la lista de clientes después de eliminar
  }

    return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Tabla de Clientes</IonTitle>

          </IonToolbar>
        </IonHeader>

        <IonContent>

            <Link to="/new-client" className="btn btn-primary mb-3">
              <i className="bi bi-plus-circle"></i>Nuevo Cliente
            </Link>
            <div className="container-fluid">
              {/* hero para la mejora visualización de la tabla de clientes */}
              <div className="bg-primary text-white p-4 rounded">
                <h2>Gestión de Clientes</h2>
              </div>

            
              <table className="table table-bordered share-tech-regular">
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Nombre</th>
                    <th>Ciudad</th>
                    <th>Facturación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client._id}>
                      {/* <td>{client.id}</td> */}
                      <td>{client.nombre}</td>
                      <td>{client.ciudad}</td>
                      <td>{client.facturacion}</td>
                      <td>
                        <IonButton
                          routerLink={`/${client._id}`}
                          className="action-column"
                        >
                          Editar
                        </IonButton>
                        <IonButton
                          onClick={() => {
                            borrarCliente(`/getClient/${client._id}`);
                          }}
                          className="action-column"
                        >
                          Eliminar
                        </IonButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            </div>

        </IonContent>
      </IonPage>
    );
}