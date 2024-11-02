import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  HorizontalScroll,
  TabsItem,
  Tabs,
  Group,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon28InfoOutline, } from '@vkontakte/icons';

import * as api from '../../api';
import { Info, Stats } from './components';

export interface Props extends NavIdProps {
  fetchedUser?: UserInfo;
};

export const ChatUserInfo: FC<Props> = ({ id }) => {
	const routeNavigator = useRouteNavigator();
	const [selected, setSelected] = useState('info');

  	let chatUid = useParams<'chat'>()?.chat;
  	let userId  = useParams<'user'>()?.user;
	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [stats, setStats] = useState<api.Chat.ChatUserStatistics|null>(null);

	useEffect(() => {
	
		if (chatUid === undefined || userId === undefined) {
	
		}
		else {
			loadStats(chatUid, +userId);
		}
		
	}, [chatUid, routeNavigator]);

	if(chatUid === undefined || userId === undefined) {
		return;
	}

	const loadStats = async(chatUid: string, userId: number) => {
		try {
			const fetcheData = await api.Chat.getMemberStats(chatUid, +userId);
			setStats(fetcheData);
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

	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
				Участник чата
			</PanelHeader>
			<Group>
				<Info info={stats} loadData={() => loadStats(chatUid, +userId)} isLoading={loading} error={error}/>
			</Group>
			<Group>
				<Tabs
					mode="default"
					layoutFillMode="auto"
					withScrollToSelectedTab
					scrollBehaviorToSelectedTab="center"
				>
					<HorizontalScroll arrowSize="m">
						
						<TabsItem
							before={<Icon28InfoOutline />}
							selected={selected === 'info'}
							id="tab-info"
							aria-controls="tab-content-info"
							onClick={() => {
								setSelected('info');
							}}
						>
							Статистика
						</TabsItem>

						
					</HorizontalScroll>
				</Tabs>
				{selected === 'info' && (
					<Stats info={stats} loadData={() => loadStats(chatUid, +userId)} isLoading={loading} error={error}/>
				)}
			</Group>
		</Panel>
	);
};
