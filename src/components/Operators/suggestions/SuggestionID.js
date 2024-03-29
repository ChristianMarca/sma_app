import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import {
	requestIDAction,
	interruptionIdBsAction,
	interruptionProvinceAction,
	interruptionCantonAction,
	interruptionParishAction,
	interruptionCodeAction,
	interruptionBSAction
} from '../../../actions';
import {
	UPDATE_INPUT_VALUE_ID,
	CLEAR_SUGGESTIONS_ID,
	MAYBE_UPDATE_SUGGESTIONS_ID,
	LOAD_SUGGESTIONS_BEGIN_ID
} from '../../../constants';
import { updateInputValue as updateInputValueEST } from './SuggestionEST';

import store from '../../../index';
import '../suggestions.css';

const getMatchingSuggests = (value) => {
	const IDs = store.getState().requestIDReducer.ID.data;
	const escapedValue = escapeRegexCharacters(value.trim());
	if (escapedValue === '') {
		return [];
	}
	const regex = new RegExp('^' + escapedValue, 'i');
	return IDs.filter((language) => regex.test(language.cell_id));
};

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* --------------------------- */
/*    Redux action creators    */
/* --------------------------- */

function loadSuggestions(value) {
	return (dispatch) => {
		dispatch(loadSuggestionsBegin());
		dispatch(maybeUpdateSuggestions(getMatchingSuggests(value), value));
	};
}

export const updateInputValue = (value) => {
	return {
		type: UPDATE_INPUT_VALUE_ID,
		value
	};
};

function clearSuggestions() {
	return {
		type: CLEAR_SUGGESTIONS_ID
	};
}

function loadSuggestionsBegin() {
	return {
		type: LOAD_SUGGESTIONS_BEGIN_ID
	};
}

function maybeUpdateSuggestions(suggestions, value) {
	return {
		type: MAYBE_UPDATE_SUGGESTIONS_ID,
		suggestions,
		value
	};
}

function getSuggestionValue(suggestion) {
	return String(suggestion.cell_id);
}

function renderSuggestion(suggestion) {
	return (
		<span className="renderBox">
			{suggestion.cell_id}~{suggestion.nom_sit}~{suggestion.provincia}~{suggestion.canton}
		</span>
	);
}

function mapStateToProps(state) {
	const { value, suggestions, isLoading } = state.reducerSuggestID;
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
		onChangeTest: (newValue, id_usuario) => {
			dispatch(requestIDAction(newValue, 'cell_id', id_usuario));
			dispatch(updateInputValue(newValue));
			dispatch(interruptionCodeAction(String(newValue)));
		},
		onSuggestionsFetchRequested({ value }) {
			dispatch(loadSuggestions(value));
		},
		onSuggestionsClearRequested() {
			dispatch(clearSuggestions());
		},
		onSelectValue: (event, { suggestion }) => {
			dispatch(updateInputValueEST(suggestion.nom_sit));
			dispatch(interruptionIdBsAction(suggestion.id_bs));
			dispatch(interruptionCodeAction(String(suggestion.cell_id)));
			dispatch(interruptionBSAction(suggestion.nom_sit));
			dispatch(interruptionProvinceAction(suggestion.provincia));
			dispatch(interruptionCantonAction(suggestion.canton));
			dispatch(interruptionParishAction(suggestion.parroquia));
		}
	};
}

const mergeProps = (mapStateToProps, mapDispatchToProps, ownProps) => {
	return {
		...mapStateToProps, // optional
		...mapDispatchToProps, // optional
		onChange: (event, { newValue }) =>
			mapDispatchToProps.onChangeTest(newValue, mapStateToProps.sessionController.id_user)
	};
};

class SuggestionID extends React.Component {
	render() {
		const { value, suggestions, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;
		const inputProps = {
			placeholder: 'Cell ID',
			value,
			onChange
		};
		return (
			<div>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={onSuggestionsFetchRequested}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					onSuggestionSelected={this.props.onSelectValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SuggestionID, getMatchingSuggests);
