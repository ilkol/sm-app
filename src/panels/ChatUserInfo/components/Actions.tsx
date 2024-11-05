import { CellButton, PanelSpinner } from "@vkontakte/vkui";
import { Icon28BlockOutline, Icon28CancelCircleOutline, Icon28MessageCrossOutline } from "@vkontakte/icons";

import * as api from '../../../api';

import { NetworkError } from '../../../components';
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface Props {
	info: api.Chat.ChatUserStatistics|null;
	isLoading: boolean;
	error: Error | null;
	loadData: () => void;
};

export const Actions = ({info, isLoading, error, loadData}: Props) => {
	if(isLoading) {
		return (
			<PanelSpinner />
		);
	}
	if(error || !info) {
	  return <NetworkError action={loadData} error={error?.message}/>;
	}

	const routeNavigator = useRouteNavigator();

	return (
		<>
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
		</>
	);
}