import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
      labels: [
        'HTML5',
        'Nodejs',
        'Reactjs'
      ],
      datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
              '#EE7600',
              '#36A2EB',
              '#008080'
            ],
            hoverBackgroundColor: [
              '#EE7600',
              '#36A2EB',
              '#008080'
            ]
      }]
};

 export default React.createClass({
   displayName: 'PieExample',

   render() {
     return (
       <div>
       <h2>Technologies</h2>
       <Pie data={data} />
       </div>
     );
   }
 });
