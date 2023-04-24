import dynamic from "next/dynamic";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { get, post } from "@/helpers/api_helper";
import { GET_PAGE, POST_ABOUT_PAGE } from "@/helpers/url_helper";
import Head from "next/head";
import { useState } from "react";
import { BsFillDashCircleFill, BsFillPlusCircleFill } from "react-icons/bs";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
export default function EditPreferences() {
    const [Error, SetError] = useState('');
    const [Success, SetSuccess] = useState('');
    const [buttonDisabled, SetButtonDisabled] = useState('');
    const [getPageStatus, setGetPageStatus] = useState(false);
    const [iconBlocksRows, setIconBlocksRows] = useState(1);
    const [testimonialRows, setTestimonialRows] = useState(1);
    const [preferencesPageInputs, setPreferencesPageInputs] = useState({
        'pageID': '',
        "bannerImage": "",
        "bannerImageName": "",
        'bannerImageUrl': "",
        'bannerTitle': "",
        'bannerText': "",
        'aboutImage': "",
        'aboutImageName': "",
        "aboutTitle": "",
        "aboutContent": "",
        'iconBlocks': [],
        'testimonials': []
    })


    const getPageData = async () => {
        const pageData = await get(GET_PAGE + 'about');
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

    const add_new_testimonial = (key, value, index) => {
        const testimonials = (preferencesPageInputs.testimonials) ? preferencesPageInputs.testimonials : [];

        testimonials[index] = {
            ...testimonials[index],
            ...{ [key]: value }
        };
        setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, testimonials: testimonials }))
    }

    const removeTestimonial = (index) => {
        if (testimonialRows > 1) {
            const testimonial = preferencesPageInputs.testimonials;
            const newArray = []
            for (let counter = 0; counter < testimonial.length; counter++) {
                const element = testimonial[counter];
                if (counter !== index) {
                    newArray.push(element)
                }
            }
            setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, testimonials: newArray }));
            setTestimonialRows(testimonialRows - 1);
        }
    }

    const add_new_icon_block = (key, value, index) => {
        const iconBlocks = preferencesPageInputs.iconBlocks;
        iconBlocks[index] = {
            ...iconBlocks[index],
            ...{ [key]: value }
        };
        setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, iconBlocks: iconBlocks }))
    }

    const removeIconBlock = (index) => {
        if (iconBlocksRows > 1) {
            const iconBlocks = preferencesPageInputs.iconBlocks;
            const newArray = []
            for (let counter = 0; counter < iconBlocks.length; counter++) {
                const element = iconBlocks[counter];
                if (counter !== index) {
                    newArray.push(element)
                }
            }
            setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, iconBlocks: newArray }));
            setIconBlocksRows(iconBlocksRows - 1);
        }
    }

    const setIconBlockImage = (event, index) => {
        const iconBlocks = preferencesPageInputs.iconBlocks;
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
                setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, iconBlocks: iconBlocks }));
            }.bind(this);
        } else {
            if (iconBlocks[index] !== undefined) {
                iconBlocks[index]['image'] = '';
                iconBlocks[index]['fileName'] = '';
            }
            setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, iconBlocks: iconBlocks }));
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
        var res_data = await post(POST_ABOUT_PAGE, preferencesPageInputs);
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
                <title>About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">About</h1>
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
                                                    <h3 className="card-title">About Section</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="">Image</label>
                                                        <div className="input-group">
                                                            <div className="custom-file">
                                                                <input type="file" name="aboutImage" className="custom-file-input" id="aboutImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                                                <label className="custom-file-label" htmlFor="aboutImage">Choose file</label>
                                                            </div>
                                                        </div>
                                                        {preferencesPageInputs.aboutImageName}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="aboutTitle">Title</label>
                                                        <input type="text" className="form-control" value={preferencesPageInputs.aboutTitle} onChange={handleInputChange} name="aboutTitle" id="aboutTitle" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="aboutText">Content</label>
                                                        <Editor data={preferencesPageInputs.aboutContent} blurEvent={(e, editor) => { const data = editor.getData(); setPreferencesPageInputs((input) => ({ ...preferencesPageInputs, aboutContent: data })); }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Icon Block Section</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="preferencesTitle">Title</label>
                                                        <input type="text" className="form-control" value={preferencesPageInputs.iconBlockTitle} onChange={handleInputChange} name="iconBlockTitle" id="iconBlockTitle" />
                                                    </div>
                                                    <div className={`iconBlocks ${(iconBlocksRows > 1) ? 'multiple' : ''}`}>
                                                        {Array.from({ length: iconBlocksRows }, (_, index) => {
                                                            const title = (preferencesPageInputs['iconBlocks'][index] && preferencesPageInputs['iconBlocks'][index]['title']) ? preferencesPageInputs['iconBlocks'][index]['title'] : ''
                                                            const text = (preferencesPageInputs['iconBlocks'][index] && preferencesPageInputs['iconBlocks'][index]['text']) ? preferencesPageInputs['iconBlocks'][index]['text'] : ''
                                                            const selectedFileName = (preferencesPageInputs['iconBlocks'][index] && preferencesPageInputs['iconBlocks'][index]['fileName']) ? preferencesPageInputs['iconBlocks'][index]['fileName'] : ''
                                                            const selectedFileUrl = (preferencesPageInputs['iconBlocks'][index] && preferencesPageInputs['iconBlocks'][index]['imageUrl']) ? preferencesPageInputs['iconBlocks'][index]['imageUrl'] : ''
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
                                                                                <label htmlFor="preferencesText">Text</label>
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
                                                                                    {selectedFileName}
                                                                                    <div className="image-wrap">
                                                                                        <img src={selectedFileUrl} />
                                                                                    </div>
                                                                                </div>
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
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Testimonial Section</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className={`testimonials ${(testimonialRows > 1) ? 'multiple' : ''}`}>
                                                        {
                                                            Array.from({ length: testimonialRows }, (_, index) => {
                                                                const name = (preferencesPageInputs.testimonials && preferencesPageInputs.testimonials[index] && preferencesPageInputs.testimonials[index]['name']) ? preferencesPageInputs.testimonials[index].name : '';
                                                                const text = (preferencesPageInputs.testimonials && preferencesPageInputs.testimonials[index] && preferencesPageInputs.testimonials[index]['text']) ? preferencesPageInputs.testimonials[index].text : '';
                                                                const company = (preferencesPageInputs.testimonials && preferencesPageInputs.testimonials[index] && preferencesPageInputs.testimonials[index]['company']) ? preferencesPageInputs.testimonials[index].company : '';

                                                                return (
                                                                    <div key={index} className="testimonialItem">
                                                                        <div className="card card-primary">
                                                                            <div className="card-body">
                                                                                <span className='remove-testimonial' onClick={(e) => { e.persist(); removeTestimonial(index); }}><BsFillDashCircleFill /></span>
                                                                                <div className="form-group">
                                                                                    <label htmlFor="input-title">Name</label>
                                                                                    <input type="text" className="form-control" value={name} onChange={(e) => add_new_testimonial('name', e.target.value, index)} name={`testimonials[${index}][name]`} id="input-title" />
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <label htmlFor="input-title">Text</label>
                                                                                    <textarea className="form-control" id="input-title" value={text} onChange={(e) => add_new_testimonial('text', e.target.value, index)} name={`testimonials.${index}.text`} placeholder="" ></textarea>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <label htmlFor="input-title">Company Name</label>
                                                                                    <input type="text" className="form-control" value={company} onChange={(e) => add_new_testimonial('company', e.target.value, index)} name={`testimonials.${index}.company`} id="input-title" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        <span className='add-new-testimonial' onClick={(e) => { setTestimonialRows(testimonialRows + 1) }}><BsFillPlusCircleFill /></span>
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