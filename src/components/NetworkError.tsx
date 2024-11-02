import { Icon56GhostOutline } from "@vkontakte/icons";
import { Button, Placeholder } from "@vkontakte/vkui";

type Props = {
	action?: () => void;
	error?: string;
};
  
export const NetworkError = ({ action, error }: Props) => {
	return (
		<Placeholder
			stretched
			icon={<Icon56GhostOutline />}
			header="Не удалось загрузить"
			action={
			action && (
				<Button size="m" mode="secondary" onClick={action}>
				Повторить
				</Button>
			)
			}
		>
			{action && error ? error : 'Повторите попытку'}
		</Placeholder>
	);
};