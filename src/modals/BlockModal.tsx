
import { Icon24Dismiss } from '@vkontakte/icons';
import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
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
}

export const BlockModal = ({sizeX, platform, routeNavigator, title, buttonLabel}: Props) => {
	
	const [date, setDate] = useState(() => new Date());
	const [selected, setSelected] = useState('time');
	const [permoment, setPermoment] = useState(false);
	

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
					<Input placeholder="Причины блокировки" onFocus={() => {}} />
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
							<FormItem>
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
								<FormItem style={{ flexGrow: 1, flexShrink: 1 }} required>
									<Input
										type="number"
										placeholder="Количество"
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
									defaultValue={'минуты'}
									/>
								</FormItem>
							</FormLayoutGroup>
						)}
					</>
				)}
				
				

				<Spacing size='2xl' />
				<ButtonGroup align='center' stretched>
				<Button appearance='negative' size='l' >
					{buttonLabel}
				</Button>
				
				</ButtonGroup>
			</Group>
		</>
	);
}