import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
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

    const euroFormatter = (value: number) => {
      return new Intl.NumberFormat(
      'es-ES',
      {
        style:'currency',
        currency:'EUR'
      }).format(value)
    }

    useIonViewWillEnter(() => {
        loadClients();
    }, []);

    async function borrarCliente(arg0: string) {
      console.log("borrarCliente() con id " + arg0);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
            <IonButtons>
              <IonButton routerLink="/">Inicio</IonButton>
              <IonButton routerLink="/home">Home</IonButton>
              <IonButton routerLink="/clients">Ver clientes</IonButton>
            </IonButtons>
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
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Ciudad</th>
                    <th>Facturación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client._id}>
                      <td>{client._id}</td>
                      <td>{client.nombre}</td>
                      <td>{client.ciudad}</td>
                      <td className="text-end">{ euroFormatter(client.facturacion) }</td>
                      <td>
                        <IonButton
                          routerLink={`/edit-client/${client._id}`}
                          className="action-column"
                        >
                          Editar
                        </IonButton>
                        <IonButton
                          onClick={() => {
                            borrarCliente(`${client._id}`);
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