import { useEffect, useState } from "react";

import { Alert, Cell, CustomScrollView, SelectionControl, Spinner, Switch } from "@vkontakte/vkui";
import { Icon20AdvertisingOutline, Icon20CancelCircleOutline, Icon20ClockOutline, Icon20DocumentStatsOutline, Icon20DoorEnterArrowRightOutline, Icon20HideOutline, Icon20MasksOutline, Icon20UnlockOutline, Icon20UserSlashOutline } from "@vkontakte/icons";

import * as api from '../../../api';

import { NetworkError } from "../../../components";
import { useChatUserPermissions } from "../../../context/ChatUsetPermissionsProvider";

type Props = {
	chat: string;
};


export const Settings = ({ chat }: Props) => {

	const userRights = useChatUserPermissions();

	const [loadig, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [data, setSettings] = useState<api.Chat.ChatSettings|null>(null);
	const [alert, setAlert] = useState<string | null>(null);

	useEffect(() => {
		load();		
	});

	const load = async() => {
		try {
			const fetcheData = await api.Chat.getSettings(chat);
			setSettings(fetcheData);
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

	const updateSetting = async (setting: api.Chat.ChatSettingsField, value: boolean) => {
		try {
			const result = await api.Chat.setSetting(chat, userRights.user_id, setting, value);
			if (result) {
				setSettings((prevData) => {
					if (prevData) {
						return { ...prevData, [setting]: value };
					}
					return prevData;
				});
			} else {
				setAlert("Не удалось обновить настройку. Пожалуйста, попробуйте еще раз.");
			}
		} catch (error) {
			setAlert("Произошла ошибка. Попробуйте еще раз.");
		}
		await api.Chat.setSetting(chat, userRights.user_id, setting, value);
	}

	if(loadig) {
		return (
			<CustomScrollView
				windowResize={true}
				style={{
					height: 320,
				}}
			>
				<Spinner />
			</CustomScrollView>
		)
	}
	if(error || !data) {
	  return <NetworkError action={() => load()}/>;
	}

	const settings: {label: string, icon: React.ReactNode, state: boolean, setting: api.Chat.ChatSettingsField}[] = [
		{label: "Оповещение о новостях", icon: <Icon20AdvertisingOutline />, state: data.toggleFeed, setting: 'togglefeed'},
		{label: "Меню при исключении пользователя", icon: <Icon20CancelCircleOutline />,  state: data.kickMenu, setting: 'kickmenu'},
		{label: "Меню при выходе участника", icon: <Icon20DoorEnterArrowRightOutline />,  state: data.leaveMenu, setting: 'leavemenu'},
		{label: "Скрытие бывших участников из топа", icon: <Icon20HideOutline />, state: data.hideUsers, setting: 'hideusers'},
		{label: "Замена имени и фамилии участников на ник", icon: <Icon20MasksOutline />, state: data.nameType, setting: 'nameType'},
		{label: "Оповещение об окончании срока блокировки", icon: <Icon20ClockOutline />, state: data.unPunishNotify, setting: 'unPunishNotify'},
		{label: "Изменении роли участника при исключении", icon: <Icon20UserSlashOutline />, state: data.unRoleAfterKick, setting: 'unRoleAfterKick'},
		{label: "Снятие блокировке при добавлении администратором", icon: <Icon20UnlockOutline />, state: data.autounban, setting: 'autounban'},
		{label: "Отображение уровня роли в статистике", icon: <Icon20DocumentStatsOutline />, state: data.roleLevelStats, setting: 'roleLevelStats'},
	];

	return settings.map((item) => (
		<>
		{alert && <Alert onClose={() => setAlert(null)}>{alert}</Alert>}
		<SelectionControl key={item.label}>
			<SelectionControl.Label>
				<Cell before={item.icon}>
					{item.label}
				</Cell>
			</SelectionControl.Label>
			<Switch 
				checked={item.state} 
				onChange={() => updateSetting(item.setting as api.Chat.ChatSettingsField, !item.state)}/>
		</SelectionControl>
		</>
	));
};
