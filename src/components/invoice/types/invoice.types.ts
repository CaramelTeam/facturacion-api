export interface InvoiceI {
    customerId: number;
    items: [{
        quantity: number;
        product: {
            description: string;
            product_key: string;
            price: number;
        },
        discount?: number;
        type: InvoiceType;
        paymenth_method: PaymentMethod;
        use: CFDI;
        // currency?: string; //codigo de la moneda
        conditions?: string;
        date: Date;
        series?: string;
        pdf_custom_section?: string;
        
    }]
}

export enum  PaymentForm {
    EFECTIVO = '01',
    CHEQUE_NOMINATIVO = '02',
    TRANSFERENCIA = '03',
    TARJETA_CREDITO = '04',
    MONEDERO_ELECTRONICO = '05',
    DINERO_ELECTRONICO = '06',
    VALES_DESPENSA = '08',
    DACION_PAGO = '12',
    SUBROGACION = '13',
    CONSIGNACION = '14',
    CONDONACION = '15',
    COMPENSACION = '17',
    NOVACION = '23',
    CONFUSION = '24',
    REMISION_DE_DEUDA = '25',
    PRESCRIPCION_O_CADUCIDAD = '26',
    SATISFACCION_DE_ACREEDOR = '27',
    TARJETA_DE_DEBITO = '28',
    TARJETA_DE_SERVICIOS = '29',
    ANTICIPOS = '30',
    INTERMEDIARIO_PAGOS = '31',
    POR_DEFINIR = '99'
}

export enum  PaymentMethod {
    PAGO_EN_UNA_SOLA_EXHIBICION = 'PUE',
    PAGO_EN_PARCIALIDADES_O_DIFERIDO = 'PPD'
}

export enum InvoiceType {
    INGRESO = 'I',
    PAGO = 'P',
    EGRESO = 'E',
    TRASLADO = 'T',
    NOMINA = 'N',
}

export enum CFDI {
    ADQUISICION_DE_MERCANCIAS = 'G01',
    DEVOLUCIONES = 'G02',
    GASTOS_EN_GENERAL = 'G03',
    CONSTRUCCIONES = 'I01',
    MOBILIARIO_Y_EQUIPO_DE_OFICINA = 'I02',
    EQUIPO_DE_TRANSPORTE = 'I03',
    EQUIPO_DE_COMPUTO_Y_ACCESORIOS = 'I04',
    DADOS_TROQUELES_HERRAMIENTAS_Y_MOLDES = 'I05',
    COMUNICACIONES_TELEFONICAS = 'I06',
    COMUNICACIONES_SATELITALES = 'I07',
    OTRAS_MAQUINARIA_Y_EQUIPO = 'I08',
    HONORARIOS_MEDICOS = 'D01',
    GASTOS_MEDICOS_POR_INCAPACIDAD_O_ENFERMEDAD_GENERAL = 'D02',
    GASTOS_FUNERALES = 'D03',
    DONATIVOS = 'D04',
    INTERESES_REALES_EFECTIVAMENTE_PAGADOS_POR_CREDITOS_HIPOTECARIOS = 'D05',
    APORTACIONES_VOLUNTARIAS_SAR = 'D06',
    PRIMAS_POR_SEGUROS_GASTOS_MEDICOS = 'D07',
    GASTOS_DE_TRANSPORTE_ESCOLAR = 'D08',
    DEPOSITOS_EN_AHORRO = 'D09',
    PAGOS_SERVICIOS_EDUCATIVOS = 'D10',
    SIN_EFECTOS_FISCALES = 'S01',
    PAGOS = 'CP01',
    NOMINA = 'CN01'
}