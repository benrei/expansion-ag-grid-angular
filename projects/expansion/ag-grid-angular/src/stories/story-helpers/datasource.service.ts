import { Injectable } from '@angular/core';
import {
  IServerSideDatasource,
  IServerSideGetRowsRequest,
} from 'ag-grid-community';
@Injectable({ providedIn: 'root' })
export class DatasourceService {
  constructor() {}

  createServerSideDatasource(dataCount = 100): IServerSideDatasource {
    const server = this.createFakeServer(dataCount);
    return {
      getRows: (params) => {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        // get data for request from our fake server
        const response = server.getData(params.request);
        // simulating real server call with a 500ms delay
        setTimeout(function () {
          if (response.success) {
            // supply rows for requested block to grid
            params.success({ rowData: response.rows });
          } else {
            params.fail();
          }
        }, 500);
      },
    };
  }

  generateItems(dataCount: number): any[] {
    const items: any[] = [];
    for (let i = 0; i <= dataCount; i++) {
      const brand = generateRandomBrand();
      items.push({
        id: i,
        brand: brand,
        isNew: Math.random() > 0.5,
        model: generateRandomModel(brand),
        price: generateRandomPrice(),
      });
    }
    return items;
  }

  private createFakeServer(dataCount: number) {
    const items = this.generateItems(dataCount);
    return {
      getData: (request: IServerSideGetRowsRequest) => {
        // in this simplified fake server all rows are contained in an array
        const requestedRows = items.slice(request.startRow, request.endRow);
        return {
          success: true,
          rows: requestedRows,
        };
      },
    };
  }
}
// Generate 97 more items with random data
const items = [];
for (let i = 0; i <= 100; i++) {
  const brand = generateRandomBrand();
  items.push({
    id: i,
    brand: brand,
    isNew: Math.random() > 0.5,
    model: generateRandomModel(brand),
    price: generateRandomPrice(),
  });
}

// Function to generate random make
function generateRandomBrand() {
  const brand = ['BMW', 'Honda', 'Tesla', 'Volkswagen'];
  return brand[Math.floor(Math.random() * brand.length)];
}

// Function to generate random model
function generateRandomModel(brand: string) {
  const allModels: any = {
    BMW: ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'],
    Honda: ['Accord', 'Civic'],
    Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'],
    Volkswagen: ['e-Up', 'Golf', 'Polo'],
  };
  const models = allModels[brand];
  return models[Math.floor(Math.random() * models.length)];
}

// Function to generate random price
function generateRandomPrice() {
  const price = Math.floor(Math.random() * 50000) + 20000;
  return Math.round(price / 100) * 100;
}
