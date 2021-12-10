import React from "react";
import logo from "../logo.png";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {signOut} from "@firebase/auth";
import {auth} from "../firebase-config";

const LogoContainer = styled.div`
    background-color: #444444;
    width:100%;
    display:flex;
    justify-content: space-between;
    padding: 5px 20px;
    box-sizing: border-box;
`

const ButtonLogo = styled(Link)`
    cursor: pointer;
    color: #eee;
    border-radius: 12px;
    border: solid 2px #27ae60;
    &:hover {
      transform: scale(1.1)
    }
`
const Buttonlogout = styled.a`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    box-sizing: border-box;
    color: #eee;
    font-size: 15px;
    padding: 20px;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`

const Buttons = styled.div`
    align-self: center;
    justify-content: flex-end;
    display: flex;
    flex: 0 0 80%;
  > * {
      margin-left: 20px;
    }
`

const Img = styled.img`
    width: 80px;
`

const Button = styled(Link)`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    box-sizing: border-box;
    color: #eee;
    font-size: 15px;
    padding: 20px;
    text-decoration: none;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`

const logout = async () => {
    await signOut(auth)

};

class Header extends React.Component {

    render() {
        return (
            <LogoContainer>
                <ButtonLogo to="/" >
                    <Img src={logo} alt="Logo" />
                </ButtonLogo>
                <Buttons>

                    <Buttonlogout onClick = {logout}> Sign Out </Buttonlogout>

                    <Button to="/addgoods" >
                        Add Goods
                    </Button>

                    <Button to="/myaccount" >
                        My Account
                    </Button>
                </Buttons>

            </LogoContainer>
        )
    }
}

export default Header;