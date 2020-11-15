import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchApiData } from '../../redux/actions'

class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      yearSelected:'',
      successfullLaunch:'',
      succuessfullLanding:''
    }
    this.yearfilter = this.yearfilter.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.featchData = this.featchData.bind(this);
  }
  componentDidMount() {
    this.featchData()
  }
  applyFilter({yearSelected,succuessfullLanding,successfullLaunch}){
    this.setState({
      yearSelected,
      successfullLaunch,
      succuessfullLanding,
    })
    this.featchData(yearSelected,succuessfullLanding,successfullLaunch);
  }
  featchData(yearSelected,succuessfullLanding,successfullLaunch){
    const { dispatch } = this.props
    let queryFilter = '';

    if(yearSelected){
      queryFilter += `&launch_year=${yearSelected}`
    }
    if(successfullLaunch){
        queryFilter += `&launch_success=${successfullLaunch}`
    }
    if(succuessfullLanding){
        queryFilter += `&land_success=${succuessfullLanding}`
    }
    let url = `https://api.spaceXdata.com/v3/launches?limit=10${queryFilter?queryFilter:''}` 
    dispatch(fetchApiData(url))
  }
  yearfilter(){
    let yearlist = [];
    const applyFilter = this.applyFilter;
    for(let i=2006;i<=2020;i++){
      yearlist.push(
        <div className="filter__option-wrapper" key={i}>
          <button 
          className={"filter__option "+(this.state.yearSelected === i? 'filter__option--active':'') }
            onClick={()=>{
              applyFilter({
              ...this.state,
              yearSelected:i
              })
            }}
          >{i}</button>
        </div>
      )
    }
    return yearlist
  }
  render() {

    return (
        <div className="filter">
          <h2 className="filter__title">Filter</h2>
          <div className="filter__section">
            <h3 className="filter__section-title">Filter Year</h3>
            <div className="filter__section-list">
              {
                this.yearfilter()
              } 
            </div>
          </div>
          <div className="filter__section">
            <h3 className="filter__section-title">Successfull Launch</h3>
            <div className="filter__section-list">
              <div className="filter__option-wrapper">
                <button 
                  className={"filter__option "+(this.state.successfullLaunch === 'true' ? 'filter__option--active':'') }
                  onClick={()=>{
                    this.applyFilter({
                    ...this.state,
                    successfullLaunch:'true'
                    })
                  }}
                >True</button>
              </div>
              <div className="filter__option-wrapper">
                <button 
                  className={"filter__option "+(this.state.successfullLaunch === 'false' ? 'filter__option--active':'') }
                  onClick={()=>{
                    this.applyFilter({
                    ...this.state,
                    successfullLaunch:'false'
                    })
                  }}
                >False</button>
              </div>
            </div>
          </div>
          <div className="filter__section">
            <h3 className="filter__section-title">Successfull Landing</h3>
            <div className="filter__section-list">
              <div className="filter__option-wrapper">
                <button 
                  className={"filter__option "+(this.state.succuessfullLanding === 'true' ? 'filter__option--active':'') }
                  onClick={()=>{
                    this.applyFilter({
                    ...this.state,
                    succuessfullLanding:'true'
                    })
                  }}
                >True</button>
              </div>
              <div className="filter__option-wrapper">
                <button 
                  className={"filter__option "+(this.state.succuessfullLanding === 'false' ? 'filter__option--active':'') }
                  onClick={()=>{
                    this.applyFilter({
                    ...this.state,
                    succuessfullLanding:'false'
                    })
                  }}
                >False</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
 
function mapStateToProps({data}) {
  return {
    data,
  }
}
 
export default connect(mapStateToProps)(Filter)