import React from 'react';

// the glue between react and redux
import { connect } from 'react-redux';

import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends React.Component {
	renderList() {
		return this.props.books.map((book) => {
			return (
				<li
					key={book.title}
					onClick={() => this.props.selectBook(book)}
					className="list-group-item">
					{book.title}
				</li>
			)
		})
	}

	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		)
	}
}

function mapStateToProps(state) {
	// whatever is returned here will show up as 'props' inside of BookList
	// ... and therefore available to component as 'this.props'
	return {
		books: state.books
	};
}

// Anything returned from this function will end up as 'props'
// on the BookList container
// here we are 'wiring up' the actions, so to speak
function mapDispatchToProps(dispatch) {
	// whenever selectBook is called, the result should be passed
	// to all of our reducers
	// gotta write it like this so you can call 'this.props.selectBook'
	return bindActionCreators({ selectBook: selectBook }, dispatch);
}

// Promote BookList from a component to a container – it needs to know
// about this new dispatch method, 'selectBook'. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);