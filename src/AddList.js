import React, { Component } from 'react';

class AddList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        title: ''
      };
  }


  onChange(e) {
    this.setState({title: e.target.value});
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!

      // Implement the rest of this function here!
      if (this.state.title){
          this.props.addList(this.state.title);
          this.setState({title: ''});
          //document.getElementById('newID').value = '';
          this.refs.id.value = '';
          //document.getElementById('newID').focus();
          this.refs.id.focus();
      }
  }

  render() {
    return (
      <div id="addListDiv">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div id='addList'>
            <label>What will be on your next list?&nbsp;
              <input type='text' ref='id' id='newID' onChange={this.onChange.bind(this)}></input>
            </label>
          </div><br />
          <input type='submit' value='Create List' />
        </form>
      </div>
    );
  }
}

export default AddList;
