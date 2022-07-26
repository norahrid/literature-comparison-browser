import React from 'react';

const Tooltip = ({selection, x, y}) => {

    return (
        <div className='graph-tooltip' style={{ 'left': x, 'top': y }}>
            {selection.word && <p><b>Word: </b><span>{props.lineName}</span></p>}
        </div>
    );
}
