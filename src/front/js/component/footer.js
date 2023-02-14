import React, { Component } from "react";
import "../../styles/footer.css";


export const Footer = () => (
<footer className="site-footer">
      <div className="container d-flex bd-highlight mb-3">
        <div className="row">
          <div className="col-sm-12 col-md-6 me-auto p-2 bd-highlight">
            <h6>About</h6>
            <p className="text-justify">Lorem ipsum dolor sit amet. In corporis repellat ex recusandae placeat ut ducimus rerum. Sed iure nihil rem doloribus velit sed voluptates delectus et rerum sunt non voluptatum possimus et quaerat modi qui ipsam harum. Eos aspernatur totam vel natus doloremque et exercitationem quaerat et quasi repudiandae!</p>
          </div>

          <div className="col-xs-6 col-md-3 float-end">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2023 All Rights Reserved by TrackBit.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>  
            </ul>
          </div>
        </div>
      </div>
</footer>
);
