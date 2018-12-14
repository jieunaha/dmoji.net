import React from 'react';

const ToolList = ({ list, listType, heading, category }) => (
  <ul className={`thumb-list ${listType}`}>
    <h3>{heading}</h3>
    <div>
      {list.map((item, i) => <li key={`${category}-${listType}-${i}`}>{item}</li>)}
    </div>
  </ul>
);

export default ToolList;
