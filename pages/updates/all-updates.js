import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { getFormattedDate } from "@/helpers/Helper";
import { del, get } from "@/helpers/api_helper";
import { GET_VITAL_UPDATE, POST_ADD_VITAL_UPDATE } from "@/helpers/url_helper";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { BsPencil, BsEyeFill, BsFillTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2';
export default function AddNewUpdate() {
    const [data, setData] = useState([]);
    const frontUrl = process.env.FRONT_END_URL;
    const [getPageStatus, setGetPageStatus] = useState(false);

    const [deleteError, SetDeleteError] = useState('');
    const [deleteSuccess, SetDeleteSuccess] = useState('');
    const [catID, setCatID] = useState('');
    const deleteCategory = async(id) => {
        var res_data = await del(POST_ADD_VITAL_UPDATE + id);
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
            if (result.isConfirmed) {
                deleteCategory(id);
            } else {
                setCatID('');
            }
        })
    };

    const columns = [
        {
            name: '#',
            selector: row => row.number,
            maxWidth: "10px"
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Created Date',
            selector: row => row.createdAt,
            sortable: true,
            maxWidth: "250px"
        },
        {
            name: 'Updated Date',
            selector: row => row.updatedAt,
            sortable: true,
            maxWidth: "250px"
        },
        {
            name: 'Action',
            selector: row => row.action,
            cell: (row) => <>
                <Link href={`/updates/edit/${row._id}`} className="edit"><BsPencil /></Link>
                {/* <Link href={`${frontUrl}user/update/${row.slug}`} className="view"><BsEyeFill /></Link> */}
                <Link href={`#`} onClick={(e) => deleteUpdate(e, row._id)} className="delete"><BsFillTrashFill /></Link>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const getUpdateData = async () => {
        const pageData = await get(GET_VITAL_UPDATE);
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

    return (
        <>
            <Head>
                <title>Vital Updates</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Vital Updates</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className='content'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
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