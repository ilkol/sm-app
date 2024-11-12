
import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AdaptiveSizeType } from '@vkontakte/vkui/dist/hooks/useAdaptivityConditionalRender/types';
import { BlockModal } from './BlockModal';
import { PlatformType } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

interface Props
{
	sizeX: AdaptiveSizeType,
	platform: PlatformType,
	routeNavigator: RouteNavigator;

	punisher?: UserInfo;
}

export const BanUserModal = ({sizeX, platform, routeNavigator, punisher}: Props) => {
	
	return (
		<BlockModal 
			sizeX={sizeX}
			platform={platform}
			routeNavigator={routeNavigator}
			title='Заблокировать пользователя'
			buttonLabel='Заблокировать'
			punisher={punisher}
			onSubmit={(chat, punisher, user, time, reason) => {
				console.log(chat, punisher, user, time, reason);
			}}
		/>
	);
}