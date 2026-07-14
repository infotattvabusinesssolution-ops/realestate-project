import axios from 'axios';

async function test() {
  const endpoints = [
    { name: 'GET positions', url: 'https://countriesnow.space/api/v0.1/countries/positions', method: 'get' },
    { name: 'POST positions', url: 'https://countriesnow.space/api/v0.1/countries/positions', method: 'post' },
    { name: 'GET base', url: 'https://countriesnow.space/api/v0.1/countries', method: 'get' },
    { name: 'POST base', url: 'https://countriesnow.space/api/v0.1/countries', method: 'post' },
    { name: 'GET states', url: 'https://countriesnow.space/api/v0.1/countries/states', method: 'get' },
    { name: 'POST states', url: 'https://countriesnow.space/api/v0.1/countries/states', method: 'post', data: { country: 'United States' } },
  ];

  for (const ep of endpoints) {
    try {
      console.log(`Testing ${ep.name}...`);
      const res = await axios({
        method: ep.method,
        url: ep.url,
        data: ep.data || {}
      });
      console.log(`  SUCCESS! status: ${res.status}, count: ${res.data?.data?.length || res.data?.data?.states?.length || 'unknown'}`);
    } catch (err) {
      console.log(`  FAILED! msg: ${err.message}, status: ${err.response?.status}`);
    }
  }
}

test();
