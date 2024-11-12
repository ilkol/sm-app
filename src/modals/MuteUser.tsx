
import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AdaptiveSizeType } from '@vkontakte/vkui/dist/hooks/useAdaptivityConditionalRender/types';
import { BlockModal } from './BlockModal';
import { PlatformType } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

interface Props
{
	sizeX: AdaptiveSizeType,
	platform: PlatformType,
	routeNavigator: RouteNavigator

	punisher?: UserInfo
}

export const MuteUserModal = ({sizeX, platform, routeNavigator, punisher}: Props) => {
	
	return (
		<BlockModal 
			sizeX={sizeX}
			platform={platform}
			routeNavigator={routeNavigator}
			title='Запретить писать пользователю'
			buttonLabel='Запретить'
			punisher={punisher}
			onSubmit={(chat, punisher, user, time, reason) => {
				console.log(chat, punisher, user, time, reason);
			}}
		/>
	);
	// const [date, setDate] = useState(() => new Date());
	// const [selected, setSelected] = useState('time');
	// const [permoment, setPermoment] = useState(false);
	

	// return (
	// 	<>
	// 	<ModalPageHeader
	// 			before={
	// 			sizeX.compact &&
	// 			platform === 'android' && (
	// 				<PanelHeaderClose className={sizeX.compact.className} onClick={() => routeNavigator.hideModal()} />
	// 			)
	// 			}
	// 			after={
	// 			platform === 'ios' && (
	// 				<PanelHeaderButton>
	// 				<Icon24Dismiss onClick={() => routeNavigator.hideModal()}/>
	// 				</PanelHeaderButton>
	// 			)
	// 			}
	// 		>
	// 			Запретить писать пользователю
	// 		</ModalPageHeader>
	// 		<Group>
	// 			<FormItem top="Причина">
	// 				<Input placeholder="Причины блокировки сообщений" onFocus={() => {}} />
	// 			</FormItem>
	// 			<Checkbox
	// 				checked={permoment}
	// 				onChange={() => setPermoment(!permoment)}
	// 			>
	// 				Навсегда
	// 			</Checkbox>
	// 			{!permoment && (
	// 				<>
	// 					<Tabs>
	// 						<HorizontalScroll >
	// 							<TabsItem
	// 								selected={selected === 'date'}
	// 								onClick={() => setSelected('date')}
	// 							>
	// 								Дата разблокировки
	// 							</TabsItem>
	// 							<TabsItem
	// 								selected={selected === 'time'}
	// 								onClick={() => setSelected('time')}
	// 							>
	// 								Время блокировки
	// 							</TabsItem>
	// 						</HorizontalScroll>
	// 					</Tabs>
						
	// 					{selected === "date" && (
	// 						<FormItem>
	// 							<DateInput
	// 								value={date}
	// 								onChange={(value?: Date) => {
	// 									if(value) {
	// 										setDate(value);
	// 									}
	// 								}}
	// 								enableTime
	// 								disablePast
	// 								placeholder="Выберите дату"
	// 								closeOnChange
	// 							/>
	// 						</FormItem>
	// 					)}
	// 					{selected === "time" && (
	// 						<FormLayoutGroup
	// 							mode="horizontal"
	// 							segmented
	// 						>
	// 							<FormItem style={{ flexGrow: 1, flexShrink: 1 }} required>
	// 								<Input
	// 									type="number"
	// 									placeholder="Количество"
	// 								/>
	// 							</FormItem>
	// 							<FormItem style={{ flexBasis: '125px', flexGrow: 0 }} required>
	// 								<Select
	// 								options={['минуты', 'часы', 'дни', 'года'].map(
	// 									(i) => ({
	// 									label: i,
	// 									value: i,
	// 									}),
	// 								)}
	// 								defaultValue={'@mail.ru'}
	// 								/>
	// 							</FormItem>
	// 						</FormLayoutGroup>
	// 					)}
	// 				</>
	// 			)}
				
				

	// 			<Spacing size='2xl' />
	// 			<ButtonGroup align='center' stretched>
	// 			<Button appearance='negative' size='l' >
	// 				Запретить
	// 			</Button>
				
	// 			</ButtonGroup>
	// 		</Group>
	// 	</>
	// );
}