import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home, Chat, ChatUserInfo } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
	<SplitLayout center popout={popout}>
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