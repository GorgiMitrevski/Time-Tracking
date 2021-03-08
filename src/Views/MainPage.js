import React, { Component } from 'react';
import '../Styles/MainPageStyles/mainPage.module.css';
import AddProject from '../components/MainPage/AddProject/AddProject';
import ListProjects from '../components/MainPage/ListProjects/ListProjects';

class MainPage extends Component {

	render() {
		return (
			<div> 
				<h5> Main Page </h5>
                <main>
                    <AddProject></AddProject>
                    
                    <ListProjects></ListProjects>
				</main>
			</div>
		);
	} 
}

export default MainPage;
