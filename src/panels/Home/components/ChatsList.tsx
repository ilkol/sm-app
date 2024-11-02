import { useEffect, useState } from "react";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Cell, CustomScrollView, IconButton, List, RichCell, Spinner } from "@vkontakte/vkui";
import { Icon28DoorArrowLeftOutline } from "@vkontakte/icons";

import * as api from '../../../api';

import { NetworkError, Avatar } from "../../../components";


type Props = {
	userId: number;
};


export const ChatsList = ({ userId }: Props) => {
	const routeNavigator = useRouteNavigator();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [chats, setChatsList] = useState<api.User.ActiveChatInfo[]|null>(null);

	const loadChats = async() => {
		try {
		  const fetcheData = await api.User.getActiveChatsList(userId);
			setChatsList(fetcheData);
		}
		catch(e) {
		  setError(new Error("Не удалось загрузить данные"));
		}
		finally {
		  setLoading(false);
		}
	};

	useEffect(() => {
		loadChats();
		
	});

	if(loading) {
		return <CustomScrollView
		windowResize={true}
		style={{
			height: 320,
		}}
		>
		<Spinner />
		</CustomScrollView>
	}
	if(error || !chats) {
	  return <NetworkError action={loadChats}/>;
	}
  
	

	if(chats.length > 0) {
		return (
			<CustomScrollView
			windowResize={true}
			style={{
				height: 320,
			}}
			>
			<List>
				{chats.map((chat) => (

				<RichCell 
				key={chat.id}
				caption={`${chat.count} участник`}
				onClick={()=>{
				routeNavigator.push(`chat/${chat.id}`)
				}} before={
					<Avatar link={chat.avatar} id={chat.id} title={chat.title} />
					
					
				} 
				// after={
				// 	<IconButton
				// 		onClick={() => {
				// 		routeNavigator.push("persik")
				// 		}}
				// 		label='Выйти'
				// 	>
				// 		<Icon28DoorArrowLeftOutline />
				// 	</IconButton>
				// }
				>
				{chat.title}
				
				</RichCell>
				))}
			</List>
			</CustomScrollView>
		);
	}

	return <Cell>Вы не состоите в чатах</Cell>;
};
