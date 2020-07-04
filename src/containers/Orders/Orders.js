import React , { Component } from 'react';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);

    }
    render(){
        let order = <Spinner />;
       
        if(this.props.error){
            order=(
            <p style={{textAlign:"center"}}>{this.props.error.message}</p>
            )
        }
        if(!this.props.loading) {
            order = this.props.orders.map(order => (
                  <Order 
                     key = {order.id}
                         ingridients ={order.ingridients}
                         price={+order.price}  />
                ));
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        error:state.order.error,
        token:state.auth.idToken,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders); 