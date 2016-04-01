/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



Pages.login_form = new Page(
    'Login',
    `


<div id="login-error" class="hidden"></div>

 <form onsubmit="loginFormSubmit();return false;">

Jméno: <input type="text" id="username"><br>
Heslo: <input type="password" id="password">

<input type="submit" value="OK">

</form>


`
);

