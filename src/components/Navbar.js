import React,{ useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';

const Navbar = ({id, onSave}) => {
    const [input, setInput] = useState({"title": "","description": "","tags": [],"flag": false});
    const history = useHistory();

    const handleClose = () => setInput({"title": "","description": "","tags": [],"flag": false});
    const handleShow = () => setInput({...input,"flag": true});
    const onLogout = () => history.push(`/hackideas`);

    const addChallenge = (data) => {
        try {
            delete data["flag"];
            data["creationDate"] = new Date().toLocaleString();
            data["voteCount"] = 0;
            data["tags"] = "#"+data["tags"].join(" #");

            let main = JSON.parse(sessionStorage.getItem("data"));
            data["id"] = main.length+1;
            main[main.length] = data;
            onSave(main);
        } catch (error) {
            console.log("Error Occur while Inserting Data");
        }
    }

    const inputChange = (event, type) => {
        if(type === "title"){
            setInput({...input,"title": event.target.value});
        }else if(type === "description"){
            setInput({...input,"description": event.target.value});
        }else if(type === "tags"){
            if(event.target.checked){
                setInput({...input,"tags": [...input["tags"],event.target.value]});
            }else{
                let index = input["tags"].indexOf(event.target.value);
                if (index >= 0) {
                    input["tags"].splice( index, 1 );
                    setInput({...input,"tags": input["tags"]});
                }
            }
        }
    }

    const Save = (event) => {
        event.preventDefault();
        addChallenge(input);
        handleClose();
    }
    
    return(
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand">{id}</span>
                    <form className="d-flex">
                        <button type="button" className="btn btn-success" onClick={handleShow}>Add</button>
                        <button type="button" className="btn btn-danger" onClick={onLogout}>Logout</button>
                    </form>
                </div>
            </nav>
            <Modal show={input["flag"]} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Challenge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="add-form" onSubmit={Save}>
                        <input type="text" className="form-control" placeholder="Title" value={input["title"]} onChange={(event)=>inputChange(event,'title')} required />
                        <input type="text" className="form-control" placeholder="Description" value={input["description"]}  onChange={(event)=>inputChange(event,'description')} required />
                        {
                            ["feature","tech","softwareengineer","programmer","software","developer","webdevelopment"].map((val, index) => {
                                return(
                                    <div className="form-check form-check-inline" key={index}>
                                        <input className="form-check-input" type="checkbox" id={`checbox${index}`} value={val} onChange={(event)=>inputChange(event, 'tags')}/>
                                        <label className="form-check-label" htmlFor={`checbox${index}`}>{val}</label>
                                    </div>
                                )
                            })
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="submit" className="btn btn-primary" form="add-form" >Save</button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default Navbar;