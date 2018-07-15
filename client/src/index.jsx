import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  getAllrepos() {
   
    axios.get('/repos')
      .then(result => this.setState({ repos: result}))
      .catch(err => console.log('error fetching repos:', err));
  
  }
  search (term) {
    console.log(`${term} was searched`);
    // TODO
    console.log(term);
    axios.post('/repos', term)
      .then(result => this.getAllrepos())
      .catch(err => console.log('error posting repos:', err));

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));