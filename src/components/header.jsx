import React,{Component} from 'react';
import imgHeader from '../imgs/header.png'

export default class Header extends Component{

    render() {
        return (
            <div>
                <img src={imgHeader} alt="header" />
                <h1>I'm Header!</h1>
            </div>
        )
    }
}
