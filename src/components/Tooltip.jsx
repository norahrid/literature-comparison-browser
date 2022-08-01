import React from 'react';

export default ({selection={}, x, y}) => {

    return (
        <div className='graph-tooltip' style={{ 'left': x, 'top': y }}>
             {selection.word && <p><b>Word: </b>{selection.word}</p>}
        </div>
    );
}

