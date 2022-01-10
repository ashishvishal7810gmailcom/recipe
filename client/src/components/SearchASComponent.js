import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { fetchSuggestions } from '../redux/AuthSuggestions/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

const mapStateToProps = state => {
  return {
    suggestions: state.suggestions
  }
}

const mapDispatchToProps = (dispatch) => ({
fetchSuggestions: (searchTerm) => dispatch(fetchSuggestions(searchTerm))
});



class SearchAS extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    autoBind(
      this,
      'getSuggestionValue',
      'renderSuggestion',
      'onSuggestionSelected',
      'handleKeyDown'
    );
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
    if(this.props.location.pathname === '/addusers') {
      // alert("already at /addusers");
    }
    else {
      this.props.history.push("/addusers");
    }
    this.props.fetchSearches(suggestionValue);
  }
  
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };


  onSuggestionsFetchRequested = ({ value }) => {
    this.props.fetchSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // bug here, initially there is true value which tries to fetch true as search term
  getSuggestionValue= (suggestion) => {
    return suggestion.username;
  }

  renderSuggestion= (suggestion, { query }) => {
    const suggestionText = suggestion.title;
    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);
  
    return (
        <span className="suggestion-content">
          <span className="name">
            {
              parts.map((part, index) => {
                const className = part.highlight ? 'highlight' : null;
                return (
                  // <span><img src=''/><span>
                  <span className={className} key={index}>{part.text}</span>
                );
              })
            }
          </span>
        </span>      
      
    );
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        if(this.props.location.pathname === '/addusers') {
          // alert("already at /addusers");
        }
        else {
          this.props.history.push("/addusers");
        }
        this.props.fetchSearches(this.state.value);
        break;
    }
  }


  render() {
    const { value } = this.state;
    const inputProps = {
      placeholder: "Search User",
      value,
      onChange: this.onChange
    };

    const renderInputComponent = inputProps => (
      <div>
        <input {...inputProps} 
          onKeyPress={this.handleKeyDown}
        />
        
      </div>
    );


    return (
      <React.Fragment>
          <Autosuggest 
        suggestions={this.props.suggestions.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} 
        onSuggestionSelected={this.onSuggestionSelected}
        // highlightFirstSuggestion='true'
        renderInputComponent={renderInputComponent}
        />
      </React.Fragment>
      
      
    );
  }
}
  
// export default SearchAS;  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchAS));
