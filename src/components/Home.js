import React,{ useState, useEffect } from 'react';
import { useLocation, useHistory} from 'react-router-dom';
import Challenge from './Challenge';
import Navbar from './Navbar';
import Sort from './Sort';
import challenges from '../db';

const Home = () => {
    const location = useLocation();
    const history = useHistory();
    const [apiData, setData] = useState(null);

    if(location.state === undefined){
        history.push(`/hackideas`);
    }

    const getChallenges = () =>{
        try{
            sessionStorage.setItem("data",JSON.stringify(challenges["data"]));
            setData(challenges["data"]);
        }catch(error){
            console.log("Error while Fetching Data from API");
        }
    }

    const onSave = (data) => {
        sessionStorage.setItem("data",JSON.stringify(data));
        setData(data);
    }

    const updateChallenge = (id,data) =>{
        try {
            let mainData = JSON.parse(sessionStorage.getItem("data"));
            id = mainData.findIndex(key => key.id === id);
            mainData[id] = data;
            onSave(mainData);
        } catch (error) {
            console.log("Error Occur while Inserting Data"+error);
        }
    }

    useEffect(()=>{
        getChallenges();
    },[]);

    const onVote = (id, data) => {
        updateChallenge(id, data);
    }

    const onSort = (type) => {
        let key = '';
        if(type === 'vote'){
            key = 'voteCount';
        }else if(type === 'date'){
            key = 'creationDate';
        }
        apiData.sort(function (a, b) {
            return new Date(a[key]) - new Date(b[key]);
        });
        onSave([...apiData]);
    }

    return(
        <>
            <Navbar id={location.state.id} onSave={onSave}/>
            <Sort onSort={onSort}/>
            <div className="cards">
                {
                    apiData?apiData.map((val) => {
                        return(
                            <Challenge key={val["id"]} data={{val,id: val["id"], onVote}}/>
                        )
                    }):null
                }
            </div>
        </>
    )
};

export default Home;