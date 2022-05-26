import React, { useState, useEffect } from "react";
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonPage, IonGrid, IonRow, IonCol, IonButton, IonInput } from "@ionic/react";
import "./ExploreContainer.css";

const data = [
  {
    id: 1,
    name: "John",
    subMenu: [
      {
        id: 11,
        name: "Sub John",
      },
      {
        id: 12,
        name: "Hello John",
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

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [addRow, setAddRow] = useState<any>([{ name: "" }]);
  const [subMenu, setSubMenu] = useState<any>([]);
  const [subDDL, setSubDDL] = useState<any>([]);
  const [totalPreset, setTotalPreset] = useState(0);
  const [preset, setPreset] = useState<string[]>([]);
  let searchName = "";

  const addElement = (id: number) => {
    setAddRow([...addRow, { id: addRow.length + 1, data: {} }]);
  };

  const removeElement = (id: number, index: any) => {
    const data = addRow.length > 1 ? addRow.filter((add: any) => add.id !== id) : addRow.filter((add: any) => add.id === id);
    const dataAfterDelete = addRow.filter((f: any, i: any) => i !== index);
    setAddRow(data);
    console.log("Delete", addRow);
  };

  const onDDLChange = (event: any, index: any) => {
    const dataByName = data.find((f) => f.name.toLowerCase() === event.target.value.toLowerCase());
    setSubMenu(dataByName?.subMenu);

    let deepCopy = [...[], ...addRow];
    deepCopy[index] = { menu: dataByName?.name, submenu: dataByName?.subMenu[0].name };

    setAddRow(deepCopy);
    getSubDDL(index, event.target.value);
  };

  const onSubDDLChange = (event: any, index: any) => {
    let deepCopy = [...[], ...addRow];
    deepCopy[index] = { ...deepCopy[index], ...{ submenu: event.target.value } };

    setAddRow(deepCopy);
  };

  const getSubDDL = (index: any, name: string) => {
    debugger;
    var allDDLs = subDDL;
    allDDLs[index] = data.find((f) => f.name.toLowerCase() === name.toLowerCase())?.subMenu;
    setSubDDL(allDDLs);
  };

  const collectFormData = (e: any, index: any) => {
    const { name, value } = e.target;
    let deepCopy = [...[], ...addRow];
    deepCopy[index] = { ...deepCopy[index], ...{ text: value } };
    setAddRow(deepCopy);
  };

  const getSearchValue = (e: any) => {
    searchName = e.target.value;
  };
  const saveData = async (e: any) => {
    e.preventDefault();
    var localJSON = {};
    const localData = localStorage.getItem("presetSearch");
    if (localData && localData != "null") {
      localJSON = JSON.parse(localData);
    }
    const finalData = { [searchName]: addRow };
    setTotalPreset(Object.keys({ ...finalData, ...localJSON }).length);
    localStorage.setItem("presetSearch", JSON.stringify({ ...finalData, ...localJSON }));
  };

  useEffect(() => {
    const localData = localStorage.getItem("presetSearch");
    console.log("LocalStorage 1231231", localData);

    if (localData && localData != "null") {
      setPreset([]);
      var localJSON = JSON.parse(localData);
      const temp = [] as string[];
      Object.keys(localJSON).map((key) => {
        temp.push(key);
      });

      setPreset(temp);
    }
  }, [totalPreset]);

  const onPreselectDDL = (e: any) => {
    setAddRow([]);
    const localData = localStorage.getItem("presetSearch");
    if (localData && localData != "null") {
      var localJSON = JSON.parse(localData);
      const tempArray = [] as any[];
      Object.keys(localJSON[e.target.value]).map((key: any, index: any) => {
        const indexOfArray = data.findIndex((f) => f.name.toLowerCase() === localJSON[e.target.value][key].menu.toLowerCase());
        debugger;
        getSubDDL(index, localJSON[e.target.value][key].menu);
        tempArray.push({
          menu: localJSON[e.target.value][key].menu,
          subMenu: localJSON[e.target.value][key].submenu,
          text: localJSON[e.target.value][key].text,
        });
      });
      debugger;
      setAddRow(tempArray);
    }
  };

  console.log(addRow);

  return (
    <div className="" style={{ width: "90%", margin: "auto" }}>
      <IonAccordionGroup>
        <IonAccordion value="">
          <IonItem slot="header" className="ion-search-button abc">
            <IonLabel className="">Search</IonLabel>
          </IonItem>
          <IonList slot="content" className="ion-list content-acc">
            <IonGrid className="w-100">
              {addRow &&
                addRow.map((add: any, index: any) => {
                  return (
                    <IonRow className=".ion-grid-row ion-align-items-center" key={index + new Date().getTime()}>
                      <IonCol className="" size-xs="1.2" size-sm=".6">
                        <IonButton className="update" onClick={() => removeElement(add.id, index)}>
                          &minus;
                        </IonButton>
                      </IonCol>
                      <IonCol className="" size-xs="1.2" size-sm=".6">
                        <IonButton className="update" onClick={() => addElement(add.id)}>
                          &#43;
                        </IonButton>
                      </IonCol>
                      <IonCol size=".2" className=""></IonCol>
                      <IonCol className="f-drop">
                        <select
                          name="menu"
                          id="menu"
                          className="select-class"
                          value={add.menu}
                          onChange={(e) => {
                            onDDLChange(e, index);
                          }}
                        >
                          <option value="Select">Select Filter</option>
                          {data &&
                            data.map((d, index) => {
                              return (
                                <option key={index + new Date().getTime()} value={d.name}>
                                  {d.name}
                                </option>
                              );
                            })}
                        </select>
                      </IonCol>
                      <IonCol size=".2" className=""></IonCol>
                      <IonCol className="s-drop">
                        <select id="subMenu" name="subMenu" className="select-class" value={add?.text} onChange={(e) => onSubDDLChange(e, index)}>
                          {subDDL[index] &&
                            subDDL[index].map((res: any, index: any) => {
                              return (
                                <option key={index + new Date().getTime()} value={res?.name}>
                                  {res?.name}
                                </option>
                              );
                            })}
                        </select>
                      </IonCol>
                      <IonCol size=".2" className=""></IonCol>
                      <IonCol className="s-drop">
                        <IonInput placeholder="Enter Input" value={add?.text} name="userInput" onIonInput={(ev) => collectFormData(ev, index)}></IonInput>
                      </IonCol>
                    </IonRow>
                  );
                })}
            </IonGrid>
          </IonList>
        </IonAccordion>
      </IonAccordionGroup>

      <IonRow className="search-row">
        <IonCol className="s-drop" size="8">
          <IonInput className="search-input" onIonInput={(e) => getSearchValue(e)} placeholder="Save search"></IonInput>
        </IonCol>
        <IonCol className="" size="4">
          <IonButton onClick={saveData} className="Save">
            Save
          </IonButton>
        </IonCol>
      </IonRow>

      {preset && preset.length && (
        <IonRow>
          <IonCol className="s-drop">
            <select id="presetDDL" name="subMenu" className="select-class" onChange={(e) => onPreselectDDL(e)}>
              <option value="select">Select</option>
              {preset.map((k, index) => (
                <option value={k} key={k + index}>
                  {k}
                </option>
              ))}
            </select>
          </IonCol>
        </IonRow>
      )}

      {/* </IonContent> */}
      {/* </IonPage> */}
    </div>
  );
};

export default ExploreContainer;
