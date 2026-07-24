import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonPage, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { Client } from "../models/Client";
import { ClientService } from "../services/clientService";
import { add } from "ionicons/icons";
import NavBar from "../components/NavBar";
import { Link, useHistory } from "react-router-dom";

export default function ClientesPagePruebaSwipe() {    

    const history = useHistory();

    const [clients, setClients] = useState<Client[]>([]);

    const loadClients = async () => {
        const data = await ClientService.getClients();
        setClients(data);
    };

    const nuevoCliente = async () => {
        history.push('/new-client');
    };


    useIonViewWillEnter(() => {
        loadClients();
    }, []);



    return (
    <IonPage>

        <IonHeader>
              <NavBar/>
        </IonHeader>

        <IonContent>

            <div className="container-fluid">
              <div className="bg-primary text-white p-4 rounded">
                <h2>Prueba con el efecto Swipe</h2>
              </div>

              {clients.map((client) => (
              <IonItemSliding>
                  <IonItem key={client._id}>
                      <IonLabel>
                          {client._id} :: {client.nombre} - {client.ciudad}
                      </IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                      <IonItemOption color="primary">
                          Editar
                      </IonItemOption>
                      <IonItemOption color="danger">
                          Eliminar
                      </IonItemOption>
                  </IonItemOptions>
              </IonItemSliding>
              ))}
              
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton>
                      <IonIcon icon={add} onClick={nuevoCliente}>
                          Nuevo
                        </IonIcon>


                  </IonFabButton>
              </IonFab>
            
            </div>

        </IonContent>
      </IonPage>
    );
}