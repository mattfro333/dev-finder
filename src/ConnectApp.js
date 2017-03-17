import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './actions/actionCreators'
import App from './App';

function mapStatetoProps(state){
  return {
    user: state.user,
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}

const ConnectApp = connect(mapStatetoProps, mapDispatchToProps)(App);

export default ConnectApp;
