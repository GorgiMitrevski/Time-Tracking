import React, { Component } from 'react';
import ProjectModel from '../../../Models/ProjectModel';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from'../../../Styles/MainPageStyles/addProject.module.css';

class AddProject extends Component {

    constructor(props){
        super(props);

        this.state = {
            newProject: new ProjectModel(),
            emptyFields: false
        };
    }

    onInputchange = (event) => { // handle inputs
        this.setState(prevState => ({
            newProject: {
              ...prevState.newProject,
              [event.target.name]: event.target.value 
            }
        }));
    }

    submitNewProject = (event) => { // save new Project added
        if(this.state.newProject.Name === '' || this.state.newProject.Description === ''){  // validation
            this.setState( {emptyFields: true} ); 
            
            toast.error('Marked fields are required!');
            event.preventDefault();
            return;
        }

        for(let i = 0; i < this.props.projects.length; i++ ){ // if project with same name exists
            if(this.props.projects[i].Name === this.state.newProject.Name) {
                toast.error('Project with same name already exists !');
                event.preventDefault();
                return;
            }
        }

        this.props.addProject( this.state.newProject ); // send to redux new project for adding
        this.setState({ newProject: new ProjectModel() });
        
        toast.success('New project successfuly added!');
        this.setState( {emptyFields: false} );
        event.preventDefault();
    }

	render() {
		return (
			<div className="mt-3">
                <ToastContainer position="top-right" autoClose={5000} closeOnClick={true} pauseOnHover={true} /> 

                <form onSubmit={this.submitNewProject}>
                    <div className={`col-md-12 border m-auto ${styles.formWidth}`}>
                        <h4>Add New Project</h4>
                        <div className="form-group row">
                            <label className="col-sm-2 font-weight-bold text-right"> Name: </label>
                            <div className="col-sm-10">
                                <input 
                                    name="Name"
                                    type="text" 
                                    className={`form-control ${this.state.newProject.Name === '' && this.state.emptyFields ? styles.borderError : ""} `}
                                    value={this.state.newProject.Name}   
                                    onChange={this.onInputchange} 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 font-weight-bold text-right"> Description: </label>
                            <div className="col-sm-10">
                                <textarea 
                                    name="Description"
                                    rows="4" 
                                    cols="20" 
                                    className={`form-control ${this.state.newProject.Description === '' && this.state.emptyFields ? styles.borderError : ""} `}
                                    value={this.state.newProject.Description}   
                                    onChange={this.onInputchange} 
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mb-1" > Save Project</button>
                    </div>
                </form>
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
        addProject: (addedProject) => dispatch( {type: 'ADD_PROJECT', addedProject: addedProject} )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
