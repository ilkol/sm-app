import { useEffect, useState } from "react";

import { Cell, Flex, SimpleGrid, Spinner } from "@vkontakte/vkui";
import { Icon16Message } from "@vkontakte/icons";

import * as api from '../../../api';

type Props = {
	userId: number;
};


export const StatsPanel = ({ userId }: Props) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [stats, setACtivity] = useState<api.User.TodayActivityStatistics|null>(null);


	const loadStatistics = async() => {
		try {
			const fetcheData = await api.User.getTodayActivityStatistics(userId);
			setACtivity(fetcheData);
		}
		catch(e) {
			setError(new Error("Не удалось загрузить данные"));
		}
		finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadStatistics();
	});

	if(loading) {
		return (
			<SimpleGrid columns={3}>
				<Cell subtitle={<Spinner />}>
					<Flex align="center">
						<Icon16Message style={{ marginRight: 8 }} /> {/* Отступ между иконкой и текстом */}
						Сообщений за сегодня
					</Flex>
				</Cell>
			</SimpleGrid>
		)
	}
	if(error || stats === null) {
		return <Cell subtitle={<Spinner />}>Da?</Cell>;
	}

	return (
		<SimpleGrid columns={3}>
		<Cell subtitle={stats.messages}>
			<Flex align="center" justify="center">
				<Icon16Message style={{ marginRight: 8 }} />
				Сообщений
			</Flex>
		</Cell>
		</SimpleGrid>
	);
};