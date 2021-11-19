import React, {Component, useState, useEffect} from 'react'
import { signOut } from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs, where, query} from "firebase/firestore";
import styled from "styled-components"
import logo from '../logo.png';
import { Link, useLocation, useParams } from 'react-router-dom';





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
const SearchBar = styled.div`
    margin-left: auto;
    margin-right: auto;
    width:70%;
    height:10%;
    text-align: center;
    clear:both;
`
const ContentContainer = styled.div`
    background-color:white;
    padding-top:5%;
    margin: auto;
    width: 100%;
    height: 80%;
    clear:both;
`

const Form = styled.div`
    margin-left: auto;
    margin-right: auto;
    background-color: #DDDDDD;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 80%;
    min-height: 200px;
    overflow: hidden;
    margin-top: 20px
`
const Title = styled.div`
    color: #444444;

    text-align:center;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
`
const Subtitle = styled.div`
    color: #444444;

    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
`
const Photo = styled.div`
    float: left;
    background-color: red;
    width: 35%;
    min-height: 200px;
    overflow: hidden;
`
const InfoContainer = styled.div`
    width: 35%;
    float:left;
  
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

const Select = styled.select`
    background-color: #ffffff;
    border-radius: 12px;
    color: #757575;
    border: 0;
    box-sizing: border-box;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
    &:focus{
        border: 2px solid #27ae60;
    }
`

const InputContainer = styled.div`
    height: 70%;
    width: 40%;
    margin-top:1%;
    margin-left:1%;
    float:left;
` 
const Input = styled.input`
    background-color: #ffffff;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
    &:focus{
        border: 2px solid #27ae60;
    }

`

const Img = styled.img`
    width: 80px;
    margin-left:4%;
`

const Good = (props) =>{
    
        return(
            <Link to={"/offer" 
            
            } style={{ textDecoration: 'none' }}>
                <Form>
                    <Photo>
                        {props.photo}
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



const CategoryOffert = (props) =>{
    // const location = useLocation()
    const { category } = useParams()

    // console.log(props.location.aboutProps)

    const [goods, setGoods] = useState([]);

    const voivodeshipList = ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"];

    const [voivodeship, setVoivodeship] = useState('');
    const [search, setSearch] = useState('');
    
    const goodsList = goods.map( (good) => (  
        <Good 
        title = {good.title}
        who = {good.who}
        description = {good.description}
        where = {good.where}
        photo = {good.photo}
        />
        
    ) ) 
    
    const logout = async () => {
        await signOut(auth)
    
    };
    
    // const location = useLocation()
    // const { from } = location.state

    useEffect(() => {
        if(category == "All"){
            const fetchGoods = async () =>{
                const querySnapshot = await getDocs(query(collection(db, "goods")));
                querySnapshot.forEach((doc) => {
                    setGoods(goods => [...goods, doc.data()])
                console.log(doc.id, " => ", doc.data());
                });
            }
            fetchGoods()
        }else{
           const fetchGoods = async () =>{
                const querySnapshot = await getDocs(query(collection(db, "goods"), where("category", "==", category)));
                querySnapshot.forEach((doc) => {
                    setGoods(goods => [...goods, doc.data()])
                console.log(doc.id, " => ", doc.data());
                });
            } 
            fetchGoods()
        }
      }, [])

    
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
            </LogoContainer>

            <SearchBar>
                    <InputContainer>
                    <Input placeholder="What are you looking for..." 
                        onChange = {event => setSearch(event.target.value)}
                    />
                </InputContainer>

                <InputContainer>
                    <Select onChange = {event => setVoivodeship(event.target.value)}>
                        {voivodeshipList.map((voivodeship) => (
                        <option value={voivodeship}>{voivodeship}</option>
                        ))}
                    </Select>
                </InputContainer>

                <Button style={{ float: 'left', width: "17%", }}> Search </Button>
            </SearchBar>

            <ContentContainer>
                {goodsList}

                
            </ContentContainer>

        </Container>
    );
    
}

export default CategoryOffert
