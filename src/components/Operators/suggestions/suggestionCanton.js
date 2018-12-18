import React from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import {
  requestAddressAction,
  interruptionCantonAction,
  interruptionProvinceAction
} from '../../../actions';
import {UPDATE_INPUT_VALUE_CANTON,
        CLEAR_SUGGESTIONS_CANTON,
        MAYBE_UPDATE_SUGGESTIONS_CANTON,
        LOAD_SUGGESTIONS_BEGIN_CANTON} from '../../../constants';
import {updateInputValue as updateInputValueProvincia} from './suggestionProvincia';

import store from '../../../index';
import '../suggestions.css';

const getMatchingSuggests=(value)=> {
  const IDs=store.getState().requestAddressReducer.ID.data;
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return IDs.filter(data=> regex.test(data.canton));
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
    type: UPDATE_INPUT_VALUE_CANTON,
    value
  };
}

function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS_CANTON
  };
}

function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN_CANTON
  };
}

function maybeUpdateSuggestions(suggestions, value){
  return {
    type: MAYBE_UPDATE_SUGGESTIONS_CANTON,
    suggestions,
    value
  };
}

function getSuggestionValue(suggestion) {
  return suggestion.canton;
}

function renderSuggestion(suggestion) {
  return (
    <div className="renderBox">{suggestion.canton}~{suggestion.provincia}</div>
  );
}

function mapStateToProps(state,ownProps) {
  const { value, suggestions, isLoading } = state.reducerSuggestCanton;
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
      await dispatch(requestAddressAction(value,"canton",interruptionLevel,interruptionTechnologies,id_usuario));
      await dispatch(loadSuggestions(value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearSuggestions());
    },
    onSelectValue: (event,{suggestion})=> {
      dispatch(interruptionCantonAction(suggestion.canton))
      dispatch(interruptionProvinceAction(suggestion.provincia))
      dispatch(updateInputValueProvincia(suggestion.provincia));    
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

class SuggestionCanton extends React.Component {
  constructor(props){
    super();
  }
  render() {
    const { value, suggestions, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;
    const inputProps = {
      placeholder: "Canton",
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SuggestionCanton,getMatchingSuggests);
