import React, { Component } from 'react';
import styles from '../../../Styles/ProjectPageStyles/listTiming.module.css';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ListTiming extends Component {

    deleteTime = (time) => {
        if ( window.confirm(`Delete timing ${time.Name} ?`) ) {
            this.props.deleteTime(time.Id);
            this.props.currentProjectChange();

            toast.success('Time for Project successfuly deleted!');
        }
    }

    renderTimeTable() {
        return this.props.project.TimeModel.map((time) => {
           const { Id, Name, Description, AmountHours } = time; 
           
           return (
            <tr key={Id}>
                <td> { Name } </td>
                <td> { Description } </td>
                <td> { AmountHours } </td>
                <td> <button className="btn btn-danger" onClick={() => {this.deleteTime(time)} }> Delete Time </button> </td>
            </tr>
            )
        })
    }

	render() {
		return (
			<div className="mt-5">
                <ToastContainer position="top-right" autoClose={5000} closeOnClick={true} pauseOnHover={true} /> 

                <table className={`table m-auto ${styles.timeTable}`}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"> Name </th>
                            <th scope="col"> Description </th>
                            <th scope="col"> Amount Hours </th>
                            <th scope="col"> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.project.TimeModel.length > 0 ?
                            this.renderTimeTable() 
                        : 
                        <tr>
                            <td colSpan="4"> There are no timing added for this project in our system </td>
                        </tr>
                    } 
                    </tbody>
                </table>
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
        deleteTime: (id) => dispatch( {type: 'DELETE_TIME', timeId: id } )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTiming);
