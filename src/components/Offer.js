import React, {Component, useState, useEffect} from 'react'
import { onAuthStateChanged,signOut } from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
// import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import styled from "styled-components"
import photo from '../staticresources/assets/rower.jpg';
import logo from '../logo.png';
import { useLocation , useParams, Link} from 'react-router-dom';
import {collection, getDocs, where, query,getDoc, doc} from "firebase/firestore";


const Container = styled.div`
    // background-color: aqua;
    margin: auto;
    max-width: 800px;
    box-sizing: border-box;
    //text-align: center;
`
const LogoContainer = styled.div`
    // background-color:bisque;
    margin: 20px auto 80px;
    display: flex;
    justify-content: center;
    
    a {
      color: #eee;
      text-transform: uppercase;
      padding: 10px;
      background-color: #15172b;
      border-radius: 10px;
      z-index: 1;
      
      :hover {
        cursor: pointer;
        background-color: #123456;
      }
    }
  
  span {
    display: flex;
    justify-content: center;
    flex: 1;
    transform: translateX(45px);
  }
`
const ContentContainer = styled.div`
    // background-color:darkgreen;
    margin: auto;
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    //height: 500px
`
const Form = styled.div`
    margin: auto auto 20px;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 400px;
    height: 150px;
    display: flex;

    :last-child {
    margin-bottom: 0;
    }
`
const Title = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  
`
const Header = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
    
`
const Subtitle = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 20px;
    
    :last-child {
      margin-bottom: 0;
    }
`

const SubtitleSeller = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 32px;
    
`
const Photo = styled.div`
    margin-bottom: 20px;
    img {
      max-width: 100%;
    }
`
const InfoContainer = styled.div`
    padding: 20px;
    background-color: #123456;
    border-radius: 20px;
    margin-right: 20px;
    box-sizing: border-box;
`

const UserInfo = styled.div`
    padding: 20px;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;

`

let Col2;
const Col1 = Col2 = styled.div`
    width: 50%;
    box-sizing: border-box;
    
`

const Announcement = styled.div`
    display: flex;
    :first-child {
      margin-right: 20px;
    }
`

const Buttons = styled.div`
    padding: 20px;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`

const Send = styled.a`
    color: #eee;
    text-transform: uppercase;
    padding: 10px;
    font-weight: 600;
    background-color: #15172b;
    border-radius: 10px;
    flex: 0 0 47%;
    text-align: center;
    box-sizing: border-box;
    :hover {
        cursor: pointer;
        background-color: #eee;
        color: #15172b;
    }
`
const Img = styled.img`
    width: 80px;
    margin-left:4%;
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
const Offer = () => {

    const { IDoffert } = useParams()
    const [good, setGood] = useState({});
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});
    
    const logout = async () => {
        await signOut(auth)

    };
    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser) 
    })

    useEffect(() => {
        console.log(IDoffert);
        const fetchGood = async () =>{
            const docRef = doc(db, "goods", IDoffert);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const goodData = docSnap.data();
                setGood(goodData)
                console.log("Document data:", good);
                console.log("SSS" + user.uid)
                

                if (typeof user.uid !== "undefined") {  // pof f5 sie robi podwojnie 
                    const docRef2 = doc(db, "users", user.uid);
                    const docSnap2 = await getDoc(docRef2);
        
                    if (docSnap2.exists()) {
                        const usrData = docSnap2.data();
                        setUserData(usrData)
                        console.log("Document data2:", usrData);
                    } else {
                    // doc.data() will be undefined in this case
                        console.log("No such docment!");
                    }
                }
                

            } else {
            // doc.data() will be undefined in this case
                console.log("No such document!");
            }
          

        }

        fetchGood();
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
                <Photo>
                    <img src={good.photo}/>
                </Photo>

                <Announcement>
                    <Col1>
                        <InfoContainer>
                            <Title>
                                {good.title}
                            </Title>
                            <Header>
                                Opis:
                            </Header>
                            <Subtitle>
                                {good.description}

                            </Subtitle>

                        </InfoContainer>
                    </Col1>

                    <Col2>
                        <UserInfo>
                            <Title>
                                {userData.name + ' ' + userData.surname}
                            </Title>
                            <SubtitleSeller>
                                {good.date}
                            </SubtitleSeller>
                            <SubtitleSeller>
                                {good.voivodeship}, Polska
                                <bt/>
                                {good.where}
                            </SubtitleSeller>
                        </UserInfo>

                        <Buttons>
                            <Send>
                                {userData.phone}
                            </Send>
                            <Send>
                                {userData.email}
                            </Send>
                        </Buttons>
                    </Col2>

                </Announcement>

            </ContentContainer>

        </Container>
    )
    
}

export default Offer
