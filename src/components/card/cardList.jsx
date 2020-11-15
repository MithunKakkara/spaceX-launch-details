import React, { Component } from 'react'
import { connect } from 'react-redux'

import Card from './card'
class CardList extends Component {

//   componentDidMount() {
//     const { dispatch } = this.props
//     dispatch(fetchAppsIfNeeded())
//   }


  render() {
    const { data,
        loading,
        error } = this.props
    return (
       <>
         {loading && <h2>Loading...</h2>}
         {error &&  <h2>Error.</h2>}
         <div className="card-list">
          {
            data && data.map((value,index)=>{
              return <Card data = {value} key={index} />
            })
          }
         </div>
       </>
    );
  }
}
 
function mapStateToProps({ data, loading, error }) {
  return {
    data,
    loading,
    error
  }
}
 
export default connect(mapStateToProps)(CardList)