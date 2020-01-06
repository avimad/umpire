
export interface AddSchedule {

    ScheduleDay?: string;
    ScheduleDate?: string;
    ScheduleTime?: string;
    UmpireID?: number;
    TeamID?: number;
    LocationID?: number;
    Description?: string;
    IsRainedOut?: boolean;
    UmpireStatus?: number;
}

export interface Schedule {
    ScheduleDate?: string;
    ScheduleDay?: number;
    Description?: string;
    IsRainedOut?: boolean;
    umpireStatus?: number;
    schtime?: Time[];
    location?: number[];

}
export interface Time {
    ScheduleTime?: string;
    LocationID?: number;
    schUmpire?: Umpire[];

}
export interface Umpire {
    LocationID?: string;
    UmpireID?: string;
}
export interface Location {
    LocationID?: string;
}

