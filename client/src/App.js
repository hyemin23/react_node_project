import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auths from "../src/hoc/auth";

//인증과정을 위해 처음 Auth 컴포넌트 에서 HOC 방법으로
//컴포넌트 인증과정 시작 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auths(LandingPage, null)} />
          <Route exact path="/login" component={Auths(LoginPage, true)} />
          <Route exact path="/register" component={Auths(RegisterPage, false)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
