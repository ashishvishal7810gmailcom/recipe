import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';


class ProfileRight extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <React.Fragment>
                <Card className="profile">
                    {/* <Link to={`/menu/${dish._id}`} > */}
                    
                    <CardBody>
                        {/* On click show modal to edit full name, location, education */}
                    <CardText className="pull-right"><i class="fa fa-edit fa-lg"></i></CardText>
                        <div className="mt-4 mb-3">
                            <Avatar name={this.props.auth.user.username} size="200" 
                                textSizeRatio="2"
                                round='20'
                                fgColor='#fff'
                                maxInitials='2'
                                className="round"
                                // color="lightgreen"
                            />
                        </div>
                        {/* <Card bg="primary" text="white" style={{ width: '100%' }}> */}
                        
                        
                        {/* <CardTitle>Primary Card Title</CardTitle> */}
                        {/* <Card style={{border:'none'}} className="mb-4">
                            <h2 className="text-center mb-4"> {this.props.auth.user.username}</h2>
                            <CardText><i class="fa fa-user" aria-hidden="true"></i>Full Name</CardText>
                            <CardText><i class="fa fa-envelope" aria-hidden="true"></i>Email</CardText>
                            <CardText><i class="fa fa-map-marker" aria-hidden="true"></i> Location</CardText>
                            <CardText><i class="fa fa-university" aria-hidden="true"></i> Education</CardText>
                            <CardText><i class="fa fa-calendar"></i> Joined On</CardText>
                        </Card> */}
                    </CardBody>
                </Card>

            </React.Fragment>
            
        );

    }
}

export default ProfileRight;