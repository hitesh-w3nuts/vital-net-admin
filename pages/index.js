import Head from 'next/head'
import Image from 'next/image'
import { BiCommentDetail, BiMessageSquareEdit, BiUserPlus } from 'react-icons/bi'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { RiPagesFill } from 'react-icons/ri'
export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>6</h3>
                    <p>Total Pages</p>
                  </div>
                  <div class="icon">
                    <i class=""><RiPagesFill /></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class=""><BsFillArrowRightCircleFill /></i></a>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>20</h3>
                    <p>Total Blogs</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"><BiMessageSquareEdit /></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class=""><BsFillArrowRightCircleFill /></i></a>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>8</h3>
                    <p>User Registrations</p>
                  </div>
                  <div class="icon">
                    <i class=""><BiUserPlus /></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class=""><BsFillArrowRightCircleFill /></i></a>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>100</h3>
                    <p>Total Comments</p>
                  </div>
                  <div class="icon">
                    <i class=""><BiCommentDetail /></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class=""><BsFillArrowRightCircleFill /></i></a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Latest Members</h3>

                    <div class="card-tools">
                      <span class="badge badge-danger">8 Users</span>
                      <button type="button" class="btn btn-tool" data-card-widget="collapse">
                        <i class="fas fa-minus"></i>
                      </button>
                      <button type="button" class="btn btn-tool" data-card-widget="remove">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <ul class="users-list clearfix">
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">Alexander Pierce</a>
                        <span class="users-list-date">Today</span>
                      </li>
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">Norman</a>
                        <span class="users-list-date">Yesterday</span>
                      </li>
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">Jane</a>
                        <span class="users-list-date">12 Jan</span>
                      </li>
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">John</a>
                        <span class="users-list-date">12 Jan</span>
                      </li>
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">Alexander</a>
                        <span class="users-list-date">13 Jan</span>
                      </li>
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">Sarah</a>
                        <span class="users-list-date">14 Jan</span>
                      </li>
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">Nora</a>
                        <span class="users-list-date">15 Jan</span>
                      </li>
                      <li>
                        <img src="user1-128x128.jpg" alt="User Image" />
                        <a class="users-list-name" href="#">Nadia</a>
                        <span class="users-list-date">15 Jan</span>
                      </li>
                    </ul>
                  </div>
                  <div class="card-footer text-center">
                    <a href="javascript:">View All Users</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </>
  )
}
