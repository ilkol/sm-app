
import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AdaptiveSizeType } from '@vkontakte/vkui/dist/hooks/useAdaptivityConditionalRender/types';
import { BlockModal } from './BlockModal';
import { PlatformType } from '@vkontakte/vkui';

interface Props
{
	sizeX: AdaptiveSizeType,
	platform: PlatformType,
	routeNavigator: RouteNavigator
}

export const BanUserModal = ({sizeX, platform, routeNavigator}: Props) => {
	
	return (
		<BlockModal 
			sizeX={sizeX}
			platform={platform}
			routeNavigator={routeNavigator}
			title='Заблокировать пользователя'
			buttonLabel='Заблокировать'
		/>
	);
}