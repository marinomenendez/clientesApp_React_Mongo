import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>

          <IonTitle size="large">Aplicación de clientes con React</IonTitle>

          <IonButtons slot="end">
            <IonButton routerLink='/login'>Login</IonButton>
            <IonButton >Logout</IonButton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <IonButton routerLink='/'>Inicio</IonButton>
            <IonButton routerLink={`/clients`}>Clientes</IonButton>
            <IonButton routerLink='/new-client'>Nuevo cliente</IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
