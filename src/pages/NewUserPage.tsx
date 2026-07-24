import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import NavBar from "../components/NavBar";
import { registerNewUser } from "../services/registerUserService";


export default function NewUserPage() {

    const history = useHistory();
    const [user, setUser] = useState({ email: "", password: "", role: "" });

    
    useIonViewWillEnter(() => {
      console.log("NewUserPage.tsx useIonViewWillEnter()");
    });
    

  const save = async () => {
    if (!user.email || !user.password || !user.role) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    await registerNewUser(user.email, user.password, user.role);

    history.push("/");
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

        <div className="container mt-4">

          <h2>Nuevo usuario</h2>
          <input placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input type="password" placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

        <select onChange={(e) => setUser({ ...user, role: e.target.value })}>
          <option value="">Selecciones rol..</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>



          <button onClick={save}>Guardar</button>
        </div>
      </IonContent>
    </IonPage>
  ); //cierra return
}


