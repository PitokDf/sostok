import moment from "moment";
export function dateToHuman(date: string) {
    moment.locale("id")
    return moment(date).fromNow();
}