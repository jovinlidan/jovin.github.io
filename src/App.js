import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "./movies/Movies";
import NavBar from "./NavBar";
import Customers from "./customers/Customers";
import Rentals from "./rentals/Rentals";
import NotFound from "./NotFound";
import MovieForm from "./movies/MovieForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./App.css";
function App() {
  return (
    <main className="container">
      <NavBar />
      <Switch>
        <Route path="/login" exact component={LoginForm} />

        <Route path="/movies/:id" exact component={MovieForm} />
        {/* <Route path="/movies/new" exact component={MovieForm} /> */}
        <Route path="/movies" exact component={Movies} />
        <Route path="/customers" exact component={Customers} />
        <Route path="/rentals" exact component={Rentals} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/not-found" exact component={NotFound} />
        <Redirect from="/" to="/movies" exact />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
