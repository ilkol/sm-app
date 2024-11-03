import { useEffect, useState } from "react";

import { Cell, CustomScrollView, SelectionControl, Spinner, Switch } from "@vkontakte/vkui";
import { Icon20AdvertisingOutline, Icon20CancelCircleOutline, Icon20ClockOutline, Icon20DocumentStatsOutline, Icon20DoorEnterArrowRightOutline, Icon20HideOutline, Icon20MasksOutline, Icon20UnlockOutline, Icon20UserSlashOutline } from "@vkontakte/icons";

import * as api from '../../../api';

import { NetworkError } from "../../../components";

type Props = {
	chat: string;
};


export const Settings = ({ chat }: Props) => {

	const [loadig, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [data, setSettings] = useState<api.Chat.ChatSettings|null>(null);

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

	const settings = [
		{label: "Оповещение о новостях", icon: <Icon20AdvertisingOutline />, state: data.toggleFeed},
		{label: "Меню при исключении пользователя", icon: <Icon20CancelCircleOutline />,  state: data.kickMenu},
		{label: "Меню при выходе участника", icon: <Icon20DoorEnterArrowRightOutline />,  state: data.leaveMenu},
		{label: "Скрытие бывших участников из топа", icon: <Icon20HideOutline />, state: data.hideUsers},
		{label: "Замена имени и фамилии участников на ник", icon: <Icon20MasksOutline />, state: data.nameType},
		{label: "Оповещение об окончании срока блокировки", icon: <Icon20ClockOutline />, state: data.unPunishNotify},
		{label: "Изменении роли участника при исключении", icon: <Icon20UserSlashOutline />, state: data.unRoleAfterKick},
		{label: "Снятие блокировке при добавлении администратором", icon: <Icon20UnlockOutline />, state: data.autounban},
		{label: "Отображение уровня роли в статистике", icon: <Icon20DocumentStatsOutline />, state: data.roleLevelStats},
	];

	return settings.map((item) => (
		<SelectionControl key={item.label}>
			<SelectionControl.Label>
				<Cell before={item.icon}>
					{item.label}
				</Cell>
			</SelectionControl.Label>
			<Switch defaultChecked={item.state} disabled/>
		</SelectionControl>
	));
};
