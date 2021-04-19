const RenderToDo = (props) =>{

    function renderTemplate(){
        console.log(props.dataTodo)
        return(
            <div className='todo-sub-list-container'>
            {props.dataTodo && props.dataTodo.length>0 ? <div>
                {props.dataTodo.map(item =>(
                    <div key={item.id}>
                        <input type='text' value={item.to_do_list} disabled={item.edited?false:true} onChange={(event)=>props.handleEditText(event, item.id)}></input>
                        <select value={item.completed} disabled={item.edited?false:true} onChange={(event)=> props.handleEditSelect(event, item.id)}>
                            <option value='Y'>Y</option>
                            <option value='N'>N</option>
                        </select>
                        <button hidden={item.edited?true:false} onClick={()=>props.handleEdit(item.id)}>Edit</button>
                        <button hidden={item.edited?false:true} onClick={()=>props.handleSave(item.id)}>Save</button>
                        <button onClick={()=>props.handleDelete(item.id)}>Delete</button>
                    </div>
                ))}
            </div>:<div>No ToDo list has been created yet</div>}
        </div>
        )
    }

    return(
        <div className='todo-list-container'>
            {renderTemplate()}
        </div>
    )
}

export default RenderToDo;