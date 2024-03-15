import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.carlosdj.com.br'
  //baseURL: 'http://89.116.186.124:3001',
  //baseURL: 'https://carlosdj.com.br/apicarlosdj',
  //baseURL: 'http://localhost:3000',
  //headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbiIsInBhc3N3b3JkSGFzaCI6IiQyYiQxMCRYcDhoSnRBL2k2T0JobS9YOG0uTjJlSlZ6LlB6ejVDQklHN281c0VRREYwRHI1QnlUaHpaMiIsImF1dGhLZXkiOiI1Mjc0NWI2Ny1lNTQ2LTQ4ODItOWE5Zi0yOTM0OTA5YmIzMWUiLCJjb25maXJtZWRBdCI6MTYwMDY2MjE2MCwiYmxvY2tlZEF0IjpudWxsLCJyZWdpc3RyYXRpb25JcCI6bnVsbCwiY3JlYXRlZEF0IjoxNjgzOTI0OTk3LCJ1cGRhdGVkQXQiOjE2OTc2NjI3MjguNTc4LCJmbGFnIjoxMCwibGFzdExvZ2luQXQiOjE2OTQ1NDQ5MzAsIm9yaWdpbiI6IjE2ODM1NTQ4MTEiLCJudW1UdXJtYSI6MSwibmFtZSI6IkFkbWluIiwiYmlvIjpudWxsLCJ3aGF0c2FwcCI6IjM0OTg0MjkzNTE5IiwiY3BmIjoiMDE2MDU3NDM2NjYiLCJwb3N0YWxDb2RlIjoiMzg0MDA0MjgiLCJhZGRyZXNzIjoiUnVhIFPDo28gTG91cmVuw6dvIiwiYWRkcmVzc051bWJlciI6IjYyMSIsImFkZHJlc3NEaXN0cmljdCI6Ik9zdmFsZG8gUmV6ZW5kZSIsImltYWdlIjpudWxsLCJjaXR5SWQiOjIzODksInN0YXRlSWQiOjExLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjk4MzQ2OTcwLCJleHAiOjE2OTg5NTE3NzB9.goVZuFT0MFG0Eq5DnG0pEUdiPP0zD3glDf9aUt1CHdA`}
  // baseURL: 'http://localhost:8887',
  // hey
}) 

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
