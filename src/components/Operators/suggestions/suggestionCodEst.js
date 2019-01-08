import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import {
	requestIDAction,
	interruptionCodeEstAction,
	interruptionProvinceAction,
	interruptionCantonAction,
	interruptionParishAction,
	interruptionIdBsAction,
	interruptionCodeAction,
	interruptionBSAction
} from '../../../actions';
import {
	UPDATE_INPUT_VALUE_COD_EST,
	CLEAR_SUGGESTIONS_COD_EST,
	MAYBE_UPDATE_SUGGESTIONS_COD_EST,
	LOAD_SUGGESTIONS_BEGIN_COD_EST
} from '../../../constants';

import store from '../../../index';
import '../suggestions.css';

const getMatchingSuggests = (value) => {
	const IDs = store.getState().requestIDReducer.ID.data;
	const escapedValue = escapeRegexCharacters(value.trim());
	if (escapedValue === '') {
		return [];
	}
	const regex = new RegExp('^' + escapedValue, 'i');
	return IDs.filter((language) => regex.test(language.cod_est));
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
		type: UPDATE_INPUT_VALUE_COD_EST,
		value
	};
};

function clearSuggestions() {
	return {
		type: CLEAR_SUGGESTIONS_COD_EST
	};
}

function loadSuggestionsBegin() {
	return {
		type: LOAD_SUGGESTIONS_BEGIN_COD_EST
	};
}

function maybeUpdateSuggestions(suggestions, value) {
	return {
		type: MAYBE_UPDATE_SUGGESTIONS_COD_EST,
		suggestions,
		value
	};
}

function getSuggestionValue(suggestion) {
	return suggestion.cod_est;
}

function renderSuggestion(suggestion) {
	return (
		<div className="renderBox">
			{suggestion.cod_est}~{suggestion.cell_id}~{suggestion.provincia}~{suggestion.canton}
		</div>
	);
}

function mapStateToProps(state) {
	const { value, suggestions, isLoading } = state.reducerSuggestCodeEst;
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
		onChange(event, { newValue }) {
			dispatch(updateInputValue(newValue));
		},
		async onSuggestionsFetchRequestedMerge(value, id_usuario) {
			await dispatch(requestIDAction(value, 'cod_est', id_usuario));
			await dispatch(loadSuggestions(value));
		},
		onSuggestionsClearRequested() {
			dispatch(clearSuggestions());
		},
		onSelectValue: (event, { suggestion }) => {
			dispatch(interruptionIdBsAction(suggestion.id_bs));
			dispatch(interruptionCodeAction(String(suggestion.cell_id)));
			dispatch(interruptionCodeEstAction(suggestion.cod_est));
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
		onSuggestionsFetchRequested: ({ value }) =>
			mapDispatchToProps.onSuggestionsFetchRequestedMerge(value, mapStateToProps.sessionController.id_user)
	};
};

class SuggestionCodeEst extends React.Component {
	render() {
		const { value, suggestions, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;
		const inputProps = {
			placeholder: 'Codigo de la Estructura',
			value,
			onChange
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
					inputProps={inputProps}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SuggestionCodeEst, getMatchingSuggests);
