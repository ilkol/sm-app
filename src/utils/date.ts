export enum timeFormat
{
	timestamp,
	date
}

export function formatDate(date: Date, format: timeFormat) {
	let options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
	if(format === timeFormat.timestamp) {
		options = {
			...options,
			hour: '2-digit',
			minute: '2-digit',
		}
	}

    return date.toLocaleString('ru-RU', options).replace(',', '');
}
export function formatDateFromDB(time: number) {
	const date = new Date(time * 1000);
	return formatDate(date, timeFormat.date);
}
export function formatTimestampFromDB(time: number) {
	const date = new Date(time * 1000);
	return formatDate(date, timeFormat.date);
}