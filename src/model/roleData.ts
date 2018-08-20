import { Villager } from './villager';
import { Werewolf } from './werewolf';
export interface RoleData {
    werewolves?: Werewolf[];
    villagers?: Villager[];
    witch?: {
        name: string,
        poison: string, // empty if unused, or player name -> used on 
        potion: string, // empty if unused, or player name -> used on 
        killedBy: string// empty if alive, or death cause
    };
    seer?: {
        name: string,
        killedBy: string
    };
    hunter?: {
        name: string,
        killedBy: string,
        retaliated: string // empty if unused, or player name if retaliated someone
    };
    guardian?: {
        name: string,
        killedBy: string,
        protecting: string
    };
    judge?: {
        name: string
    };
}
