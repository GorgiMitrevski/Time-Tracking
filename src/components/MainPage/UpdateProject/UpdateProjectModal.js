import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { connect } from 'react-redux';
import ProjectModel from '../../../Models/ProjectModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ReusableModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: true,
            inputName: this.props.projectForUpdating.Name,
            inputDescription: this.props.projectForUpdating.Description,
        };
    }
    
    onInputchange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveUpdatedProject = () => {
        var editedProject = new ProjectModel(this.props.projectForUpdating.Id, this.state.inputName, this.state.inputDescription, this.props.projectForUpdating.TimeModel);
        this.props.updateProject(editedProject, this.props.projectForUpdating.Id);
        
        this.props.closeModal();
        toast.success('Project successfuly updated!');
    }

	render() {
		return (
            <div>
                <ToastContainer position="top-right" autoClose={5000} closeOnClick={true} pauseOnHover={true} /> 
                
                <Modal show={this.props.modalOpen} size="lg" onHide={this.props.closeModal}>
                    <Modal.Header> 
                       <h4> Update Project</h4> 
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <label className="col-sm-2 font-weight-bold"> Name: </label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                    name="inputName" 
                                    value={this.state.inputName}
                                    onChange={this.onInputchange}  
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 font-weight-bold"> Description: </label>
                            <div className="col-sm-10">
                                <textarea rows="4" cols="50" className="form-control" 
                                    name="inputDescription"
                                    value={this.state.inputDescription}
                                    onChange={this.onInputchange}  
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-light" onClick={this.props.closeModal}> Cancel </button>
                        <button className="btn btn-success" onClick={this.saveUpdatedProject}> Update Project </button>
                    </Modal.Footer>
                </Modal>
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
        updateProject: (updatedProject, projectId) => dispatch( {type: 'UPDATE_PROJECT', updatedProject: updatedProject, projectId: projectId } )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReusableModal);

