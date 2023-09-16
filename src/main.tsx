import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<SnackbarProvider>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</PersistGate>
			</SnackbarProvider>
		</Provider>
	</React.StrictMode>
);
