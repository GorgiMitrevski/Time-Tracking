import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export default class TimeModel extends Component {

    constructor(
        Id = '',
        Name = '',
        Description = '',
        AmountHours = ''
    ) {
        super();

        this.Name = Name;
        this.Description = Description;
        this.AmountHours = AmountHours;
        this.Id = uuidv4();
    }
}

TimeModel.propTypes = {
    Id: PropTypes.string,
    Name: PropTypes.string,
    Description: PropTypes.string,
    AmountHours: PropTypes.number
};