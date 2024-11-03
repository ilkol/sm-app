import { Icon20KeyOutline, Icon20MessagesOutline, Icon20UsersOutline } from "@vkontakte/icons";
import { Div, Flex, Input, MiniInfoCell, Spinner } from "@vkontakte/vkui";

import * as api from '../../../api';

import { NetworkError, Avatar } from "../../../components";

interface Props {
	info: api.Chat.ChatInfo;
};

export const Info = ({info}: Props) => {
	return (
		<Div>
			<Flex direction='row' gap="4xl" margin='auto'>
				<Avatar link={info.avatar} id={info.uid} title={info.title} />
				<Input
					type="text"
					defaultValue={info.title}
					style={{ flex: 1 }}
				/>
			</Flex>
			<Flex direction='column' gap="4xl" margin='auto'>
				<MiniInfoCell after={info.uid} before={<Icon20KeyOutline />} >uid</MiniInfoCell>
				<MiniInfoCell after={info.messages} before={<Icon20MessagesOutline />} >Сообщений</MiniInfoCell>
				<MiniInfoCell after={info.membersCount} before={<Icon20UsersOutline />} >Участников</MiniInfoCell>
			</Flex>
        </Div>
	);
}