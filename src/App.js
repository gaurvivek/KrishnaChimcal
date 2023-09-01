import { BrowserRouter } from 'react-router-dom';
import { AppStoreProvider } from './store';
import { AppThemeProvider } from './theme';
import { AppSnackBarProvider } from './components/AppSnackBar';
import Routes from './routes';
import Layout from './layout';
import { ErrorBoundary } from './components';
import IdleTimer from './components/IdleTimer';
import { Provider } from "react-redux";
import store from "./store/storeRedux/store/index";

/**
 * Root Application Component
 * @component App
 */
const App = () => {
  return (
    <ErrorBoundary name="App">
      <Provider store={store}>
        <AppStoreProvider>
          <IdleTimer />
          <AppThemeProvider>
            <AppSnackBarProvider>
              <BrowserRouter>
                <Layout>
                  <Routes />
                </Layout>
              </BrowserRouter>
            </AppSnackBarProvider>
          </AppThemeProvider>
        </AppStoreProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
