import {useEffect, useState} from "react";
import {Component} from "react";

export default function Test() {

    useEffect(() => {
        getAllToDos()
    }, []);

    const [todo, setTodo] = useState([]);

    const [input, setInput] = useState("");

    function handleKeyPress(e){
        if (e.key === 'Enter'){
            let editInput = document.getElementById(e.target.getAttribute('name') +'editToDoInput');
            let newValue = editInput.value;
            let id = editInput.name;
            updateToDo(newValue, id);
            editInput.setAttribute('hidden', 'true');
            editInput.value = '';
        }
    }


    function ajaxTest() {
        axios.get('/ajax-test?name=John')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="py-12" style={{display: "flex", justifyContent: "center"}}>
            <div id={"to-do-list-form"} style={{
                border: "1px solid black",
                height: "auto",
                padding: "60px",
                width: "auto",
                display: "flex",
                justifyContent: "center"
            }}>
                <div id={"to-do-list"}>
                    <label> <Header header="To Do List" onAddHandler={ajaxTest}></Header></label>
                    <div>
                        <Subheader header="Add To Do" onAddHandler={ajaxTest}></Subheader>
                    </div>
                    <div style={{padding: "25px"}}>

                        <TextInput input={input} setInput={setInput} id={'toDoText'}/>
                        <ToDoListButton name={"Add"} input={input} onClickHandler={addToDo}></ToDoListButton>
                    </div>
                    <div>
                        <Subheader header={"Things To Do"}></Subheader>
                    </div>
                    <div>
                        <table>
                            <tbody>
                            {todo.map(function (object, i) {
                                if (!object.completed) {
                                    return (
                                        <tr key={object.id}>
                                            <UncompleteToDoList
                                                onAddHandler={toggleCompleted}
                                                completed={object.completed} id={object.id}
                                                name={object.name} obj={object}/>

                                            <td><input id={object.id + "editToDoInput"} name={object.id}
                                                       onKeyPress={handleKeyPress}
                                                       hidden key={object.id}></input></td>
                                            <td><ToDoListButton name={"Edit"} input={object.id}
                                                                onClickHandler={editToDo}></ToDoListButton></td>
                                            <td><ToDoListButton name={"Delete"} input={object.id}
                                                                onClickHandler={deleteToDo}></ToDoListButton></td>
                                        </tr>)
                                }
                                return;
                            })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Subheader header={"Completed To Dos"}></Subheader>
                        <table>
                            <tbody>
                            {todo.map(function (object, i) {
                                if (object.completed) {
                                    return (
                                    <tr key={object.id}>
                                    <CompletedToDoList
                                        onDeleteHandler={deleteToDo}
                                        onAddHandler={toggleCompleted}
                                        completed={object.completed} id={object.id}
                                        name={object.name} obj={object}/>

                                        <td><input id={object.id + "editToDoInput"} name={object.id}
                                                   onKeyPress={handleKeyPress}
                                                   hidden key={object.id}></input></td>
                                        <td><ToDoListButton name={"Edit"} input={object.id}
                                                            onClickHandler={editToDo}></ToDoListButton></td>
                                        <td><ToDoListButton name={"Delete"} input={object.id}
                                                            onClickHandler={deleteToDo}></ToDoListButton></td>
                                    </tr>)
                                }
                                return;
                            })
                            }</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );


    function getAllToDos() {


        axios.post('/getAllToDos',)
            .then(response => {
                console.log(response.data);

                setTodo(response.data);

            })
            .catch(error => {
                console.log(error);
            });

        return;
    }

    function addToDo(toDoName) {


        axios.post('/addToDo', {name: toDoName})
            .then(response => {

                setTodo(prevSate => {
                    return [...prevSate, response.data];
                });
            })
            .catch(error => {
                console.log(error);
            });

        return;
    }

    function toggleCompleted(id) {

        axios.post('/toggleToDo', {id: id})
            .then(response => {
                setTodo(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        return;
    }

    function deleteToDo(id) {

        axios.post('/deleteToDo', {id: id})
            .then(response => {
                console.log(response.data);
                setTodo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        return;
    }

    function editToDo(name) {
        document.getElementById(name +'editToDoInput').removeAttribute('hidden');
        document.getElementById(name +'editToDoInput').setAttribute('style', 'border: solid')
        return console.log('edit');
    }

    function updateToDo(newName, id){

        axios.patch('/updateToDo', {newName: newName, id: id})
            .then(response => {
                console.log(response.data);
                setTodo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        return;
    }


}


function Header(props) {
    return (<p style={{color: "red", fontSize: "40px", display: "flex", justifyContent: "center"}}>{props.header}</p>)
}

function Subheader(props) {
    return (<p style={{
        height: "50px",
        fontSize: "20px",
        padding: "25px",
        textDecorationLine: "underline"
    }}>{props.header}</p>)
}

function TextInput({input, setInput}) {
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    return (<input id={"to-do-list-input"} type={"text"} value={input} onChange={handleChange}></input>);
}


function ToDoListButton(props) {
    return (<button onClick={() => props.onClickHandler(props.input)} style={{
        backgroundColor: "gray", border: "1px solid black",
        paddingTop: "2px", paddingLeft: "5px", paddingRight: "5px", paddingBottom: "2px"
    }}>{props.name}</button>)
}


function UncompleteToDoList(props) {
    const {name} = props;
    const {completed} = props;
    const {id} = props;
    return (
        <>
            <td style={{padding: "20px"}}><input value={completed} type={"checkbox"}
                                                 onClick={() => props.onAddHandler({id})}></input></td>
            <td>{name}</td>
        </>
    )
}

function CompletedToDoList(props) {
    const {name} = props;
    const {id} = props;
    return (
        <>
            <td style={{padding: "20px"}}><input onClick={() => props.onAddHandler({id})}
                                                 defaultChecked={true} type={"checkbox"}></input></td>
            <td style={{textDecoration: "line-through"}}>{name}</td>
        </>
    )
}
