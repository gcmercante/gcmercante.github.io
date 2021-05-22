export interface Column {
    name: string,
    value: string
}

export interface Data {
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

  static createColumn(
    name: string,
    value: string,
  ): Column {
    return { name, value };
  }

  getColumns(): Column[] {
    return [
      Util.createColumn('Nº Cliente', 'id'),
      Util.createColumn('Cliente', 'client'),
      Util.createColumn('Qtd. Chargeback', 'chargebackQuantity'),
      Util.createColumn('Valor Chargeback', 'chargebackValue'),
      Util.createColumn('Qtd. Vendas', 'salesAmount'),
      Util.createColumn('Valor Total', 'totalValue'),
      Util.createColumn('% Chargeback', 'chargebackPercent'),
      Util.createColumn('% Total Chargeback', 'chargebackTotal'),
      Util.createColumn('Status', 'status'),
    ];
  }

  static createData(
    id: number,
    client: string,
    chargebackQuantity: number,
    chargebackValue: number,
    salesAmount: number,
    totalValue: number,
    chargebackPercent: number,
    chargebackTotal: number,
    status: string,
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
      status,
    };
  }

  getData(): Data[] {
    const arrData: Data[] = [];
    let count = 50;
    let id = 0;
    let chargeBackQuantity = 0;
    let percent = 0;
    let percent2 = 0;
    const value = 10000.00;

    while (count > 0) {
      arrData.push(Util.createData(id += 1, `Cliente Teste ${id}`, chargeBackQuantity += count, 35.00, chargeBackQuantity * 3, value * id, percent += 1.5, percent2 += (3.5 * 0.2), 'On going'));
      count -= 1;
    }

    return arrData;
  }

  getColumnValues(): any[] {
    const columns: Column[] = this.getColumns();
    const values: any[] = [];

    columns.map((column: Column) => {
      const value: string = column.value;
      const columnObj: any = {};
      columnObj[`${value}`] = column.name;
      values.push(columnObj);
      return column;
    })
    return values;
  }
}