import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, useIonViewWillEnter, IonToast } from "@ionic/react";
import { useState } from "react";
import { ClientService } from "../services/clientService";
import { useHistory, useParams } from "react-router";
import NavBar from "../components/NavBar";


export default function EditClientPage() {

  const history = useHistory();
  const [client, setClient] = useState({  nombre: "", ciudad: "", facturacion: 0.0 });

  const [showToast, setShowToast] = useState(false);

  const {id}= useParams<{id: string}>();


    /*useEffect(() => {
        loadClient();
    }, [])*/

    useIonViewWillEnter(() => {
      console.log("EditClientPage.tsx useIonViewWillEnter()");
      loadClient();
    });
    
    const loadClient = async() => {
        console.log("loadClient() con id "+id);
        const dato = await ClientService.getClientById(id);
        setClient(dato);
    }

  const modificar = async () => {
    if (!client.nombre || !client.ciudad || !client.facturacion) {
      alert("Por favor, complete todos los campos.");
      return;
    }


    await ClientService.updateClient(id, client);
    
    setShowToast(true);

    //navigate('/clients');
    history.push("/clients");
  };

  return (
    <IonPage>

      <IonHeader>
        <NavBar/>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mi empresa</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToast
        isOpen={showToast}
        onDidDismiss={() =>
        setShowToast(false)
        }
        position="top"
        message={ `Modificado correctamente cliente con ID ${id}`  }
        duration={3000}
        color="warning"
        />
        

        <div className="card" style={{ padding: "20px", margin: "20px" }}>
          <h2>Modificar cliente</h2>
          <input placeholder="Nombre" value={client.nombre}
            onChange={(e) => setClient({ ...client, nombre: e.target.value })}
          />
          <input placeholder="Ciudad" value={client.ciudad}
            onChange={(e) => setClient({ ...client, ciudad: e.target.value })}
          />
          <input placeholder="Facturación" value={client.facturacion}
            onChange={(e) => setClient({ ...client, facturacion: Number(e.target.value) })}
          />
          <button onClick={modificar}>Modificar</button>
        </div>
      </IonContent>

    </IonPage>
  ); //cierra return
}


