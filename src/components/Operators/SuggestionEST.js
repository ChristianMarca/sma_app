import React from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import {requestIDAction,
  interruptionIdBsAction,
  interruptionProvinceAction,
  interruptionCantonAction,
  interruptionParishAction,
  interruptionCodeAction,
  interruptionBSAction,
} from '../../actions';
import {UPDATE_INPUT_VALUE_EST,
  CLEAR_SUGGESTIONS_EST,
MAYBE_UPDATE_SUGGESTIONS_EST,
LOAD_SUGGESTIONS_BEGIN_EST} from '../../constants';
import {updateInputValue as updateInputValueID} from './SuggestionID';

import store from '../../index';
import './suggestions.css';

const getMatchingSuggests=(value)=> {
  const IDs=store.getState().requestIDReducer.ID.data;
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return IDs.filter(language => regex.test(language.nom_sit));
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* --------------------------- */
/*    Redux action creators    */
/* --------------------------- */


function loadSuggestions(value) {
  return dispatch => {
    dispatch(loadSuggestionsBegin());
    dispatch(maybeUpdateSuggestions(getMatchingSuggests(value), value));
  };
}

export const updateInputValue=(value)=> {
  return {
    type: UPDATE_INPUT_VALUE_EST,
    value
  };
}

function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS_EST
  };
}

function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN_EST
  };
}

function maybeUpdateSuggestions(suggestions, value) {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS_EST,
    suggestions,
    value
  };
}

function getSuggestionValue(suggestion) {
  return suggestion.nom_sit;
}

function renderSuggestion(suggestion) {
  return (
    <div className="renderBox">{suggestion.nom_sit}~{suggestion.cell_id}~{suggestion.provincia}~{suggestion.canton}</div>
  );
}

function mapStateToProps(state) {
  const { value, suggestions, isLoading } = state.reducerSuggestEST;
  return {
    value,
    suggestions,
    isLoading,
    searchID: state.requestIDReducer.ID,
    isPendingID: state.requestIDReducer.isPendingID,
    errorID: state.requestIDReducer.errorID,
    estructuras: state.requestIDReducer.ID.data,
    sessionController: state.sessionReducer.dataUser
  };
}

function mapDispatchToProps(dispatch) {

  return {
    // onChange(event, { newValue }) {
    onChangeTest:(newValue,id_usuario)=>{
      dispatch(requestIDAction(newValue,"nom_sit",id_usuario));
      dispatch(updateInputValue(newValue));
      dispatch(interruptionBSAction(newValue))
    },
    onSuggestionsFetchRequested({ value }) {
      dispatch(loadSuggestions(value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearSuggestions());
    },
    onSelectValue: (event,{suggestion})=> {
      dispatch(updateInputValueID(String(suggestion.cell_id) ));
      dispatch(interruptionIdBsAction(suggestion.id_bs));
      dispatch(interruptionCodeAction(String(suggestion.cell_id) ))
      dispatch(interruptionBSAction(suggestion.nom_sit))
      dispatch(interruptionProvinceAction(suggestion.provincia))
      dispatch(interruptionCantonAction(suggestion.canton))
      dispatch(interruptionParishAction(suggestion.parroquia))    
    }
  };
}

// Merge it all (create final props to be passed)
const mergeProps = (mapStateToProps,mapDispatchToProps, ownProps) => {
  return {
    ...mapStateToProps,  // optional
    ...mapDispatchToProps,  // optional
    // onChangeWithNeededValue: (newValue) => (
      // onChange_(event, { newValue }) {
    onChange:(event, { newValue })=> (
      mapDispatchToProps.onChangeTest(
        newValue,
        mapStateToProps.sessionController.id_user  // <<< here the magic happens
      )
    )
  }
}

class SuggestionEST extends React.Component {
  render() {
    const { value, suggestions, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;
    const inputProps = {
      placeholder: "Nombre de la Estructura",
      value,
      onChange
    };
    // const status = (isLoading ? 'Loading...' : 'Type to load suggestions');
    return (
      <div>
        {/* <div className="status">
          <strong>Status:</strong> {status}
        </div> */}
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={this.props.onSelectValue}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SuggestionEST,getMatchingSuggests);
