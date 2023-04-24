import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { getFormattedDate } from "@/helpers/Helper";
import { get } from "@/helpers/api_helper";
import { GET_VITAL_UPDATE } from "@/helpers/url_helper";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { BsPencil, BsEyeFill, BsFillTrashFill } from "react-icons/bs";

export default function AddNewUpdate() {
    const [data, setData] = useState([]);
    const frontUrl = process.env.FRONT_END_URL;
    const [getPageStatus, setGetPageStatus] = useState(false);
    const deleteUpdate = (event, id) => {
        
    };
    const columns = [
        {
            name: '#',
            selector: row => row.number,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Created Date',
            selector: row => row.createdAt,
            sortable: true
        },
        {
            name: 'Updated Date',
            selector: row => row.updatedAt,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => row.action,
            cell: (row) => <>
            <Link href={`/preferences/edit/${row._id}`} className="edit"><BsPencil/></Link>
            <Link href={`#`} onClick={(e)=> deleteUpdate(e, row._id)} className="delete"><BsFillTrashFill/></Link>
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
                element.number = (index+1);
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
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className='content'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <h1>All questions</h1>
                        </div>
                        <div className='col-md-12'>
                            <div className="card card-primary">
                                <div className="card-body">
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