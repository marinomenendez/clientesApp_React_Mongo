import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { ClientService } from "../services/clientService";
import { useHistory, useParams } from "react-router";
import NavBar from "../components/NavBar";


export default function NewClientPage() {

  //console.log("nuevo cliente");
  //const navigate =useNavigate();//React Router 6
  const history = useHistory();
  const [client, setClient] = useState({ id: "", nombre: "", ciudad: "", facturacion: 0.0 });


  const {id}= useParams<{id: string}>();


    /*useEffect(() => {
        loadClient();
    }, [])*/

    useIonViewWillEnter(() => {
      console.log("NewClientPage.tsx useIonViewWillEnter()");
    });
    

  const save = async () => {
    if (!client.nombre || !client.ciudad || !client.facturacion) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    await ClientService.newClient(client);
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
        <div className="card" style={{ padding: "20px", margin: "20px" }}>
          <h2>Nuevo cliente</h2>
          <input placeholder="Nombre"
            onChange={(e) => setClient({ ...client, nombre: e.target.value })}
          />
          <input placeholder="Ciudad"
            onChange={(e) => setClient({ ...client, ciudad: e.target.value })}
          />
          <input placeholder="Facturación"
            onChange={(e) => setClient({ ...client, facturacion: Number(e.target.value) })}
          />
          <button onClick={save}>Guardar</button>
        </div>
      </IonContent>
    </IonPage>
  ); //cierra return
}


