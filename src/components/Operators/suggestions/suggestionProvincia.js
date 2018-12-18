import React from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import {
  requestAddressAction,
  interruptionProvinceAction,
} from '../../../actions';
import {UPDATE_INPUT_VALUE_PROVINCE,
  CLEAR_SUGGESTIONS_PROVINCE,
MAYBE_UPDATE_SUGGESTIONS_PROVINCE,
LOAD_SUGGESTIONS_BEGIN_PROVINCE} from '../../../constants';

import store from '../../../index';
import '../suggestions.css';

const getMatchingSuggests=(value)=> {
  const IDs=store.getState().requestAddressReducer.ID.data;
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return IDs.filter(data=> regex.test(data.provincia));
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
    type: UPDATE_INPUT_VALUE_PROVINCE,
    value
  };
}

function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS_PROVINCE
  };
}

function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN_PROVINCE
  };
}

function maybeUpdateSuggestions(suggestions, value){
  return {
    type: MAYBE_UPDATE_SUGGESTIONS_PROVINCE,
    suggestions,
    value
  };
}

function getSuggestionValue(suggestion) {
  return suggestion.provincia;
}

function renderSuggestion(suggestion) {
  return (
    <div className="renderBox">{suggestion.provincia}</div>
  );
}

function mapStateToProps(state,ownProps) {
  const { value, suggestions, isLoading } = state.reducerSuggestProvincia;
  return {
    value,
    suggestions,
    isLoading,
    searchID: state.requestIDReducer.ID,
    isPendingID: state.requestIDReducer.isPendingID,
    errorID: state.requestIDReducer.errorID,
    estructuras: state.requestIDReducer.ID.data,
    interruptionLevel: state.interruptionAddressReducer.interruptionLevel,
    interruptionTechnologies: state.interruptionTechnologiesReducer.interruptionTechnologies,
    sessionController: state.sessionReducer.dataUser,
    isLockField: ownProps.isLockField
  };
}

function mapDispatchToProps(dispatch) {

  return {
    onChange(event, { newValue }) {
      dispatch(updateInputValue(newValue));
    },
    async onSuggestionsFetchRequestedMerge(value,interruptionLevel,interruptionTechnologies,id_usuario) {
      await dispatch(requestAddressAction(value,"provincia",interruptionLevel,interruptionTechnologies,id_usuario));
      await dispatch(loadSuggestions(value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearSuggestions());
    },
    onSelectValue: (event,{suggestion})=> {
      dispatch(interruptionProvinceAction(suggestion.provincia))
    }
  };
}

const mergeProps = (mapStateToProps,mapDispatchToProps, ownProps) => {
  return {
    ...mapStateToProps,  // optional
    ...mapDispatchToProps,  // optional
    onSuggestionsFetchRequested:({ value })=>(
      mapDispatchToProps.onSuggestionsFetchRequestedMerge(
        value,
        mapStateToProps.interruptionLevel,
        mapStateToProps.interruptionTechnologies,
        mapStateToProps.sessionController.id_user
      )
    )
  }
}

class SuggestionProvince extends React.Component {
  render() {
    const { value, suggestions, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;
    const inputProps = {
      placeholder: "Provincia",
      value,
      onChange,
      disabled: this.props.isLockField
    };
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SuggestionProvince,getMatchingSuggests);
