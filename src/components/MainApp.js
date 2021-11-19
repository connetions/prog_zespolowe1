import React, {Component} from 'react'
import { signOut } from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore";
import styled from "styled-components"
import logo from '../logo.png';
import { Link } from 'react-router-dom';

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
const CategoryContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    height:80%;
`

const ButtonCategory = styled.div`
    margin-left:1%;
    margin-right:1%;
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
    padding: 6.1% 0;
    vertical-align: middle;
    width: 31.3%;
    height: 20%;
    float:left;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`

const Img = styled.img`
    width: 80px;
    margin-left:4%;
`


class Good extends Component{
    render(){
        return(
            <Link to={"/offer" 
            
            } style={{ textDecoration: 'none' }}>
                <Form>
                    <Photo>
                        {this.props.photo}
                    </Photo>
                    <InfoContainer>
                        <Title>{this.props.title}</Title>
                        <Subtitle>{this.props.who}</Subtitle>
                        <Subtitle>{this.props.where}</Subtitle>
                    </InfoContainer>
                </Form>
            </Link>
        )
    }
}

class MainApp extends Component {

    state = {
        goods: [],
        voivodeshipList: ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                    "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                    "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"],
        voivodeship: '',
        categoryList: ["Sport", "Electronics", "House", "Garden", "Automotive", "Kids", "Clothes", "Animals", "Music", "Education" , "All", "Other"]

    }
    
    logout = async () => {
        await signOut(auth)
    
    };

    fetchGoods = async () =>{
        const querySnapshot = await getDocs(collection(db, "goods"));
        querySnapshot.forEach((doc) => {
            this.setState({goods: [...this.state.goods, doc.data()]})
        console.log(doc.id, " => ", doc.data());
        });
    }

    componentWillMount(){
        this.fetchGoods();
    }

    render(){
        return (
            <Container>
                <LogoContainer>
                     <Link to="/" style={{ textDecoration: 'none' }}>
                        <Img src={logo} alt="Logo" />
                    </Link>

                    <Button onClick = {this.logout}> Sign Out </Button>

                    <Link to="/addgoods" style={{ textDecoration: 'none' }}>
                        <Button > Add Goods </Button>
                    </Link>
                </LogoContainer>

                <SearchBar>
                     <InputContainer>
                        <Input placeholder="What are you looking for..." 
                            onChange = {event => this.setState({photo: event.target.value})}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Select onChange = {event => this.setState({voivodeship: event.target.value})}>
                            {this.state.voivodeshipList.map((voivodeship) => (
                            <option value={voivodeship}>{voivodeship}</option>
                            ))}
                        </Select>
                    </InputContainer>

                    <Button style={{ float: 'left', width: "17%", }}> Search </Button>
                </SearchBar>

                <ContentContainer>
                    {/* {this.state.goods.map((good) => (
                            <Good 
                            title = {good.title}
                            who = {good.who}
                            description = {good.description}
                            where = {good.where}
                            photo = {good.photo}
                            />
                        ))} */}

                    <Title>Category</Title>
                    <CategoryContainer>
                        {this.state.categoryList.map((category) => (
                            <Link to={{pathname:'/categoryoffert/' + category, style:{ textDecoration: 'none' }}}>
                                <ButtonCategory > {category} </ButtonCategory>
                            </Link>
                        ))}

                    </CategoryContainer>
                </ContentContainer>

            </Container>
        )
    }
}

export default MainApp
