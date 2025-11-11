import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { NavigationProvider } from "./context/NavigationContext.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
// import { DropdownProvider } from "./context/DropdownContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <NavigationProvider>
              {/* <DropdownProvider> */}
              <Router>
                <AppWrapper>
                  <App />
                </AppWrapper>
              </Router>
              {/* </DropdownProvider> */}
            </NavigationProvider>
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </Suspense>
  </StrictMode>,
);