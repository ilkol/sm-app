import { useEffect, useState } from "react";

import { Alert, Cell, CustomScrollView, Div, Header, HorizontalScroll, SelectionControl, Spinner, Switch, Tabs, TabsItem } from "@vkontakte/vkui";
import { Icon20AdvertisingOutline, Icon20CancelCircleOutline, Icon20ClockOutline, Icon20CommunityName, Icon20DocumentStatsOutline, Icon20DoorEnterArrowRightOutline, Icon20HideOutline, Icon20MasksOutline, Icon20StatisticsOutline, Icon20UnlockOutline, Icon20UserSlashOutline } from "@vkontakte/icons";

import * as api from '../../../api';
import * as vk from '../../../vk';

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

	const [selected, setSelected] = useState(localStorage.getItem("ChatSettingsTabs") || "main");
	const changeTab = (tab: string) => {
		setSelected(tab);
		localStorage.setItem("ChatSettingsTabs", tab);
	}

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
			if (result === true) {
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

	const mainSettings: {label: string, icon: React.ReactNode, state: boolean, setting: api.Chat.ChatSettingsField}[] = [
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

	const chartSettings: {label: string, icon: React.ReactNode, state: boolean, setting: api.Chat.ChatSettingsField}[] = [
		{label: "Сообщения", icon: <vk.icons.Icon20MessagesOutline />, state: data.si_messages, setting: 'si_messages'},
		{label: "Смайлы", icon: <vk.icons.Icon20SmileOutline />,  state: data.si_smilies, setting: 'si_smilies'},
		{label: "Стикеры", icon: <vk.icons.Icon20StickerSmileOutline />,  state: data.si_stickers, setting: 'si_stickers'},
		{label: "Пересланные сообщения", icon: <vk.icons.Icon20ArrowTurnRightOutline />, state: data.si_reply, setting: 'si_reply'},
		{label: "Фото", icon: <vk.icons.Icon20ReplyOutline />, state: data.si_photo, setting: 'si_photo'},
		{label: "Видео", icon: <vk.icons.Icon20VoiceOutline />, state: data.si_video, setting: 'si_video'},
		{label: "Файлы", icon: <vk.icons.Icon20PictureOutline />, state: data.si_files, setting: 'si_files'},
		{label: "Голосовые сообщения", icon: <vk.icons.Icon20VideoOutline />, state: data.si_audio, setting: 'si_audio'},
		{label: "Репосты", icon: <vk.icons.Icon20DocumentListOutline />, state: data.si_reposts, setting: 'si_reposts'},
		{label: "Сообщения с матом", icon: <vk.icons.Icon20FireAltOutline />, state: data.si_mats, setting: 'si_mats'},
	];

	return (
		<>
		{alert && <Alert onClose={() => setAlert(null)}>{alert}</Alert>}
		<Tabs
        mode="secondary"
        layoutFillMode="auto"
        withScrollToSelectedTab
        scrollBehaviorToSelectedTab="center"
      >
        <HorizontalScroll arrowSize="m">
            
            <TabsItem
				before={<Icon20CommunityName />}
                selected={selected === 'main'}
                id="tab-main"
                aria-controls="tab-content-main"
                onClick={() => {
                    changeTab('main');
                }}
            >
                Основные
            </TabsItem>
            <TabsItem
				before={<Icon20StatisticsOutline />}
                selected={selected === 'chart'}
                id="tab-chart"
                aria-controls="tab-content-chart"
                onClick={() => {
                    changeTab('chart');
                }}
            >
                Статистики
            </TabsItem>
        </HorizontalScroll>
        </Tabs>
		{selected === "main" && (
			<Div id="tab-content-main" aria-labelledby="tab-main" role="tabpanel">
				{
					mainSettings.map((item) => (
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
					))
				}
			</Div>
		)}
		{selected === "chart" && (
			<Div id="tab-content-chart" aria-labelledby="tab-chart" role="tabpanel">
				<Header mode="secondary">Выберите пункты, которые будут отображенные на графике статистики чата.</Header>
				{
					chartSettings.map((item) => (
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
					))
				}
			</Div>
		)}
		</>
	);
};
