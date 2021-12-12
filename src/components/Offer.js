import React, { useState, useEffect} from 'react'
import {onAuthStateChanged, signOut} from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import styled from "styled-components"
import {useLocation, useParams, Link} from 'react-router-dom';
import {getDoc, doc} from "firebase/firestore";
import Header from "./Header";


const Container = styled.div`
  
  margin: 50px auto 0;
  max-width: 800px;
  box-sizing: border-box;
  padding: 0 20px;
`

const ContentContainer = styled.div`
  background-color: #444;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  color: black;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;

`
const Description = styled.div`
  color: #444;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;

`
const Subtitle = styled.div`
  color: #444;
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
  color: black;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;

`
const Photo = styled.div`
  margin-bottom: 20px;
  justify-content: center;
  display: flex;
  img {
    width: 100%;
  }
`
const InfoContainer = styled.div`
  padding: 20px;
  background-color: #DDD;
  border-radius: 20px;
  margin-right: 20px;
  box-sizing: border-box;
`

const UserInfo = styled.div`
  padding: 20px;
  background-color: #DDD;
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
  background-color: #DDD;
  border-radius: 20px;
  box-sizing: border-box;
  //display: flex;
  justify-content: space-between;

  
`

const Send = styled.div`
  color: #eee;
  text-transform: uppercase;
  padding: 10px;
  font-weight: 600;
  background-color: #444;
  border-radius: 10px;
  flex: 0 0 47%;
  text-align: center;
  box-sizing: border-box;
  :first-child {
    margin-bottom: 20px;
  }
`

const Offer = () => {

    const {IDoffert} = useParams()
    const [good, setGood] = useState({});
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    useEffect(() => {
        const fetchGood = async () => {
            const docRef = doc(db, "goods", IDoffert);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())

            if (docSnap.exists()) {
                const goodData = docSnap.data();
                setGood(goodData)
                console.log("Document data:", good);
                console.log("SSS" + user.uid)


                if (typeof user.uid !== "undefined") {  // pof f5 sie robi podwojnie
                    const docRef2 = doc(db, "goods", IDoffert);
                    const docSnap2 = await getDoc(docRef2);
                    if (docSnap2.exists()) {
                        const usrData = docSnap2.data();
                        setUserData(usrData)
                        console.log("Document data2:", usrData);
                    } else {
                        console.log("No such document!");
                    }
                }
            } else {
                console.log("No such document!");
            }
        }
        fetchGood();
    }, [user])


    return (
        <div>
            <Header/>
            <Container>

                <ContentContainer>
                    <Photo>
                        <img src={good.photo}/>
                    </Photo>

                    <div className='announcement'>
                        <div className='col1'>
                            <InfoContainer>
                                <Title>
                                    {good.title}
                                </Title>
                                <Description>
                                    Description:
                                </Description>
                                <Subtitle>
                                    {good.description}

                                </Subtitle>

                            </InfoContainer>
                        </div>

                        <div className='col2'>
                            <UserInfo>
                                <Description>
                                    Announcements info:
                                </Description>
                                <Title>
                                    {userData.name + ' ' + userData.surname}
                                </Title>
                                <SubtitleSeller>
                                    {good.date}
                                </SubtitleSeller>
                                <SubtitleSeller>{good.where}, {good.voivodeship}, Polska</SubtitleSeller>
                            </UserInfo>

                            <Buttons>
                                <Send>
                                    Phone number: {userData.phone}
                                </Send>
                                <Send>
                                    Email: {userData.email}
                                </Send>
                            </Buttons>
                        </div>

                    </div>

                </ContentContainer>

            </Container>
        </div>
    )

}

export default Offer
