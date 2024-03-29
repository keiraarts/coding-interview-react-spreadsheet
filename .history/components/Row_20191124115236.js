import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDataState } from '../src/DataContext';
import Cell from './Cell';
import get from 'lodash/get';

const TableRow = styled.tr`
	background: #fff;
`;

function Row({ y, rowContent, readOnly }) {
	let { size } = useDataState();
	let columns = [];

	for (let x = 0; x < size[0]; x += 1) {
		// Readonly flags that the cell should not listen to any event handlers
		if (x === 0) columns.push(<Cell key={-1} content={y > -1 ? y + 1 : ''} readOnly />);
		// Relying on lodash/get to safely show an empty value for undefined array elements
		columns.push(<Cell key={x} x={x} y={y} readOnly={readOnly || false} content={get(rowContent, x, '')} />);
	}

	return <TableRow>{columns}</TableRow>;
}

Row.propTypes = {
	y: PropTypes.number,
	rowContent: PropTypes.array,
	readOnly: PropTypes.any,
};

export default Row;
