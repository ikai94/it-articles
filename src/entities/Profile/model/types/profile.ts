import { Country } from "entities/Country/model/types/country";
import { Currency } from "entities/Currency/model/types/currency";

export interface Profile {
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string
}

export interface ProfileSchema {
    // хранятся данные пользователя
    data?: Profile;
    // хранятся измененные состояния пользователя
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}
