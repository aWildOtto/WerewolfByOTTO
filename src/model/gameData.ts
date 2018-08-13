export interface GameData {
    roles: string[];
    players?: string[];
    playersObj?: {};
    currentIndex?: number; // index in roles and players array that is being revealed 
    currentPage: string;
    currentNight: number;
    creator?: {};
}
