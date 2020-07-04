import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import * as actions from '../../store/actions/index';
import Spinner from '../..//components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
class Auth extends Component {
    state = {
        controls: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                validation:{
                    required:true,
                    isEmail:true
                },
                touched:false,
                valid:false,
                value: ''
            }, 
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                validation:{
                    required:true,
                    minLength:6
                },
                touched:false,
                valid:false,
                value: ''
            }
        },
        isSignup:true

    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }

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

    inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls})
    }

    SubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{isSignup:!prevState.isSignup};
        });
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config:this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
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
        ))
        if(this.props.loading){
            form=<Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath} />

        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.SubmitHandler}>
                    {form}
                    <Button btnType="Success">Signup</Button>
                </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">{this.state.isSignup?'Login':'Sign-Up'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);