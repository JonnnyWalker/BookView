import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import BookItem from './BookItem'

export default class BookList extends Component {
  constructor(props){
    super(props)
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }
  componentDidMount(){
    this._refreshData();
  }
  _refreshData = () =>{
    fetch('http://api.nytimes.com/svc/books/v3/lists/hardcover-fiction?response-format=json&api-key=73b19491b83909c7e07016f4bb4644f9:2:60667290')
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(json.results.books)
      })
    })
  }
  _renderRow = (rowData) => {
    return (
        <BookItem title={rowData.title}
                  author = {rowData.author}
                  coverURL = {rowData.book_image}
        />
      );
  }
  render() {
    return (
      <ListView dataSource={this.state.dataSource}
      renderRow={this._renderRow}/>
    );
  }
}

const styles = StyleSheet.create({ 
  list: {
    flex: 1,
    flexDirection: 'row'
  },
  listContent: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  sectionDivider: {
    padding: 8,
    backgroundColor: '#EEEEEE',
    alignItems: 'center'
  },
  headingText: {
    flex: 1,
    fontSize: 24,
    alignSelf: 'center'
  }, 
});