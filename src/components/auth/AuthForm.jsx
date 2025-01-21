import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
//import toastr from "toastr";

export default function AuthForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin ? "Need an account? Register here." : "Login";

  const [login, { error: loginError }] = useLoginMutation();
  const [register, { error: registerError }] = useRegisterMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { username, email, password };
    console.log("isLogin", isLogin);
    console.log("Credentials: ", credentials);

    try {
      const response = await authMethod(credentials).unwrap();
      console.log("Response: ", response);
      setUsername("");
      setEmail("");
      setPassword("");

      if (isLogin) {
        navigate("/");
      }
      //toastr.options.extendedTimeOut = 0;
      //toastr.options.positionClass = "toast-bottom-right";
      //toastr.success(`${authAction} successful!`);
    } catch (e) {
      console.error(e);
      if (e & e.message) {
        console.error("Error message: ", e.message);
      }
      if (e & e.data) {
        console.error("Error data: ", e.data);
      }
      console.log("Error", e.message);

      if (isLogin && loginError) {
        console.error("Login error", loginError);
        console.error(`${JSON.stringify(loginError.data)}`);
        //toastr.error(`${JSON.stringify(loginError.data)}`);
        //toastr.options.extendedTimeOut = 30;
      } else if (!isLogin && registerError) {
        console.error("Register error: ", registerError);
        console.error(
          `JSON Register error: ${JSON.stringify(registerError.data.e)}`
        );
        //toastr.error(`${JSON.stringify(registerError.data.e)}`);
        //toastr.options.extendedTimeOut = 30;
      }
    }
  };

  return (
    <>
      <div className="authContainer">
        <div className="auth">
          <h1>{authAction}</h1>
          <form onSubmit={attemptAuth}>
            <div className="usernameContainer">
              <label className="username">
                Username
                <input
                  name="username"
                  value={username}
                  className="usernameText"
                  onChange={(evt) => setUsername(evt.target.value)}
                  aria-label="username-input"
                />
              </label>
            </div>

            <div className="emailContainer">
              <label className="email">
                Email
                <input
                  name="email"
                  value={email}
                  className="emailText"
                  onChange={(evt) => setEmail(evt.target.value)}
                  aria-label="email-input"
                  type="email"
                />
              </label>
            </div>

            <div className="passwordContainer">
              <label className="password">
                Password
                <input
                  name="password"
                  value={password}
                  className="passwordText"
                  onChange={(evt) => setPassword(evt.target.value)}
                  aria-label="password-input"
                />
              </label>
            </div>
            <button className="loginButton">{authAction}</button>
          </form>
          <a
            href="#"
            className="loginNote"
            onClick={() => setIsLogin(!isLogin)}
          >
            {altCopy}
          </a>
        </div>
      </div>
    </>
  );
}
