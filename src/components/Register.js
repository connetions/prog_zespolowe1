import React, {Component} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import './Login.css';
import { auth, db } from "../firebase-config"
import { Navigate } from 'react-router-dom';
import { setDoc, doc} from "@firebase/firestore";
import styled from "styled-components"
import { Link } from 'react-router-dom';
import logo from '../logo.png';

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
    border-radius: 4px;
    box-shadow: 0 0 5px 1px #333;
    margin: 0 auto;
    background-color: #DDDDDD;
    padding: 20px;
    width: 400px;
`
const Title = styled.div`
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
    margin-top: 30px;
`
const Subtitle = styled.div`
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
`
const InputContainer = styled.div`
    height: 50px;
    position: relative;
    width: 100%;
    margin-top:15px
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
const Button = styled.div`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 18px;
    height: 50px;
    margin-top: 16px;
    text-align: center;
    padding: 12px 0;
    vertical-align: middle;
    width: 100%;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`
const Img = styled.img`
    width: 80px;
    margin-left:4%;
`

class AfterRegister extends Component{

    state = {
        cnt: 5
    }

    componentDidMount = () =>{
        const intervalId = setInterval(this.countDown, 1000)
        this.setState({intervalId})
    }

    countDown = () => this.setState({cnt: this.state.cnt - 1})

    componentWillUnmount = () => clearInterval(this.state.intervalId)

    render(){
        return(
            <Container>
                <LogoContainer>
                    Logo
                </LogoContainer>
            
                <ContentContainer>
                    <Form>
                        <Title> Thank you for sing up! </Title>
                        <Subtitle>For {this.state.cnt} second you will navigate to Login </Subtitle>
                        {this.state.cnt === 0 && <Navigate to ='/' />}
                        </Form>
                </ContentContainer>
                
            </Container>
        )
    }
}

class Register extends Component {

    state = {
        registerEmail: '',
        registerPassword: '',
        name: '',
        surname: '',
        user: {},
        userid: '',
        phone: '',
        flag: false
    }

    componentWillMount(){
        onAuthStateChanged(auth, (currentUser) =>{
                this.setState({user: currentUser}) 
                // this.setState({userid: currentUser.uid})   
        })
    }

    register = async () => {
        try{
            const user = await createUserWithEmailAndPassword(
                auth,
                this.state.registerEmail,
                this.state.registerPassword
            );
            this.setState({flag: true})

            // try {
            // const docRef = await addDoc(collection(db, "users"), {
            //     first: "Alan",
            //     middle: "Mathison",
            //     last: "Turing",
            //     born: 1912
            // });

            // console.log("Document written with ID: ", docRef.id);
            // } catch (e) {
            // console.error("Error adding document: ", e);
            // }
            console.log(this.state.user.uid);
            const data = {
                    email:this.state.registerEmail,
                    name: this.state.name,
                    surname: this.state.surname,
                    phone: this.state.phone,
                    uid: this.state.user.uid
                }

            await setDoc(doc(db, "users", this.state.user.uid), data);
         
            console.log(user)
        } catch (error) {
            console.log(error.message);
        }
    };


    logout = async () => {
        await signOut(auth)

    };

    render(){
        if(this.state.flag){
            return <AfterRegister />
        }
        else{
            return (
                <Container>
                    <LogoContainer>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Img src={logo} alt="Logo" />
                        </Link>
                        
                    </LogoContainer>

                    <ContentContainer>
                        <Form>
                            <Title> Register User </Title>
                            <InputContainer>
                            <Input placeholder="Email..." 
                                onChange = {event => this.setState({registerEmail: event.target.value})}
                            />
                            </InputContainer>

                            <InputContainer>
                            <Input placeholder="Password..."  type = "password"
                                onChange = {event => this.setState({registerPassword: event.target.value})}
                            />
                            </InputContainer>

                            <InputContainer>
                            <Input placeholder="Name..."  
                                onChange = {event => this.setState({name: event.target.value})}
                            />
                            </InputContainer>

                            <InputContainer>
                            <Input placeholder="Surname..."  
                                onChange = {event => this.setState({surname: event.target.value})}
                            />
                            </InputContainer>

                            <InputContainer>
                            <Input placeholder="Phone number..."  
                                onChange = {event => this.setState({phone: event.target.value})}
                            />
                            </InputContainer>

                            <Button onClick = {this.register}> Create User</Button>
                            <Subtitle> <hr></hr> </Subtitle>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button > Back to login </Button>
                            </Link>
                       

                        {/* <h4> User Logged In: </h4> */}
                        {/* {this.state.user?.email} */}
                        {/* <button onClick = {this.logout}> Sign Out </button> */}
                        </Form>
                    </ContentContainer>
                </Container>
            )
        }
    }
}

export default Register