import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { getFormattedDate } from "@/helpers/Helper";
import { get, post, del } from "@/helpers/api_helper";
import { GET_BLOG_CATEGORIES, POST_ADD_CATEGORY } from "@/helpers/url_helper";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { BsPencil, BsEyeFill, BsFillTrashFill } from "react-icons/bs";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


export default function AddNewUpdate() {
    const [Error, SetError] = useState('');
    const [Success, SetSuccess] = useState('');
    const [deleteError, SetDeleteError] = useState('');
    const [deleteSuccess, SetDeleteSuccess] = useState('');
    const [buttonDisabled, SetButtonDisabled] = useState('');
    const [catID, setCatID] = useState('');

    const [data, setData] = useState([]);
    const [getPageStatus, setGetPageStatus] = useState(false);
    const [categoryInputs, setCategoryInputs] = useState({ name: "" });

    const deleteCategory = async(id) => {
        var res_data = await del(POST_ADD_CATEGORY + id);
        if (res_data.result) {
            SetDeleteSuccess(res_data.message);
            window.scrollTo(0, 0);
            setCatID("");
            setGetPageStatus(false);
            setTimeout(() => {
                SetDeleteSuccess('');
            }, 3000);
        } else {
            SetDeleteError(res_data.error);
            setTimeout(() => {
                SetDeleteError('');
            }, 3000);
        }
    }

    const deleteUpdate = (event, id) => {
        Swal.fire({
            text: 'Are you sure?',
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if(result.isConfirmed){
                deleteCategory(id);
            }else{
                setCatID('');
            }
        })   
    };

    const updateCategory = (event, row) => {
        event.preventDefault();
        setCategoryInputs((input) => ({ ...categoryInputs, name: row.name }));
        setCatID(row._id);
    };

    const columns = [
        {
            name: '#',
            selector: row => row.number,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => row.action,
            cell: (row) => <>
                <Link href={`#`} onClick={(e) => { updateCategory(e, row) }} className="edit"><BsPencil /></Link>
                <Link href={`#`} onClick={(e) => deleteUpdate(e, row._id)} className="delete"><BsFillTrashFill /></Link>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const getUpdateData = async () => {
        const pageData = await get(GET_BLOG_CATEGORIES);
        if (pageData.result && pageData.data) {
            const data = pageData.data;
            const dataArray = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                element.createdAt = getFormattedDate(element.createdAt);
                element.updatedAt = getFormattedDate(element.updatedAt);
                element.number = (index + 1);
                element.action = element._id;
                dataArray[index] = element;
            }


            setData(dataArray);
        }
        setGetPageStatus(true);
    }

    useEffect(() => {
        if (!getPageStatus) {
            getUpdateData();
        }
    }, [getPageStatus]);

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setCategoryInputs((inputs) => ({ ...categoryInputs, [event.target.name]: event.target.value }));
    };

    // form submit event
    const submitForm = async (event) => {
        event.preventDefault();
        SetError("");
        SetSuccess("");
        SetButtonDisabled(true);
        var res_data = await post(POST_ADD_CATEGORY + catID, categoryInputs);
        if (res_data.result) {
            SetSuccess(res_data.message);
            setCategoryInputs((input) => ({ ...categoryInputs, name: "" }));
            window.scrollTo(0, 0);
            setCatID("");
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
        setGetPageStatus(false);
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className='content'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <h1>Vital Updates</h1>
                        </div>
                        <div className='col-md-4'>
                            <div className="card card-primary">
                                <div className="card-body">
                                    <ErrorMessage message={Error} />
                                    <SuccessMessage message={Success} />
                                    <form onSubmit={submitForm}>
                                        <div className="form-group">
                                            <label htmlFor="categoryName">Category Name</label>
                                            <input type="text" className="form-control" value={categoryInputs.name} onChange={handleInputChange} name="name" id="categoryName" />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" disabled={buttonDisabled}>Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className="card card-primary">
                                <div className="card-body">
                                    <ErrorMessage message={deleteError} />
                                    <SuccessMessage message={deleteSuccess} />
                                    <DataTable
                                        columns={columns}
                                        data={data}
                                        pagination
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}