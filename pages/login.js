import { Fragment } from "react";
import Head from 'next/head'
import Image from 'next/image'

import LoginLayout from '@/components/Layout/LoginLayout';
import { FaEnvelope, FaLock } from 'react-icons/fa'

import SimpleReactValidator from "simple-react-validator";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../store/actions";
import { post } from "@/helpers/api_helper";
import { useDispatch, useSelector } from "react-redux";
import { getToken,setUserSession } from "@/helpers/Helper";
import { POST_LOGIN } from "@/helpers/url_helper";

import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [loginInput, setLoginInput] = useState({'email' : "", password: ""});
    const myState = useSelector((state) => state.login);
	const dispatch = useDispatch();
    
    const sessionToken = getToken();
    const simpleValidator = useRef(new SimpleReactValidator());

    const [Error, SetError] = useState("");
    const [ButtonDisabled, SetButtonDisabled] = useState(false);
    const [forceUpdate, setforceUpdate] = useState();
    
    useEffect(() => {
		if (sessionToken) router.push("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionToken]);


    // form submit event
	const handleSubmit = async (event) => {
		event.preventDefault();

		const formValid = simpleValidator.current.allValid();
		if (!formValid) {
			simpleValidator.current.showMessages(true);
			setforceUpdate(1);
		} else {
			SetError("");
			SetButtonDisabled(true);
			var res_data = await post(POST_LOGIN, loginInput);
			if (res_data.result) {
				setUserSession(res_data.token, res_data.data);
				dispatch(loginUser());
				router.push("/");
			} else {
				SetError(res_data.message);
                setTimeout(() => {
                    SetError('');
                }, 3000);
			}
			SetButtonDisabled(false);
		}
	};

    // input text change handler
	const handleInputChange = (event) => {
		event.persist();
		setLoginInput((inputs) => ({ ...loginInput, [event.target.name]: event.target.value }));
	};

    return (
        <Fragment>
            <Head>
                <title>Login</title>
            </Head>
            <div className='login-page'>
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link href="/" className="h1"><Image src="logo.svg" width={183} height={48} /></Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleInputChange} value={loginInput.email}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <FaEnvelope/>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleInputChange} value={loginInput.password} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        <FaLock/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                    <div className="col-12 mt-2"><ErrorMessage message={Error} /></div>
                                </div>
                            </form>
                            <p className="mb-1">
                                {/* <a href="forgot-password.html">I forgot my password</a> */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
Login.getLayout = function pageLayout(page) {
    return <LoginLayout>{page}</LoginLayout>;
};
export default Login;