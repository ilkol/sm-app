import { FC, useEffect, useState } from 'react';

import { Counter, Div, Group, HorizontalScroll, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Tabs, TabsItem } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon28BlockOutline, Icon28InfoOutline, Icon28SettingsOutline, Icon28UsersOutline, Icon28UserStarBadgeOutline } from '@vkontakte/icons';

import * as api from '../../api';
import * as ChatComponents from './components';

export const Chat: FC<NavIdProps> = ({ id }) => {
	const routeNavigator = useRouteNavigator();
	const params = useParams<'chat'>();
	const [selected, setSelected] = useState('info');

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [info, setInfo] = useState<api.Chat.ChatInfo|null>(null);

	const [showHided, setShowVisible] = useState(true);
	const [showPermoment, setShowPermoment] = useState(true);

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



  	return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace("/")} />}>
        Управление чатом
      </PanelHeader>
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
                Основная информация
            </TabsItem>
            <TabsItem
                before={<Icon28UsersOutline />}
                status={
                    <Counter mode="inherit" size="s">
                      {info?.membersCount ?? ""}
                    </Counter>
                  }
                selected={selected === 'members'}
                id="tab-members"
                aria-controls="tab-content-members"
                onClick={() => {
                    setSelected('members');

                }}
            >
                Участники
            </TabsItem>
			<TabsItem
                before={<Icon28UserStarBadgeOutline />}
                selected={selected === 'roles'}
                id="tab-roles"
                aria-controls="tab-content-roles"
                onClick={() => {
                    setSelected('roles');

                }}
            >
                Роли
            </TabsItem>
            <TabsItem
                before={<Icon28SettingsOutline />}
                selected={selected === 'settings'}
                id="tab-settings"
                aria-controls="tab-content-settings"
                onClick={() => {
                    setSelected('settings');

                }}
            >
                Настройки
            </TabsItem>
            <TabsItem
                before={<Icon28BlockOutline />}
                status={
                    <Counter mode="prominent" size="s">
						{info?.bannedUsersCount ?? "0"}
                    </Counter>
                }

                selected={selected === 'bans'}
                id="tab-bans"
                aria-controls="tab-content-bans"
                onClick={() => {
                    setSelected('bans');

                }}
            >
                Блокировки
            </TabsItem>
            
        </HorizontalScroll>
        </Tabs>
      
      	{selected === 'info' && (
			<Div id="tab-content-info" aria-labelledby="tab-info" role="tabpanel">
				<ChatComponents.Info info={info} loadData={() => loadInfo()} isLoading={loading} error={error}/>
			</Div>
        )}
        {selected === 'members' && (
			<Div id="tab-content-members" aria-labelledby="tab-members" role="tabpanel">
				<ChatComponents.Members
					chat={chatUid}
					setFilterVisible={setShowVisible} 
					filterVisible={showHided} 
				/>
			</Div>
        )}
		{selected === 'roles' && (
			<Div id="tab-content-roles" aria-labelledby="tab-roles" role="tabpanel">
				<ChatComponents.Roles
					chat={chatUid}
				/>
			</Div>
        )}
        {selected === 'settings' && (
			<Div id="tab-content-settings" aria-labelledby="tab-settings" role="tabpanel">
				<ChatComponents.Settings
					chat={chatUid}
				/>
			</Div>
        )}
        {selected === 'bans' && (
			<Div id="tab-content-bans" aria-labelledby="tab-bans" role="tabpanel">
				<ChatComponents.BannedUsers
					chat={chatUid}
					setFilterVisible={setShowVisible} 
					filterVisible={showHided} 
					setFilterPermanent={setShowPermoment}
					filterPermanent={showPermoment}
				/>
			</Div>
        )}
      </Group>  
    </Panel>
  );
};
