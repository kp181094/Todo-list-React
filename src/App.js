import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import ListItem from './ListItem'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

class App extends React.Component {
  constructor(props){
    super(props);
    //items are empty array and initially text and key is empt values,state has 2 var-> items[], currentitem obj
    //there is need to bind this as it looses its context from class so need to bind
    this.state={
      items:[],
      currentItem:{
        text:'',
        key:'',
      }
    }
    this.handleInput=this.handleInput.bind(this);
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.setUpdate=this.setUpdate.bind(this);
    }
  //initially there will b two methods one is handleInput() and addItems() 
  //e.preventDefault()=>doesnt refresh page

  handleInput=(e)=>{
    this.setState({
      currentItem:{
        text:e.target.value,
        key:Date.now()
      }

    })
  }

  addItem=(e)=>{
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
   //if new text or item is not empty
    if(newItem.text !== ''){
      //destructuring assgnnt first paramntr unpaacks list and converst indicvidual items  display
      const newItems=[...this.state.items,newItem];
      this.setState({
        items:newItems,
        currentItem:{
           text:'',
           key:''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems= this.state.items.filter(item=>
      item.key!==key);
      this.setState({
        items:filteredItems
      })
   }

   setUpdate(text,key){
     const items = this.state.items;
     items.map(item =>{
       if(item.key===key){
         item.text=text;
       }
     })
     this.setState({
       items:items
     })
   }
  render() {
    return (
      <div className='App'>
        <header>
          <form id="todo-form" onSubmit={this.addItem}>
            <input type='text' placeholder="Enter text.." value={this.state.currentItem.text}
            onChange={this.handleInput}
            />
            <button type="submit">Add</button>
          </form>
        </header>
        <ListItem items={this.state.items}
        deleteItem={this.deleteItem} setUpdate={this.setUpdate}></ListItem>
      </div>
    );
  }
}

export default App;
