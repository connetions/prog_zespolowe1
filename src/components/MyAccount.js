import React, {Component, useState, useEffect} from 'react'
import { signOut ,onAuthStateChanged, getAuth} from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs, where, query} from "firebase/firestore";
import styled from "styled-components"
import logo from '../logo.png';
import { Link, useLocation, useParams } from 'react-router-dom';


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
const LogoContainer = styled.div`
    background-color: #444444;
    width:100%;
    height:10%;
    clear:both;
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
  margin-top:20px;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 22px;
  padding: 10px 20px;
  float:right;
  &:focus, &:hover{
    background-color: #1a8f4b;
  }
`

const Img = styled.img`
    width: 80px;
    margin-left:4%;
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
    return(
        <Link to={"/offer" 
        
        } style={{ textDecoration: 'none' }}>
            <Form>
                <Photo>
                    <img width="100%" max-height = "200px"  src={props.photo} />
                </Photo>
                <InfoContainer>
                    <Title>{props.title}</Title>
                    <Subtitle>{props.who}</Subtitle>
                    <Subtitle>{props.where}</Subtitle>
                </InfoContainer>
            </Form>
        </Link>
    )
}


const MyAccount = () => {

    // const auth = getAuth();
    // const user = auth.currentUser;

    const { category } = useParams()
    const [goods, setGoods] = useState([]);
    const voivodeshipList = ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"];
    const [voivodeship, setVoivodeship] = useState('');
    const [search, setSearch] = useState('');
    const [user, setUser] = useState();

    const goodsList = goods.map( (good) => (  
        <Good 
            title = {good.title}
            who = {good.who}
            description = {good.description}
            where = {good.where}
            photo = {good.photo}
        />   
    )) 
    
    const logout = async () => {
        await signOut(auth)
    
    };

    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser.uid) 
    })
    
   

    useEffect(() => {  
        console.log(user)
        if(user){
            const fetchGoods = async () =>{
                console.log("SSS" + auth.currentUser.uid)
                const querySnapshot = await getDocs(query(collection(db, "goods"), where("uid", "==", user)));
                querySnapshot.forEach((doc) => {
                    setGoods(goods => [...goods, doc.data()])
                console.log(doc.id, " => ", doc.data());
                });
            }
            fetchGoods()
        }else{
            console.log("Serror here")
        }
      }, [user])
      
    return (
        <Container>
            <LogoContainer>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Img src={logo} alt="Logo" />
                </Link>

                <Button onClick = {logout}> Sign Out </Button>

                <Link to="/addgoods" style={{ textDecoration: 'none' }}>
                    <Button > Add Goods </Button>
                </Link>

                <Link to="/myaccount" style={{ textDecoration: 'none' }}>
                    <Button > My Account </Button>
                </Link>

            </LogoContainer>

            <ContentContainer>
                <UserInfo>
                    s
                </UserInfo>

                <OffertInfo>
                    {goodsList}

                </OffertInfo>
            </ContentContainer>

        </Container>
    )
}

export default MyAccount
