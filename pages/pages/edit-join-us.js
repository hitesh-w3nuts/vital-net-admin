import dynamic from "next/dynamic";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { get, post } from "@/helpers/api_helper";
import { GET_PAGE, POST_JOIN_US_PAGE } from "@/helpers/url_helper";
import Head from "next/head";
import { useState } from "react";
import { BsFillDashCircleFill, BsFillPlusCircleFill } from "react-icons/bs";

export default function EditJoinUs() {
    const [Error, SetError] = useState('');
    const [Success, SetSuccess] = useState('');
    const [buttonDisabled, SetButtonDisabled] = useState('');
    const [getPageStatus, setGetPageStatus] = useState(false);
    const [iconBlocksRows, setIconBlocksRows] = useState(1);
    const [testimonialRows, setTestimonialRows] = useState(1);
    const [joinUsPageInputs, setPreferencesPageInputs] = useState({
        'pageID': '',
        "bannerImage": "",
        "bannerImageName": "",
        'bannerImageUrl': "",
        'bannerTitle': "",
        'bannerText': "",
        'iconBlocks': [],
    })


    const getPageData = async () => {
        const pageData = await get(GET_PAGE + 'join-us');
        if (pageData.result && pageData.data) {
            const data = pageData.data.content
            const savedData = {
                'pageID': pageData.data._id,
                ...data,
            }
            setTestimonialRows((data.testimonials && data.testimonials.length) ? data.testimonials.length : 1);
            setIconBlocksRows((data.iconBlocks.length) ? data.iconBlocks.length : 1);
            setPreferencesPageInputs(savedData);
        }
        setGetPageStatus(true);
    }

    useState(() => {
        if (!getPageStatus) {
            getPageData();
        }
    }, [getPageStatus]);

    const add_new_icon_block = (key, value, index) => {
        const iconBlocks = joinUsPageInputs.iconBlocks;
        iconBlocks[index] = {
            ...iconBlocks[index],
            ...{ [key]: value }
        };
        setPreferencesPageInputs((input) => ({ ...joinUsPageInputs, iconBlocks: iconBlocks }))
    }

    const removeIconBlock = (index) => {
        if (iconBlocksRows > 1) {
            const iconBlocks = joinUsPageInputs.iconBlocks;
            const newArray = []
            for (let counter = 0; counter < iconBlocks.length; counter++) {
                const element = iconBlocks[counter];
                if (counter !== index) {
                    newArray.push(element)
                }
            }
            setPreferencesPageInputs((input) => ({ ...joinUsPageInputs, iconBlocks: newArray }));
            setIconBlocksRows(iconBlocksRows - 1);
        }
    }

    const setIconBlockImage = (event, index) => {
        const iconBlocks = joinUsPageInputs.iconBlocks;
        const file = event.target.files[0];
        if (file !== undefined) {
            const reader = new FileReader();
            const url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                const selectedFileName = file.name;
                if (iconBlocks[index] === undefined) {
                    iconBlocks[index] = {
                        'image': reader.result,
                        'fileName': selectedFileName,
                    }
                } else {
                    iconBlocks[index]['image'] = reader.result;
                    iconBlocks[index]['fileName'] = selectedFileName;
                }
                setPreferencesPageInputs((input) => ({ ...joinUsPageInputs, iconBlocks: iconBlocks }));
            }.bind(this);
        } else {
            if (iconBlocks[index] !== undefined) {
                iconBlocks[index]['image'] = '';
                iconBlocks[index]['fileName'] = '';
            }
            setPreferencesPageInputs((input) => ({ ...joinUsPageInputs, iconBlocks: iconBlocks }));
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
                setPreferencesPageInputs((inputs) => ({ ...joinUsPageInputs, [fileName]: reader.result, [fileName + 'Name']: selectedFileName }));
            }.bind(this);
        } else {
            const fileName = event.target.name;
            setPreferencesPageInputs((inputs) => ({ ...joinUsPageInputs, [fileName]: "", [fileName + 'Name']: '' }));
        }
    };

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setPreferencesPageInputs((inputs) => ({ ...joinUsPageInputs, [event.target.name]: event.target.value }));
    };

    // form submit event
    const submitForm = async (event) => {
        event.preventDefault();
        console.log(joinUsPageInputs)
        SetError("");
        SetSuccess("");
        SetButtonDisabled(true);
        var res_data = await post(POST_JOIN_US_PAGE, joinUsPageInputs);
        if (res_data.result) {
            SetSuccess(res_data.message);
            setPreferencesPageInputs((input) => ({ ...joinUsPageInputs, pageID: res_data.newPageID }));
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
                <title>Join Us</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Join Us</h1>
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
                                                            <img src={joinUsPageInputs.bannerImageUrl} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="BannerTitle">Title</label>
                                                        <input type="text" className="form-control" value={joinUsPageInputs.bannerTitle} onChange={handleInputChange} name="bannerTitle" id="BannerTitle" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="bannerText">Text</label>
                                                        <textarea className="form-control" value={joinUsPageInputs.bannerText} onChange={handleInputChange} name="bannerText" id="bannerText" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Icon Block Section</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className={`iconBlocks ${(iconBlocksRows > 1) ? 'multiple' : ''}`}>
                                                        {Array.from({ length: iconBlocksRows }, (_, index) => {
                                                            const title = (joinUsPageInputs['iconBlocks'][index] && joinUsPageInputs['iconBlocks'][index]['title']) ? joinUsPageInputs['iconBlocks'][index]['title'] : ''
                                                            const text = (joinUsPageInputs['iconBlocks'][index] && joinUsPageInputs['iconBlocks'][index]['text']) ? joinUsPageInputs['iconBlocks'][index]['text'] : ''
                                                            const selectedFileName = (joinUsPageInputs['iconBlocks'][index] && joinUsPageInputs['iconBlocks'][index]['fileName']) ? joinUsPageInputs['iconBlocks'][index]['fileName'] : ''
                                                            const selectedFileUrl = (joinUsPageInputs['iconBlocks'][index] && joinUsPageInputs['iconBlocks'][index]['imageUrl']) ? joinUsPageInputs['iconBlocks'][index]['imageUrl'] : ''
                                                            const btnText = (joinUsPageInputs['iconBlocks'][index] && joinUsPageInputs['iconBlocks'][index]['buttonText']) ? joinUsPageInputs['iconBlocks'][index]['buttonText'] : '';
                                                            const btnLink = (joinUsPageInputs['iconBlocks'][index] && joinUsPageInputs['iconBlocks'][index]['buttonLink']) ? joinUsPageInputs['iconBlocks'][index]['buttonLink'] : '';
                                                            return (
                                                                <div key={index} className="iconBlockItem">
                                                                    <div className="card card-primary">
                                                                        <div className="card-body">
                                                                            <span className='remove-iconBlock' onClick={(e) => { e.persist(); removeIconBlock(index); }}><BsFillDashCircleFill /></span>
                                                                            <div className="form-group">
                                                                                <label htmlFor="input-title">Title</label>
                                                                                <input type="text" className="form-control" value={title} onChange={(e) => add_new_icon_block('title', e.target.value, index)} name={`iconBlocks.${index}.title`} id="input-title" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="joinUsText">Text</label>
                                                                                <textarea className="form-control" value={text} onChange={(e) => add_new_icon_block('text', e.target.value, index)} name="{`iconBlocks.${index}.text`}" id="iconBlockText" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="">Icon  Image</label>
                                                                                    <div className="input-group">
                                                                                        <div className="custom-file">
                                                                                            <input type="file" name={`iconBlocks.${index}.image`} className="custom-file-input" id={`iconImage${index}`} onChange={(e) => { setIconBlockImage(e, index) }} accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                                                                            <label className="custom-file-label" htmlFor={`iconImage${index}`}>Choose file</label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="image-wrap">
                                                                                        <img src={selectedFileUrl} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="BannerButtonTitle">Button Title</label>
                                                                                <input type="text" className="form-control" value={btnText} onChange={(e) => add_new_icon_block('buttonText', e.target.value, index)} name={`iconBlocks.${index}.buttonText`} id={`BannerButtonTitle-${index}`} />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="BannerButtonLink">Button Link</label>
                                                                                <input type="text" className="form-control" value={btnLink} onChange={(e) => add_new_icon_block('buttonLink', e.target.value, index)} name={`iconBlocks.${index}.buttonLink`} id={`BannerButtonLink-${index}`} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                        <span className='add-new-iconBlock' onClick={(e) => { e.persist(); setIconBlocksRows(iconBlocksRows + 1) }}><BsFillPlusCircleFill /></span>
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