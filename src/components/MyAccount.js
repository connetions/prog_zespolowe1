import React, {Component, useState, useEffect} from 'react'
import { signOut ,onAuthStateChanged, getAuth} from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs, where, query, getDoc, doc, deleteDoc} from "firebase/firestore";
import { Link, useParams } from 'react-router-dom';
import Header from "./Header";
import './MyAccount.css';


const Good = (props) =>{
    const deleteGood = async () => {
        await deleteDoc(doc(db, "goods", props.gooduid));
        window.location.reload(false);
    }

    return(
        <Link className='offer-link' to={"/offer/" + props.gooduid}>
            <div className='justify form'>
                <div className="flex">
                    <div className='myacc-photo-container'>
                        <img className='photo' src={props.photo} />
                    </div>
                    <div className='info-container'>
                        <h1>{props.title}</h1>
                        <h2>Contact: {props.who}</h2>
                        <h2>Localization: {props.where}</h2>
                    </div>
                </div>
                <div className="myaccount buttons">
                    <div className='button' onClick = {deleteGood}>Delete</div>
                     <Link className='button' to={"/offeredit/" + props.gooduid} style={{ textDecoration: 'none' }}>
                         Edit offer
                    </Link>
                </div>
            </div>
        </Link>
    )
}


const MyAccount = () => {

    const [goods, setGoods] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [user, setUser] = useState();

    const goodsList = goods.map( (good) => (  
        <Good 
            title = {good.title}
            who = {good.who}
            description = {good.description}
            where = {good.where}
            photo = {good.photo}
            gooduid = {good.goodid}
        />   
    )) 
    
    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser.uid) 
    })
    
    useEffect(() => {  
        if(user){
            const fetchGoods = async () =>{
            
                const querySnapshot = await getDocs(query(collection(db, "goods"), where("uid", "==", user)));
                querySnapshot.forEach((doc) => {
                    setGoods(goods => [...goods, doc.data()])
                    console.log(doc.id, " => ", doc.data());
                });

                if (typeof auth.currentUser.uid !== "undefined"){
                    const docRef = doc(db, "users", auth.currentUser.uid);
                    const docSnap = await getDoc(docRef); 
                    if (docSnap.exists() && typeof auth.currentUser.uid !== "undefined") {
                        const userData = docSnap.data();
                        setUserInfo(userData)
                        console.log("Document data:", userData); 
                     } else {
                        console.log("No such docsument!");
                     }
                 }
            }

            fetchGoods();
        }else{
            console.log("Serror here")
        }
      }, [user])
      
    return (
        <div>
            <Header/>
            <div className="container">
                <div className='myaccount-content-container'>
                    <h1>Account information</h1>
                    <div className="user-info-container">
                        <div className='user-info'>
                            <p>Name: {userInfo.name}</p>
                            <p>Surname: {userInfo.surname}</p>
                            <p>Email: {userInfo.email}</p>
                            <p>Phone number: {userInfo.phone}</p>
                        </div>
                        <div className="edit-user">
                            <Link className='button' to="/edituser">
                                Edit user informations
                            </Link>
                        </div>
                    </div>
                    <h1>My announcements</h1>
                    <div className=''>
                        {goodsList}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount
