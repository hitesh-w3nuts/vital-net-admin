import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
export default function Info({ imageUrl, options, setInputChange }) {
    const [inputs, setInputs] = useState({
        questionImage: (imageUrl)?imageUrl:"",
        content: (options && options.content)?options.content:"",
        buttonText: (options && options.buttonText)?options.buttonText:""
    })

    const handleInputChange = (event, key, value) => {
        setInputs((inputs) => ({ ...inputs, [key]: value }));
    };

    //handle file change
    const handleInputFileChange = (event) => {
        const file = event.target.files[0];
        if (file !== undefined) {
            const reader = new FileReader();
            const url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                const fileName = event.target.name;
                setInputs((inputs) => ({ ...inputs, [fileName]: reader.result}));
            }.bind(this);
        } else {
            const fileName = event.target.name;
            setInputs((inputs) => ({ ...inputs, [fileName]: "", [fileName + 'Name']: '' }));
        }
    };

    useEffect(() => {
        setInputChange({
            questionImage: inputs.questionImage,
            questionOptions: {
                content: inputs.content,
                buttonText: inputs.buttonText
            }
        });
    }, [inputs]);

    return (
        <>
            <div className="form-group">
                <label htmlFor="">Image</label>
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" name="questionImage" className="custom-file-input" onChange={handleInputFileChange} id="questionImage" accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                        <label className="custom-file-label" htmlFor="questionImage">Choose file</label>
                    </div>
                </div>
                <div className="image-wrap">
                    <img src={imageUrl} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="input-title">Content</label>
                <Editor data={inputs.content} blurEvent={(e, editor) => { const data = editor.getData(); handleInputChange(e, 'content', data); }} />
            </div>
            <div className="form-group">
                <label htmlFor="BannerButtonTitle">Button Title</label>
                <input type="text" className="form-control" value={inputs.buttonText} onChange={(e) => { handleInputChange(e, 'buttonText', e.target.value) }} name="buttonText" id="buttonText" />
            </div>
        </>
    )
}