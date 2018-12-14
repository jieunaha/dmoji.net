import React from 'react';
import Table from 'react-bootstrap/lib/Table';

const ToolCostTable = ({ categoryName, yet, refTable, children }) => (
  <section className="cost">
    <div>
      {children}
      <Table>
        <tbody>
          <tr>
            <th>{categoryName} 도구</th>
            <th>설치 단가</th>
          </tr>
          {yet.map((li, i) => (
            <tr key={`${categoryName === '분석' ? 'an' : 'tr'}-cost-${i}`}>
              <td>{li}</td>
              <td>{refTable[li]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </section>
);

export default ToolCostTable;
