import * as vk from '../vk';

type Props = {
	link?: string;
	title?: string;
	id?: string|number;
};

const getColorFromChatId = (id: string): 1 | 2 | 3 | 4 | 5 | 6 => {
    let sum = 0;
    for (let i = 0; i < id.length; i++) {
        sum += id.charCodeAt(i);
    }

    const result = (sum % 6) + 1;

    return result as 1 | 2 | 3 | 4 | 5 | 6;
};

export const Avatar = ({ link, title, id }: Props) => {
	if(title === undefined || id === undefined) {
		return <vk.ui.Avatar />;
	}

	const color = getColorFromChatId(id + "");
	
	if(title === "" || title.indexOf("DELETED") !== -1) {
		return <vk.ui.Avatar src="#" fallbackIcon={<vk.icons.Icon28GhostSimpleOutline />} gradientColor={color}/>
	}
	if(link) {
		return <vk.ui.Avatar src={link}/>
	}
	return <vk.ui.Avatar initials={title[0]} gradientColor={color}/>;
};
