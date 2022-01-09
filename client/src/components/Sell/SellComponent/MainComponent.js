import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { postItem, fetchSellItem } from '../../../redux/Sell/ActionCreator';
const mapStateToProps = state => {
    return {
        sellItem: state.sellItem
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchSellItem: () => dispatch(fetchSellItem()),
    postItem: (item, history) => dispatch(postItem(item, history)),
});

function RenderSellItem({ item }) {
    return(
        <Card>
            <Link to={`/sell/${item._id}`} className="text-decoration-none">
                    <Card>
                        <CardImg width="100%" src={`${imageUrl}${item.image}`} alt={item.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.title}</CardTitle>
                            <CardSubtitle>Price : ${item.price/100}</CardSubtitle>
                        </CardBody>
                    </Card>
            </Link>
        </Card>
    );
}

const RenderItems = (props) => {

    const items = props.sellItem.items.map((item) => {
        return (
            <div key={item._id} className="col-12 col-md-6 col-lg-4">
                <RenderSellItem item={item} />
            </div>
        );
    });

    if (props.sellItem.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.sellItem.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.sellItem.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    {items}
                </div>
            </div>
        );
}


class Sell extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(!this.props.sellItem.isLoading)
        this.props.fetchSellItem();
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Sell</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h3>Courses</h3>
                            <hr />
                        </div>
                        <div className="col-8">
                            <Link to="/sell/createcourse" className="pull-right shadow-none">
                                <span className="fa fa-plus fa-lg"></span>  Create New Course
                            </Link>
                        </div>
                        <div>
                            {
                                // (this.props.sellItem.items == null || this.props.sellItem.items.length == 0)?
                                // <h4>Selling List is Empty</h4>:
                                <RenderItems
                                    sellItem={this.props.sellItem}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sell));


// export default Sell;