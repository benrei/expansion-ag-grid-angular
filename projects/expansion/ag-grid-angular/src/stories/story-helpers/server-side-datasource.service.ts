import { Injectable } from '@angular/core';
import {
  IServerSideDatasource,
  IServerSideGetRowsRequest,
} from 'ag-grid-community';
@Injectable({ providedIn: 'root' })
export class ServerSideDatasourceService {
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
      items.push({
        id: i,
        brand: generateRandomBrand(),
        model: generateRandomModel(),
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
  items.push({
    id: i,
    brand: generateRandomBrand(),
    model: generateRandomModel(),
    price: generateRandomPrice(),
  });
}

// Function to generate random make
function generateRandomBrand() {
  const brand = ['Honda', 'Chevrolet', 'Nissan', 'Volkswagen', 'Hyundai'];
  return brand[Math.floor(Math.random() * brand.length)];
}

// Function to generate random model
function generateRandomModel() {
  const models = ['Civic', 'Malibu', 'Altima', 'Jetta', 'Elantra'];
  return models[Math.floor(Math.random() * models.length)];
}

// Function to generate random price
function generateRandomPrice() {
  return Math.floor(Math.random() * 50000) + 20000;
}
