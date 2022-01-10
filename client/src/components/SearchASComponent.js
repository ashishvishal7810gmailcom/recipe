import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { fetchSuggestions } from '../redux/AuthSuggestions/ActionCreators';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { initiateSearches } from '../redux/AuthSuggestions/ActionCreators';
const mapStateToProps = state => {
  return {
    suggestions: state.suggestions,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchSuggestions: (searchTerm) => dispatch(fetchSuggestions(searchTerm)),
  initiateSearches: (searchTerm) => dispatch(initiateSearches(searchTerm))
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
    if(this.props.location.pathname === '/search') {
      this.props.history.push("/search");
    }
    else {
      this.props.history.push("/search");
    }
    this.props.initiateSearches(suggestionValue);
  }
  
  onChange = (event, { newValue, method }) => {
    console.log(newValue)
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
    return suggestion.title;
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
        if(this.props.location.pathname === '/search') {
          this.props.history.push("/search");
        }
        else {
          this.props.history.push("/search");
        }
        this.props.initiateSearches(this.state.value);
        break;
    }
  }


  render() {
    const { value } = this.state;
    const inputProps = {
      placeholder: "Search Courses",
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