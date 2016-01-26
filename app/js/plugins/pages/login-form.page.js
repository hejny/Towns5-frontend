/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



T.Plugins.install(new T.Page(
    'login',
    'Login',
    `


<div id="login-error" class="hidden"></div>

 <form onsubmit="loginFormSubmit();return false;">

Jméno: <input type="text" id="username"><br>
Heslo: <input type="password" id="password">

<input type="submit" value="OK">

</form>


`
));

