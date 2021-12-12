import React from "react";
import logo from "../logo.png";
import {Link} from "react-router-dom";
import {signOut} from "@firebase/auth";
import {auth} from "../firebase-config";
import './header.css'

const logout = async () => {
    await signOut(auth)

};

class Header extends React.Component {

    render() {
        return (
            <div className="logo-container">
                <Link className="button-logo" to="/" >
                    <img src={logo} alt="Logo" />
                </Link>
                <div className="buttons">
                    <Link className="button" to="/" onClick = {logout}>
                         Sign Out
                    </Link>
                    
                    <Link className="button" to="/addgoods" >
                        Add Goods
                    </Link>

                    <Link className="button" to="/myaccount" >
                        My Account
                    </Link>
                </div>

            </div>
        )
    }
}

export default Header;