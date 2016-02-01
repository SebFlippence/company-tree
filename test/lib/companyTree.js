'use strict'

let companyTreeLib = require('../../src/lib/companyTree.js'),
    _ = require('lodash'),

    company = [
      {email: 'CEO', staff: [
        {email: 'CTO', staff: [
          {email: 'SeniorDev', staff: [
            {email: 'Dev1'},
            {email: 'Dev2', staff: [{email: 'JuniorDev3'}, {email: 'JuniorDev4'}]}
          ]},
          {email: 'PA2'}
        ]},
        {email: 'PA1'},
        {email: 'CFO', staff: [
          {email: 'SeniorFinance', staff: [{email: 'Finance1'}, {email: 'Finance2'}]}
        ]}
      ]}
    ],

    directs = companyTreeLib.getDirectsFromTree(company),
    all = companyTreeLib.getAllFromDirects(company),

    json = (x) => JSON.stringify(x, null, 2)

// Expectations
let expectedDirects = {
  'directs-Dev2': [
    'JuniorDev3',
    'JuniorDev4',
    'Dev2'
  ],
  'directs-SeniorDev': [
    'Dev1',
    'Dev2',
    'SeniorDev'
  ],
  'directs-CTO': [
    'SeniorDev',
    'PA2',
    'CTO'
  ],
  'directs-SeniorFinance': [
    'Finance1',
    'Finance2',
    'SeniorFinance'
  ],
  'directs-CFO': [
    'SeniorFinance',
    'CFO'
  ],
  'directs-CEO': [
    'CTO',
    'PA1',
    'CFO',
    'CEO'
  ]
}

let expectedAll = {
  'all-CEO': [
    'directs-CTO',
    'directs-SeniorDev',
    'directs-Dev2',
    'directs-CFO',
    'directs-SeniorFinance'
  ],
  'all-CTO': [
    'directs-SeniorDev',
    'directs-Dev2'
  ],
  'all-SeniorDev': [
    'directs-Dev2'
  ],
  'all-CFO': [
    'directs-SeniorFinance'
  ]
}

// Tests
console.assert(_.isEqual(directs, expectedDirects), 'Directs should match our expectation')
console.assert(_.isEqual(all, expectedAll), 'All should match our expectation')

// Output Tree (for debug)
console.log('Directs:', json(directs))
console.log('All:', json(all))
