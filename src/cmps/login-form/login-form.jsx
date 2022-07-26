import React from 'react';
import './login-form.scss';
import useInput from "../../hooks/use-input";

const validateEmail = value => value.includes('@');
const validatePassword = (value => value.trim() !== '');

const LoginForm = (props) => {

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(validateEmail);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput(validatePassword);

    let formIsValid = false;

    if (enteredPasswordIsValid && enteredEmailIsValid) formIsValid = true;

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) return;
        resetPasswordInput();
        resetEmailInput();
    }

    const emailInputClasses = emailInputHasError ? 'form-input invalid' : 'form-input';
    const passwordInputClasses = passwordInputHasError ? 'form-input invalid' : 'form-input';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className="form-container">
                <div className={emailInputClasses}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangedHandler}
                        onBlur={emailBlurHandler}
                    />
                    {emailInputHasError && <p className='error-text'>Please enter a valid email address.</p>}
                </div>
                <div className={passwordInputClasses}>
                    <label htmlFor="email">Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangedHandler}
                        onBlur={passwordBlurHandler}
                    />
                    {passwordInputHasError && <p className='error-text'>Please enter your password.</p>}
                </div>
            </div>
            <div className="form-actions">
                <button className='form-btn' disabled={!formIsValid}>Login</button>
            </div>
        </form>
    );
}

export default LoginForm;

