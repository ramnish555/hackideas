import React from 'react';

const Sort = ({onSort}) => {
    return(
        <>
            <div className="sort">
                <button type="button" className="btn btn-outline-dark btn-sort btn-sm" title="Sort by Vote Count" onClick={()=>{onSort('vote')}}>Vote-Count</button>
                <button type="button" className="btn btn-outline-dark btn-sort btn-sm" title="Sort by Creation Date" onClick={()=>{onSort('date')}}>Creation Date</button>
            </div>
        </>
    )
};

export default Sort;