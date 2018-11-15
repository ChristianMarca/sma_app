import Autosuggest from 'react-autosuggest';
import React from 'react';
import axios from 'axios';

import { API_URL } from "../../config";

class SuggestFields extends React.Component {
  constructor() {
    super();

    this.state = {
      ID: '',
      suggestionsID: [],
      isLoadingID: false,
      Est: '',
      suggestionsEst: [],
      isLoadingEst: false,
      languages : []
    };

    this.lastRequestId = null;
    this.lastRequestEst = null;
  }

  getMatchingFields=(value)=> {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.languages.filter(language => regex.test(language.id) || regex.test(language.est));
  }

  escapeRegexCharacters=(str)=> {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestionID=(suggestion)=> {
    return suggestion.id;
  }

  getSuggestionEst=(suggestion)=> {
    return suggestion.est;
  }

  renderSuggestionID=(suggestion)=> {
    return (
      <span>{suggestion.id}/{suggestion.est}</span>
    );
  }
  renderSuggestionEst=(suggestion)=> {
    return (
      <span>{suggestion.est}/{suggestion.id}</span>
    );
  }

  loadSuggestionsID(value) {
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState({
      isLoadingID: true
    });

    this.setState({
      isLoadingID: false,
      suggestionsID: this.getMatchingFields(value)
    });

  }

  loadSuggestionsEst(value) {
    // Cancel the previous request
    if (this.lastRequestEst !== null) {
      clearTimeout(this.lastRequestEst);
    }

    this.setState({
      isLoadingEst: true
    });

    this.setState({
      isLoadingEst: false,
      suggestionsEst: this.getMatchingFields(value)
    });
  }

  onChangeID = (event, { newValue }) => {
    // newValue.length>=2 && axios.get(`http://192.168.1.102:3000/radioBases?id=${newValue}`)
    newValue.length>=2 && axios.get(`${API_URL}/radioBases?id=${newValue}`)
    .then(resp=>{
      this.setState({languages: resp.data})
    })
    .catch(console.log)
    this.setState({
      ID: String(newValue)
    });
  };

  onChangeEst = (event, { newValue }) => {
    // newValue.length>=2 && axios.get(`http://192.168.1.102:3000/radioBases?est=${newValue}`)
    newValue.length>=2 && axios.get(`${API_URL}/radioBases?est=${newValue}`)
    .then(resp=>{
      this.setState({languages: resp.data})
    })
    .catch(console.log)
    this.setState({
      Est: String(newValue)
    });
  };

  onIDSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestionsID(value);
  };

  onEstSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestionsEst(value);
  };


  onIDSuggestionsClearRequested = () => {
    this.setState({
      suggestionsID: []
    });
  };

  onEstSuggestionsClearRequested = () => {
    this.setState({
      suggestionsEst: []
    });
  };
  onIDSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      Est: suggestion.est
    });
  };
  onEstSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      ID: String(suggestion.id)
    });
  };

  render() {
    const { ID, suggestionsID, isLoadingID,Est,suggestionsEst,isLoadingEst } = this.state;
    const inputPropsID = {
      placeholder: "Type 'c'",
      value:ID,
      onChange: this.onChangeID
    };
    const inputPropsEst = {
      placeholder: "Type 'c'",
      value:Est,
      onChange: this.onChangeEst
    };
    const statusID = (isLoadingID ? 'Loading...' : 'Type to load suggestions');
    const statusCode_Est = (isLoadingEst ? 'Loading...' : 'Type to load suggestions');

    return (
      <div>
        <div className="status">
          <strong>Status:</strong> {statusID}
        </div>
        <Autosuggest
          suggestions={suggestionsID}
          onSuggestionsFetchRequested={this.onIDSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onIDSuggestionsClearRequested}
          onSuggestionSelected={this.onIDSuggestionSelected}
          getSuggestionValue={this.getSuggestionID}
          renderSuggestion={this.renderSuggestionID}
          inputProps={inputPropsID} />
        <div className="status">
          <strong>Status:</strong> {statusCode_Est}
        </div>
        <Autosuggest
          suggestions={suggestionsEst}
          onSuggestionsFetchRequested={this.onEstSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onEstSuggestionsClearRequested}
          onSuggestionSelected={this.onEstSuggestionSelected}
          getSuggestionValue={this.getSuggestionEst}
          renderSuggestion={this.renderSuggestionEst}
          inputProps={inputPropsEst} />
      </div>
    );
  }
}

export default SuggestFields;