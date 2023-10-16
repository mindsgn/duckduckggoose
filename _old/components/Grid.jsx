import { Component } from 'react';
import Box from './Box';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update } from './../redux/action';


class Grid extends Component {
	render() {
    const { update } = this.props;

		const width = (800);
		var rowsArr = [];
		var boxClass = "";
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 50; j++) {
				let boxId = i + j;

				rowsArr.push(
					<Box
						boxClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
            onClick={() => update(boxId)}
					/>
				);
			}
		}

		return (
			<div className="grid" style={{width: width}}>
				{rowsArr}
			</div>
		);
	}
}


Grid.propTypes = {
  update: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { update })(Grid);
