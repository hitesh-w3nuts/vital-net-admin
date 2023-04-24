import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { get, post } from "@/helpers/api_helper";
import { GET_PAGE, POST_PREFERENCES_PAGE } from "@/helpers/url_helper";
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
        "preferencesTitle": "",
        "preferencesText": "",
        "preferences": [],
    })

    const [preferencesRows, setPreferencesRows] = useState(1);

    const getPageData = async () => {
        const pageData = await get(GET_PAGE + 'your-preferences');
        if (pageData.result && pageData.data) {
            const data = pageData.data.content
            const savedData = {
                'pageID': pageData.data._id,
                ...data,
            }
            setPreferencesRows((data.preferences.length) ? data.preferences.length : 1);
            setPreferencesPageInputs(savedData);
        }
        setGetPageStatus(true);
    }

    useState(() => {
        if (!getPageStatus) {
            getPageData();
        }
    }, [getPageStatus]);

    const add_new_preference_step = (key, value, index) => {
        const preferences = preferencesPageInputs.preferences;
        preferences[index] = {
            ...preferences[index],
            ...{ [key]: value }
        };
        setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, preferences: preferences }))
    }
    const removePreference = (index) => {
        if (testimonialRows > 1) {
            const preferences = preferencesPageInputs.preferences;
            const newArray = []
            for (let counter = 0; counter < preferences.length; counter++) {
                const element = preferences[counter];
                if (counter !== index) {
                    newArray.push(element)
                }
            }
            setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, preferences: newArray }));
            setPreferencesRows(preferencesRows - 1);
        }
    }

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
        var res_data = await post(POST_PREFERENCES_PAGE, preferencesPageInputs);
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
                <title>Your Preferences</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Your Preferences</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className='content'>
                <div className='container-fluid'>
                    <form onSubmit={submitForm}>
                        <div className='row'>

                            <div className='col-md-12'>
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <ErrorMessage message={Error} />
                                        <SuccessMessage message={Success} />
                                        <div className="form-group">
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Banner Section</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="">Image</label>
                                                        <div className="input-group">
                                                            <div className="custom-file">
                                                                <input type="file" name="bannerImage" className="custom-file-input" onChange={handleInputFileChange} id="bannerImage" accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                                                <label className="custom-file-label" htmlFor="bannerImage">Choose file</label>
                                                            </div>
                                                        </div>
                                                        <div className="image-wrap">
                                                            <img src={preferencesPageInputs.bannerImageUrl} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="BannerTitle">Title</label>
                                                        <input type="text" className="form-control" value={preferencesPageInputs.bannerTitle} onChange={handleInputChange} name="bannerTitle" id="BannerTitle" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="bannerText">Text</label>
                                                        <textarea className="form-control" value={preferencesPageInputs.bannerText} onChange={handleInputChange} name="bannerText" id="bannerText" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Preferences Section</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="preferencesTitle">Title</label>
                                                        <input type="text" className="form-control" value={preferencesPageInputs.preferencesTitle} onChange={handleInputChange} name="preferencesTitle" id="preferencesTitle" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="preferencesText">Text</label>
                                                        <textarea className="form-control" value={preferencesPageInputs.preferencesText} onChange={handleInputChange} name="preferencesText" id="preferencesText" />
                                                    </div>
                                                    <div className={`preferences ${(preferencesRows > 1) ? 'multiple' : ''}`}>
                                                        {Array.from({ length: preferencesRows }, (_, index) => {
                                                            const title = (preferencesPageInputs.preferences[index] && preferencesPageInputs.preferences[index].title) ? preferencesPageInputs.preferences[index].title : '';
                                                            const text = (preferencesPageInputs.preferences[index] && preferencesPageInputs.preferences[index].text) ? preferencesPageInputs.preferences[index].text : '';
                                                            const buttonText = (preferencesPageInputs.preferences[index] && preferencesPageInputs.preferences[index].buttonText) ? preferencesPageInputs.preferences[index].buttonText : '';
                                                            const buttonLink = (preferencesPageInputs.preferences[index] && preferencesPageInputs.preferences[index].buttonLink) ? preferencesPageInputs.preferences[index].buttonLink : '';
                                                            const active = (preferencesPageInputs.preferences[index] && preferencesPageInputs.preferences[index].active) ? preferencesPageInputs.preferences[index].active : '';
                                                            return (
                                                                <div key={index} className="preferencesItem">
                                                                    <div className="card card-primary">
                                                                        <div className="card-body">
                                                                            <span className='remove-preferences' onClick={(e) => { e.persist(); removePreference(index); }}><BsFillDashCircleFill /></span>
                                                                            <div className="form-group">
                                                                                <label htmlFor="input-title">Title</label>
                                                                                <input type="text" className="form-control" value={title} onChange={(e) => add_new_preference_step('title', e.target.value, index)} name={`preferences.${index}.title`} id="input-title" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="input-title">Text</label>
                                                                                <textarea className="form-control" id="input-title" value={text} onChange={(e) => add_new_preference_step('text', e.target.value, index)} name={`preferences.${index}.text`} placeholder="" rows={3} ></textarea>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="input-title">Button Text</label>
                                                                                <input type="text" className="form-control" value={buttonText} onChange={(e) => add_new_preference_step('buttonText', e.target.value, index)} name={`preferences.${index}.buttonText`} id="input-title" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="input-title">Button Link</label>
                                                                                <input type="text" className="form-control" name={`preferences.${index}.buttonLink`} id="input-title" value={buttonLink} onChange={(e) => add_new_preference_step('buttonLink', e.target.value, index)} />
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <input type="checkbox" className="form-check-input" onChange={(e) => { add_new_preference_step('active', e.target.checked, index) }} checked={active} id={`preferencesActive${index}`} name={`preferences.${index}.active`} />
                                                                                <label className="form-check-label" for={`preferencesActive${index}`}>Is Active?</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                        <span className='add-new-preferences' onClick={(e) => { e.persist(); setPreferencesRows(preferencesRows + 1) }}><BsFillPlusCircleFill /></span>
                                                    </div>
                                                </div>
                                            </div>
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