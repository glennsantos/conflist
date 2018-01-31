import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Label, Input } from 'reactstrap';

import { fetchCurrentUser } from './duck';

class ProfileSettings extends Component {
    static propTypes = {
        user: PropTypes.shape({
            data: PropTypes.shape({
                name: PropTypes.string,
                profileImg: PropTypes.string,
            }),
            isFetching: PropTypes.bool,
        }).isRequired,
    };

    render() {
        if (this.props.user.isFetching || this.props.user.isFetching === null) {
            return <p>Loading!</p>;
        }

        return (
            <div className="container mx-auto pt-5 pb-5">
                <div className="bg-white d-flex justify-content-center align-items-center mx-auto profile-card">

                    <Form className=" profile-card__content py-5 mb-0">
                        <div className="d-flex justify-content-center">
                            <img
                                className="mr-3 rounded-circle"
                                src={this.props.user.data.profileImg}
                                width="100"
                                height="100"
                                aria-hidden
                                alt={`${this.props.user.data.name}'s twitter profile picture`}
                            />

                            <div className="d-flex flex-column w-25 justify-content-around">
                                <span className="label">Your Avatar</span>
                                <button className="btn btn-secondary" type="button">Update</button>
                            </div>

                        </div>
                        <hr className="w-100" />

                        <Label
                            for="first-name"
                        >First Name:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100"
                            type="text"
                            name="first-name"
                            placeholder="First name"
                        />

                        <Label
                            className="mt-3"
                            for="last-name"
                        >Last Name:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100"
                            type="text"
                            name="last-name"
                            placeholder="Last name"
                        />

                        <Label
                            className="mt-3"
                            for="email"
                        >Email:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100"
                            type="Email"
                            name="email"
                            placeholder="Email"
                        />

                        <div className="text-center mt-5">
                            <button
                                className="btn btn-primary btn-lg"
                            >
                            Update Settings
                            </button>
                        </div>
                    </Form>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, user }) => {
    return {
        user,
        auth,
    };
};

const mapDispatchToProps = {
    fetchCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
