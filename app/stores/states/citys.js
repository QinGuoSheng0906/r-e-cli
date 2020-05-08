const citys = [
   { 
      key: '0',
      code: 'cq',
      cityName: '重庆市',
      list: [
         { 
            key: '0-0',  
            code: 'qx',
            cityName: '区县',
            list: [
               { key: '0-0-0',  code: 'fd',cityName: '丰都县' },
               { key: '0-0-1',  code: 'fl',cityName: '涪陵区' },
               { key: '0-0-2',  code: 'nc',cityName: '南川区' }
            ]
         }
      ]
   },
   { 
      key: '1',
      code: 'sc',
      cityName: '四川省',
      list: [
         { key: '1-0',  code: 'cd',cityName: '成都市' },
         { key: '1-1',  code: 'dz',cityName: '达州市' },
         { key: '1-2',  code: 'nc',cityName: '南充市' }
      ]
   }
];

export default citys;