import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { get, post } from "@/helpers/api_helper";
import { GET_PAGE, POST_CONTACT_PAGE } from "@/helpers/url_helper";
import Head from "next/head";
import { useState } from "react";
import { BsFillDashCircleFill, BsFillPlusCircleFill } from "react-icons/bs";

export default function EditPreferences() {
    const [Error, SetError] = useState('');
    const [Success, SetSuccess] = useState('');
    const [buttonDisabled, SetButtonDisabled] = useState('');
    const [getPageStatus, setGetPageStatus] = useState(false);
    const [preferencesPageInputs, setPreferencesPageInputs] = useState({
        'pageID': '',
        "bannerImage": "",
        "bannerImageName": "",
        'bannerImageUrl': "",
        'bannerTitle': "",
        'bannerText': "",
        'email': "",
        'address': ""
    })


    const getPageData = async () => {
        const pageData = await get(GET_PAGE + 'contact');
        if (pageData.result && pageData.data) {
            const data = pageData.data.content
            const savedData = {
                'pageID': pageData.data._id,
                ...data,
            }
            setPreferencesPageInputs(savedData);
        }
        setGetPageStatus(true);
    }

    useState(() => {
        if (!getPageStatus) {
            getPageData();
        }
    }, [getPageStatus]);

    //handle file change
    const handleInputFileChange = (event) => {
        const file = event.target.files[0];
        if (file !== undefined) {
            const reader = new FileReader();
            const url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                const selectedFileName = file.name;
                const fileName = event.target.name;
                setPreferencesPageInputs((inputs) => ({ ...preferencesPageInputs, [fileName]: reader.result, [fileName + 'Name']: selectedFileName }));
            }.bind(this);
        } else {
            const fileName = event.target.name;
            setPreferencesPageInputs((inputs) => ({ ...preferencesPageInputs, [fileName]: "", [fileName + 'Name']: '' }));
        }
    };

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setPreferencesPageInputs((inputs) => ({ ...preferencesPageInputs, [event.target.name]: event.target.value }));
    };

    // form submit event
    const submitForm = async (event) => {
        event.preventDefault();
        console.log(preferencesPageInputs)
        SetError("");
        SetSuccess("");
        SetButtonDisabled(true);
        var res_data = await post(POST_CONTACT_PAGE, preferencesPageInputs);
        if (res_data.result) {
            SetSuccess(res_data.message);
            setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, pageID: res_data.newPageID }));
            window.scrollTo(0, 0);
            setTimeout(() => {
                SetSuccess('');
            }, 3000);
        } else {
            SetError(res_data.error);
            setTimeout(() => {
                SetError('');
            }, 3000);
        }
        SetButtonDisabled(false);
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className='content'>
                <div className='container-fluid'>
                    <form onSubmit={submitForm}>
                        <div className='row'>
                            <div className="col-md-12">
                                <h1>Contact</h1>
                            </div>
                            <div className='col-md-12'>
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <ErrorMessage message={Error} />
                                        <SuccessMessage message={Success} />
                                        <div className="form-group">
                                            <label htmlFor="">Banner Image</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" name="bannerImage" className="custom-file-input" onChange={handleInputFileChange} id="bannerImage" accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                                    <label className="custom-file-label" htmlFor="bannerImage">Choose file</label>
                                                </div>
                                            </div>
                                            {preferencesPageInputs.bannerImageName}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="BannerTitle">Banner Title</label>
                                            <input type="text" className="form-control" value={preferencesPageInputs.bannerTitle} onChange={handleInputChange} name="bannerTitle" id="BannerTitle" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="bannerText">Banner Text</label>
                                            <textarea className="form-control" value={preferencesPageInputs.bannerText} onChange={handleInputChange} name="bannerText" id="bannerText" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Email">Email</label>
                                            <input type="email" className="form-control" value={preferencesPageInputs.email} onChange={handleInputChange} name="email" id="Email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <textarea className="form-control" value={preferencesPageInputs.address} onChange={handleInputChange} name="address" id="address" rows={5}/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" disabled={buttonDisabled}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}