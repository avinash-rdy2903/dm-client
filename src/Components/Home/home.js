import {useState,useEffect} from 'react';
import axiosInstance  from '../api';
import styles from './home.module.css';
export default function Home(){
    useEffect(()=>{
        document.title="Home"
    },[])
    
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const stanceRadio = document.querySelector("#stance"),
        fakeRadio =document.querySelector("#fake");
    const [detection,setDetection] = useState('');
    const [show,setShow] = useState(false);
    useEffect(()=>{
        console.log("h");
        if(detection===''){
            setShow(false)
        }else{
            setShow(true);
        }
    },[detection])
    const handleSubmit =  async (e)=>{
        e.preventDefault();
        let endPoint = 'stance-detection';
        if(fakeRadio.checked){
            endPoint = 'fake-news-detection';
        }
        try{
            const res = await axiosInstance.post(endPoint,{'title':title, 'body':body});
            const data = res.data;
            if(fakeRadio.checked){
                setDetection(data.message);
            }else{
                setDetection(data.stance);
            }
        }catch(e){
            console.error(e);
        }
        // console.log(data);
    }
    // console.log(process.env.REACT_APP_SERVER_URL);
    const ClearButton = ()=>{
        if(show){
            return(
                <button className={styles.button} onClick={(e)=>{setDetection('')}}>Clear results</button>
            );
        }
    }
    return (
        <>
            <div className="container" style={{height:"33.5rem",textAlign:"center"}}>
                <form onSubmit={handleSubmit} >
                    <div className="input">
                        <label for="title"> Title</label>
                        <input type="text" name="title" placeholder="Title" 
                        onChange={(e)=>{setTitle(e.target.value)}} value={title} required></input>
                    </div>
                    <div className="input">
                        <label for="body">Body</label>
                        <input type="text" name="body" placeholder="Body"
                        onChange={(e)=>{setBody(e.target.value)}} value={body} required></input>
                    </div>
                    <legend>Select the classification type</legend>
                    <label>
                        <input type="radio" id="stance" name="detection" checked/>
                        Stance detection
                    </label>
                    <label>
                    <input type="radio" id="fake" name="detection"/>
                        Fake news detection
                    </label>
                    <button className={styles.button}>Classify</button>
                </form>
                <h3>{detection}</h3>
                <ClearButton/>
            </div>
        </>
    )
}