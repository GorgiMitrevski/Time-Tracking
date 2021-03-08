import React, { Component } from 'react';
import AddTime from '../components/ProjectPage/AddTime/AddTime';
import ListTiming from '../components/ProjectPage/ListTiming/ListTiming';
import { connect } from 'react-redux';

class ProjectPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentProject: this.props.location.query.project
        };
    }

    currentProjectChange = () => { // if Time for project is added this will be called
        var projectEditedTime = this.props.projects.find(el => el.Id === this.state.currentProject.Id);

        this.setState({
            currentProject: projectEditedTime
        })
    }
    
	render() {
		return (
			<div> 
                <h5> View details or add time for project: <span className="text-success"> {this.state.currentProject.Name} </span> </h5> 
                <main>
                    <AddTime project={this.state.currentProject} currentProjectChange={this.currentProjectChange} ></AddTime>
                    
                    <ListTiming key={this.state.currentProject.TimeModel} project={this.state.currentProject} currentProjectChange={this.currentProjectChange} ></ListTiming>
				</main>
			</div>
		);
	} 
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    };
}

export default connect(mapStateToProps)(ProjectPage);