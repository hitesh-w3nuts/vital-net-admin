import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.svg"
import user from "../../assets/images/user.svg"
import { useState } from "react";
// import $ from "jquery";

import { FaAngleLeft, FaHome } from "react-icons/fa";
import { BsSliders, BsFillInfoCircleFill, BsFillChatTextFill, BsFillChatFill } from "react-icons/bs";

import { useRouter } from "next/router";

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
        'childItems': [
            {
                'url': "/edit-home",
                'title': 'Home Page Options',
                'icon': <FaHome className="nav-icon" />
            },
            {
                'url': "/edit-about",
                'title': 'About Page Options',
                'icon': <BsFillInfoCircleFill className="nav-icon" />
            },
            {
                'url': "/edit-your-preferences",
                'title': 'Preferences Options',
                'icon': <BsSliders className="nav-icon" />
            },
            {
                'url': "/edit-faq",
                'title': 'FAQ Page Options',
                'icon': <BsFillChatTextFill className="nav-icon" />
            },
            {
                'url': "/edit-contact",
                'title': 'Contact Page Options',
                'icon': <BsFillChatFill className="nav-icon" />
            },
        ]
    }
]

const checkIsActivePage = (currentPath, url) => {
    return (currentPath === url) ? 'active' : ''
}

const checkIsActiveChildPage = (currentPath) => {
    for (let index = 0; index < menuItems.length; index++) {
        const element = menuItems[index];
        if (element.childItems && element.childItems.length > 0) {
            const childItems = element.childItems;
            for (let child = 0; child < childItems.length; child++) {
                const childElement = childItems[child];
                if(currentPath == childElement.url){
                    return "menu-open";
                }
            }
        }
    }
}

const Header = () => {
    const router = useRouter();
    const path = router.pathname;
    return (
        <>
            <div id="pageLoader" className="preloader flex-column justify-content-center align-items-center">
                <Image id="pageLoaderLogo" src={logo} className="animation__shake" alt="logo" />
            </div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="index3.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contact</a>
                    </li>
                </ul> */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                            <i className="fas fa-search"></i>
                        </a>
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-comments"></i>
                            <span className="badge badge-danger navbar-badge">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <a href="#" className="dropdown-item">

                                <div className="media">
                                    {/* <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle"> */}
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Brad Diesel
                                            <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                        </h3>
                                        <p className="text-sm">Call me whenever you can...</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                    </div>
                                </div>

                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">

                                <div className="media">
                                    {/* <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"> */}
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            John Pierce
                                            <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                                        </h3>
                                        <p className="text-sm">I got your message bro</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                    </div>
                                </div>

                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">

                                <div className="media">
                                    {/* <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"> */}
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Nora Silvester
                                            <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                                        </h3>
                                        <p className="text-sm">The subject goes here</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                    </div>
                                </div>

                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell"></i>
                            <span className="badge badge-warning navbar-badge">15</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-envelope mr-2"></i> 4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-users mr-2"></i> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-file mr-2"></i> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                            <i className="fas fa-th-large"></i>
                        </a>
                    </li>
                </ul>
            </nav>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link href="/" className="brand-link">
                    <Image src={logo} className="" alt="logo" />
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
                                    <li key={i} className={`nav-item ${checkIsActiveChildPage(path, item.url)}`}>
                                        <Link href={(item.url) ? item.url : '#'} className={`nav-link ${checkIsActivePage(path, item.url)}`}>
                                            <p>
                                                {item.title}
                                                {(item.childItems && item.childItems.length > 0) && (<FaAngleLeft className="right" />)}
                                            </p>
                                        </Link>
                                        <ul className="nav nav-treeview">
                                            {Object.entries(item.childItems).map(([j, childItem]) => {
                                                return (<NavLink key={j} url={childItem.url} icon={childItem.icon} title={childItem.title} activeClass={checkIsActivePage(path, childItem.url)} />)
                                            })};
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Header;