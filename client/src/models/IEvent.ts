export interface IEvent {
    title: string,
    description: string,
    owner_id: number,
    guest_id: number | null,
    event_date: string
}