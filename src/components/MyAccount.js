import React, {Component, useState, useEffect} from 'react'
import { signOut ,onAuthStateChanged, getAuth} from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs, where, query, getDoc, doc, deleteDoc} from "firebase/firestore";
import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import Header from "./Header";


const Form = styled.div`
    margin-left: auto;
    margin-right: auto;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 600px;
    min-height: 100px;
    overflow: hidden;
    margin-top: 20px
`

const Title = styled.div`
    
    color: black;
    text-align:center;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
`
const Subtitle = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
`
const Photo = styled.div`
    float: left;
    background-color: red;
    width: 35%;
    min-height: 100px;
    overflow: hidden;
`
const InfoContainer = styled.div`
    width: 35%;
    float:left;
  
`
const Container = styled.div`
    background-color: #DDDDDD;
    color: #444444;
    margin: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`

const ContentContainer = styled.div`
    padding-top:5%;
    background-color:white;
    margin: auto;
    width: 100%;
    height: 80%;
    clear:both;
`

const Button = styled.div`
    margin-left:1%;
    cursor: pointer;
    background-color: #27ae60;
    margin-top:1%;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 1.3vw;
    text-align: center;
    padding: 1.1% 0;
    vertical-align: middle;
    width: 10%;
    height: 70%;
    float:right;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`

const UserInfo = styled.div`
    width: 30%;
    background-color:red;
    float:left;
`

const OffertInfo = styled.div`
    width: 70%;
    background-color:blue;
    float:left;
`

const Good = (props) =>{
    const deleteGood = async () => {
        await deleteDoc(doc(db, "goods", props.gooduid));
        window.location.reload(false);
    }

    return(
            <Form>
                <Link to={"/offer/" + props.gooduid} style={{ textDecoration: 'none' }}>
                    <Photo>
                        <img width="100%" max-height = "200px"  src={props.photo} />
                    </Photo>
                </Link>

                <InfoContainer>
                    <Title>{props.title}</Title>
                    <Subtitle>{props.who}</Subtitle>
                    <Subtitle>{props.where}</Subtitle>
                    <Button onClick = {deleteGood}>Delete</Button>
                    <br/>

                    <Link to={"/offeredit/" + props.gooduid} style={{ textDecoration: 'none' }}>
                        <Button>edit</Button>
                    </Link>
                    
                </InfoContainer>
            </Form>  
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
        <Container>
            <Header/>
            <ContentContainer>
                <UserInfo>
                    {userInfo.name + '' + userInfo.surname}
                    <br/>
                    {userInfo.email}
                    
                    {userInfo.phone}
                    <Link to="/edituser" style={{ textDecoration: 'none' }}>
                        <Button > Edit USer </Button>
                    </Link>
                </UserInfo>

                <OffertInfo>
                    {goodsList}

                </OffertInfo>
            </ContentContainer>

        </Container>
    )
}

export default MyAccount
