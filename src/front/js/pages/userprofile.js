import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/userprofile.css";

export const Userprofile = () => {
	const { store, actions } = useContext(Context);

  useEffect(()=>{
    actions.getUserInfo()
  },[])

	return (

	<div className="container">
    	<div className="main-body">
    
          
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item"><a href="#">User</a></li>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav> 
    	  <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://d3a7c97d5beed5ab2c49-7aac60cfdebb59ab39bebc5ac6e3d5b2.ssl.cf5.rackcdn.com/27640000/27642431/_xs959ce358e310887ed8d155f4558024e5.jpg" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>Guillermo Ferrabone</h4>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">San Francisco, Panama, PA</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Website</h6>
                    <span className="text-secondary">https://trackbit.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Github</h6>
                    <span className="text-secondary">billferrabone</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Twitter</h6>
                    <span className="text-secondary">@billferrabone</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Instagram</h6>
                    <span className="text-secondary">billferrabone</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Facebook</h6>
                    <span className="text-secondary">billferrabone</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Guillermo Ferrabone
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      billferrabone@gmail.com
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (507) 6286-2278
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (507) 6286-2278
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    San Francisco, Panama, PA
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "80%"}}aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "72%"}}aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style= {{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style= {{width: "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

        </div>
    </div>
	);
};
