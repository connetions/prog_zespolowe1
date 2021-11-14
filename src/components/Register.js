import React, {Component} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import './Login.css';
import { auth, db } from "../firebase-config"
import { Navigate } from 'react-router-dom';
import {collection, setDoc, getDocs, addDoc, updateDoc, deleteDoc, doc} from "@firebase/firestore";
import styled from "styled-components"
import { Link } from 'react-router-dom';

const Container = styled.div`
    // background-color: aqua;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

`
const LogoContainer = styled.div`
    // background-color:bisque;
    height: 100px;
    width: 800px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`
const ContentContainer = styled.div`
    // background-color:darkgreen;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2%;
`
const Form = styled.div`
    margin-left: auto;
    margin-right: auto;
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    // height: 500px;
    padding: 20px;
    width: 400px;
`
const Title = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
    margin-top: 30px;
`
const Subtitle = styled.div`
    color: #eee;
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
    background-color: #303245;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;

`
const Button = styled.div`
    background-color: #08d;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 18px;
    height: 50px;
    margin-top: 16px;
    // outline: 0;
    text-align: center;
    padding: 12px 0;
    vertical-align: middle;
    
    width: 100%;
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
                        Logo
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
                            <Input placeholder="Surname.."  
                                onChange = {event => this.setState({surname: event.target.value})}
                            />
                            </InputContainer>
                            <Button onClick = {this.register}> Create User</Button>
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