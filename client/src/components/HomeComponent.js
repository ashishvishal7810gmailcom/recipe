import React from 'react';
import { baseUrl } from '../shared/baseUrl';
// import { FadeTransform } from 'react-animation-components';

class Home extends React.Component {
    

    constructor(props) {
        super(props);
        
    }
    shouldComponentUpdate(nextProps) {
        
        if (nextProps.value !== this.props.value) {
          return true;
        } else {
          return false;
        }
      }
    
    render() {
        return(
            // <FadeTransform in 
            //     transformProps={{
            //         exitTransform: 'scale(0.5) translateY(-50%)'
            //     }}>
                    <img width="100%" src={`${baseUrl}images/welcome.png`} alt={"welcome"} height="700px" />
            // </FadeTransform>
        );
    }
    
}


export default Home;