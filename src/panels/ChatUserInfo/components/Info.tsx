import { Avatar as VkAvatar, Div, MiniInfoCell, RichCell, Spinner } from "@vkontakte/vkui";
import { icons } from '../../../vk';

import * as api from '../../../api';

import { formatTimestampFromDB } from "../../../utils/date";

import { NetworkError, Avatar } from '../../../components';

interface Props {
	info: api.Chat.ChatUserStatistics|null;
	isLoading: boolean;
	error: Error | null;
	loadData: () => void;
};

export const Info = ({info, isLoading, error, loadData}: Props) => {
	if(isLoading) {
		return (
			<Div>
				<RichCell
					before={
						<VkAvatar />
					}
					caption={``}
				>
				</RichCell>
				<Spinner />
			</Div>
		);
	}
	if(error || !info) {
	  return <NetworkError action={loadData} error={error?.message}/>;
	}

	return (
		<Div>
			<RichCell
				before={
					<Avatar link={info.avatar} id={info.id + ""} title={info.name} />
				}
				caption={`${info.id}`}
			>
				{info.name}
			</RichCell>
			{info.nick && (
				<MiniInfoCell after={info.nick} before={<icons.Icon20MentionOutline />} >Ник</MiniInfoCell>
			)}
			<MiniInfoCell after={info.roleName} before={<icons.Icon20FavoriteOutline />} >Роль</MiniInfoCell>
			{info.mute !== 0 && (
				<MiniInfoCell after={`до ${formatTimestampFromDB(info.mute)}`} before={<icons.Icon20MessageCrossOutline />} >Запрет собщений</MiniInfoCell>
			)}
			{info.warns !== 0 && (
				<MiniInfoCell after={info.warns} before={<icons.Icon20WarningTriangleOutline />} >Предупреждения</MiniInfoCell>
			)}
			<MiniInfoCell after={info.togglenotify ? <icons.Icon20NotificationSlashOutline /> : <icons.Icon20NotificationOutline />} before={<icons.Icon20AdvertisingOutline />} >Объявления</MiniInfoCell>
			{info.immunity !== 0 && (
				<MiniInfoCell after={info.immunityRole} before={<icons.Icon20ShieldLineOutline />} >Иммунитет</MiniInfoCell>
			)}
			<MiniInfoCell after={formatTimestampFromDB(info.join_date)} before={<icons.Icon20ClockOutline />} >В чате с</MiniInfoCell>
        </Div>
	);
}