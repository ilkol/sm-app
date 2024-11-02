import { useEffect, useState } from "react";

import { Cell, Counter, CustomScrollView, Div, List, Spinner } from "@vkontakte/vkui";

import * as api from '../../../api';

import { NetworkError } from "../../../components";

interface Props {
	chat: string;
};

export const Roles = ({chat}: Props) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [roles, setList] = useState<api.Chat.Role[]|null>(null);

	useEffect(() => {
		load();
  	});

	const load = async() => {
		try {
		  const fetcheData = await api.Chat.getRoles(chat);
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
	if(error || !roles) {
		return <NetworkError action={load} error={error?.message}/>;
	}

	const onDragFinish = ({ from, to }: {from: number, to: number}) => {
		const _list = [...roles];
		_list.splice(from, 1);
		_list.splice(to, 0, roles[from]);
		setList(_list);
	};

	return (
		<Div>
			<CustomScrollView
				windowResize={true}
				style={{
					height: 320,
				}}
			>
				<List>
					{
					roles.map((role) => (
						<Cell
							key={role.level}
							before={
								<Counter>
									{role.level}
								</Counter>
							}
							onDragFinish={onDragFinish}
						>
							{role.name}
						</Cell>
					))}
				</List>
			</CustomScrollView>
        </Div>
	);
	

}