import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react'
import './compProfile.css';


class CompProfile extends Component{
  render(){
    return(
      <div className = 'body'>
        <div className='top'>
          <div className='prof-pic'>
          </div>
          <div className='info'>
            <h1>Company Name</h1>
            <h2>Reviews</h2>
            <h3>Founded: 2011</h3>
            <h3><button>Message</button></h3>
          </div>
        </div>
        <div className='main-info'>
          <div className = 'left-pane'>
            <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
             <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
             <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
             <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
          </div>
          <div className = 'right-pane'><h1>Company Bio</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis ut urna a imperdiet. Nulla condimentum faucibus urna, vitae venenatis metus congue et. Integer nec nibh efficitur, semper dui venenatis, finibus odio. Proin quis metus rhoncus, tincidunt dolor in, ultrices odio. Aliquam luctus sodales mauris, ut viverra lorem dictum quis. Aenean fermentum augue at tortor tempus, in sagittis mauris pellentesque. Maecenas cursus augue cursus tempus tempor. Cras lacus nunc, dictum quis velit sed, luctus porta eros. Pellentesque urna urna, fringilla ac bibendum non, venenatis eget elit. Duis at hendrerit ex. </p>
            <p>Vestibulum maximus lorem sapien, ac volutpat quam fringilla vitae. Aliquam consequat accumsan nisl, in consectetur purus vehicula non. Maecenas at vehicula risus, auctor sodales nunc. Nam fringilla orci metus, sit amet hendrerit enim tincidunt sed. Phasellus porttitor id augue at faucibus.</p>

           <p>Sed efficitur bibendum scelerisque. Proin varius, dolor ut viverra consectetur, lectus mauris lacinia lacus, at ultricies justo nisl ac sem. Nullam a ex luctus, molestie nisi id, interdum turpis.            Vivamus aliquam convallis sapien, non ultricies nisl aliquam sed. Quisque pretium eleifend sodales. Nulla cursus dui vehicula, aliquam est vitae, fringilla tellus. Aenean aliquet quam eget ligula pulvinar,            id tincidunt risus fermentum. In hac habitasse platea dictumst. Mauris mollis magna urna, vitae pretium eros fringilla et. Nullam sodales suscipit tellus, quis cursus justo volutpat vel. Quisque vel            congue nulla. Pellentesque vestibulum, ligula eget pulvinar euismod, ex lorem ultricies ipsum, vitae suscipit nunc mauris a arcu.</p>
           </div>
        </div>
      </div>
    
    )
  }
}

export default CompProfile
