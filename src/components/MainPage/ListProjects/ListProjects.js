import React, { Component } from 'react';
import styles from '../../../Styles/MainPageStyles/listProjects.module.css';
import ReusableModal from '../UpdateProject/UpdateProjectModal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ListProjects extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            modalOpen: false,
            currentProject: {}
        }
    }

    openUpdateModal = (projectId) => { // for editing of Project - modal
        var projectForUpdate = this.props.projects.find(project => project.Id === projectId);
        this.setState({ 
            currentProject : projectForUpdate,
            modalOpen : true 
        });
    }

    closeModal = () => {
        this.setState({ modalOpen : false } );
    }

    deleteProject = (project) => { // delete project - confirm before deliting
        if (window.confirm(`Delete project ${project.Name} ?`)) {
            this.props.deleteProject(project.Id);
            toast.success('Project successfuly deleted!');
        }
    }

    renderProjectTable() {
        return this.props.projects.map((project) => {
           const { Id, Name, Description } = project;
           return (
            <tr key={Id}>
                <td> {Name} </td>
                <td> {Description} </td>
                <td> 
                    <Link 
                        to={{
                            pathname: `/preview-project/${Id}`,
                            query: { project: project }
                        }} 
                        className="btn btn-info" > 
                        View Project 
                    </Link> 
                </td>
                <td> <button className="btn btn-success" onClick={() => {this.openUpdateModal(Id)} }> Update Project </button> </td>
                <td> <button className="btn btn-danger" onClick={() => {this.deleteProject(project)} }> Delete Project </button> </td>
            </tr>
            )
        })
    }

	render() {
		return (
			<div className="mt-5">
                <ToastContainer position="top-right" autoClose={5000} closeOnClick={true} pauseOnHover={true} /> 

                <table className={`table m-auto ${styles.tableWidth}`}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"> Name </th>
                            <th scope="col"> Description </th>
                            <th scope="col"> View </th>
                            <th scope="col"> Update </th>
                            <th scope="col"> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.projects.length > 0 ?
                            this.renderProjectTable() 
                        : 
                        <tr>
                            <td colSpan="5"> There are no projects added in our system </td>
                        </tr>
                    } 
                    </tbody>
                </table>
                <ReusableModal key={this.state.currentProject.Name} modalOpen={this.state.modalOpen} closeModal={this.closeModal} projectForUpdating={this.state.currentProject}/>
			</div>
		);
	} 
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (id) => dispatch( {type: 'DELETE_PROJECT', projectId: id } )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProjects);
