import React from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl } from '../shared/baseUrl';
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
            <Card className="row">
                <CardImg width="100%" src={`${imageUrl}images/welcome1.jpg`} alt={"Welcome Image"} height="700px"/>
                <CardImgOverlay>
                  <Card className ="special-card col-10 col-md-5 offset-1 offset-md-6">
                  <CardBody className="text-center text-dark text-capitalize">
                    <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>
                      Cook easy with the recipe and eat tasty foods that you love
                    </CardTitle>
                    <CardSubtitle>
                      Want to make something tasty and healthy? 
                      Then come here and get the recipe from the best chef. 
                    </CardSubtitle>
                    <Link to="/recipes">
                    <Button className="btn btn-info"> <i className="fa fa-arrow-right" aria-hidden="true"></i>Go to Recipes</Button>
                    </Link>
                    
                  </CardBody>
                  </Card>
                 
                    {/* <CardTitle>Recipe</CardTitle>
                    <Card>
                        <CardBody className="text-center text-dark text-capitalize">
                                <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>title</CardTitle>
                                <CardSubtitle>subtitle</CardSubtitle>
                        </CardBody>
                    </Card> */}
                </CardImgOverlay>
            </Card>
        );
    }
    
}


export default Home;