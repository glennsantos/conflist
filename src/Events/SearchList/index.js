import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../Event';
import EventsList from '../List';
import { getEventsByTag } from './duck';
import { fetchWishListIfNeeded } from '../WishList/duck';

class SearchList extends Component {
    static propTypes = {
        searchTag: PropTypes.string.isRequired,
        getEventsByTag: PropTypes.func.isRequired,
        wishListData: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        searchList: PropTypes.shape({
            isFetching: PropTypes.bool,
            error: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        }).isRequired,
        wishList: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            isFetching: PropTypes.bool,
        }),
        authToken: PropTypes.string,
        fetchWishListIfNeeded: PropTypes.func,
    };

    static defaultProps = {
        wishListData: [],
        wishList: {},
        authToken: '',
        fetchWishListIfNeeded: () => {},
    };

    componentDidMount() {
        this.props.getEventsByTag(this.props.searchTag);
        this.props.fetchWishListIfNeeded(this.props.authToken);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchTag !== this.props.searchTag) {
            this.props.getEventsByTag(nextProps.searchTag);
        }
    }

    render() {
        const { isFetching, error, data } = this.props.searchList;

        if (isFetching || isFetching === null) {
            return <div>Loading!</div>;
        }

        if (this.props.authToken) {
            if (this.props.wishList.isFetching || this.props.wishList.isFetching === null) {
                return <div>Loading!</div>;
            }
        }

        if (error !== null) {
            return <div>Error with status {this.props.searchList.error} </div>;
        }

        const wishList = this.props.wishListData.length === 0 ?
            this.props.wishList.data : this.props.wishListData;

        return (
            <div>
                <h2
                    className="text-center mt-5"
                >Search results for {this.props.searchTag}:
                </h2>
                <EventsList
                    events={data || undefined}
                    wishList={wishList}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ searchList, wishList, auth }, { location }) => {
    const pathnameArray = location.pathname.split('/');

    return {
        authToken: auth.token,
        searchList,
        searchTag: pathnameArray[pathnameArray.length - 1],
        wishListData: location.state.wishList,
        wishList,
    };
};

const mapDispatchToProps = {
    getEventsByTag,
    fetchWishListIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
