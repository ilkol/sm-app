import { FC, useEffect, useState } from 'react';

import { Group, NavIdProps, Panel, PanelHeader, PanelHeaderBack, PanelSpinner } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import * as api from '../../api';
import * as ChatComponents from './components';

import { UserInfo } from '@vkontakte/vk-bridge';
import { NetworkError } from '../../components';
import { ChatUsetPermissionsProvider } from '../../context/ChatUsetPermissionsProvider';


export interface ChatProps extends NavIdProps {
	fetchedUser?: UserInfo;
  }

export const Chat: FC<ChatProps> = ({ id, fetchedUser }) => {
	const { id: userId } = { ...fetchedUser };
	if(!userId) {
		return null;
	}

	const routeNavigator = useRouteNavigator();
	const params = useParams<'chat'>();
	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [info, setInfo] = useState<api.Chat.ChatInfo|null>(null);


	const chatUid = params?.chat;

	useEffect(() => {

		if (chatUid === undefined) {
			routeNavigator.replace("/");
		}
		else {
			loadInfo();
			
		}
	
  	}, [chatUid, routeNavigator]);

	if (chatUid === undefined) {
		return null;
	}

	const loadInfo = async() => {
		try {
			const fetcheData = await api.Chat.getInfo(chatUid);
			setInfo(fetcheData);
		}
		catch(e) {
			if(e instanceof Error) {
				setError(new Error(e.message));
			}
		}
		finally {
			setLoading(false);
		}
	};

	if(loading) {
		return (
			<Panel id={id}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace("/")} />}>
					Управление чатом
				</PanelHeader>
				<Group>
						<PanelSpinner />
				</Group>
			</Panel>
		);
	}
	if(error || !info) {
		return (
			<Panel id={id}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace("/")} />}>
					Управление чатом
				</PanelHeader>
				<Group>
					<NetworkError action={loadInfo} error={error?.message}/>
				</Group>
			</Panel>
		);
	}
	

  	return (
    <Panel id={id}>
      	<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace("/")} />}>
        	Управление чатом
      	</PanelHeader>
	  	<ChatUsetPermissionsProvider chatid={chatUid} userid={userId}>
			<ChatComponents.ChatTabs info={info} chatUid={chatUid} />
		</ChatUsetPermissionsProvider>
    </Panel>
  );
};
