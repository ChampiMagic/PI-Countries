import './App.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/landingPage.jsx';


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Landing />}  />
      </Routes>
    </Provider>
  );
}

export default App;
