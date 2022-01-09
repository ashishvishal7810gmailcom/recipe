import React from 'react';
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
            <img width="100%" src={`/images/welcome.png`} alt={"welcome"} height="700px" />
        );
    }
    
}


export default Home;