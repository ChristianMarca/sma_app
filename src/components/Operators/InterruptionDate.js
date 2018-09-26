import React from 'react';
import {connect} from 'react-redux';

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import {interruptionStartAction,interruptionEndAction,interruptionTimeAction} from '../../actions';
import './interruption.css';

const mapStateToProps=state=>{
	return {
    // Inicio de Interrupción
    interruptionStart: state.interruptionDateReducer.interruptionStart,
    interruptionEnd: state.interruptionDateReducer.interruptionEnd,
    interruptionTime: state.interruptionDateReducer.interruptionTime,

    interruptionType: state.interruptionTypeReducer.interruptionType,
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
    // Inicio de Interrupción
    onSubmitInterruptionStart: (event)=> {dispatch(interruptionStartAction(event))},
    // Fin de Interrupción
    onSubmitInterruptionEnd: (event)=> dispatch(interruptionEndAction(event)),
    // Tiempo de Interrupción
    onSubmitInterruptionTime: (event)=> dispatch(interruptionTimeAction(event))
	}
}


class InterruptionDate extends React.Component{

  calculateTime=()=>{
    const {interruptionStart,interruptionEnd}=this.props;
    const {onSubmitInterruptionTime}=this.props;
    var now  = interruptionEnd;
    var then = interruptionStart;
    var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    onSubmitInterruptionTime(s)
    return(s)
  }

  scheduled=()=>{
    const {onSubmitInterruptionEnd}=this.props;
    return(
      <div className="scheduledContainer">
        <h6 className="titleInput">Fin</h6>
        <DateTimePicker
          onChange={onSubmitInterruptionEnd}
          value={this.props.interruptionEnd}
          required={true}
          minDate={new Date()}
          disableClock={false}
          clearIcon={<i className="fas fa-eraser"></i>}
          calendarIcon={<i className="far fa-calendar-alt"></i>}
        />
        <h6 className="titleInput">Tiempo de Interrupción</h6>
        <h1 className="timeCounter">
          {this.calculateTime().split(':').map((item,index)=>{
            switch (index){
              case 0:
                return `${item} h `
              case 1:
                return `${item} min `
              default:
                return `${item} seg`
            }
          })}
        </h1>
      </div>
    )
  }

  render(){
    const {onSubmitInterruptionStart,interruptionType}=this.props;
    return(
      <div>
        <div className="addressContainer">
          <h6 className="titleInput">Inicio</h6>
          <DateTimePicker
            onChange={onSubmitInterruptionStart}
            value={this.props.interruptionStart}
            required={true}
            // minDate={new Date()}
            disableClock={false}
            clearIcon={<i className="fas fa-eraser"></i>}
            calendarIcon={<i className="far fa-calendar-alt"></i>}
          />
          {interruptionType==='Scheduled' && this.scheduled()}
        </div>
      </div>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionDate);