export interface GameData {
    roles: string[];
    players: string[];
    currentIndex: number; // index in roles and players array that is being revealed 
    currentPage: string;
    currentNight: number;
    creator?: string;
}
