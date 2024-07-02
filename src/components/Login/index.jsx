function Login(props){

    return (
        <div className="loginCont">
            <h2>Resume<span className="matrix">Matrix</span></h2>
            <p>Login</p>
            <form className="authForm" onSubmit={props.submitHandler}>
                <input
                    onChange={props.changeHandler}
                    type="email"
                    name="email"
                    placeholder="example123@email.com"
                    className={props.hasError ? "invalidInput" : ""}
                
                />
                <input
                    onChange={props.changeHandler}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={props.hasError ? "invalidInput" : ""}
                
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default Login;
