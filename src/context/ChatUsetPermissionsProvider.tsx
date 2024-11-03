import * as React from 'react';

import * as api from '../api';
import { NetworkError } from '../components';
import { Group, PanelSpinner } from '@vkontakte/vkui';


const ChatUserPermissionsContext = React.createContext<api.Chat.ChatUserRights>({
    user_id: 0,
    chat_id: 0,
    
    banlist: false,
    help: false,
    roles: false,
    settings: false
});

interface Props {
	children: React.ReactNode,
    chatid: string;
    userid: number;
}
export const ChatUsetPermissionsProvider = ({children, chatid, userid}: Props): React.ReactNode => {

    const [loadingRights, setRightsLoading] = React.useState(true);
	const [rights, setRights] = React.useState<api.Chat.ChatUserRights | null>(null);
	const [rightsError, setRightsError] = React.useState<Error | null>(null);

    React.useEffect(() => {

        loadRights();
        	
  	}, [chatid]);

    const loadRights = async() => {
		try {
			const fetcheData = await api.Chat.getMemberRights(chatid, userid);
			setRights(fetcheData);
		}
		catch(e) {
			if(e instanceof Error) {
				setRightsError(new Error(e.message));
			}
		}
		finally {
			setRightsLoading(false);
		}
	};

    if(loadingRights) {
		return (
            <Group>
                <PanelSpinner />
            </Group>
		);
	}
	if(rightsError || !rights) {
		return (
            <Group>
                <NetworkError action={loadRights} error={rightsError?.message}/>
            </Group>
		);
	}

	return (
        <ChatUserPermissionsContext.Provider value={rights}>
            {children}
        </ChatUserPermissionsContext.Provider>
	);
};

export const useChatUserPermissions = () => React.useContext(ChatUserPermissionsContext);