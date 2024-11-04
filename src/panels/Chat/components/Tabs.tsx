import { useState } from "react";

import { Counter, Div, Group, HorizontalScroll, Tabs, TabsItem } from "@vkontakte/vkui";
import { Icon28BlockOutline, Icon28InfoOutline, Icon28SettingsOutline, Icon28UsersOutline, Icon28UserStarBadgeOutline } from "@vkontakte/icons";

import * as api from '../../../api';
import * as ChatComponents from './';

import { useChatUserPermissions } from "../../../context/ChatUsetPermissionsProvider";

type Props = {
	chatUid: string;
    info: api.Chat.ChatInfo;
};


export const ChatTabs = ({ chatUid, info }: Props) => {
    const rights = useChatUserPermissions();
    const [selected, setSelected] = useState(localStorage.getItem("ChatTabs") || "info");

    const [showHided, setShowVisible] = useState(true);
	const [showPermoment, setShowPermoment] = useState(true);


	const changeTab = (tab: string) => {
		setSelected(tab);
		localStorage.setItem("ChatTabs", tab);
	}

	return (
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
                    changeTab('info');
                }}
            >
                Основная информация
            </TabsItem>
            <TabsItem
                before={<Icon28UsersOutline />}
                status={
                    <Counter mode="inherit" size="s">
                      {info.membersCount ?? ""}
                    </Counter>
                  }
                selected={selected === 'members'}
                id="tab-members"
                aria-controls="tab-content-members"
                onClick={() => {
                    changeTab('members');

                }}
            >
                Участники
            </TabsItem>
			{rights.roles && (
				<TabsItem
					before={<Icon28UserStarBadgeOutline />}
					selected={selected === 'roles'}
					id="tab-roles"
					aria-controls="tab-content-roles"
					onClick={() => {
						changeTab('roles');

					}}
				>
					Роли
				</TabsItem>
			)}
			{rights.settings && (
				<TabsItem
					before={<Icon28SettingsOutline />}
					selected={selected === 'settings'}
					id="tab-settings"
					aria-controls="tab-content-settings"
					onClick={() => {
						changeTab('settings');

					}}
				>
					Настройки
				</TabsItem>
			)}
            
			{rights.banlist && (
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
						changeTab('bans');

					}}
				>
					Блокировки
				</TabsItem>
            )}
        </HorizontalScroll>
        </Tabs>
       
      	{selected === 'info' && (
			<Div id="tab-content-info" aria-labelledby="tab-info" role="tabpanel">
				<ChatComponents.Info info={info}/>
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
		{rights.roles && selected === 'roles' && (
			<Div id="tab-content-roles" aria-labelledby="tab-roles" role="tabpanel">
				<ChatComponents.Roles
					chat={chatUid}
				/>
			</Div>
        )}
        {rights.settings && selected === 'settings' && (
			<Div id="tab-content-settings" aria-labelledby="tab-settings" role="tabpanel">
				<ChatComponents.Settings
					chat={chatUid}
				/>
			</Div>
        )}
        {rights.banlist && selected === 'bans' && (
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
            
        
    );
};
