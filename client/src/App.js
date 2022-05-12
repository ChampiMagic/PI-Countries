import './App.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/landingPage.jsx';
import Home from './components/home.jsx';
import Details from './components/details.jsx';
import Form from './components/form.jsx';


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Landing />}  />
        <Route path="/home" element={<Home />}  />
        <Route path="/home/:id" element={<Details />}  />
        <Route path="/form" element={<Form />}  />
      </Routes>
    </Provider>
  );
}

export default App;
