import axios from 'axios';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import RenderToDo from './renderTodo';

const ToDoComponent = (props) =>{

    const URL_BACKEND = 'http://127.0.0.1:8000'
    var todostate = useSelector(state => state.reducer)
    var [createToDo, setCreateToDo] = useState({to_do_list:'',completed:'N'})
    var [todoList, setToDoList] = useState({ToDoList:[]});

    useEffect(()=>{
        async function getToDoList(){
            let resp = await axios.get(`${URL_BACKEND}/todolist/${todostate.id}/${props.match.params.bucketId}`)
                            .then(res => res.data)

            resp.forEach(element => element.edited = false)
            setToDoList({ToDoList:resp})
        }
        getToDoList()
    },[todostate.id, props.match.params.bucketId])

    function handleTodoName(event){
        setCreateToDo({...createToDo,to_do_list:event.target.value})
    }

    function handleCompleted(event){
        setCreateToDo({...createToDo, completed:event.target.value})
    }

    async function handleCreate(){
        let resp = await axios.post(`${URL_BACKEND}/todolist/${todostate.id}/${props.match.params.bucketId}`, {...createToDo})
                                .then(res => res.data)
        setCreateToDo({to_do_list:'',completed:'N'})

        setToDoList({ToDoList:[...todoList.ToDoList,resp]})
    }

    async function handleDeleteTodo(id){
        let resp = await axios.delete(`${URL_BACKEND}/todolist/${todostate.id}/${props.match.params.bucketId}`, {headers: {
          'Content-type':'application/json'},data:{'id':id}})
                    .then(res => res.data)
        
        if (resp === 'Deleted'){
            setToDoList({ToDoList:todoList.ToDoList.filter(element => element.id !== id)})
        }
    }

    function handleEditToDo(id){
        let updatedlist = todoList.ToDoList
        updatedlist.forEach(element=>{if(element.id === id){element.edited=true}})
        setToDoList({ToDoList:updatedlist})
    }
    
    function handleTextEdit(event, id){
        let updatedlist = todoList.ToDoList
        updatedlist.forEach(element => {if(element.id === id){element.to_do_list = event.target.value}})
        setToDoList({ToDoList:updatedlist})
    }

    function handleSelectEdit(event, id){
        let updatedlist = todoList.ToDoList
        updatedlist.forEach(element => {if(element.id === id){element.completed = event.target.value}})
        setToDoList({ToDoList:updatedlist})
    }

    async function handleSaveToDo(id){
        let todoObject =Array.from(todoList.ToDoList.filter(item => item.id === id))[0]
        delete todoObject.edited
        let resp = await axios.put(`${URL_BACKEND}/todolist/${todostate.id}/${props.match.params.bucketId}`,{...todoObject})
                            .then(res => res)
        if (resp.status === 200){
            let updatedlist = todoList.ToDoList
            updatedlist.forEach(element => {if(element.id === id){element.edited=false}})
            setToDoList({ToDoList:updatedlist})
        }
    }

    return(
        <div className='todo-main-container'>
            <div className='todo-create-container'>
                <input type='text' onChange={handleTodoName} value={createToDo.to_do_list}></input>
                <select onChange={handleCompleted} value={createToDo.completed}>
                    <option value='Y'>Y</option>
                    <option value='N'>N</option>
                </select>
                <button onClick={handleCreate}>Create</button>
            </div>
            <RenderToDo dataTodo={todoList.ToDoList} handleDelete={(id) => handleDeleteTodo(id)} handleEdit={(id)=> handleEditToDo(id)} handleEditText={(event,id) => handleTextEdit(event, id)} handleEditSelect={(event,id) => handleSelectEdit(event,id)} handleSave={(id) => handleSaveToDo(id)}/>
        </div>
    )
}

export default ToDoComponent;