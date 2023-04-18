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

  const [testimonialRows, setTestimonialRows] = useState(1);
  const [preferencesRows, setPreferencesRows] = useState(1);
  const [iconBlocksRows, setIconBlocksRows] = useState(1);


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


  // const { register, handleSubmit, reset, control } = useForm({ defaultValues: homePageInputs });

  // const { fields: testimonials, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
  //   control,
  //   name: "testimonials"
  // });

  // const { fields: preferences, append: appendPreferences, remove: removePreferences } = useFieldArray({
  //   control,
  //   name: "preferences"
  // });

  // const { fields: iconBlocks, append: appendIconBlocks, remove: removeIconBlocks } = useFieldArray({
  //   control,
  //   name: "iconBlocks"
  // });

  const [testimonialItem, setTestimonialItem] = useState({ name: "", text: "", company: "" });
  const getPageData = async () => {
    const pageData = await get(GET_PAGE + 'home');
    if (pageData.result && pageData.data) {
      const data = pageData.data.content
      const savedData = {
        'pageID': pageData.data._id,
        ...data,
      }
      setTestimonialRows((data.testimonials.length)?data.testimonials.length:1);
      setPreferencesRows((data.preferences.length)?data.preferences.length:1);
      setIconBlocksRows((data.iconBlocks.length)?data.iconBlocks.length:1);
      setHomePageInputs(savedData);
    }
    setGetPageStatus(true);
  }

  useState(() => {
    if (!getPageStatus) {
      getPageData();
    }
  }, [getPageStatus]);

  const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

  const add_new_testimonial = (key, value, index) => {
    const testimonials = homePageInputs.testimonials;
    testimonials[index] = {
      ...testimonials[index],
      ...{ [key]: value }
    };
    setHomePageInputs((input) => ({ ...homePageInputs, testimonials: testimonials }))
  }

  const removeTestimonial = (index) => {
    if (testimonialRows > 1) {
      const testimonial = homePageInputs.testimonials;
      const newArray = []
      for (let counter = 0; counter < testimonial.length; counter++) {
        const element = testimonial[counter];
        if (counter !== index) {
          newArray.push(element)
        }
      }
      setHomePageInputs((input) => ({ ...homePageInputs, testimonials: newArray }));
      setTestimonialRows(testimonialRows - 1);
    }
  }

  const add_new_preference_step = (key, value, index) => {
    const preferences = homePageInputs.preferences;
    preferences[index] = {
      ...preferences[index],
      ...{ [key]: value }
    };
    console.log(preferences)
    setHomePageInputs((input) => ({ ...homePageInputs, preferences: preferences }))
  }

  const removePreference = (index) => {
    if (testimonialRows > 1) {
      const preferences = homePageInputs.preferences;
      const newArray = []
      for (let counter = 0; counter < preferences.length; counter++) {
        const element = preferences[counter];
        if (counter !== index) {
          newArray.push(element)
        }
      }
      setHomePageInputs((input) => ({ ...homePageInputs, preferences: newArray }));
      setPreferencesRows(preferencesRows - 1);
    }
  }

  const add_new_icon_block = (key, value, index) => {
    const iconBlocks = homePageInputs.iconBlocks;
    iconBlocks[index] = {
      ...iconBlocks[index],
      ...{ [key]: value }
    };
    setHomePageInputs((input) => ({ ...homePageInputs, iconBlocks: iconBlocks }))
  }

  const removeIconBlock = (index) => {
    if (testimonialRows > 1) {
      const iconBlocks = homePageInputs.iconBlocks;
      const newArray = []
      for (let counter = 0; counter < iconBlocks.length; counter++) {
        const element = iconBlocks[counter];
        if (counter !== index) {
          newArray.push(element)
        }
      }
      setHomePageInputs((input) => ({ ...homePageInputs, iconBlocks: newArray }));
      setIconBlocksRows(iconBlocksRows - 1);
    }
  }

  const setIconBlockImage = (event, index) => {
    const iconBlocks = homePageInputs.iconBlocks;
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
          console.log(iconBlocks)
        } else {
          iconBlocks[index]['image'] = reader.result;
          iconBlocks[index]['fileName'] = selectedFileName;
        }
        setHomePageInputs((input) => ({ ...homePageInputs, iconBlocks: iconBlocks }));
      }.bind(this);
    } else {
      if (iconBlocks[index] !== undefined) {
        iconBlocks[index]['image'] = '';
        iconBlocks[index]['fileName'] = '';
      }
      setHomePageInputs((input) => ({ ...homePageInputs, iconBlocks: iconBlocks }));
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
        setHomePageInputs((inputs) => ({ ...homePageInputs, [fileName]: reader.result, [fileName + 'Name']: selectedFileName }));
      }.bind(this);
    } else {
      const fileName = event.target.name;
      setHomePageInputs((inputs) => ({ ...homePageInputs, [fileName]: "", [fileName + 'Name']: '' }));
    }
  };

  // form submit event
  const submitForm = async (event) => {
    event.preventDefault();
    SetError("");
    SetSuccess("");
    SetButtonDisabled(true);
    var res_data = await post(POST_HOME_PAGE, homePageInputs);
    if (res_data.result) {
      SetSuccess(res_data.message);
      setHomePageInputs((input) => ({ ...homePageInputs, pageID: res_data.newPageID }));
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
                            <Editor data={homePageInputs.bannerContent} changeEvent={(e, editor) => { const data = editor.getData(); setHomePageInputs((input) => ({ ...homePageInputs, bannerContent: data })); }} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" name="bannerImage" className="custom-file-input" onChange={handleInputFileChange} id="bannerImage" accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                <label className="custom-file-label" htmlFor="bannerImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.bannerImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="BannerVideoUrl">Video URL</label>
                            <input type="text" className="form-control" value={homePageInputs.bannerVideoUrl} onChange={handleInputChange} name="bannerVideoUrl" id="BannerVideoUrl" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="BannerButtonTitle">Button Title</label>
                            <input type="text" className="form-control" value={homePageInputs.bannerButtonText} onChange={handleInputChange} name="bannerButtonText" id="BannerButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="BannerButtonLink">Button Link</label>
                            <input type="text" className="form-control" value={homePageInputs.bannerButtonLink} onChange={handleInputChange} name="bannerButtonLink" id="BannerButtonLink" />
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
                            {homePageInputs.aboutImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutTitle">Title</label>
                            <input type="text" className="form-control" value={homePageInputs.aboutTitle} onChange={handleInputChange} name="aboutTitle" id="aboutTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutText">Text</label>
                            <textarea className="form-control" value={homePageInputs.aboutText} onChange={handleInputChange} name="aboutText" rows={10} id="aboutText" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutButtonTitle">Button Title</label>
                            <input type="text" className="form-control" value={homePageInputs.aboutButtonText} onChange={handleInputChange} name="aboutButtonText" id="aboutButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="aboutButtonLink">Button Link</label>
                            <input type="text" className="form-control" value={homePageInputs.aboutButtonLink} onChange={handleInputChange} name="aboutButtonLink" id="aboutButtonLink" />
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
                                <input type="file" name="initiativeImage" className="custom-file-input" id="initiativeImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                <label className="custom-file-label" htmlFor="initiativeImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.initiativeImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeTitle">Title</label>
                            <input type="text" className="form-control" value={homePageInputs.initiativeTitle} onChange={handleInputChange} name="initiativeTitle" id="initiativeTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeText">Text</label>
                            <textarea className="form-control" value={homePageInputs.initiativeText} onChange={handleInputChange} name="initiativeText" rows={10} id="initiativeText" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeButtonTitle">Button Title</label>
                            <input type="text" className="form-control" value={homePageInputs.initiativeButtonText} onChange={handleInputChange} name="initiativeButtonText" id="initiativeButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="initiativeButtonLink">Button Link</label>
                            <input type="text" className="form-control" value={homePageInputs.initiativeButtonLink} onChange={handleInputChange} name="initiativeButtonLink" id="initiativeButtonLink" />
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
                              const name = (homePageInputs.testimonials[index] && homePageInputs.testimonials[index]['name'])?homePageInputs.testimonials[index].name:'';
                              const text = (homePageInputs.testimonials[index] && homePageInputs.testimonials[index]['text'])?homePageInputs.testimonials[index].text:'';
                              const company = (homePageInputs.testimonials[index] && homePageInputs.testimonials[index]['company'])?homePageInputs.testimonials[index].company:'';

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
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Translating Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" name="translatingImage" className="custom-file-input" id="translatingImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                <label className="custom-file-label" htmlFor="translatingImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.translatingImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="translatingTitle">Title</label>
                            <input type="text" className="form-control" value={homePageInputs.translatingTitle} onChange={handleInputChange} name="translatingTitle" id="translatingTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="translatingText">Text</label>
                            <textarea className="form-control" value={homePageInputs.translatingText} onChange={handleInputChange} name="translatingText" id="translatingText" />
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
                            <input type="text" className="form-control" value={homePageInputs.preferencesTitle} onChange={handleInputChange} name="preferencesTitle" id="preferencesTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="preferencesText">Text</label>
                            <textarea className="form-control" value={homePageInputs.preferencesText} onChange={handleInputChange} name="preferencesText" id="preferencesText" />
                          </div>
                          <div className={`preferences ${(preferencesRows > 1) ? 'multiple' : ''}`}>
                            {Array.from({ length: preferencesRows }, (_, index) => {
                              const title = (homePageInputs.preferences[index] && homePageInputs.preferences[index].title)?homePageInputs.preferences[index].title:'';
                              const text = (homePageInputs.preferences[index] && homePageInputs.preferences[index].text)?homePageInputs.preferences[index].text:'';
                              const buttonText = (homePageInputs.preferences[index] && homePageInputs.preferences[index].buttonText)?homePageInputs.preferences[index].buttonText:'';
                              const buttonLink = (homePageInputs.preferences[index] && homePageInputs.preferences[index].buttonLink)?homePageInputs.preferences[index].buttonLink:'';
                              const active = (homePageInputs.preferences[index] && homePageInputs.preferences[index].active)?homePageInputs.preferences[index].active:'';
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
                                        <input type="checkbox" className="form-check-input" onChange={(e) => {add_new_preference_step('active', e.target.checked, index)}} checked={active} id={`preferencesActive${index}`} name={`preferences.${index}.active`} />
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
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Icon Block Section</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="preferencesTitle">Title</label>
                            <input type="text" className="form-control" value={homePageInputs.iconBlockTitle} onChange={handleInputChange} name="iconBlockTitle" id="iconBlockTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="preferencesText">Text</label>
                            <textarea className="form-control" value={homePageInputs.iconBlockText} onChange={handleInputChange} name="iconBlockText" id="iconBlockText" />
                          </div>
                          <div className={`iconBlocks ${(iconBlocksRows > 1) ? 'multiple' : ''}`}>
                            {Array.from({ length: iconBlocksRows }, (_, index) => {
                              const title = (homePageInputs['iconBlocks'][index] && homePageInputs['iconBlocks'][index]['title'])?homePageInputs['iconBlocks'][index]['title']:''
                              const selectedFileName = (homePageInputs['iconBlocks'][index] && homePageInputs['iconBlocks'][index]['fileName'])?homePageInputs['iconBlocks'][index]['fileName']:''
                              return (
                                <div key={index} className="iconBlockItem">
                                  <div className="card card-primary">
                                    <div className="card-body">
                                      <span className='remove-iconBlock' onClick={(e) => { e.persist(); removeIconBlock(index); }}><BsFillDashCircleFill /></span>
                                      <div className="form-group">
                                        <label htmlFor="input-title">Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => add_new_icon_block('title', e.target.value, index)}  name={`iconBlocks.${index}.title`} id="input-title" />
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
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                            <span className='add-new-iconBlock' onClick={(e) => { e.persist(); setIconBlocksRows(iconBlocksRows+1) }}><BsFillPlusCircleFill /></span>
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
                                <input type="file" name="contributeImage" className="custom-file-input" id="ContributeImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                <label className="custom-file-label" htmlFor="ContributeImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.contributeImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeTitle">Title</label>
                            <input type="text" className="form-control" value={homePageInputs.contributeTitle} onChange={handleInputChange}  name="contributeTitle" id="ContributeTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeText">Text</label>
                            <textarea className="form-control" value={homePageInputs.contributeText} onChange={handleInputChange}  name="contributeText" rows={3} id="ContributeText" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeButtonTitle">Button Title</label>
                            <input type="text" className="form-control" value={homePageInputs.contributeButtonText} onChange={handleInputChange}  name="contributeButtonText" id="ContributeButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ContributeButtonLink">Button Link</label>
                            <input type="text" className="form-control" value={homePageInputs.contributeButtonLink} onChange={handleInputChange}  name="contributeButtonLink" id="ContributeButtonLink" />
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
                            <input type="text" className="form-control" value={homePageInputs.blogTitle} onChange={handleInputChange}  name="blogTitle" id="blogTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="blogButtonTitle">Button Title</label>
                            <input type="text" className="form-control" value={homePageInputs.blogButtonText} onChange={handleInputChange}  name="blogButtonText" id="blogButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="blogButtonLink">Button Link</label>
                            <input type="text" className="form-control" value={homePageInputs.blogButtonLink} onChange={handleInputChange}  name="blogButtonLink" id="blogButtonLink" />
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
                                <input type="file" name="callToActionImage" className="custom-file-input" id="callToActionImage" onChange={handleInputFileChange} accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                <label className="custom-file-label" htmlFor="callToActionImage">Choose file</label>
                              </div>
                            </div>
                            {homePageInputs.callToActionImageName}
                          </div>
                          <div className="form-group">
                            <label htmlFor="callToActionTitle">Title</label>
                            <input type="text" className="form-control" value={homePageInputs.callToActionTitle} onChange={handleInputChange}  name="callToActionTitle" id="callToActionTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="callToActionButtonTitle">Button Title</label>
                            <input type="text" className="form-control" value={homePageInputs.callToActionButtonText} onChange={handleInputChange}  name="callToActionButtonText" id="callToActionButtonTitle" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="callToActionButtonLink">Button Link</label>
                            <input type="text" className="form-control" value={homePageInputs.callToActionButtonLink} onChange={handleInputChange}  name="callToActionButtonLink" id="callToActionButtonLink" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary"  disabled={buttonDisabled}>Save</button>
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
