// import Editor from '@/components/Editor'
import dynamic from "next/dynamic";

import ErrorMessage from '@/components/ErrorMessage'
import SuccessMessage from '@/components/SuccessMessage'

import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { BsFillPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs"
import { GET_PAGE, POST_HOME_PAGE } from "@/helpers/url_helper";
import { get, post } from "@/helpers/api_helper";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
export default function EditHome() {
  const [Error, SetError] = useState('');
  const [Success, SetSuccess] = useState('');
  const [buttonDisabled, SetButtonDisabled] = useState('');
  const [getPageStatus, setGetPageStatus] = useState(false);

  const [iconBlocksImageNames, setIconBlocksImageNames] = useState([]);


  const [homePageInputs, setHomePageInputs] = useState({
    'pageID': '',
    'bannerContent': "",
    "bannerImage": "",
    "bannerImageName": "",
    'bannerImageUrl': "",
    "bannerVideoUrl": "",
    "bannerButtonText": "",
    "bannerButtonLink": "",
    "aboutImage": "",
    "aboutImageName": "",
    "aboutTitle": "",
    "aboutText": "",
    "aboutButtonText": "",
    "aboutButtonLink": "",
    "initiativeImage": "",
    "initiativeImageName": "",
    "initiativeTitle": "",
    "initiativeText": "",
    "initiativeButtonText": "",
    "initiativeButtonLink": "",
    "testimonials": [],
    "translatingImage": "",
    "translatingImageName": "",
    "translatingTitle": "",
    "translatingText": "",
    "preferencesTitle": "",
    "preferencesText": "",
    "preferences": [],
    'iconBlockTitle': '',
    'iconBlockText': '',
    'iconBlocks': [],
    "contributeImage": "",
    "contributeImageName": "",
    "contributeTitle": "",
    "contributeText": "",
    "contributeButtonText": "",
    "contributeButtonLink": "",
    "blogTitle": "",
    "blogButtonText": "",
    "blogButtonLink": "",
    "callToActionImage": "",
    "callToActionImageName": "",
    "callToActionTitle": "",
    "callToActionText": "",
    "callToActionButtonText": "",
    "callToActionButtonLink": "",
  })


  const { register, handleSubmit, reset, control } = useForm({ defaultValues: homePageInputs });

  const { fields: testimonials, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
    control,
    name: "testimonials"
  });

  const { fields: preferences, append: appendPreferences, remove: removePreferences } = useFieldArray({
    control,
    name: "preferences"
  });

  const { fields: iconBlocks, append: appendIconBlocks, remove: removeIconBlocks } = useFieldArray({
    control,
    name: "iconBlocks"
  });

  const [testimonialItem, setTestimonialItem] = useState({ name: "", text: "", company: "" });
  const getPageData = async () => {
    const pageData = await get(GET_PAGE + 'home');
    if (pageData.result && pageData.data) {
      const data = pageData.data.content
      const savedData = {
        'pageID': pageData.data._id,
        ...data,
      }
      setHomePageInputs(savedData);
      reset(savedData);
    }
    setGetPageStatus(true);
  }

  useState(() => {
    if (!getPageStatus) {
      getPageData();
    }
  }, [getPageStatus]);

  const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

  const setIconBlockImage = (event, index) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        const selectedFileName = file.name;
        const fileName = event.target.name;
        iconBlocks[index] = {
          ...iconBlocks[index],
          ...{image: reader.result}
        };
      }.bind(this);
    } else {
      const fileName = event.target.name;
      iconBlocks[index]['image'] = '';
    }
  }

  // input text change handler
  const handleInputChange = (event) => {
    event.persist();
    setHomePageInputs((inputs) => ({ ...homePageInputs, [event.target.name]: event.target.value }));
  };

  //handle file change
  const handleInputFileChange = (event) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        const selectedFileName = file.name;
        const fileName = event.target.name;
        setHomePageInputs((inputs) => ({ ...homePageInputs, [fileName + 'Name']: selectedFileName }));
      }.bind(this);
    } else {
      const fileName = event.target.name;
      setHomePageInputs((inputs) => ({ ...homePageInputs, [fileName + 'Name']: '' }));
    }
  };

  // form submit event
  const submitForm = async (inputs, event) => {
    SetError("");
    SetSuccess("");
    console.log(inputs)
    SetButtonDisabled(true);
    var res_data = await post(POST_HOME_PAGE, inputs);
    if (res_data.result) {
      SetSuccess(res_data.message);
      setHomePageInputs((input) => ({ ...homePageInputs, pageID: res_data.newPageID }));
      window.scrollTo(0, 0);
      setTimeout(() => {
        SetSuccess('');
      }, 3000);
    } else {
      SetError(res_data.error);
      window.scrollTo(0, 0);
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
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='row'>
              <div className="col-md-12">
                <h1>Home Page</h1>
              </div>
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
                            <label htmlFor="input-title">Content</label>
                            <Editor data={homePageInputs.bannerContent} changeEvent={(e, editor) => {const data = editor.getData();}} blurEvent={(e, editor) => {const data = editor.getData();setHomePageInputs((input) => ({ ...homePageInputs, bannerContent: data }));reset(homePageInputs)}} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" {...register('bannerImage')} name="bannerImage" className="custom-file-input" id="bannerImage" accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                <label className="custom-file-label" htmlFor="bannerImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.bannerImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="BannerVideoUrl">Video URL</label>
                            <input type="text" className="form-control" {...register('bannerVideoUrl')} name="bannerVideoUrl" id="BannerVideoUrl" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="BannerButtonTitle">Button Title</label>
                            <input type="text" className="form-control" {...register('bannerButtonText')} name="bannerButtonText" id="BannerButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="BannerButtonLink">Button Link</label>
                            <input type="text" className="form-control" {...register('bannerButtonLink')} name="bannerButtonLink" id="BannerButtonLink" />
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
                                <input type="file" {...register('aboutImage')} name="aboutImage" className="custom-file-input" id="aboutImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg" />
                                <label className="custom-file-label" htmlFor="aboutImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.aboutImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutTitle">Title</label>
                            <input type="text" className="form-control" {...register('aboutTitle')} name="aboutTitle" id="aboutTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutText">Text</label>
                            <textarea className="form-control" {...register('aboutText')} name="aboutText" rows={10} id="aboutText" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutButtonTitle">Button Title</label>
                            <input type="text" className="form-control" {...register('aboutButtonText')} name="aboutButtonText" id="aboutButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutButtonLink">Button Link</label>
                            <input type="text" className="form-control" {...register('aboutButtonLink')} name="aboutButtonLink" id="aboutButtonLink" />
                          </div>
                        </div>
                      </div>
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Initiative Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" {...register('initiativeImage')} name="initiativeImage" className="custom-file-input" id="initiativeImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg" />
                                <label className="custom-file-label" htmlFor="initiativeImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.initiativeImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeTitle">Title</label>
                            <input type="text" className="form-control" {...register('initiativeTitle')} name="initiativeTitle" id="initiativeTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeText">Text</label>
                            <textarea className="form-control" {...register('initiativeText')} name="initiativeText" rows={10} id="initiativeText" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeButtonTitle">Button Title</label>
                            <input type="text" className="form-control" {...register('initiativeButtonText')} name="initiativeButtonText" id="initiativeButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeButtonLink">Button Link</label>
                            <input type="text" className="form-control" {...register('initiativeButtonLink')} name="initiativeButtonLink" id="initiativeButtonLink" />
                          </div>
                        </div>
                      </div>
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Testimonial Section</h3>
                        </div>
                        <div className="card-body">
                          <div className={`testimonials ${(testimonials.length > 1) ? 'multiple' : ''}`}>
                            
                            {testimonials.map((item, index) => (
                              <div key={index} className="testimonialItem">
                                <div className="card card-primary">
                                  <div className="card-body">
                                    <span className='remove-testimonial' onClick={(e) => { e.persist(); removeTestimonial(index); }}><BsFillDashCircleFill /></span>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Name</label>
                                      <input type="text" className="form-control" {...register(`testimonials[${index}][name]`)} name={`testimonials[${index}][name]`} id="input-title" />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Text</label>
                                      <textarea className="form-control" id="input-title" {...register(`testimonials.${index}.text`)} name={`testimonials.${index}.text`} placeholder="" ></textarea>
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Company Name</label>
                                      <input type="text" className="form-control" {...register(`testimonials.${index}.company`)} name={`testimonials.${index}.company`} id="input-title" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <span className='add-new-testimonial' onClick={(e) => { appendTestimonial({ name: "", text: "", company: "" }) }}><BsFillPlusCircleFill /></span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Translating Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" {...register('translatingImage')} name="translatingImage" className="custom-file-input" id="translatingImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg" />
                                <label className="custom-file-label" htmlFor="translatingImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.translatingImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="translatingTitle">Title</label>
                            <input type="text" className="form-control" {...register('translatingTitle')} name="translatingTitle" id="translatingTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="translatingText">Text</label>
                            <textarea className="form-control" {...register('translatingText')} name="translatingText" id="translatingText" />
                          </div>
                          {/* <div className="form-group">
                            <label htmlFor="translatingButtonTitle">Button Title</label>
                            <input type="text" className="form-control" {...register('bannerVideoUrl')}  name="translatingButtonText" id="translatingButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="translatingButtonLink">Button Link</label>
                            <input type="text" className="form-control" {...register('bannerVideoUrl')}  name="translatingButtonLink" id="translatingButtonLink" />
                          </div> */}
                        </div>
                      </div>
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Preferences Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="preferencesTitle">Title</label>
                            <input type="text" className="form-control" {...register('preferencesTitle')} name="preferencesTitle" id="preferencesTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="preferencesText">Text</label>
                            <textarea className="form-control" {...register('preferencesText')} name="preferencesText" id="preferencesText" />
                          </div>
                          <div className={`preferences ${(preferences.length > 1) ? 'multiple' : ''}`}>
                            {/* {preferences.map((item, index) => (
                              <div key={index} className="preferencesItem">
                                <div className="card card-primary">
                                  <div className="card-body">
                                    <span className='remove-preferences' onClick={(e) => { e.persist(); removePreferences(index); }}><BsFillDashCircleFill /></span>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Title</label>
                                      <input type="text" className="form-control" {...register(`preferences.${index}.title`)} name={`preferences.${index}.title`} id="input-title" />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Text</label>
                                      <textarea className="form-control" id="input-title" {...register(`preferences.${index}.text`)} name={`preferences.${index}.text`} placeholder="" rows={3} ></textarea>
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Button Text</label>
                                      <input type="text" className="form-control" {...register(`preferences.${index}.buttonText`)} name={`preferences.${index}.buttonText`} id="input-title" value={buttonText} />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Button Link</label>
                                      <input type="text" className="form-control" {...register(`preferences.${index}.buttonLink`)} name={`preferences.${index}.buttonLink`} id="input-title" value={buttonLink} />
                                    </div>
                                    <div className="form-check">
                                      <input type="checkbox" className="form-check-input" id={`preferencesActive${index}`} name={`preferences.${index}.active`} />
                                      <label className="form-check-label" for={`preferencesActive${index}`}>Is Active?</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))} */}
                            <span className='add-new-preferences' onClick={(e) => { e.persist(); appendPreferences({title: "", text: "", buttonText: "", buttonLink: "", active: "", }); }}><BsFillPlusCircleFill /></span>
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
                            <input type="text" className="form-control" {...register('iconBlockTitle')} name="iconBlockTitle" id="iconBlockTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="preferencesText">Text</label>
                            <textarea className="form-control" {...register('iconBlockText')} name="iconBlockText" id="iconBlockText" />
                          </div>
                          <div className={`iconBlocks ${(iconBlocks.length > 1) ? 'multiple' : ''}`}>
                            {iconBlocks.map((item, index) => (
                              <div key={index} className="iconBlockItem">
                                <div className="card card-primary">
                                  <div className="card-body">
                                    <span className='remove-iconBlock' onClick={(e) => { e.persist(); removeIconBlocks(index); }}><BsFillDashCircleFill /></span>
                                    <div className="form-group">
                                      <label htmlFor="input-title">Title</label>
                                      <input type="text" className="form-control" {...register(`iconBlocks.${index}.title`)} name={`iconBlocks.${index}.title`} id="input-title" />
                                    </div>
                                    <div className="form-group">
                                      <div className="form-group">
                                        <label htmlFor="">Icon  Image</label>
                                        <div className="input-group">
                                          <div className="custom-file">
                                            <input type="file" {...register(`iconBlocks.${index}.image`)} name={`iconBlocks.${index}.image`} className="custom-file-input" id={`iconImage${index}`} accept="image/png, image/gif, image/jpeg, .svg" onChange={setIconBlockImage} />
                                            <label className="custom-file-label" htmlFor={`iconImage${index}`}>Choose file</label>
                                          </div>
                                        </div>
                                        {(iconBlocks[index].image && iconBlocks[index].image[0] && iconBlocks[index].image[0].name  )?iconBlocks[index].image[0].name:iconBlocks[index].fileName}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <span className='add-new-iconBlock' onClick={(e) => { e.persist(); appendIconBlocks({title: "", image: ""})}}><BsFillPlusCircleFill /></span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Contribute Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" {...register('contributeImage')} name="contributeImage" className="custom-file-input" id="ContributeImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg" />
                                <label className="custom-file-label" htmlFor="ContributeImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.contributeImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeTitle">Title</label>
                            <input type="text" className="form-control" {...register('contributeTitle')} name="contributeTitle" id="ContributeTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeText">Text</label>
                            <textarea className="form-control" {...register('contributeText')} name="contributeText" rows={3} id="ContributeText" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeButtonTitle">Button Title</label>
                            <input type="text" className="form-control"{...register('contributeButtonText')} name="contributeButtonText" id="ContributeButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeButtonLink">Button Link</label>
                            <input type="text" className="form-control" {...register('contributeButtonLink')} name="contributeButtonLink" id="ContributeButtonLink" />
                          </div>
                        </div>
                      </div>
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Blog & Update Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="blogTitle">Title</label>
                            <input type="text" className="form-control" {...register('blogTitle')} name="blogTitle" id="blogTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="blogButtonTitle">Button Title</label>
                            <input type="text" className="form-control" {...register('blogButtonText')} name="blogButtonText" id="blogButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="blogButtonLink">Button Link</label>
                            <input type="text" className="form-control" {...register('blogButtonLink')} name="blogButtonLink" id="blogButtonLink" />
                          </div>
                        </div>
                      </div>
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Call To Action Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" {...register('callToActionImage')} name="callToActionImage" className="custom-file-input" id="callToActionImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg" />
                                <label className="custom-file-label" htmlFor="callToActionImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.callToActionImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="callToActionTitle">Title</label>
                            <input type="text" className="form-control" {...register('callToActionTitle')} name="callToActionTitle" id="callToActionTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="callToActionButtonTitle">Button Title</label>
                            <input type="text" className="form-control" {...register('callToActionButtonText')} name="callToActionButtonText" id="callToActionButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="callToActionButtonLink">Button Link</label>
                            <input type="text" className="form-control" {...register('callToActionButtonLink')} name="callToActionButtonLink" id="callToActionButtonLink" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary">Save</button>
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
