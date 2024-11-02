import { FC } from 'react';
import {
	Panel,
	PanelHeader,
	Header,
	Group,
	NavIdProps,
	Separator,
	Spacing,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

import { ChatsList, StatsPanel } from './components';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
 	const { id: userId } = { ...fetchedUser };

  	// const userId = 541715965;
	if(!userId) {
		return null;
	}
 
  	return (
		<Panel id={id}>
			<PanelHeader>Управление чатами</PanelHeader>
			<Group header={<Header mode="secondary">Чаты с подключенным ботом</Header>}>
				<ChatsList userId={userId} />
			
				<Spacing size={24}>
					<Separator />
				</Spacing>

				<Header mode='secondary'>Статистика за сегодня</Header>
				<StatsPanel userId={userId} />
			</Group>
		</Panel>
	);
};
