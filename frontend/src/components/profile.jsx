import React, { Component } from 'react';
import ActiveStorageProvider from "react-activestorage-provider";
import { API_ROOT } from "../modules/constants";

export class Profile extends Component {
    render() {
        return (
            <form className='login-form'>
                <h3>Account Info</h3>
                <div className="form-group">
                    <ActiveStorageProvider
                        endpoint={{
                            path: '/profile',
                            model: 'User',
                            attribute: 'avatar',
                            method: 'PUT',
                            host: 'localhost:3000',
                            protocol: 'http',
                        }}
                        token = {localStorage.getItem('token')}
                        onSubmit={user => this.setState({ avatar: user.avatar })}
                        render={({ handleUpload, uploads, ready }) => (
                            <div>
                                <input
                                    type="file"
                                    disabled={!ready}
                                    onChange={e => handleUpload(e.currentTarget.files)}
                                />

                                {uploads.map(
                                    upload =>
                                        upload.state === 'waiting' ? (
                                            <p key={upload.id}>Waiting to upload {upload.file.name}</p>
                                        ) : upload.state === 'uploading' ? (
                                            <p key={upload.id}>
                                                Uploading {upload.file.name}: {upload.progress}%
                                            </p>
                                        ) : upload.state === 'error' ? (
                                            <p key={upload.id}>
                                                Error uploading {upload.file.name}: {upload.error}
                                            </p>
                                        ) : (
                                            <p key={upload.id}>Finished uploading {upload.file.name}</p>
                                        )
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input
                        className='form-control'
                        type="text"
                        value={localStorage.getItem('username')}
                        name='username' disabled/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" name='password'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password-confirm">Password confirmation</label>
                    <input className='form-control' type="password" name='password-confirm' />
                </div>
                <input
                    className='btn btn-primary login-btn'
                    type='submit'
                    value='Change password'
                />
            </form>
        )
    }

}
