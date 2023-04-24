import ImageRadio from "@/components/questions/imagesRadio";
import Info from "@/components/questions/info";
import Map from "@/components/questions/map";
import Head from "next/head";
import { useEffect, useState } from "react";
import Select from 'react-select';

const options = [
    { value: '', label: 'Select Type' },
    { value: 'info', label: 'Information' },
    { value: 'info-with-image', label: 'Information background image' },
    { value: 'map', label: 'Map' },
    { value: 'images-radio', label: 'Images options' },
    { value: 'radio-distance', label: 'Amenities' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'increment-number', label: 'Incremental input' },
    { value: 'simple-radio', label: 'Simple radio' },
    { value: 'currency-number', label: 'Currency input' },
    { value: 'multiple-increment-number', label: 'Multiple incremental input' },
    { value: 'multi-image-star-rating', label: 'Star rating' },
    { value: 'single-image-radios', label: 'Single image option' },
    { value: 'multi-textarea', label: 'Multi textarea' },
];

const colorStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#fff" : null,
            color: "#333333"
        };
    }
};

export default function AddQuestion() {
    const [Error, SetError] = useState('');
    const [Success, SetSuccess] = useState('');
    const [buttonDisabled, SetButtonDisabled] = useState('');
    const [selectedOption, setSelectedOption] = useState(options[1]);
    const [formScreen, setFormScreen] = useState(null);

    const [questionInputs, setQuestionInputs] = useState({
        question: "",
        questionType: "",
        questionDesc: "",
        questionCategory: "",
        questionOptions: '',
        questionImage: "",
    });

    const handleInputChange = (event, key, value) => {
        event.persist();
        setQuestionInputs((inputs) => ({ ...questionInputs, [key]: value }));
    };

    const setInputChange = (inputs) => {
        const newQuestionInputs = {
            ...questionInputs,
            ...inputs
        }
        setQuestionInputs(newQuestionInputs);
    };

    useEffect(() => {
        console.log(questionInputs)
    }, [questionInputs])

    const handleFileInputChange = (event, key) => {
        event.persist();
    };

    const submitForm = (event) => {
        event.preventDefault();
        console.log(questionInputs)
    }

    const setQuestionScreen = (e) => {
        setSelectedOption(e)
        setFormScreen(getFormScreen(e.value))
    }

    const getFormScreen = (type) => {
        switch (type) {
            case 'info':
                return (
                    <Info
                        options={questionInputs.questionOptions}
                        setInputChange={setInputChange}
                    />
                );
            case 'info-with-image':
                return (
                    <Info
                        options={questionInputs.questionOptions}
                        setInputChange={setInputChange}
                    />
                );
            case 'map':
                return (
                    <Map 
                    options={questionInputs.questionDesc}
                    setInputChange={setInputChange}
                    />
                );
            case 'images-radio':
                return (
                    <ImageRadio
                    description={questionInputs.questionDesc}
                    options={questionInputs.questionOptions}
                    setInputChange={setInputChange}
                    />
                );
            case 'radio-distance':
                return (
                    <Info />
                );
            case 'textarea':
                return (
                    <Info />
                );
            case 'increment-number':
                return (
                    <Info />
                );
            case 'simple-radio':
                return (
                    <Info />
                );
            case 'images-radio':
                return (
                    <Info />
                );
            case 'currency-number':
                return (
                    <Info />
                );
            case 'multiple-increment-number':
                return (
                    <Info />
                );
            case 'multi-image-star-rating':
                return (
                    <Info />
                );
            case 'single-image-radios':
                return (
                    <Info />
                );
            case 'multi-textarea':
                return (
                    <Info />
                );
        }

    }

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
                                <h1>Add new question</h1>
                            </div>
                            <div className='col-md-12'>
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <Select
                                                value={selectedOption}
                                                onChange={setQuestionScreen}
                                                options={options}
                                                id="optionType"
                                                styles={colorStyles}
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="question">Question</label>
                                            <input type="text" className="form-control" value={questionInputs.question} onChange={(e) => handleInputChange(e, 'question', e.target.value)} name="question" id="question" />
                                        </div>
                                        {formScreen}
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