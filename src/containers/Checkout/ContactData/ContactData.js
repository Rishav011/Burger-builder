import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import {connect} from 'react-redux';
import * as orderActions from '../../../store/actions/index'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from  '../../../components/UI/Input/Input';
class ContactData extends Component{
    state = {
       orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                validation:{
                    required:true
                },
                touched:false,
                valid:false,
                value: ''
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            zipcode : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5 

                },
                valid:false,
                touched:false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            email : {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'',displayValue:'-Select-'},
                        {value:'fastest',displayValue: 'Fastest'},
                        {value:'cheapest',displayValue: 'Cheapest'}
                ]
                },
                validation:{},
                valid:true,
                touched:false,
                value: 'fastest'
            }
       },
        formIsValid:false
    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        } 
        // alert('Order placed!');
        const order = {
            ingridients : this.props.ings,
            price : this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
       this.props.onOrderBurger(order,this.props.token);
        // console.log(this.props.ings);
    }

    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== "" && isValid ;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid ;
        }
        return isValid;
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
       const updatedFormElement = {
           ...updatedOrderForm[inputIdentifier]
       };
       
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
       updatedFormElement.touched = true;
       updatedOrderForm[inputIdentifier] = updatedFormElement;
    //    console.log(updatedFormElement);
       let formIsValid = true;
       for(let inputIdentifier in updatedOrderForm){
           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }
       this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});        

    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config:this.state.orderForm[key]
            });
        }
        
        let form = (
            <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key = {formElement.id}
                    elementType = {formElement.config.elementType} 
                    elementConfig = {formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}
                />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}><span style={{color:'transparent'}}>..</span>ORDER</Button>
        </form>       
        );
        if(this.props.loading){
            form = <Spinner />

        }
        
        return ( 
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>

        );
    }
}
const mapStateToProps = state => {
    return{
        ings:state.burgerBuilder.ingridients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.idToken,
        userId:state.auth.userId
    }
}

const mapDispatchtoProps = dispatch => {
   return{ 
       onOrderBurger: (orderData,token) => dispatch(orderActions.purchaseBurger(orderData,token))}
}

export default connect(mapStateToProps,mapDispatchtoProps)(ContactData);