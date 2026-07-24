import { IonButton, IonInput, IonPage } from "@ionic/react";
import { useState } from "react";
import { login } from "../services/authService";
import { useHistory } from "react-router";

export default function LoginPage() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const history = useHistory();

    async function realizarLogin() {
        const token = await login(email,password);
        console.log("Token obtenido :: ",token);

        //Metemos el token en el localStorage
        localStorage.setItem("token", token.token);

        history.push('/clients');
    }

    return (
        <IonPage>
            <div className="container mt-4">

                <IonInput value={email} placeholder="Introduce tu correo" onIonChange={(e) => setEmail( e.detail.value || '' ) } />
                <IonInput type="password" value={password} placeholder="Introduce tu contraseña" onIonChange={(e) => setPassword( e.detail.value || '' )  } />
                
                <IonButton onClick={ realizarLogin }>Login</IonButton>
            </div>
        </IonPage>
    );
}