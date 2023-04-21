import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { get, post } from "@/helpers/api_helper";
import { POST_ADD_VITAL_UPDATE, GET_VITAL_UPDATE } from "@/helpers/url_helper";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
export default function AddNewUpdate() {
    const router = useRouter();
    const { id } = router.query
    const [Error, SetError] = useState('');
    const [Success, SetSuccess] = useState('');
    const [buttonDisabled, SetButtonDisabled] = useState('');
    const [getPageStatus, setGetPageStatus] = useState(false);
    const [updateInputs, setUpdateInputs] = useState({
        "title": "",
        "description": "",
        'image': "",
        'imageName': "",
    })


    const getUpdateData = async () => {
        const pageData = await get(GET_VITAL_UPDATE + id);
        if (pageData.result && pageData.data) {
            const data = pageData.data;
            setUpdateInputs(data);
        }
        setGetPageStatus(true);
    }

    useEffect(() => {
        if (id !== undefined && !getPageStatus) {
            
            getUpdateData();
        }
        console.log(id)
    }, [id]);

    //handle file change
    const handleInputFileChange = (event) => {
        const file = event.target.files[0];
        if (file !== undefined) {
            const reader = new FileReader();
            const url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                const selectedFileName = file.name;
                const fileName = event.target.name;
                setUpdateInputs((inputs) => ({ ...updateInputs, [fileName]: reader.result, [fileName + 'Name']: selectedFileName }));
            }.bind(this);
        } else {
            const fileName = event.target.name;
            setUpdateInputs((inputs) => ({ ...updateInputs, [fileName]: "", [fileName + 'Name']: '' }));
        }
    };

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setUpdateInputs((inputs) => ({ ...updateInputs, [event.target.name]: event.target.value }));
    };

    // form submit event
    const submitForm = async (event) => {
        event.preventDefault();
        console.log(updateInputs)
        SetError("");
        SetSuccess("");
        SetButtonDisabled(true);
        var res_data = await post(POST_ADD_VITAL_UPDATE, updateInputs);
        if (res_data.result) {
            SetSuccess(res_data.message);
            setUpdateInputs(
                {
                    'pageID': '',
                    "title": "",
                    "description": "",
                    'image': "",
                    'imageName': "",
                }
            );
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
                                            <label htmlFor="">Image</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" name="image" className="custom-file-input" onChange={handleInputFileChange} id="image" accept="image/png, image/gif, image/jpeg, .svg, .webp" />
                                                    <label className="custom-file-label" htmlFor="image">Choose file</label>
                                                </div>
                                            </div>
                                            {updateInputs.imageName}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input type="text" className="form-control" value={updateInputs.title} onChange={handleInputChange} name="title" id="title" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content">Content</label>
                                            <Editor data={updateInputs.description} blurEvent={(e, editor) => { const data = editor.getData(); setUpdateInputs((input) => ({ ...updateInputs, description: data })); }} />
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