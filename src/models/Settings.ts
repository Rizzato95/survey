import axios from 'axios';
import { SettingDto } from './dto/SettingsDto';
import { SettingType } from './enums/SettingType';
import { Defaults } from './Defaults';
// Import { Company } from '../models/Common/Company';

/** The Showtrip application settings */
export class Settings {
    /** The axios httpClient */
    public httpClient: any;
    /** The list of application settings */
    private settings: SettingDto[] = [];
    /** The service base url */
    private serviceBaseUrl: string;

    /**
     * Assign the serviceBaseurl to the class
     * @param serviceBaseUrl The settings base url
     */
    constructor(serviceBaseUrl: string) {
        console.log(serviceBaseUrl);
        this.serviceBaseUrl = serviceBaseUrl;
    }

    /**
     * Initialize the application settings
     */
    public async initialize(): Promise<boolean> {

        if (this.serviceBaseUrl) {
            // Set initial base url
            this.httpClient = axios.create({
                baseURL: this.serviceBaseUrl,
                withCredentials: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            // Get settings
            return this.httpClient.get('/query/settings')
                .then((response: any) => {
                    if (response) {
                        // Take server settings
                        this.settings = response.data.results;

                        // safe initialize
                        if (!this.settings)
                            this.settings = [];

                        const defaultServicesBaseUrl = {
                            name: Defaults.defaultServicesBaseUrl,
                            stringValue: this.serviceBaseUrl
                        } as SettingDto;

                        // push the default url
                        this.settings.push(
                            defaultServicesBaseUrl
                        );

                        // resolve the promise
                        return Promise.resolve(true);
                    } else
                        return Promise.reject<false>('Application settings are not valid');
                });
        } else
            return Promise.reject<false>('Application settings starting url is not valid');
    }

    /**
     * Returns the stringValue of the setting with the given name or null.
     * @param name The setting name
     */
    public getString(name: string): string {
        return this.get(name, SettingType.String) as string;
    }

    /**
     * Returns the numericValue of the setting with the given name or null.
     * @param name The setting name
     */
    public getNumeric(name: string): number {
        return this.get(name, SettingType.Numeric) as number;
    }

    /**
     * Returns the setting with the given name or null.
     * @param name The setting name
     */
    public getSetting(name: string): SettingDto {
        return this.get(name, SettingType.Both) as SettingDto;
    }

    /**
     * Returns the stringValue or the numericValue or the entire setting
     * @param name The setting name
     * @param type The setting type
     */
    private get(name: string, type: SettingType): number | string | SettingDto | null {
        // search for the setting
        const setting = this.settings ? this.settings.find((s: SettingDto) => s.name === name) : null;

        // save the result
        let result: number | string | SettingDto | null = null;

        if (setting) {
            // if the setting is found, take the stringValue
            if (type === SettingType.String)
                result = setting.stringValue;

            // if a numericValue is found, take it since has priority on stringValue
            if (type === SettingType.Numeric)
                result = setting.numericValue;

            if (type === SettingType.Both)
                result = setting;
        }
        // else // warn the console
        //     console.warn(`[Settings] A setting with name '${name}' was not found`);
        return result;
    }
}
