import { Tram } from "./Tram";

export type TramStop = {
    id: number,
    location: string,
    message: string|null,
    trams: Array<Tram>,
}