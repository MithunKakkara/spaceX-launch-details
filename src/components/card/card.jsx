import React, { Component } from 'react'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgLoaded: false
    }
  }
  render() {
    const { data } = this.props;
    return (
       <div className="card">
          <div className="card__img-wrapper">
            <img 
              className={this.state.imgLoaded?'':'show'}
              src={'media/loading-icon.gif'}
              alt={'loading'} 
            />
            <img 
              className={this.state.imgLoaded?'show':''}
              src={data.links.mission_patch} 
              alt={data.mission_name} 
              onLoad={() => this.setState({imgLoaded: true})}
            />
          </div>
          <div className="card__content">
            <a className="card__title" href="/">
              <span>{data.mission_name} #{data.flight_number}</span>
            </a>
            <div className="card__info card__info--mission-ids">Mission Ids: 
              <ul>
              {data.mission_id.map((id,index)=>{
                return <li key={index} className="card__info-text">{id}</li>
              })}
              </ul>
            </div>
            <p className="card__info card__info--year">
              Launch Year: <span className="card__info-text" >{data.launch_year}</span>
            </p>
            <p className="card__info card__info--success">
              Successfull Launch: <span className="card__info-text" >{data.launch_success?'true':'false'}</span>
            </p> 
            <p className="card__info card__info--success">
              Successfull Landing: <span className="card__info-text" >{data.launch_success?'true':'false'}</span>
            </p> 
          </div>
       </div>
    );
  }
}

export default Card