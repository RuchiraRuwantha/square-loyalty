import { activityTypes, iLoyaltyActivity } from "./interfaces";

const mapApiDataToiLoyaltyActivity = (dataObject: { [key: string]: string }): iLoyaltyActivity => {
    const tempDate = new Date(dataObject.created_at || '');

    return {
        date: tempDate.getFullYear() + '-' + String(tempDate.getMonth() + 1).padStart(2, '0') + '-' + String(tempDate.getDate()).padStart(2, '0'),
        type: activityTypes[dataObject.type] || "N/A",
        description: dataObject.order_id ? `${dataObject.order_id}` :
            (dataObject.reward_id ? `${dataObject.reward_id}` : dataObject.description ? `${dataObject.description}` : 'N/A'),
        points: Number(dataObject.points)
    }
}

export const mapActivityArrayToActivityArray = (originalArray: { [key: string]: string }[]): iLoyaltyActivity[] => {
    let mappedArray: iLoyaltyActivity[] = [];
    if (originalArray && originalArray.length > 0) {
        mappedArray = originalArray.map(item => mapApiDataToiLoyaltyActivity(item));
    }
    return mappedArray;
}

export const isValidPhoneNumber = (phone: string) => /^\+\d{10,15}$/.test(phone);