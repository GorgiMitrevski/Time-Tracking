import React, { Component } from 'react';
import styles from '../../../Styles/ProjectPageStyles/addTime.module.css';
import TimeModel from '../../../Models/TimeModel';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddTime extends Component {

    constructor(props){
        super(props);

        this.state = {
            newTime: new TimeModel(),
            emptyFields: false
        };
    }

    onInputchange = (event) => { // handle inputs
        this.setState(prevState => ({
            newTime: {
              ...prevState.newTime,
              [event.target.name]: event.target.value 
            }
        }));
    }

    submitNewTime = (event) => { // save new Time added
        if(this.state.newTime.Name === '' || this.state.newTime.AmountHours === '' || this.state.newTime.Description === ''){  // validation
            this.setState( {emptyFields: true} );

            toast.error('Marked fields are required!');
            event.preventDefault();
            return;
        }

        var currentProject = this.props.projects.find((project) => {
            return this.props.project.Id === project.Id;
        });

        for(let i = 0; i < currentProject.TimeModel.length; i++ ){ // if time with same name exist
            if(currentProject.TimeModel[i].Name === this.state.newTime.Name) {
                toast.error('Time with same name already exists for this project !');
                event.preventDefault();
                return;
            }
        }
        
        this.props.addTime(this.props.project.Id, this.state.newTime); // send to redux new time added
        this.props.currentProjectChange(); // call function from ProjectPage parent
        this.setState({ newTime: new TimeModel() }); // reset

        toast.success('New time successfuly added!');
        this.setState( {emptyFields: false} );
        event.preventDefault();
    }

	render() {
		return (
			<div className="mt-3">
                <ToastContainer position="top-right" autoClose={5000} closeOnClick={true} pauseOnHover={true} /> 

                <form onSubmit={this.submitNewTime}>
                    <div className={`col-md-12 border m-auto ${styles.formWidth}`}>
                        <h4> Add New Time Form </h4>
                        <div className="form-group row">
                            <label className="col-sm-2 font-weight-bold text-right"> Name: </label>
                            <div className="col-sm-10">
                                <input 
                                    name="Name"
                                    type="text" 
                                    className={`form-control ${this.state.newTime.Name === '' && this.state.emptyFields ? styles.borderError : ""} `}
                                    value={this.state.newTime.Name}   
                                    onChange={this.onInputchange} 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 font-weight-bold text-right"> Amount of Hours: </label>
                            <div className="col-sm-10">
                                <input 
                                    name="AmountHours"
                                    type="number" 
                                    className={`form-control ${this.state.newTime.AmountHours === '' && this.state.emptyFields ? styles.borderError : ""} `}
                                    value={this.state.newTime.AmountHours}   
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
                                    className={`form-control ${this.state.newTime.Description === '' && this.state.emptyFields ? styles.borderError : ""} `}
                                    value={this.state.newTime.Description}   
                                    onChange={this.onInputchange} 
                                />
                            </div>
                        </div> 
                        <button type="submit" className="btn btn-primary mb-1" > Save Time for Project</button>
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
        addTime: (projectId, timeAdded) => dispatch( {type: 'ADD_PROJECT_TIME', projectId: projectId, timeAdded: timeAdded } )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTime);
