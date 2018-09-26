import { Auth } from './Auth'

export const API_ROOT = 'http://localhost:3001';
export const API_WS_ROOT = 'ws://localhost:3001/cable';
export const HEADERS = {
    'Content-Type': 'application/json',
    token: Auth.getToken(),
    'Authorization': `Token ${Auth.getToken()}`,
    Accept: 'application/json',
};