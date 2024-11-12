import { CellButton, FormItem, Header, PanelSpinner, Select, Separator } from "@vkontakte/vkui";
import { Icon28BlockOutline, Icon28CancelCircleOutline, Icon28MessageCrossOutline } from "@vkontakte/icons";

import * as api from '../../../api';

import { NetworkError } from '../../../components';
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useEffect, useState } from "react";

interface Props {
	info: api.Chat.ChatUserStatistics|null;
	isLoadingInfo: boolean;
	errorInfo: Error | null;
	loadInfo: () => void;
};

export const Actions = ({info, isLoadingInfo, errorInfo, loadInfo}: Props) => {
	const chat = useParams<'chat'>()?.chat;
	if(!chat || !info)
	{
		return (
			<PanelSpinner />
		);
	}

	useEffect(() => {
	
		if (chat === undefined) {
	
		}
		else {
			loadRoles(chat);
		}
		
	}, [chat]);


	const [roles, setRoles] = useState<api.Chat.Role[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [role, setRole] = useState<number>(info.role);

	const loadRoles = async(chatUid: string) => {
		try {
			const fetcheData = await await api.Chat.getRoles(chatUid);
			setRoles(fetcheData);
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
	if(loading || isLoadingInfo) {
		return (
			<PanelSpinner />
		);
	}
	if(error) {
	  return <NetworkError action={() => {loadRoles(chat)}} error={error?.message}/>;
	}
	else if(errorInfo) {
		return <NetworkError action={loadInfo} error={errorInfo?.message}/>;
	}

	const roleOption = roles.map((val) => {
		return {
			label: val.name,
			value: val.level,
			disabled: val.level === 100
		}
	});

	const routeNavigator = useRouteNavigator();

	return (
		<>
			<Header mode='secondary'>Быстрые наказания</Header>
			<CellButton
				mode="danger"
				before={<Icon28MessageCrossOutline />}
				onClick={() => {
					routeNavigator.showModal('muteUser_modal');
				}}
			>
				Запретить писать в чате
			</CellButton>
			<CellButton 
				mode="danger"
				before={<Icon28BlockOutline />}
				onClick={() => {
					routeNavigator.showModal('kickUser_modal');
				}}
			>
				Исключить из чата
			</CellButton >
			<CellButton
				mode="danger"
				before={<Icon28CancelCircleOutline />}
				onClick={() => {
					routeNavigator.showModal('banUser_modal');
				}}
			>
				Заблокировать в чате
			</CellButton>
			<Separator />
			<Header mode='secondary'>Роль</Header>
			<FormItem>
				<Select 
					options={roleOption} 
					defaultValue={info.role} 
					value={role} 
					onChange={(e) => {
						setRole(+e.currentTarget.value);
					}}
				/>
			</FormItem>
		</>
	);
}