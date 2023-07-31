import reactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store.js';
import './index.scss';

const root = reactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);