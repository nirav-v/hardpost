import ShopPage from "./components/pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";

function App() {
  return (
    <div>
      <SignUpForm />
      <LoginForm />
      <ShopPage />;
    </div>
  );
}

export default App;
