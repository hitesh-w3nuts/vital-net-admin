import { useEffect } from "react";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";

import { Provider } from "react-redux";
import store from "../../store/store";
import { is_login } from "../../helpers/Helper";

export default function DefaultLayout({ children }) {

	const router = useRouter();

	useEffect(() => {
		if (!is_login()) {
			router.push("/login");
		} else {
			document.getElementById("pageLoader").style.height = 0;
			setTimeout(() => {
				document.getElementById("pageLoaderLogo").style.display = 'none';
			}, 200);
		}
	}, []);

	return (
		<>
			<Provider store={store}>
				<div className='wrapper'>
					<Header />
					<div className="content-wrapper">{children}</div>
					<Footer />
				</div>
			</Provider>
		</>
	);
}