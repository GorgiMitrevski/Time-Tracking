import { Component } from 'react';
import PropTypes from 'prop-types';
import TimeModel from './TimeModel';
import { v4 as uuidv4 } from 'uuid';

export default class ProjectModel extends Component {

    constructor(
        Id = '',
        Name = '',
        Description = '',
        TimeModel = []
    ) {
        super();

        this.Id = uuidv4();
        this.Name = Name;
        this.Description = Description;
        this.TimeModel = TimeModel;
    }
}

ProjectModel.propTypes = {
    Id: PropTypes.string,
    Name: PropTypes.string,
    Description: PropTypes.string,
    TimeModel: TimeModel
};