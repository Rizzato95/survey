export class Survey {
    /** The name */
    public name!: string;
    /** The surname */
    public surname!: string;
    /** The fiscal code */
    public fiscalCode!: string;
    /** The email */
    public email!: string;
    /** The phone */
    public phone!: string;
    /** The role */
    public role!: string;
    /** The recipient */
    public recipient!: string;
    /** The building type */
    public buildingType!: string;
    /** The intervention type */
    public interventionType!: string;
    /** Indicates if has the Energy Performance Certificate or not */
    public hasEnergyPerformanceCertificate!: boolean;
    /** The building energetic class*/
    public buildingEnergeticClass!: string;
    /** Indicates if already has the Energetic riqualification or not */
    public hasEnergeticRiqualification!: boolean;
    /** Indicates if already has suppliers quotes or not */
    public hasSuppliersQuotes!: boolean;
    /** The cost of the operation */
    public interventionCost!: number;
    /** Indicates if already has start the energetic riqualification */
    public hasStartEnergeticRiqualification!: boolean;
}