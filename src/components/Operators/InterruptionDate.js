import React from 'react';
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

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
    // var now  = "04/09/2013 15:00:30";
    // var then = "02/09/2013 14:20:31";
    const {onSubmitInterruptionTime}=this.props;
    var now  = this.props.interruptionEnd;
    var then = this.props.interruptionStart;
    var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    onSubmitInterruptionTime(s)
    return(s)
  }

  scheduled=()=>{
    const {
      onSubmitInterruptionEnd,
    }=this.props;
    return(
      <div className="scheduledContainer">
        <h6 className="titleInput">Fin</h6>
        <DatePicker
            className="datesComponents"
            selected={this.props.interruptionEnd}
            selectsEnd
            startDate={this.props.interruptionStart}
            endDate={this.props.interruptionEnd}
            // onChange={(event)=>{onSubmitInterruptionEnd(event);this.props.onSubmitInterruptionTime(calculateTime())}}
            onChange={(event)=>{onSubmitInterruptionEnd(event)}}
            showTimeSelect
              timeFormat="HH:mm"
              injectTimes={[
                moment().hours(0).minutes(1),
                moment().hours(12).minutes(5),
                moment().hours(23).minutes(59)
              ]}
              dateFormat="LLL"
              minDate={moment()}
              maxDate={moment().add(5, "months")}
              showDisabledMonthNavigation
              withPortal
        />
        <h6 className="titleInput">Tiempo de Interrupción</h6>
        {/* <input type="time" className="" onChange={onSubmitInterruptionTime} value="18:39:59" disabled required></input> */}
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
    const {
      onSubmitInterruptionStart,
      interruptionType
    }=this.props;
    return(
      <div>
        {/* <input type="date" className="" onChange={onSubmitInterruptionStart} required></input> */}
        {/* <input type="date" className="" onChange={onSubmitInterruptionEnd} required></input> */}
        <div className="addressContainer">
          <h6 className="titleInput">Inicio</h6>
          <DatePicker
            className="datesComponents"
              selected={this.props.interruptionStart}
              selectsStart
              startDate={this.props.interruptionStart}
              endDate={this.props.interruptionEnd}
              onChange={onSubmitInterruptionStart}
              showTimeSelect
                timeFormat="HH:mm"
                injectTimes={[
                  moment().hours(0).minutes(1),
                  moment().hours(12).minutes(5),
                  moment().hours(23).minutes(59)
                ]}
                dateFormat="LLL"
                minDate={moment()}
                maxDate={moment().add(5, "months")}
                showDisabledMonthNavigation
                withPortal
          />
          {interruptionType==='Scheduled' && this.scheduled()}
        </div>
      </div>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionDate);