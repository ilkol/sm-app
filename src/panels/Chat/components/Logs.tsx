import { useEffect, useState } from "react";

import { Icon24UnblockOutline, Icon56GavelOutline } from "@vkontakte/icons";
import { Checkbox, Counter, CustomScrollView, Div, FormItem, Header, IconButton, Placeholder, Progress, RichCell, Spinner } from "@vkontakte/vkui";

import * as api from '../../../api';

import { NetworkError, Avatar } from "../../../components";
import { formatTimestampFromDB } from "../../../utils/date";

interface Props {
	chat: string;
	setFilterVisible: (val: boolean) => void;
	filterVisible: boolean;
	setFilterPermanent: (val: boolean) => void;
    filterPermanent: boolean;
};

export const Logs = ({chat, setFilterVisible, filterVisible, setFilterPermanent, filterPermanent}: Props) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [members, setList] = useState<api.Chat.BannedUser[]|null>(null);

	useEffect(() => {
		load();
  	});

	const load = async() => {
		try {
		  const fetcheData = await api.Chat.getBannedUsers(chat);
			setList(fetcheData);
		}
		catch(e) {
			if(e instanceof Error) {
				setError(new Error(e.message));
			}
		}
		finally {
			setLoading(false);
		}
	};

	if(loading) {
		return <Spinner />;
	}
	if(error || !members) {
		return <NetworkError action={load} error={error?.message}/>;
	}
	if(members.length === 0) {
		return (
			<Placeholder
				stretched
				icon={<Icon56GavelOutline />}
				header="Заблокированных пользоветелей нет"
			>
				На данный момент в чате нет ни одного заблокированного пользователя
			</Placeholder>
		);
	}

	let filterBans = members.filter(chat => {
		if (!filterVisible && chat.name === "") return false;
		if (!filterPermanent && chat.unban === 0) return false;
		return true;
	});
	
	return (
		<Div>
			<Checkbox
                checked={filterVisible}
                onChange={(e) => setFilterVisible(e.target.checked)}
            >
                Неизвестные пользователи
            </Checkbox>
			<Checkbox
                checked={filterPermanent}
                onChange={(e) => setFilterPermanent(e.target.checked)}
            >
                Заблокированные навсегда
            </Checkbox>

			<FormItem id="progresslabel" top={<Header mode="tertiary" indicator={<Counter mode="inherit">{filterBans.length} / {members.length} </Counter>}>Показано </Header>}>
				<Progress aria-labelledby="progresslabel" value={filterBans.length / members.length * 100} />
			</FormItem>
			
			<CustomScrollView
				windowResize={true}
				style={{
					height: 320,
				}}
			>
				{
				filterBans.map((user) => (
					<RichCell
						key={user.id}
						before={
							<Avatar 
								link={user.avatar} 
								title={user.name} 
								id={"" + user.id}
							/>
						} 
						text={user.reason === "0" ? "" : user.reason}
						caption={user.unban === 0 ? "Навсегда" :`С ${formatTimestampFromDB(user.bantime)} по ${formatTimestampFromDB(user.unban)}`}
						after={<IconButton label="Разблокировать"><Icon24UnblockOutline /></IconButton>}
					>
						{(user.name === "" || user.name.indexOf("DELETED") !== -1) ? "Неизвестный пользователь" : user.name}
					</RichCell>
				))}
			</CustomScrollView>
        </Div>
	);
	

}