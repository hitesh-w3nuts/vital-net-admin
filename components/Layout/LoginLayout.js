import { Provider } from "react-redux";
import store from "../../store/store";
export default function LoginLayout({ children }) {
	return (
		<>
		<Provider store={store}>
            {children}
		</Provider>
		</>
	);
}