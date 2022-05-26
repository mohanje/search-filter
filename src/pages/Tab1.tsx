import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

const data = [
  {
    id: 1,
    name: "John",
    subMenu: [
      {
        id: 11,
        name: "Sub John",
      },
    ],
  },
  {
    id: 2,
    name: "Jane",
    subMenu: [
      {
        id: 22,
        name: "Sub Jane",
      },
    ],
  },
  {
    id: 3,
    name: "Smith",
    subMenu: [
      {
        id: 33,
        name: "Sub Smith",
      },
    ],
  },
  {
    id: 4,
    name: "james",
    subMenu: [
      {
        id: 44,
        name: "Sub james",
      },
    ],
  },
  {
    id: 5,
    name: "Jimmy",
    subMenu: [
      {
        id: 55,
        name: "Sub Jimmy",
      },
    ],
  },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Application" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
