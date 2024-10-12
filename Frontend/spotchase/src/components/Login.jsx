import 'loginStyle.css';

function Login() {

    return (
        <div>
<header>
    <div>
        <h1> 
            <i>
               Improving travel one spot at a time
            </i>
        </h1>
    </div>
</header>
           
<div class="bg-img">
<h1>Spotchase</h1>

<form class="container">
    <b>Username</b>
    <input type="text" 
           placeholder="Enter your username" 
           name="username" required/>

    <b>Password</b>
    <input type="password" 
           placeholder="Enter your password" 
           name="password" required/>

    <button type="submit" class="button">Login</button>
    <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Conditions </a>.</p>
</form>
    </div>
    
    
    
    

</div>
    );
}

export default Login;