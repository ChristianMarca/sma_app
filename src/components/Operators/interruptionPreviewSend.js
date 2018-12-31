import React from 'react';
import { connect } from "react-redux";
// import moment from 'moment';
import moment from 'moment-timezone';
import {withRouter} from 'react-router-dom';
import './interruption.css';

const mapStateToProps=state=>{
	return {
    interruptionType: state.interruptionTypeReducer.interruptionType,
    interruptionRB: state.interruptionAddressReducer,
    interruptionDate: state.interruptionDateReducer,
    interruptionCauses: state.interruptionCausesReducer,
    interruptionServices: state.interruptionServicesReducer.interruptionServices,
    interruptionLevel: state.interruptionAddressReducer.interruptionLevel,
    interruptionTechnologies: state.interruptionTechnologiesReducer.interruptionTechnologies,
    interruptionRadioBase: state.radioBasesAddReducer,
    interruptionProvince: state.reducerSuggestProvincia.value,
    interruptionCanton: state.reducerSuggestCanton.value,
    interruptionParish: state.reducerSuggestParish.value,
    sessionController: state.sessionReducer.dataUser
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    // onSubmitInterruptionType: (type)=> dispatch(interruptionTypeAction(type)),
    // onSubmitInterruptionComplete: ()=>dispatch(interruptionSubmitedAction()),
    // onSignInApproved: ()=> dispatch(isSignInAction(true)),
    // onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data)),
    // onReceiveRadioBase: (id,data)=>dispatch(addRadioBaseAction(id,data)),
    // onReceiveRadioBaseID: (id,data)=>dispatch(addRadioBaseIDAction(id,data)),
    // onReceiveRadioBaseIdRemove:(data)=>dispatch(interruptionIdBsAction(data)),
    // onRemoveAllServices: ()=>dispatch(interruptionServicesRemoveAllActions()),
    // onRemoveAllTechnologies: ()=>dispatch(interruptionTechnologyRemoveAllActions()),
    // onRemoveAllRadioBases: ()=>dispatch(removeAllRadioBaseAction())
	}
}

class PreviewForm extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            emails:[],
            CZ:''
        }
    }

    getLocations=()=>{
        switch(this.props.interruptionLevel){
            case 'PARROQUIA':
                return[
                    this.props.interruptionProvince,
                    this.props.interruptionCanton,
                    this.props.interruptionParish
                ]
            case 'CANTON':
                return[
                    this.props.interruptionProvince,
                    this.props.interruptionCanton
                ]
            default:
                return [this.props.interruptionProvince]
        }
        
    }
    onChangeEmail=(event)=>{
        this.setState({email:event.target.value})
    }
    onKeyPressAction=(event)=>{
        event.key==='Enter'&&this.onAddEmail()
    }
    onAddEmail=()=>{
        this.props.emailsSelected([...this.state.emails,this.state.email])
        this.setState((prevState)=>({
            emails: [...prevState.emails,this.state.email],
            email:''
        }));
    }
    onRemoveEmail=(event)=>{
        var emailToDelete=event.currentTarget.value;
        this.props.emailsSelected(this.state.emails.filter(email=>{
            return email!==emailToDelete
        }))
        this.setState((prevState)=>{
            return {
                emails: prevState.emails.filter(email=>{
                    return email!==emailToDelete
                })
            }
        })
    }
    onChangeCZ=(event)=>{
        let Cz=event.target.value;
        this.setState({CZ:Cz})
        this.props._CZ(Cz)
    }    

    render(){
        return(
            <div className="containerInterruptionSummaryModal">
                <div className="containerEmail">
                    <em>Mail Options</em>
                    <div className="containerEmails">
                        <div className="containerNewEmail">
                            <input type="email" className="email-field" name="addres_email" id="new-email" value={this.state.email} onChange={this.onChangeEmail} onKeyPress={this.onKeyPressAction}/>
                            <input type="button" className="" id="add-email" onClick={this.onAddEmail}/>
                        </div>
                        <div className="containerEmailView">
                            {this.state.emails.map((email,index)=>{
                                return <span key={email} className="subContainerEmailView"><span>{email}</span><button className="buttonRemoveEmail" key={email} value={email} onClick={this.onRemoveEmail}>&times;</button></span>
                            })}
                        </div>
                    </div>
                </div>
                <div className="listPreview">
                    <div className="containerCZ">
                        <span>Coordinacion Zonal</span>
                        <input className="options-field-cz" name="coordinacion_zonal" id="CZ" onChange={this.onChangeCZ}/>
                    </div>
                    <ol>
                        <li>
                                <em className="titlePreview">
                                    Localizacion de la interrupcion
                                </em>
                                <br />
                                <em className="bodyPreviewContent">
                                    <span>Area afectada:</span>&emsp;
                                    {this.props.interruptionRB.interruptionSector}
                                </em>
                                <br />
                                <em className="bodyPreviewContent">
                                    La interrupcion en {this.props.interruptionLevel==='CANTON'?'el':'la'} {this.props.interruptionLevel} de {this.getLocations().reverse().map((location,index,array)=>{
                                        return <em key={index}>{location}{index!==array.length-1?', ':'.'} </em>
                                    })}
                                </em>
                        </li>
                        <li>
                                <em className="titlePreview">
                                    Tipo de interrupcion
                                </em> 
                                <br />
                                <em className="bodyPreviewContent">
                                    <span>Tipo de interrupcion:</span>&emsp; {this.props.interruptionType}
                                </em>
                                <br />
                                <em className="bodyPreviewContent">
                                    Inicio de la interrupcion {(()=>{
                                        let localLocate=moment(this.props.interruptionDate.interruptionStart,'es').tz("America/Guayaquil");
                                        moment.locale('es');
                                        localLocate.locale(false);
                                        return localLocate.format('LLLL')
                                    })()} {this.props.interruptionType==='Scheduled'&&
                                    `, fin de la interrupcion ${moment(this.props.interruptionDate.interruptionEnd).tz("America/Guayaquil").format('LLLL')} con una duracion de ${this.props.interruptionDate.interruptionTime.split(':').map((item,index)=>{
                                        switch (index){
                                          case 0:
                                            return `${item} h `
                                          case 1:
                                            return `${item} min `
                                          default:
                                            return `${item} seg`
                                        }
                                      })}`    
                                    } 
                                </em>
                        </li>
                        <li>
                                <em className="titlePreview">
                                    Afectaciones
                                </em>
                                <br />
                                <em className="subTitle">
                                    <span>Servicios Afectados:</span> 
                                </em>
                                <br />
                                <em className="bodyPreviewContent">
                                    {this.props.interruptionServices.length?this.props.interruptionServices.map((service,index,array)=>{
                                        return <em key={index}>{service}{index!==array.length-1?', ':'.'} </em>
                                    }):'No Seleccionado'}
                                </em>
                                <br />
                                <em className="subTitle">
                                    <span>Tecnologias Afectadas:</span> 
                                </em>
                                <br />
                                <em className="bodyPreviewContent">
                                    {this.props.interruptionTechnologies.length?this.props.interruptionTechnologies.map((technology,index,array)=>{
                                        return <em key={index}>{technology}{index!==array.length-1?', ':'.'} </em>
                                    }):'No Seleccionado'}
                                </em>
                        </li>
                    </ol>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PreviewForm));
