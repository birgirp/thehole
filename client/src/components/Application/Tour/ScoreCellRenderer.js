import React, {Component} from "react";
import moment from "moment";

export default class DateCellRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.getValue()
        };
    }

    getValue() {
        if (this.props.value) {
            let date = moment(this.props.value);
            if (date.isValid()) {
                return date.format('DD/MM/YYYY');
            } else if (this.props.value === 'late') {
                return {
                    late: true,
                    PN: this.props.data.PN,
                    SN: this.props.data.SN,
                }
            } else if (this.props.value === 'Not Ready') {
                return this.props.value;
            } else if (this.props.value === 'NA') {
                return this.props.value;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    render() {
        if (this.state.value && this.state.value.late === true) {
            return (
                <a href={"http://ru-bioprod:8686?pn=" + this.state.value.PN + "&setid=%25" + this.state.value.SN + '%25'}
                   rel="noopener noreferrer" target="_blank"> Late</a>);
        } else {
            return (<span>{this.state.value}</span>);
        }
    }
};
