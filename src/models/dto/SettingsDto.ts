import { BaseEntity } from '../BaseEntity';

/**
 * Rappresent a single setting
 */
export class SettingDto extends BaseEntity {
    /** The numeric value */
    public numericValue!: number;
    /** The string value */
    public stringValue!: string;
    /** The unique setting name */
    public name!: string;
}