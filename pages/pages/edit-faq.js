import Head from 'next/head'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { BsFillPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs"

import SimpleReactValidator from "simple-react-validator";

import { post, get } from '@/helpers/api_helper';
import { POST_FAQ_PAGE, GET_PAGE } from '@/helpers/url_helper';
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage"
export default function EditHome() {
    const [rows, setRows] = useState(1);
    const [faqInputs, setFaqInputs] = useState({ 'pageID': '', 'pageTitle': '', 'pageText': '', "faqs": [] });
    const [getPageStatus, setGetPageStatus] = useState(false);
    const [Error, SetError] = useState("");
    const [Success, SetSuccess] = useState("");
    const [ButtonDisabled, SetButtonDisabled] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [forceUpdate, setForceUpdate] = useState();

    const getPageData = async () => {
        const pageData = await get(GET_PAGE+'faq');
        if(pageData.result && pageData.data){
            const savedData = {
                'pageID': pageData.data._id, 
                'pageTitle': pageData.data.title, 
                'pageText': pageData.data.text, 
                "faqs": (pageData.data.content.length)?pageData.data.content:[],
            }
            setFaqInputs(savedData);
            setRows((savedData.faqs.length)?savedData.faqs.length:1);
        }
        setGetPageStatus(true);
    }

    useState(() => {
        if(!getPageStatus){
            getPageData();
        }
    }, [getPageStatus]);

    const removeFaqItem = (arr, value) => {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    const removeFaq = (index) => {
        if (rows > 1) {
            const faqs = faqInputs.faqs;
            const newArray = []
            for (let counter = 0; counter < faqs.length; counter++) {
                const element = faqs[counter];
                if (counter !== index) {
                    newArray.push(element)
                }
            }
            setFaqInputs((input) => ({ ...faqInputs, faqs: newArray }));
            setRows(rows - 1);
        }
    }

    const add_new_faq = (key, value, index) => {
        const faqs = faqInputs.faqs;
        faqs[index] = {
            ...faqs[index],
            ...{ [key]: value }
        };
        setFaqInputs((input) => ({ ...faqInputs, faqs: faqs }))
    }

    // form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages(true);
            setForceUpdate(1)
        } else {
            SetError("");
            SetSuccess("");
            SetButtonDisabled(true);
            var res_data = await post(POST_FAQ_PAGE, faqInputs);
            if (res_data.result) {
                SetSuccess(res_data.message);
                setFaqInputs((input) => ({ ...faqInputs, pageID: res_data.newPageID }));
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
        }
    };

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setFaqInputs((inputs) => ({ ...faqInputs, [event.target.name]: event.target.value }));
    };

    return (
        <>
            <Head>
                <title>FAQs</title>
            </Head>
            <section className='content'>
                <div className='container-fluid'>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className="col-md-12">
                                <h1>FAQs</h1>
                            </div>
                            <div className='col-md-12'>
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <ErrorMessage message={Error} />
                                        <SuccessMessage message={Success}/>
                                        <div className="form-group">
                                            <label htmlFor="input-title">Title</label>
                                            <input type="text" className="form-control" name='pageTitle' value={faqInputs.pageTitle} onChange={handleInputChange} id="input-title" placeholder="Enter Title" />
                                            {simpleValidator.current.message("pageTitle", faqInputs.pageTitle, "required", {
                                                className: "error ",
                                            })}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="input-title">Text</label>
                                            <textarea className="form-control" id="input-title" name='pageText' value={faqInputs.pageText} onChange={handleInputChange} placeholder="Enter Text"></textarea>
                                            {simpleValidator.current.message("pageText", faqInputs.pageText, "required", {
                                                className: "error ",
                                            })}
                                        </div>
                                        <div className="form-group">
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Faqs</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className={`faqs ${(rows > 1) ? 'multiple' : ''}`}>
                                                        {Array.from({ length: rows }, (_, index) => {
                                                            const faqQuestion = (faqInputs.faqs[index] && faqInputs.faqs[index].question) ? faqInputs.faqs[index].question : "";
                                                            const faqAnswer = (faqInputs.faqs[index] && faqInputs.faqs[index].answer) ? faqInputs.faqs[index].answer : "";
                                                            return (
                                                                <div key={index} className="faqItem">
                                                                    <div className="card card-primary">
                                                                        <div className="card-body">
                                                                            <span className='remove-faq' onClick={(e) => { e.persist(); removeFaq(index); }}><BsFillDashCircleFill /></span>
                                                                            <div className="form-group">
                                                                                <label htmlFor="input-title">Question</label>
                                                                                <input type="text" className="form-control" name={`faq[][question]`} id="input-title" onChange={(e) => { add_new_faq('question', e.target.value, index) }} value={faqQuestion} placeholder="Enter Title" />
                                                                                {simpleValidator.current.message("question", (faqInputs.faqs[index]) ? faqInputs.faqs[index].question : '', "required", {
                                                                                    className: "error ",
                                                                                })}
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="input-title">Answer</label>
                                                                                <textarea className="form-control" id="input-title" name={`faq[][answer]`} placeholder="" onChange={(e) => { add_new_faq('answer', e.target.value, index) }} value={faqAnswer} rows={10}></textarea>
                                                                                {simpleValidator.current.message("answer", (faqInputs.faqs[index]) ? faqInputs.faqs[index].answer : '', "required", {
                                                                                    className: "error ",
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                        <span className='add-new-faq' onClick={(e) => { e.persist(); setRows(rows + 1); }}><BsFillPlusCircleFill /></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">Save</button>
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
