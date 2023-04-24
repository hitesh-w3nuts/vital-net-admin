import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.svg"
import logoWhite from "../../assets/images/logo-white.svg"
import user from "../../assets/images/user.svg"
import { useEffect, useState } from "react";
// import $ from "jquery";

import { FaAngleLeft, FaHome } from "react-icons/fa";
import { BsSliders, BsFillInfoCircleFill, BsFillChatTextFill, BsFillChatFill, BsFillClipboard2Fill, BsFillClipboard2PlusFill, BsArrowRightShort } from "react-icons/bs";
import { BiCategory, BiLogOutCircle, BiMessageSquareEdit } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { RiPagesFill } from "react-icons/ri";
import { CiBullhorn } from "react-icons/ci";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { removeUserSession } from "@/helpers/Helper";
import { logoutUser } from "@/store/actions";

const NavLink = ({ url = "#", title, icon, activeClass }) => (
    <li className="nav-item">
        <Link href={url} className={`nav-link ${activeClass}`}>
            {icon}
            <p>{title}</p>
        </Link>
    </li>
);

const menuItems = [
    {
        'title': "Pages",
        'path': 'pages',
        'icon': <RiPagesFill />,
        'childItems': [
            {
                'url': "/pages/edit-home",
                'title': 'Home Page Options',
                'showInMenu': true,
                'icon': <BsArrowRightShort className="nav-icon" />
            },
            {
                'url': "/pages/edit-about",
                'title': 'About Page Options',
                'showInMenu': true,
                'icon': <BsArrowRightShort className="nav-icon" />
            },
            {
                'url': "/pages/edit-your-preferences",
                'title': 'Preferences Options',
                'showInMenu': true,
                'icon': <BsArrowRightShort className="nav-icon" />
            },
            {
                'url': "/pages/edit-faq",
                'title': 'FAQ Page Options',
                'showInMenu': true,
                'icon': <BsArrowRightShort className="nav-icon" />
            },
            {
                'url': "/pages/edit-contact",
                'title': 'Contact Page Options',
                'showInMenu': true,
                'icon': <BsArrowRightShort className="nav-icon" />
            },
            {
                'url': "/pages/edit-join-us",
                'title': 'Join Us Page Options',
                'showInMenu': true,
                'icon': <BsArrowRightShort className="nav-icon" />
            },
        ]
    },
    // {
    //     'title': "Preference questions",
    //     'path': 'preferences',
    //     'icon': <CiBullhorn />,
    //     'childItems': [
    //         {
    //             'url': "/preferences/add-new",
    //             'title': 'Add new',
    //             'showInMenu': true,
    //             'icon': <BsFillClipboard2PlusFill className="nav-icon" />
    //         },
    //         {
    //             'url': "/preferences/edit/",
    //             'title': 'Edit',
    //             'showInMenu': false,
    //             'icon': <BsFillClipboard2PlusFill className="nav-icon" />
    //         },
    //         {
    //             'url': "/preferences/all-questions",
    //             'title': 'All questions',
    //             'showInMenu': true,
    //             'icon': <BsFillClipboard2Fill className="nav-icon" />
    //         },
    //     ]
    // },
    {
        'title': "Vital Updates",
        'path': 'updates',
        'icon': <CiBullhorn />,
        'childItems': [
            {
                'url': "/updates/all-updates",
                'title': 'All Updates',
                'showInMenu': true,
                'icon': <BsFillClipboard2Fill className="nav-icon" />
            },
            {
                'url': "/updates/add-new",
                'title': 'Add New',
                'showInMenu': true,
                'icon': <BsFillClipboard2PlusFill className="nav-icon" />
            },
            {
                'url': "/updates/edit/",
                'title': 'Edit',
                'showInMenu': false,
                'icon': <BsFillClipboard2PlusFill className="nav-icon" />
            },
        ]
    },
    {
        'title': "Community Blogs",
        'path': 'blogs',
        'icon': <BiMessageSquareEdit />,
        'childItems': [
            {
                'url': "/blogs/categories",
                'title': 'Categories',
                'showInMenu': true,
                'icon': <BiCategory className="nav-icon" />
            },
        ]
    }
]

const checkIsActivePage = (currentPath, url) => {
    return (currentPath === url) ? 'active' : ''
}

const Header = () => {
    const dispatch = useDispatch();
    const { pathname, push } = useRouter();
    const [activeParent, setActiveParent] = useState("");

    const logout = (e) => {
        e.preventDefault();
        removeUserSession();
		dispatch(logoutUser());
		push("/login");
    }

    useEffect(() => {
        menuItems.map((item, i) => {
            if(pathname.includes(item.path) !== false){
                setActiveParent(item.path);
            }
        })
    }, [pathname]);


    const openChildMenu = (e, path) => {
        e.preventDefault();
        if(path == activeParent){
            setActiveParent('');
        }else{
            setActiveParent(path);
        }
    }

    return (
        <>
            <div id="pageLoader" className="preloader flex-column justify-content-center align-items-center">
                <Image id="pageLoaderLogo" src={logo} className="animation__shake" alt="logo" />
            </div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#" role="button"><FaBars /></a>
                    </li>
                </ul>
            </nav>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link href="/" className="brand-link">
                    <Image src={logoWhite} className="" alt="logo" />
                    {/* <span className="brand-text font-weight-light">Vital Net</span> */}
                </Link>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <Image src={user} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">VitalNet Admin</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {Object.entries(menuItems).map(([i, item]) => {
                                return (
                                    <li key={i} className={`nav-item ${(item.path == activeParent)?"menu-open":""}`}>
                                        <Link href={(item.url) ? item.url : '#'} className={`nav-link ${(item.path == activeParent)?"active":""} ${checkIsActivePage(pathname, item.title)}`} onClick={(e) => openChildMenu(e, item.path)} >
                                            <i className="nav-icon">{item.icon}</i>
                                            <p>

                                                {item.title}
                                                {(item.childItems && item.childItems.length > 0) && (<FaAngleLeft className="right" />)}
                                            </p>
                                        </Link>
                                        <ul className="nav nav-treeview">
                                            {Object.entries(item.childItems).map(([j, childItem]) => {
                                                if (childItem.showInMenu) {
                                                    return (<NavLink key={j} url={childItem.url} icon={childItem.icon} title={childItem.title} activeClass={checkIsActivePage(pathname, childItem.url)} />)
                                                }
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                            <li className="nav-item">
                                <a className="nav-link" onClick={logout} href="#">
                                    <i className="nav-icon"><BiLogOutCircle /></i>
                                    <p>Logout</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Header;