import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonIcon,
  IonList,
} from '@ionic/react'
import { create, add, trash, squareOutline, checkbox } from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.scss'
import './App.scss'
import { useState } from 'react'
import Modal from './Modal'

type Task = {
  task: string
  completed: boolean
  token: string
}
const App: React.FC = () => {
  const [task, setTask] = useState('')
  const taskListJson = localStorage.getItem('tasks')
  //initialize tasklist by the key 'tasks' from localstorage. if taskListJson is null use empty array
  const [taskList, setTaskList] = useState(
    taskListJson ? JSON.parse(taskListJson) : []
  )
  const [myModal, setMyModal] = useState({
    isOpen: false,
    initialTask: { task: '', completed: false, token: '' },
  })

  const onModalClose = (response: any) => {
    setMyModal({
      isOpen: false,
      initialTask: { task: '', completed: false, token: '' },
    })

    if (!response.cancelled) editTask(response.newTask)
  }

  //create task
  const addTask = () => {
    const newTask = {
      task,
      completed: false,
      token: getToken(),
    }
    //append task
    const updatedList = [...taskList, newTask]
    setTaskList(updatedList)
    setTask('')
    localStorage.setItem('tasks', JSON.stringify(updatedList))
  }
  //edit tasks
  const editTask = (t: Task) => {
    let index = getIndexByToken(t.token)
    if (index !== -1) {
      //create dummy list object to update task name
      const updatedList = {
        ...taskList,
        [index]: {
          ...t,
          task: t.task,
        },
      }
      //convert list of task objects to an array
      const result = Object.keys(updatedList).map((key) => updatedList[key])
      setTaskList(result)
      localStorage.setItem('tasks', JSON.stringify(result))
    }
  }

  const deleteTask = (t: Task) => {
    let index = getIndexByToken(t.token)
    if (index !== -1) {
      const updatedList = [...taskList]
      updatedList.splice(index, 1)
      setTaskList(updatedList)
      localStorage.setItem('tasks', JSON.stringify(updatedList))
    }
  }
  const updateStatus = (t: Task) => {
    let index = getIndexByToken(t.token)
    if (index !== -1) {
      const updatedList = {
        ...taskList,
        [index]: {
          ...t,
          completed: !t.completed,
        },
      }
      const result = Object.keys(updatedList).map((key) => updatedList[key])
      setTaskList(result)
      localStorage.setItem('tasks', JSON.stringify(result))
    }
  }

  const getToken = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    )
  }

  const getIndexByToken = (token: string) => {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].token === token) {
        return i
      }
    }
    return -1
  }
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar className='title-headbar'>
          <IonTitle>My To Do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines='none' className='addTask'>
          <IonInput
            className='taskInput'
            type='text'
            placeholder='Enter task'
            value={task}
            onIonInput={(e: any) => setTask(e.target.value)}
          ></IonInput>
          <div className='item-note'>
            <IonButton color='success' onClick={addTask}>
              Add to List
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </div>
        </IonItem>
        <IonList>
          {taskList &&
            taskList.map((t: Task, i: number) => (
              <IonItem key={i} className={t.completed ? 'strike' : ''}>
                <div>
                  <IonIcon
                    icon={t.completed ? checkbox : squareOutline}
                    onClick={() => {
                      updateStatus(t)
                    }}
                  ></IonIcon>
                  <span className='ion-padding'>{t.task}</span>
                </div>

                <div className='item-note' slot='end'>
                  <IonButton
                    color='success'
                    onClick={() => {
                      setMyModal({
                        isOpen: true,
                        initialTask: t,
                      })
                    }}
                  >
                    <IonIcon icon={create}></IonIcon>
                  </IonButton>
                  <IonButton
                    color='danger'
                    onClick={() => {
                      deleteTask(t)
                    }}
                  >
                    <IonIcon icon={trash}></IonIcon>
                  </IonButton>
                </div>
              </IonItem>
            ))}
        </IonList>
        <Modal
          initialTask={myModal.initialTask}
          isOpen={myModal.isOpen}
          onClose={onModalClose}
        />
      </IonContent>
    </IonApp>
  )
}
export default App
