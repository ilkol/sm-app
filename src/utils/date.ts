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

const TIMEZONE_MOSCOW = 3;

export function formatGMT(time: Date, timezone = TIMEZONE_MOSCOW)
{
	updateTimeZone(time, timezone);

	const
		day = time.getDate(),
		month = getMonthName(time.getMonth()),
		year = time.getFullYear(),
		hours = time.getHours(),
		minutes = time.getMinutes(),
		timeZoneStr = timeZoneString(timezone)
	;
	

	return `${day}.${month}.${year}, ${hours}:${minutes} ${timeZoneStr}`;
}
function updateTimeZone(time: Date, timezone: number): void
{
	time.setSeconds(time.getSeconds() + 3600 * (timezone - TIMEZONE_MOSCOW));
}

function timeZoneString(timezone: number): string
{
	return `GMT${timezone > 0 ? ('+' + timezone) : timezone}`;
}
const monthNames = [
	'янв.',
    'февр.',
    'марта',
    'апр.', 
    'мая',
    'июня', 
    'июля',
    'авг.', 
    'сент.',
    'окт.', 
    'нояб.',
    'дек.'
]
function getMonthName(month: number): string
{
	return monthNames[month];
}