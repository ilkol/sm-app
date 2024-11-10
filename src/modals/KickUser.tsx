
import { Icon24Dismiss } from '@vkontakte/icons';
import { UserInfo } from '@vkontakte/vk-bridge';
import { RouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { Alert, Button, ButtonGroup, FormItem, Group, Input, ModalPageHeader, PanelHeaderButton, PanelHeaderClose, PlatformType, Spacing } from '@vkontakte/vkui';
import { AdaptiveSizeType } from '@vkontakte/vkui/dist/hooks/useAdaptivityConditionalRender/types';
import { useState } from 'react';

import * as api from '../api';

interface Props
{
	sizeX: AdaptiveSizeType,
	platform: PlatformType,
	routeNavigator: RouteNavigator,

	punisher?: UserInfo
}

export const KickUserModal = ({sizeX, platform, routeNavigator, punisher}: Props) => {
	
	if(!punisher) {
		return;
	}
	const {id: userId } = punisher;
	const chat = useParams<'chat'>()?.chat;
	const user = useParams<'user'>()?.user;
	if(!chat || !user) {
		return;
	}
	const [reason, setReason] = useState<string>('');
		

	return (
		<>
		<ModalPageHeader
				before={
				sizeX.compact &&
				platform === 'android' && (
					<PanelHeaderClose className={sizeX.compact.className} onClick={() => routeNavigator.hideModal()} />
				)
				}
				after={
				platform === 'ios' && (
					<PanelHeaderButton>
					<Icon24Dismiss onClick={() => routeNavigator.hideModal()}/>
					</PanelHeaderButton>
				)
				}
			>
				Исключить пользователя
			</ModalPageHeader>
			<Group>
				<FormItem top="Причина">
					<Input placeholder="Причины исключения" value={reason} onChange={(e) => {
						setReason(e.currentTarget.value);
					}} onFocus={() => {}} />
				</FormItem>
				<Spacing size='2xl' />
				<ButtonGroup align='center' stretched>
				<Button appearance='negative' size='l' onClick={async ()=>{
					const result = await api.Chat.kick(chat, +user, userId, reason);
					console.log(result);
					if(result === true) {
						setTimeout(() => {
							routeNavigator.replace(`/chat/${chat}`);
						}, 100);
						routeNavigator.hideModal();
					}
					else {
						console.error(result);
						let text = "Не удалось исключить пользователя из чата.";
						if(result.error.code === 4) {
							text = "Недостаточно прав, чтобы исключить данного пользователя.";
						}
						routeNavigator.showPopout(
							<Alert 
								actions={[
									{
										title: "Ок",
										mode: 'default'
									}
								]}
								actionsLayout="horizontal"
								dismissButtonMode="inside"
								onClose={() => routeNavigator.hidePopout()}
								header="Произошла ошибка"
								text={text}
							/>
						);
					}
					console.log(result);
				}}>
					Исключить
				</Button>

				</ButtonGroup>
			</Group>
		</>
	);
}