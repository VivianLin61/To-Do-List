import React, { useEffect, useState } from 'react'
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonModal,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react'

const Modal: React.FunctionComponent<any> = ({
  initialTask,
  isOpen,
  onClose,
}) => {
  const [updateTask, setUpdateTask] = useState<string | null | undefined>('')
  useEffect(() => {
    setUpdateTask(initialTask.task)
  }, [initialTask])
  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar className='title-headbar'>
            <IonTitle>Edit Task</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonItem lines='none'>
              <IonRow className='ion-justify-content-center ion-padding-top'>
                <IonTextarea
                  wrap='soft'
                  value={updateTask}
                  onIonChange={(e) => {
                    setUpdateTask(e.detail.value)
                  }}
                ></IonTextarea>
              </IonRow>
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    color='success'
                    expand='block'
                    onClick={() =>
                      onClose({
                        cancelled: false,
                        newTask: {
                          task: updateTask,
                          completed: initialTask.completed,
                          token: initialTask.token,
                        },
                      })
                    }
                  >
                    Save
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand='block'
                    color='danger'
                    onClick={() => onClose({ cancelled: true, newTask: null })}
                  >
                    Cancel
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonGrid>
        </IonContent>
      </IonModal>
    </>
  )
}

export default Modal
