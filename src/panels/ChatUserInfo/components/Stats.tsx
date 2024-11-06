import { ReactNode } from "react";

import { Div, MiniInfoCell, Spinner } from "@vkontakte/vkui";
import { Icon20ArrowTurnRightOutline, Icon20DocumentListOutline, Icon20FireAltOutline, Icon20MessagesOutline, Icon20PictureOutline, Icon20ReplyOutline, Icon20SmileOutline, Icon20StickerSmileOutline, Icon20VideoOutline, Icon20VoiceOutline } from "@vkontakte/icons";

import * as api from '../../../api';

import { NetworkError } from '../../../components';

interface Props {
	info: api.Chat.ChatUserStatistics|null;
	isLoading: boolean;
	error: Error | null;
	loadData: () => void;
};

export const Stats = ({info, isLoading, error, loadData}: Props) => {
	if(isLoading) {
		return (
			<Div id="tab-content-info" aria-labelledby="tab-info" role="tabpanel">
				<Spinner />
			</Div>
		);
	}
	if(error || !info) {
	  return <NetworkError action={loadData} error={error?.message}/>;
	}

	const fields = [
		{label: "Смайлов", count: info.smilies, icon: <Icon20SmileOutline />},
		{label: "Стикеров", count: info.stickers, icon: <Icon20StickerSmileOutline />},
		{label: "Пересланных", count: info.reply, icon: <Icon20ArrowTurnRightOutline />},
		{label: "Репостов", count: info.reposts, icon: <Icon20ReplyOutline />},
		{label: "Голосовых", count: info.audio, icon: <Icon20VoiceOutline />},
		{label: "Фото", count: info.stickers, icon: <Icon20PictureOutline />},
		{label: "Видео", count: info.photo, icon: <Icon20VideoOutline />},
		{label: "Файлов", count: info.files, icon: <Icon20DocumentListOutline />},
		{label: "Матов", count: info.mats, icon: <Icon20FireAltOutline />}
	];

	return (
		<Div id="tab-content-info" aria-labelledby="tab-info" role="tabpanel">
			<MiniInfoCell after={info.messages} before={<Icon20MessagesOutline />} >Сообщений</MiniInfoCell>
			{
				fields.map((item) => formatData(info.messages, item.label, item.count, item.icon))					
			}
        </Div>
	);
}

function formatData(messages: number, label: string, count: number, icon:  ReactNode)
{
	return <MiniInfoCell key={label} after={`${count} (${messages ? (count / messages).toFixed(2) : 0}%)`} before={icon} >{label}</MiniInfoCell>
}