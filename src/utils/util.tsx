interface Column {
    name: string,
    value: string
}

interface Data {
    id: number,
    client: string,
    chargebackQuantity: number,
    chargebackValue: number,
    salesAmount: number,
    totalValue: number,
    chargebackPercent: number,
    chargebackTotal: number,
    status: string
}
export default class Util {
    getHeader() {
        return [
            "Nº Cliente",
            "Cliente",
            "Qtd. Chargeback",
            "Valor Chargeback",
            "Qtd. Vendas",
            "Valor Total",
            "% Chargeback",
            "% Total Chargeback",
            "Status"
        ];
    }    
    
    createColumn(
        name: string,
        value: string
    ): Column {
        return { name, value };
    }

    getColumns() {
        return [
            this.createColumn("Nº Cliente", "id"),
            this.createColumn("Cliente", "client"),        
            this.createColumn("Qtd. Chargeback", "chargebackQuantity"),        
            this.createColumn("Valor Chargeback", "chargebackValue"),        
            this.createColumn("Qtd. Vendas", "salesAmount"),        
            this.createColumn("Valor Total", "totalValue"),        
            this.createColumn("% Chargeback", "chargebackPercent"),        
            this.createColumn("% Total Chargeback", "chargebackTotal"),        
            this.createColumn("Status", "status") 
        ]
    }

    createData(
        id: number,
        client: string,
        chargebackQuantity: number,
        chargebackValue: number,
        salesAmount: number,
        totalValue: number,
        chargebackPercent: number,
        chargebackTotal: number,
        status: string
    ): Data {
        return {
            id,
            client,
            chargebackQuantity,
            chargebackValue,
            salesAmount,
            totalValue,
            chargebackPercent,
            chargebackTotal,
            status
        }
    }

    getData() {
        const arrData: any[] = [];
        let count: number = 50;
        let id: number = 0;
        let chargeBackQuantity: number = 0;
        let percent: number = 0;
        let percent2: number = 0;
        let value: number = 10000.00;

        while(count > 0) {
            arrData.push(this.createData(id+=1, `Cliente Teste ${id}`, chargeBackQuantity+=count, 35.00, chargeBackQuantity * 3, value * id, percent += 1.5, percent2 += (3.5 * 0.2), ""));
            count -= 1;
        }

        return arrData;
    }
}