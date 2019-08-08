import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history
}) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        });
    }, [loading, getCurrentProfile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        //githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Edit Your Profile</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Add some changes to your profile
      </p>
            <small>* = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <select name='status' value={status} onChange={e => onChange(e)}>
                        <option value="0">* What best describes your relationship</option>
                        <option value="Developer">Dependent Spouse</option>
                        <option value="Junior Developer">Dependent child</option>
                        <option value="Senior Developer">Girlfriend/Boyfriend</option>
                        <option value="Manager">Brother/Sister</option>
                        <option value="Student or Learning">Grandparent</option>
                        <option value="Instructor">Aunt/Uncle</option>
                        <option value="Intern">Neice/Nephew</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className='form-text'>
                        Describe your relationship
          </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Branch'
                        name='company'
                        value={company}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Enter the branch of service
          </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Unit'
                        name='website'
                        value={website}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Enter the current Unit i.e. 3rd Infantry Division, 11th Marine Regiment etc.
          </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Your Location'
                        name='location'
                        value={location}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        City & state suggested (eg. Boston, MA)
          </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Interests'
                        name='skills'
                        value={skills}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Please use comma separated values (eg.
                Running, Watching movies, Swimming etc.)
          </small>
                </div>
                {/* <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Github Username'
                        name='githubusername'
                        value={githubusername}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        If you want your latest repos and a Github link, include your
                        username
          </small>
                </div> */}
                <div className='form-group'>
                    <textarea
                        placeholder='A short bio of yourself'
                        name='bio'
                        value={bio}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Tell us a little about yourself</small>
                </div>

                <div className='my-2'>
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type='button'
                        className='btn btn-light'
                    >
                        Add Social Network Links
          </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && (
                    <Fragment>
                        <div className='form-group social-input'>
                            <i className='fab fa-twitter fa-2x' />
                            <input
                                type='text'
                                placeholder='Twitter URL'
                                name='twitter'
                                value={twitter}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-facebook fa-2x' />
                            <input
                                type='text'
                                placeholder='Facebook URL'
                                name='facebook'
                                value={facebook}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-youtube fa-2x' />
                            <input
                                type='text'
                                placeholder='YouTube URL'
                                name='youtube'
                                value={youtube}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-linkedin fa-2x' />
                            <input
                                type='text'
                                placeholder='Linkedin URL'
                                name='linkedin'
                                value={linkedin}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-instagram fa-2x' />
                            <input
                                type='text'
                                placeholder='Instagram URL'
                                name='instagram'
                                value={instagram}
                                onChange={e => onChange(e)}
                            />
                        </div>
                    </Fragment>
                )}

                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
        </Link>
            </form>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
)(withRouter(EditProfile));