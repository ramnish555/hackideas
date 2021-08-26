import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [input, setInput] = useState('');
    const history = useHistory();

    const formSubmit = (event) => {
        event.preventDefault();
        history.push("/hackideas/home",{ "id": input});
    }

    return(
        <div className="login-form">
            <form onSubmit={formSubmit}>
        <h2 className="text-center">Log in</h2>       
        <div className="form-group">
            <input type="number" className="form-control" id="empid" placeholder="Employee ID" value={input} onChange={(event)=>{setInput(event.target.value)}} required />
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary login">Log in</button>
        </div>      
    </form>
</div>
    )
};

export default Login;