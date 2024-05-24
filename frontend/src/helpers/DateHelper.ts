import { ReactNode } from 'react';


class DateHelper {
	public convertDate<T extends ReactNode>(date: T) {
		const dateAndTime = new Date(String(date));
		const year = dateAndTime.getFullYear();
		const month = this.convertMonth(dateAndTime.getMonth());
		const day = this.convertNumber(dateAndTime.getDate());
		const hour = this.convertNumber(dateAndTime.getHours());
		const minute = this.convertNumber(dateAndTime.getMinutes());

		const dateString = `${year}.${month}.${day} ${hour}:${minute}`;
		return dateString;
	}

	private convertMonth(month: number): string {
		let stringWithNumber = String(month + 1);
		if (month >= 0 && month <= 9) {
			stringWithNumber = '0' + stringWithNumber;
		}
		return stringWithNumber;
	}

	private convertNumber(day: number): string {
		let stringWithNumber = String(day);
		if (day >= 0 && day <= 9) {
			stringWithNumber = '0' + stringWithNumber;
		}
		return stringWithNumber;
	}
}

export default new DateHelper();
