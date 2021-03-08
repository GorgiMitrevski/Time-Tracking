import React, { Component } from 'react';
import '../../Styles/LayoutStyles/layout.module.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainPage from '../../Views/MainPage';
import ProjectPage from '../../Views/ProjectPage';

class Layout extends Component {
	render() {
		return (
			<div>
				<header className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-dark">
					<div className="navbar-nav-scroll">
						<ul className="navbar-nav bd-navbar-nav flex-row"> 
							<li className="nav-item">
								<Link to="/" className="nav-link text-info font-weight-bold">
									Time Tracking <sup><i className="fa fa-clock clock-icon"/></sup> 
								</Link>
							</li>
							<li className="nav-item ml-5">
								<Link to="/" className="nav-link text-white font-weight-bold">
									Main Page
								</Link>
							</li>
						</ul>
					</div>
				</header>

				<Route path="/" exact component={MainPage} />
				<Route path="/preview-project/:id" exact component={ProjectPage} />
			</div>
		);
	} 
}

export default Layout;
