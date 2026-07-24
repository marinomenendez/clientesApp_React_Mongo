import { IonButton, IonPage } from "@ionic/react";
import { useHistory } from "react-router";

export default function NavBar() {

    const history = useHistory();

    function login() {
        history.push('/login');
    }
    
    const logout = () => {
        localStorage.removeItem( 'token' );
    };

    return (
        <div>
            <IonButton onClick={login}>Login</IonButton>    
            <IonButton routerLink="/">Inicio</IonButton>
            <IonButton routerLink="/users">Date de alta</IonButton>
            &nbsp;&nbsp;
            <IonButton routerLink="/clients">Clientes</IonButton>
            <IonButton routerLink="/clientsSwipe">Clientes con swipe</IonButton>
            <IonButton onClick={logout}>Logout</IonButton>
        </div>
    );
}