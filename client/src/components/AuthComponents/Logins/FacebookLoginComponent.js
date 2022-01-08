import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}


const componentClicked = (response) => {
    console.log(response);
  }
 
class FBLogin extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (

            // <div style={{display: 'flex',flexWrap: 'wrap' }} >                           
                <FacebookLogin
                    appId={28377}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="btnFacebook"
                    icon={<i className="fa fa-facebook" style={{marginLeft:'20px'}}>
                    </i>}
                    textButton = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Continue with Facebook"                                                                
                    />
            // </div>

                
        );
    }
}
export default FBLogin;