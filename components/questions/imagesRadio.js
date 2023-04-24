import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BsFillDashCircleFill, BsFillPlusCircleFill } from "react-icons/bs";
export default function ImageRadio({ description, options, setInputChange }) {
    const [descriptionText, setDescription] = useState(description);
    const [radioOptions, setRadioOptions] = useState({
        questionOptions: options
    });
    const [optionRows, setOptionRows] = useState(1);
    
    const add_new_icon_block = (key, value, index) => {
        let iconBlocks = radioOptions.questionOptions;
        if (iconBlocks == null || iconBlocks == '') {
            iconBlocks = [];
        }
        if (iconBlocks[index] === undefined) {
            iconBlocks[index] = {
                ...iconBlocks[index],
                ...{ [key]: value }
            };
        } else {
            iconBlocks[index][key] = value;
        }
        setRadioOptions((input) => ({ ...radioOptions, questionOptions: iconBlocks }))
    }

    const removeIconBlock = (index) => {
        if (testimonialRows > 1) {
            const newArray = []
            for (let counter = 0; counter < radioOptions.questionOptions.length; counter++) {
                const element = radioOptions.questionOptions[counter];
                if (counter !== index) {
                    newArray.push(element)
                }
            }
            setRadioOptions((input) => ({ ...radioOptions, questionOptions: newArray }))
            setOptionRows(optionRows - 1);
        }
    }

    const setIconBlockImage = (event, index) => {
        let iconBlocks = radioOptions.questionOptions;
        if (iconBlocks == null || iconBlocks == '') {
            iconBlocks = [];
        }
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
                setRadioOptions((input) => ({ ...radioOptions, questionOptions: iconBlocks }));
            }.bind(this);
        } else {
            if (iconBlocks[index] !== undefined) {
                iconBlocks[index]['image'] = '';
                iconBlocks[index]['fileName'] = '';
            }
            setRadioOptions((input) => ({ ...radioOptions, questionOptions: iconBlocks }));
        }
    }

    
    useEffect(() => {
        setInputChange(radioOptions)
    }, [radioOptions]);

    useEffect(() => {
        setInputChange({
            questionDesc: descriptionText
        })
    }, [descriptionText])

    

    return (
        <>
            <div className="form-group">
                <label htmlFor="content">Description</label>
                <textarea
                    value={descriptionText}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    rows={5}
                />
            </div>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Options</h3>
                </div>
                <div className="card-body">
                    <div className={`iconBlocks ${(optionRows > 1) ? 'multiple' : ''}`}>
                        {Array.from({ length: optionRows }, (_, index) => {
                            const title = (radioOptions.questionOptions && radioOptions.questionOptions[index] && radioOptions.questionOptions[index]['option']) ? radioOptions.questionOptions[index]['option'] : ''
                            const selectedFileName = (radioOptions.questionOptions && radioOptions.questionOptions[index] && radioOptions.questionOptions[index]['fileName']) ? radioOptions.questionOptions[index]['fileName'] : ''
                            const selectedFileUrl = (radioOptions.questionOptions && radioOptions.questionOptions[index] && radioOptions.questionOptions[index]['imageUrl']) ? radioOptions.questionOptions[index]['imageUrl'] : ''
                            const selectedFile = (radioOptions.questionOptions && radioOptions.questionOptions[index] && radioOptions.questionOptions[index]['image']) ? radioOptions.questionOptions[index]['image'] : ''
                            return (
                                <div key={index} className="iconBlockItem">
                                    <div className="card card-primary">
                                        <div className="card-body">
                                            <span className='remove-iconBlock' onClick={(e) => { e.persist(); removeIconBlock(index); }}><BsFillDashCircleFill /></span>
                                            <div className="form-group">
                                                <label htmlFor="input-title">Option</label>
                                                <input type="text" className="form-control" value={title} onChange={(e) => add_new_icon_block('option', e.target.value, index)} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Icon  Image</label>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <input type="file" name={`options.${index}.image`} className="custom-file-input" id={`optionImage${index}`} onChange={(e) => { setIconBlockImage(e, index) }} accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                                        <label className="custom-file-label" htmlFor={`optionImage${index}`}>Choose file</label>
                                                    </div>
                                                </div>
                                                {(selectedFile == '' && selectedFileUrl !== '') && (
                                                    <div className="image-wrap">
                                                        <img src={selectedFileUrl} />
                                                    </div>
                                                )}
                                                {(selectedFile != '') && (
                                                    <div className="image-wrap">
                                                        <img src={selectedFile} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <span className='add-new-iconBlock' onClick={(e) => { e.persist(); setOptionRows(optionRows + 1) }}><BsFillPlusCircleFill /></span>
                    </div>
                </div>
            </div>
        </>
    )
}