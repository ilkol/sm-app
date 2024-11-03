import { useEffect, useState } from "react";

import { Cell, Checkbox, Counter, CustomScrollView, Div, FormItem, Header, Progress, RichCell, Spinner } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import * as api from '../../../api';

import { NetworkError, Avatar } from "../../../components";
import { useChatUserPermissions } from "../../../context/ChatUsetPermissionsProvider";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";

interface Props {
	setFilterVisible: (val: boolean) => void;
	filterVisible: boolean;
	chat: string;
};

export const Members = ({chat, setFilterVisible, filterVisible}: Props) => {
	const userRigths = useChatUserPermissions();
	const routeNavigator = useRouteNavigator();
	
	const [loading, setMembersLoading] = useState(true);
	const [error, setMembersError] = useState<Error | null>(null);
	const [members, setMembers] = useState<api.Chat.ChatMember[]|null>(null);

	useEffect(() => {
		load();	
  	});

	const load = async() => {
		try {
			const fetcheData = await api.Chat.getMembers(chat);
			setMembers(fetcheData);
		}
		catch(e) {
			if(e instanceof Error) {
				setMembersError(new Error(e.message));
			}
		}
		finally {
			setMembersLoading(false);
		}
	};

	if(loading) {
		return (
			<Spinner />
		);
	}
	if(error || !members) {
		return <NetworkError action={load} error={error?.message}/>;
	}

	let filterBans = members.filter(chat => {
		if (!filterVisible && (chat.name === "" || chat.name.indexOf("DELETED") !== -1)) return false;
		return true;
	});

	return (
		<Div id="tab-content-members" aria-labelledby="tab-members" role="tabpanel">

			<Checkbox
                checked={filterVisible}
                onChange={(e) => setFilterVisible(e.target.checked)}
            >
                Неизвестные пользователи
            </Checkbox>

			<FormItem id="progresslabel" top={<Header mode="tertiary" indicator={<Counter mode="inherit">{filterBans.length} / {members.length} </Counter>}>Показано </Header>}>
				<Progress aria-labelledby="progresslabel" value={filterBans.length / members.length * 100} />
			</FormItem>

			<CustomScrollView
			windowResize={true}
			style={{
				height: 640,
			}}
			>
			{
			filterBans.map((user) => {
				if((user.id === userRigths.user_id && userRigths.selfstats) || (user.id !== userRigths.user_id && userRigths.getstats)) {
					return (
							<RichCell
								key={user.id}
								subhead={user.nick ?? ""}
								onClick={()=>{
									routeNavigator.push(`/chat/${chat}/user/${user.id}`)
								}}
								after={
									<Cell>

										<Icon20ChevronRightOutline />
									</Cell>
								}
								before={
									<Avatar 
										link={user.avatar} 
										title={user.name} 
										id={"" + user.id}
									/>
								} 
								caption={user.roleName}
							>
							{(user.name === "" || user.name.indexOf("DELETED") !== -1) ? "Неизвестный пользователь" : user.name}
							</RichCell>
					)
				} else {
					return (
						<RichCell
							key={user.id}
							subhead={user.nick ?? ""}
							before={
								<Avatar 
									link={user.avatar} 
									title={user.name} 
									id={"" + user.id}
								/>
							} 
							caption={user.roleName}
						>
						{(user.name === "" || user.name.indexOf("DELETED") !== -1) ? "Неизвестный пользователь" : user.name}
						</RichCell>
						)
				}
			})}
			</CustomScrollView>
        </Div>
	);
	

}