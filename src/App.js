import React from 'react';

export default React.createClass({
  getInitialState: function(){
    return {
      list: [],
      text: ''
    }
  },
  
  handleChange: function (e) {
    this.setState({
      text: e.target.value
    })
  },
  handleSubmit: function (e){
    e.preventDefault ()
    var id = Math.random();
    this.setState({
      list:[
      {
        id:id,
        text:this.state.text,
        complete: false,
      }, 
        ...this.state.list
      ],
      text: ''
    })
  },
  handleComplete: function (index){
    var newList = this.state.list;
    newList[index].complete = !newList[index].complete;
    this.setState({
      list: newList
    });

  },
deleteList: function (index){
  var index = this.state.list.splice(index,1)

  var leftSide = this.state.list.splice(0,index);
  var rightSide = this.state.list.splice(index + 1);
  var list = leftSide.concat(rightSide);


  this.setState({
      list: list
    })
},

  

  render (){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.text} placeholder="What needs to be done?" />
      </form>
      <div>
        <ul>
            {this.state.list.map(function(list, i){
              var color = list.complete ? 'green' : 'red';

            return <li key={i} style={{color:color}}>
            {list.text}
                    <button onClick={() => this.handleComplete(i)}>done</button>
                    <button onClick={() => this.deleteList(i)}>delete</button>
                  </li>
          }.bind(this))}
        </ul>
      </div>
      </div>
    )
  }
})

