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
          <IonToolbar color='primary'>
            <IonTitle>My Modal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonItem>
            <IonLabel>Edit Task</IonLabel>
            <IonInput
              value={updateTask}
              onIonChange={(e) => {
                setUpdateTask(e.detail.value)
              }}
            ></IonInput>
          </IonItem>
          <IonButton
            onClick={() =>
              onClose({
                cancelled: false,
                data: {
                  newTask: {
                    task: updateTask,
                    completed: initialTask.completed,
                    token: initialTask.token,
                  },
                },
              })
            }
          >
            Submit
          </IonButton>
          <IonButton
            color='danger'
            onClick={() => onClose({ cancelled: true, data: null })}
          >
            Cancel
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  )
}

export default Modal
