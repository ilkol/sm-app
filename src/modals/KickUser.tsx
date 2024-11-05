
import { Icon24Dismiss } from '@vkontakte/icons';
import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Button, ButtonGroup, FormItem, Group, Input, ModalPageHeader, PanelHeaderButton, PanelHeaderClose, PlatformType, Spacing } from '@vkontakte/vkui';
import { AdaptiveSizeType } from '@vkontakte/vkui/dist/hooks/useAdaptivityConditionalRender/types';

interface Props
{
	sizeX: AdaptiveSizeType,
	platform: PlatformType,
	routeNavigator: RouteNavigator
}

export const KickUserModal = ({sizeX, platform, routeNavigator}: Props) => {
	
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
					<Input placeholder="Причины исключения" onFocus={() => {}} />
				</FormItem>
				<Spacing size='2xl' />
				<ButtonGroup align='center' stretched>
				<Button appearance='negative' size='l' >
					Исключить
				</Button>

				</ButtonGroup>
			</Group>
		</>
	);
}