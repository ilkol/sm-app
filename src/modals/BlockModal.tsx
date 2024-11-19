
import { Icon24Dismiss } from '@vkontakte/icons';
import { UserInfo } from '@vkontakte/vk-bridge';
import { RouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { Button, ButtonGroup, Checkbox, DateInput, FormItem, FormLayoutGroup, Group, HorizontalScroll, Input, ModalPageHeader, PanelHeaderButton, PanelHeaderClose, PlatformType, Select, Spacing, Tabs, TabsItem } from '@vkontakte/vkui';
import { AdaptiveSizeType } from '@vkontakte/vkui/dist/hooks/useAdaptivityConditionalRender/types';
import { useState } from 'react';

interface Props
{
	sizeX: AdaptiveSizeType,
	platform: PlatformType,
	routeNavigator: RouteNavigator;

	title: string;
	buttonLabel: string;

	punisher?: UserInfo;

	onSubmit: (chat: string, punisher: number, user: number, time: number, reason: string) => void
}

export const BlockModal = ({sizeX, platform, routeNavigator, title, buttonLabel, punisher, onSubmit}: Props) => {
	if(!punisher) {
		return;
	}
	const chat = useParams<'chat'>()?.chat;
	const user = useParams<'user'>()?.user;
	if(!chat || !user) {
		return;
	}
	
	const [date, setDate] = useState(() => new Date());
	const [reason, setReason] = useState<string>('');
	const [val, setTimeVal] = useState(0);

	const [timeType, setTimeType] = useState<'минуты'|'часы'|'дни'|'года'>('минуты');
	
	const [selected, setSelected] = useState('time');
	const [permoment, setPermoment] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [timeError, setTimeError] = useState(false);

	const clickSubmi = () => {
		let time = 0;
		if(permoment) {
			onSubmit(chat, punisher.id, +user, 0, reason);
			return;
		} else {
			if(selected === 'date') {
				time = Math.floor((date.getTime() - (new Date()).getTime())/1000); 
			}
			else {
				time = val * 60;
				if(timeType === "минуты") {
					time *= 60;
				}
				if(timeType === 'часы') {
					time *= 60 * 60;
				}
				if(timeType === 'дни') {
					time *= 24 * 60 * 60;
				}
				if(timeType === 'года') {
					time *= 365 * 24 * 60 * 60;
				}
				const newDate = new Date();
				newDate.setSeconds(newDate.getSeconds() + time);
				setDate(newDate);
				if(val <= 0) {
					setTimeError(true);
				}
				else {
					setTimeError(false);
				}
			}
			if(time <= 0) {
				setDateError(true);
			} else {
				setDateError(false);
				if(!dateError) {
					onSubmit(chat, punisher.id, +user, time, reason);
				}
			}
		}
		
	}

	return (
		<>
		<ModalPageHeader
				before={
				sizeX.compact &&
				platform === 'android' && (
					<PanelHeaderClose className={sizeX.compact.className} onClick={() => routeNavigator.hideModal()} />
				)
				}
				after={
				platform === 'ios' && (
					<PanelHeaderButton>
					<Icon24Dismiss onClick={() => routeNavigator.hideModal()}/>
					</PanelHeaderButton>
				)
				}
			>
				{title}
			</ModalPageHeader>
			<Group>
				<FormItem top="Причина">
					<Input placeholder="Причины блокировки" onFocus={() => {}} onChange={(e) => {
						setReason(e.currentTarget.value);
					}}/>
				</FormItem>
				<Checkbox
					checked={permoment}
					onChange={() => setPermoment(!permoment)}
				>
					Навсегда
				</Checkbox>
				{!permoment && (
					<>
						<Tabs>
							<HorizontalScroll >
								<TabsItem
									selected={selected === 'date'}
									onClick={() => setSelected('date')}
								>
									Дата разблокировки
								</TabsItem>
								<TabsItem
									selected={selected === 'time'}
									onClick={() => setSelected('time')}
								>
									Время блокировки
								</TabsItem>
							</HorizontalScroll>
						</Tabs>
						
						{selected === "date" && (
							<FormItem
								status={dateError ? 'error' : 'default'}
								bottom={dateError ? "Укажите корретное время конца блокировки" : ""}
							>
								<DateInput
									value={date}
									onChange={(value?: Date) => {
										if(value) {
											setDate(value);
										}
									}}
									enableTime
									disablePast
									placeholder="Выберите дату"
									closeOnChange
								/>
							</FormItem>
						)}
						{selected === "time" && (
							<FormLayoutGroup
								mode="horizontal"
								segmented
								
							>
								<FormItem style={{ flexGrow: 1, flexShrink: 1 }} required
									status={timeError ? 'error' : 'default'}
									bottom={timeError ? "Укажите корреткное число" : ""}
								>
									<Input
										type="number"
										placeholder="Количество"
										value={val}
										onChange={(e) => {
											setTimeVal(+e.currentTarget.value);
										}}
									/>
								</FormItem>
								<FormItem style={{ flexBasis: '125px', flexGrow: 0 }} required>
									<Select
									options={['минуты', 'часы', 'дни', 'года'].map(
										(i) => ({
										label: i,
										value: i,
										}),
									)}
									value={timeType}
									onChange={(e) => {
										const val = e.currentTarget.value;
										if(val === "часы" || val === 'дни' || val === 'года' || val === 'минуты') {
											setTimeType(val);
										}
									}}
									defaultValue={'минуты'}
									/>
								</FormItem>
							</FormLayoutGroup>
						)}
					</>
				)}
				
				

				<Spacing size='2xl' />
				<ButtonGroup align='center' stretched>
				<Button appearance='negative' size='l' onClick={clickSubmi}>
					{buttonLabel}
				</Button>
				
				</ButtonGroup>
			</Group>
		</>
	);
}