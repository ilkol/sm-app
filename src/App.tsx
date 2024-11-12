import { useState, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ModalRoot, } from '@vkontakte/vkui';
import { useActiveVkuiLocation, usePopout, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { Home, Chat, ChatUserInfo } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { BanUserModal, KickUserModal, MuteUserModal } from './modals';

import { ModalPage, useAdaptivityConditionalRender, usePlatform } from '@vkontakte/vkui';



export const App = () => {
	const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
	const [fetchedUser, setUser] = useState<UserInfo | undefined>();
	const routeNavigator = useRouteNavigator();
	const popout = usePopout();


	useEffect(() => {
		async function fetchData() {
		const user = await bridge.send('VKWebAppGetUserInfo');
		setUser(user);
		routeNavigator.hidePopout();
		}
		fetchData();
	}, []);

	const { sizeX } = useAdaptivityConditionalRender();
	// const { isDesktop } = useAdaptivityWithJSMediaQueries();
  	const platform = usePlatform();


	const { modal: activeModal } = useActiveVkuiLocation();  
	const kickUserModal = (
		<ModalRoot
			activeModal={activeModal}
			onClose={() => routeNavigator.hideModal()}>
			<ModalPage
				id='kickUser_modal'
			>
				<KickUserModal sizeX={sizeX} platform={platform} routeNavigator={routeNavigator} punisher={fetchedUser}/>
			</ModalPage>
			<ModalPage id='muteUser_modal' dynamicContentHeight >
				<MuteUserModal sizeX={sizeX} platform={platform} routeNavigator={routeNavigator} punisher={fetchedUser}/>
			</ModalPage>
			<ModalPage id='banUser_modal' dynamicContentHeight >
				<BanUserModal sizeX={sizeX} platform={platform} routeNavigator={routeNavigator} punisher={fetchedUser}/>
			</ModalPage>
		</ModalRoot>
	);

	return (
	<SplitLayout center popout={popout} modal={kickUserModal}>
		<SplitCol animate>
			<View activePanel={activePanel}>
				<Home id="home" fetchedUser={fetchedUser} />
				<Chat id="chat" fetchedUser={fetchedUser} ></Chat>
				<ChatUserInfo id="chatUser"></ChatUserInfo>
			</View>
		</SplitCol>
	</SplitLayout>
	);
};