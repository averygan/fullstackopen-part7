import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.payload
		case 'UNSET_NOTIFICATION':
			return ''
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, dispatch] = useReducer(notificationReducer, '');

  const setNotification = (message) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message });
    setTimeout(() => {
      dispatch({ type: 'UNSET_NOTIFICATION' });
    }, 5000);
	}

	return (
		<NotificationContext.Provider value={[notification, setNotification]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext