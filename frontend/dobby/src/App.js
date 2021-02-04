import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/registerScreen';
import ImageUploadScreen from './screens/ImageUploadScreen';

function App() {
  return (
    <Router>

    <Header />
    <main className="py-3" style={{ height: "100vh"}}>
      <Container>
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/user/images/:id/edit" component={ImageUploadScreen} />
      <Route path="/search/:keyword" component={HomeScreen} exact />
      <Route path="/" component={HomeScreen} exact />
      </Container>
    </main>
    <Footer style={{ position: "fixed", 
  bottom: 0}} />
    </Router>
  );
}

export default App;
