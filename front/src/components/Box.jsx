import styled from 'styled-components';

const BoxStyle = styled.div`
  display: inline-block;
  border: 1px solid black;
  width: 15px;
  height: 15px;
  margin-left: -1px;
  margin-bottom: -1px;
`;

/*class Box extends Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	}

	render() {
		return (
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
			/>
		);
	}
}*/

export default BoxStyle;
